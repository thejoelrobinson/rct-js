// C-to-JS translator — converts Ghidra's decompiled C output into JS that
// runs against runtime/heap.js. Built on web-tree-sitter for parsing.
//
// Scope (initial pass):
//   - function_definition (void return only for now)
//   - declarations: simple integer locals
//   - assignment_expression with DAT_xxx / locals / dereferences
//   - call_expression: FUN_xxx (threads heap as first arg) + Win32 imports
//   - control flow: if/else, while, do-while, return
//   - operators: + - * / % & | ^ ~ ! && || == != < <= > >= << >> (logical)
//   - integer literals: decimal + hex
//   - casts (dropped — JS is dynamically typed)
//   - sizeof (dropped to constant if possible, else error)
//   - string-literal globals s_..._<addr> (translated to address constant)
//
// Out-of-scope (future):
//   - struct field access (.field, ->field) — needs type recovery
//   - arrays via [] index
//   - function pointers / indirect calls
//   - 8/16-bit memory width inference (today everything is u32)
//   - signed-vs-unsigned shift distinction (today >> emits >>>)

import { Parser, Language } from "web-tree-sitter";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const C_WASM = resolve(HERE, "../../node_modules/tree-sitter-c/tree-sitter-c.wasm");

let _parser = null;
async function getParser() {
  if (_parser) return _parser;
  await Parser.init();
  const C = await Language.load(C_WASM);
  _parser = new Parser();
  _parser.setLanguage(C);
  return _parser;
}

// Names emitted by Ghidra for x86 ops that don't have a direct C equivalent.
// These import from runtime/ghidra-builtins.js, not runtime/win32.js, so the
// Win32 surface stays cleanly separated.
const GHIDRA_BUILTINS = new Set([
  "CONCAT11", "CONCAT12", "CONCAT13", "CONCAT14",
  "CONCAT21", "CONCAT22", "CONCAT24",
  "CONCAT31", "CONCAT44",
  "CARRY1", "CARRY2", "CARRY4",
  "SBORROW2", "SBORROW4",
  "SCARRY2", "SCARRY4",
  "SUB41", "SUB42", "SUB44", "SUB81", "SUB82", "SUB84",
  "LOCK", "UNLOCK", "RtlUnwind", "Arguments", "ExceptionList",
]);

// Tree-sitter-c is a context-free parser, so it can't distinguish typedef'd
// type names from identifiers. Ghidra's output uses many Win32 type names
// in casts like `(LPBOOL)&x` — without knowing LPBOOL is a type, the parser
// reads this as `(LPBOOL) & &x`, a binary AND. We pre-strip cast prefixes
// for the well-known Win32 types so the AST comes out clean.
// Width-opaque Win32 typedefs — handle types where Ghidra's type info is just
// a HANDLE alias and the real width is irrelevant for translation. Replace
// these with `int` so tree-sitter parses casts/decls cleanly without losing
// information we'd otherwise want.
const WIN32_TYPE_NAMES = [
  // KERNEL32 / generic
  "LPBOOL", "LPBYTE", "LPCSTR", "LPDWORD", "LPSTR", "LPVOID", "LPCVOID",
  "BYTE", "WORD", "DWORD", "BOOL", "CHAR", "TCHAR", "WCHAR", "VOID", "PVOID",
  "UINT", "WPARAM", "LPARAM", "LRESULT", "HRESULT", "FARPROC", "size_t",
  // HANDLE-like (each its own typedef)
  "HACCEL", "HBITMAP", "HBRUSH", "HCURSOR", "HDC", "HFILE", "HFONT", "HGDIOBJ",
  "HGLOBAL", "HICON", "HINSTANCE", "HKEY", "HMENU", "HMMIO", "HMODULE",
  "HPSTR", "HRSRC", "HWND", "HWND__",
  // Pointer-to-type
  "LPMSG", "LPRECT", "LPPOINT", "LPPALETTEENTRY", "LPSYSTEM_INFO",
  "LPOPENFILENAMEA", "LPSECURITY_ATTRIBUTES", "LPOVERLAPPED",
  "PEXCEPTION_RECORD",
  // Multimedia
  "MMRESULT", "TIMERPROC", "WNDPROC", "DLGPROC",
  // Structured (rarely used as casts but harmless to include)
  "PHKEY", "PFILETIME",
  // C99 fixed-width integer typedefs — these have specific widths but
  // Ghidra rarely emits them; treat as int for parser-acceptance only.
  "uint16_t", "uint32_t", "int32_t", "int16_t", "int8_t", "uint8_t",
];

// Width-meaningful Ghidra/C type names. We DO NOT replace these — the
// translator needs to read the width to emit the right heap accessor.
// Tree-sitter-c recognises some natively (`char`, `short`, `int`, `long`,
// `signed`, `unsigned`); the rest we register via a typedef preamble so the
// parser treats them as type names rather than identifiers.
const WIDTH_MEANINGFUL_TYPES = [
  "byte", "uchar", "ushort", "uint", "ulong", "longlong", "ulonglong",
  "undefined", "undefined1", "undefined2", "undefined4", "undefined8",
  // C primitives — also appear as Ghidra cast targets and must not leak as imports.
  "char", "short", "int", "long", "signed", "unsigned",
];

const TYPEDEF_PREAMBLE = WIDTH_MEANINGFUL_TYPES.map(t => {
  // Emit a typedef that gives tree-sitter a hint these are types AND
  // documents the actual width so anyone reading the C can verify.
  if (t === "byte" || t === "uchar" || t === "undefined1") return `typedef unsigned char ${t};`;
  if (t === "ushort" || t === "undefined2") return `typedef unsigned short ${t};`;
  if (t === "uint" || t === "undefined4") return `typedef unsigned int ${t};`;
  if (t === "ulong") return `typedef unsigned long ${t};`;
  if (t === "longlong") return `typedef long long ${t};`;
  if (t === "ulonglong" || t === "undefined8") return `typedef unsigned long long ${t};`;
  return `typedef int ${t};`;
}).join("\n") + "\n";

const TYPE_REPLACE_REGEX = new RegExp(
  "\\b(" + WIN32_TYPE_NAMES.join("|") + ")\\b",
  "g",
);
// Walk emitted JS source and replace each occurrence of
//   IDENT(<balanced parens>);<whitespace>return;
// with
//   return IDENT(<balanced parens>);
// matching nested parens correctly. Used to propagate the last-called
// function's value through Ghidra-typed void wrappers.
function promoteTrailingCallsToReturns(src) {
  const out = [];
  let i = 0;
  while (i < src.length) {
    // Match the regs-wrapped form `(regs.eax = IDENT(...));<ws>return;` —
    // emitted when register-arg propagation is on. Promote to
    // `return (regs.eax = IDENT(...));` so the function still returns the
    // call's value (matching x86 ABI for void-typed functions).
    if (src[i] === "(" && src.startsWith("(regs.eax = ", i)) {
      let depth = 1;
      let j = i + 1;
      while (j < src.length && depth > 0) {
        const c = src[j++];
        if (c === '(') depth++;
        else if (c === ')') depth--;
        else if (c === '"' || c === "'" || c === "`") {
          while (j < src.length && src[j] !== c) {
            if (src[j] === "\\") j++;
            j++;
          }
          j++;
        }
      }
      if (depth === 0) {
        const tail = src.slice(j);
        const tm = /^;(\s*)return\s*;/.exec(tail);
        if (tm) {
          out.push("return ", src.slice(i, j), ";");
          i = j + tm[0].length;
          continue;
        }
      }
    }
    // Try to match an identifier-call. Use a lookbehind-style check for
    // word boundary: the previous character must be non-identifier.
    const prev = i === 0 ? " " : src[i - 1];
    // Exclude word chars (already in middle of an identifier) AND `.`
    // (member-access on an object — `heap.setU32(...)` must not be promoted
    // because the `return` would land between `heap.` and `setU32`).
    const isContinuation = /[A-Za-z0-9_$.]/.test(prev);
    if (!isContinuation) {
      const idMatch = /^([A-Za-z_$][\w$]*)\(/.exec(src.slice(i));
      if (idMatch) {
        // Skip if this is a JS keyword that takes a paren but isn't a call.
        // Avoid `if`, `while`, `for`, `switch`, `return`, `catch`, `function`.
        const kw = idMatch[1];
        if (kw !== "if" && kw !== "while" && kw !== "for" && kw !== "switch" &&
            kw !== "return" && kw !== "catch" && kw !== "function" && kw !== "do") {
          // Find matching closing paren.
          let depth = 1;
          let j = i + idMatch[0].length;
          while (j < src.length && depth > 0) {
            const c = src[j++];
            if (c === '(') depth++;
            else if (c === ')') depth--;
            else if (c === '"' || c === "'" || c === "`") {
              // Skip string literal to avoid counting parens inside.
              while (j < src.length && src[j] !== c) {
                if (src[j] === "\\") j++;
                j++;
              }
              j++;  // skip closing quote
            }
          }
          if (depth === 0) {
            // After the close-paren, look for `;\s*return\s*;`.
            const tail = src.slice(j);
            const tm = /^;(\s*)return\s*;/.exec(tail);
            if (tm) {
              const callExpr = src.slice(i, j);
              out.push("return ", callExpr, ";");
              i = j + tm[0].length;
              continue;
            }
          }
        }
      }
    }
    out.push(src[i]);
    i++;
  }
  return out.join("");
}

function normalizeTypes(source) {
  return TYPEDEF_PREAMBLE + source.replace(TYPE_REPLACE_REGEX, "int");
}

// C integer-literal suffixes (U, L, UL, LL, ULL) that JS doesn't understand.
// Ghidra emits these on hex/decimal constants; strip them.
const INT_SUFFIX_REGEX = /\b(0[xX][0-9a-fA-F]+|\d+)(?:[uU](?:[lL][lL]?)?|[lL][lL]?[uU]?)\b/g;
function stripIntSuffixes(source) {
  return source.replace(INT_SUFFIX_REGEX, "$1");
}

// C wide-string prefix L"..." — strip the leading L (handle both single- and
// double-quoted forms; preserve quote and content).
function stripWideStringPrefix(source) {
  return source.replace(/\bL("(?:[^"\\]|\\.)*")/g, "$1")
               .replace(/\bL('(?:[^'\\]|\\.)*')/g, "$1");
}

// Ghidra emits labels followed directly by `}` (the label sits at the end
// of a block). That's a C parse error — labels must precede a statement.
// Insert an empty statement so tree-sitter can parse it.
function fixDanglingLabels(source) {
  // Match: a labeled_statement-like prefix `LABEL:` followed by optional
  // whitespace and then `}`. Replace with `LABEL: ;\n}`.
  return source.replace(/(\b[A-Za-z_][\w]*:)\s*(\n\s*\})/g, "$1 ;$2");
}

// Inline forward `goto LABEL;` sites with the body of `LABEL:` when that
// body is short and ends in `return ...;` (no fall-through possible). This
// is a source-level transformation that lifts ~108 functions out of the
// "broken-goto, returns 0" bucket without needing to model goto in JS.
//
// Pattern handled:
//   if (cond) goto LABEL;
//   ...
//   LABEL:
//     stmt1;
//     stmt2;
//     return X;
//
// Becomes:
//   if (cond) {
//     stmt1;
//     stmt2;
//     return X;
//   }
//   ...
//   LABEL:
//     stmt1;     // (kept — other paths may still reach the label)
//     stmt2;
//     return X;
//
// Limitations:
//   - Label body must terminate (return/break/continue) — no fall-through.
//   - Body must be ≤ 12 statements (cap to keep emitted JS readable).
//   - `goto LABEL;` must be the only statement in its block (so the
//     replacement-with-block doesn't break adjacent statements).
function inlineForwardGotos(source) {
  // Find all `LABEL:` definitions and their following statement body up to
  // the next return/break/continue/closing-brace. Track the label's source
  // offset so we can verify gotos are forward (lower offset → label).
  const labels = new Map();   // labelName → { body, defOffset, extendedBody? }
  const LABEL_DEF = /^([ \t]*)([A-Za-z_]\w*):[ \t]*\n/gm;
  let m;
  while ((m = LABEL_DEF.exec(source)) !== null) {
    const indent = m[1];
    const name = m[2];
    const defOffset = m.index;
    const bodyStart = m.index + m[0].length;
    // Read statements until a terminating one (return/break/continue/goto)
    // or until we hit a closing brace at less-than-current indent.
    const body = readLabelBody(source, bodyStart, indent);
    if (body) {
      labels.set(name, { body, defOffset });
    } else {
      // The local body doesn't terminate — try EXTENDED readout that walks
      // past the enclosing scope's closing brace into the parent scope until
      // hitting a terminator. Used for cross-branch goto extraction:
      //   if (cond) { ... goto LAB; ... }
      //   else { LAB: <a>; }       // <-- local body `<a>` doesn't terminate
      //   <b>; <c>; return X;     // <-- continuation in parent scope
      // The extended body is `<a>; <b>; <c>; return X;` — semantically what
      // executes after the goto in the original C.
      const extendedBody = readLabelBodyExtended(source, bodyStart, indent);
      if (extendedBody) {
        labels.set(name, { body: extendedBody, defOffset, isExtended: true });
      }
    }
  }
  if (labels.size === 0) return source;
  // Replace `goto LABEL;` (when alone in its block, preceded by an `if (...)`
  // or sitting on its own line) with the label's body, indented appropriately.
  let out = source;
  for (const [name, { body, defOffset, isExtended }] of labels) {
    // Skip switch-fallthrough labels — these live inside switch statements
    // and inlining their body at a goto site would put case_* code outside
    // a switch block (parse error).
    if (/^switchD_/.test(name)) continue;
    // Skip "joined_*" labels for the conventional inliner — Ghidra emits
    // these for joined return paths; their bodies are sometimes complex
    // multi-block patterns. Extended-bodies (cross-scope extraction) are
    // permitted because they go through the same safety filter as normal
    // forward gotos.
    if (/^joined_/.test(name) && !isExtended) continue;
    // Only inline when label body terminates (last non-blank line is return/break/continue).
    if (!/(?:return\b[^;]*;|break\s*;|continue\s*;)\s*$/.test(body.trim())) continue;
    // Allow longer extended bodies (cross-scope) — capped at 30 lines by
    // readLabelBodyExtended itself.
    const maxLines = isExtended ? 32 : 14;
    if (body.split("\n").length > maxLines) continue;
    // Skip bodies containing break/continue at any non-final position —
    // those refer to the label's enclosing loop. Inlining at a different
    // loop site changes their target (or makes them illegal).
    const trimmedBody = body.trim();
    const lastTermMatch = /(return\b[^;]*;|break\s*;|continue\s*;)\s*$/.exec(trimmedBody);
    const beforeFinalTerm = trimmedBody.slice(0, lastTermMatch.index);
    if (/\b(break|continue)\b\s*;/.test(beforeFinalTerm)) continue;
    // Also skip if the FINAL terminator is `break`/`continue` and the body
    // referenced loop-bound state — the inlined break would target a
    // different loop. Conservative: skip all break/continue terminators
    // that the goto-site is in a different loop than the label-site.
    // We can't easily tell, so skip break/continue terminators entirely
    // unless we have stronger context.
    if (/^(break|continue)\s*;$/.test(lastTermMatch[1].trim())) continue;
    // Replace `goto NAME;` lines with the body. Preserve the indentation of
    // the goto line. The body lines are reindented to that level.
    // CRITICAL: only replace gotos whose source offset is BEFORE the label
    // definition (forward gotos). Backward gotos are loop edges and
    // inlining them creates infinite duplication or parse errors.
    const gotoRe = new RegExp(`^([ \\t]*)goto[ \\t]+${name}[ \\t]*;[ \\t]*\\n`, "gm");
    out = out.replace(gotoRe, (match, gIndent, gOffset) => {
      // Note: out has been modified by previous label replacements, so
      // gOffset is in the CURRENT `out` not the original source. We can't
      // compare to defOffset directly. Instead, inline only if the goto's
      // line appears before the label's identical line in `out`.
      const labelLine = `${name}:`;
      const labelIdxInOut = out.indexOf(labelLine);
      if (labelIdxInOut === -1 || gOffset >= labelIdxInOut) return match;
      const lines = body.trim().split("\n");
      const minIndent = Math.min(...lines.filter(l => l.trim()).map(l => l.match(/^[ \t]*/)[0].length));
      const reindented = lines.map(l => l.trim() ? gIndent + l.slice(minIndent) : "").join("\n");
      return `${reindented}\n`;
    });
    // ALSO match `if (cond) goto NAME;` (goto on same line as if). Wrap the
    // body in `{ ... }` so the if-statement gets a proper compound consequence.
    out = inlineIfGoto(out, name, body);
  }
  return out;
}

// For each `if (cond) goto NAME;` site (single-line) preceding the label
// definition in `out`, replace with `if (cond) { <body> }`. This handles
// Ghidra's compact emission of single-statement if-bodies.
function inlineIfGoto(out, name, body) {
  const labelLine = `${name}:`;
  const labelIdxInOut = out.indexOf(labelLine);
  if (labelIdxInOut === -1) return out;
  // Refuse to inline truncated bodies — when wrapped in `{ ... }` they'd
  // produce mismatched braces and break the parser.
  if (!isBraceBalanced(body)) return out;
  // Conservative cap: only inline small bodies. Larger bodies often
  // reference locals/regs that are only initialised in the label's enclosing
  // path; inlining them at a sibling site can change behaviour.
  const nonBlankLineCount = body.split("\n").filter(l => l.trim()).length;
  if (nonBlankLineCount > 18) return out;
  // Refuse to inline bodies with `goto` to other labels — those gotos may
  // point to the label-site's enclosing scope, not the goto-site's, and
  // their target may not be visible in the new context.
  if (/\bgoto\s+\w+\s*;/.test(body)) return out;
  const result = [];
  let i = 0;
  const gotoTok = `goto ${name};`;
  while (i < out.length) {
    const nextGoto = out.indexOf(gotoTok, i);
    if (nextGoto === -1 || nextGoto >= labelIdxInOut) {
      result.push(out.slice(i));
      break;
    }
    const lineStart = out.lastIndexOf("\n", nextGoto) + 1;
    const lineSegment = out.slice(lineStart, nextGoto);
    // Match `if (...)` or `else if (...)`. The leading-indent capture
    // becomes the indent of the inlined-body block.
    const ifMatch = /^([ \t]*)(?:else[ \t]+)?if[ \t]*\(/.exec(lineSegment);
    if (!ifMatch) {
      result.push(out.slice(i, nextGoto + gotoTok.length));
      i = nextGoto + gotoTok.length;
      continue;
    }
    const condStart = lineStart + ifMatch[0].length;
    let depth = 1;
    let j = condStart;
    while (j < out.length && depth > 0) {
      const c = out[j++];
      if (c === '(') depth++;
      else if (c === ')') depth--;
      else if (c === '\n') { depth = -1; break; }
    }
    if (depth !== 0) {
      result.push(out.slice(i, nextGoto + gotoTok.length));
      i = nextGoto + gotoTok.length;
      continue;
    }
    const between = out.slice(j, nextGoto);
    if (!/^\s*$/.test(between)) {
      result.push(out.slice(i, nextGoto + gotoTok.length));
      i = nextGoto + gotoTok.length;
      continue;
    }
    const indent = ifMatch[1];
    const bodyLines = body.trim().split("\n");
    const minIndent = Math.min(...bodyLines.filter(l => l.trim()).map(l => l.match(/^[ \t]*/)[0].length));
    const innerIndent = indent + "  ";
    const reindented = bodyLines.map(l => l.trim() ? innerIndent + l.slice(minIndent) : "").join("\n");
    const ifTail = out.slice(lineStart, j);
    const tailEnd = out.indexOf("\n", nextGoto);
    const tailEndIdx = tailEnd === -1 ? out.length : tailEnd + 1;
    result.push(out.slice(i, lineStart));
    result.push(ifTail + " {\n" + reindented + "\n" + indent + "}\n");
    i = tailEndIdx;
  }
  return result.join("");
}

function readLabelBody(source, start, baseIndent) {
  const lines = [];
  let i = start;
  let foundTerminator = false;
  // Ghidra emits labels at column 0 even when the surrounding scope is
  // deeply indented. Track the first body line's indent and use that as
  // the "natural body indent" — closing braces at an indent less than
  // that mean the enclosing scope (not the label's body) is ending.
  let bodyIndent = null;
  while (i < source.length) {
    const lineEnd = source.indexOf("\n", i);
    const line = source.slice(i, lineEnd === -1 ? source.length : lineEnd);
    if (lineEnd === -1) break;
    const isBlank = !line.trim();
    if (!isBlank && bodyIndent === null) {
      bodyIndent = line.match(/^[ \t]*/)[0].length;
    }
    // Stop at a closing brace whose indent is less than the body's natural
    // indent — the surrounding scope is ending and we'd escape the label.
    if (/^[ \t]*\}/.test(line) && bodyIndent !== null) {
      const indent = line.match(/^[ \t]*/)[0].length;
      if (indent < bodyIndent) break;
    }
    // Stop at another label definition at the same column 0 indent.
    if (/^[ \t]*[A-Za-z_]\w*:\s*$/.test(line) && line.trim() !== "") {
      const indent = line.match(/^[ \t]*/)[0].length;
      if (indent === baseIndent.length) break;
    }
    lines.push(line);
    if (/\b(return\b[^;]*;|break\s*;|continue\s*;|goto\s+\w+\s*;)/.test(line)) {
      foundTerminator = true;
      break;
    }
    i = lineEnd + 1;
  }
  if (!foundTerminator) return null;
  return lines.join("\n");
}

// Extended label-body read: when the local body falls through (no
// terminator), keep reading past the enclosing scope's closing brace and
// accumulate parent-scope statements until reaching a `return X;` (the
// function-level terminator) or hitting an unsafe boundary.
//
// Pattern targeted (cross-branch goto):
//   if (cond) { ... goto LAB; ... }            <-- goto site (different branch)
//   else { LAB: <a>; }                          <-- label in else
//   <b>; <c>; return X;                         <-- continuation
//
// Extracted body: `<a>; <b>; <c>; return X;` — the linear sequence of C
// statements that execute after `goto LAB;` in the original source.
//
// Safety constraints (return null if any tripped):
//   - Total extracted lines ≤ 30.
//   - The label's enclosing scope must close (we walk OUT of it once).
//   - The continuation must reach a `return ...;` — no break/continue past
//     loop boundaries (those would change semantics if the goto-site is in
//     a different loop).
//   - We refuse if any line contains `goto NAME;` to ANOTHER label — that
//     goto's target may not be visible at the goto-site after extraction.
//   - Brace balance must remain consistent (we only walk OUT of the label's
//     enclosing scope; we don't track deep brace mismatches inside).
function readLabelBodyExtended(source, start, baseIndent) {
  const lines = [];
  let i = start;
  let bodyIndent = null;
  let scopeExits = 0;
  const maxScopeExits = 4;     // step out at most 4 nested scopes
  const maxLines = 30;
  let foundReturn = false;
  while (i < source.length && lines.length < maxLines) {
    const lineEnd = source.indexOf("\n", i);
    const line = source.slice(i, lineEnd === -1 ? source.length : lineEnd);
    if (lineEnd === -1) break;
    const isBlank = !line.trim();
    if (!isBlank && bodyIndent === null) {
      bodyIndent = line.match(/^[ \t]*/)[0].length;
    }
    // When we encounter a `}` at less-than-current bodyIndent, that's the
    // enclosing scope closing. Skip the brace itself (do not add to body —
    // we're walking ACROSS scopes; the `}` belongs to the original C scope
    // and would be a stray close-brace if we inlined it elsewhere). Decrement
    // bodyIndent and continue reading parent-scope statements.
    if (/^[ \t]*\}/.test(line)) {
      const indent = line.match(/^[ \t]*/)[0].length;
      // If bodyIndent is null (just reset after else-skip), treat this `}`
      // as a scope exit — re-detect bodyIndent on next non-`}` line.
      if (bodyIndent === null || indent < bodyIndent) {
        scopeExits++;
        if (scopeExits > maxScopeExits) return null;
        // Special case: closing brace followed (on same line OR next line)
        // by `else` means we're inside an if-clause and the else-clause is
        // starting. The continuation we want is AFTER the entire if/else,
        // not inside the else. Skip the else block(s).
        const sameLineElse = /^\s*\}\s*else\b/.test(line);
        // Look ahead for `else` on the next non-blank line.
        let nextNonBlankStart = lineEnd + 1;
        while (nextNonBlankStart < source.length) {
          const nlEnd = source.indexOf("\n", nextNonBlankStart);
          const nlLine = source.slice(nextNonBlankStart, nlEnd === -1 ? source.length : nlEnd);
          if (nlLine.trim() === "") {
            nextNonBlankStart = nlEnd + 1;
            continue;
          }
          break;
        }
        const nextLineEnd = source.indexOf("\n", nextNonBlankStart);
        const nextLine = source.slice(nextNonBlankStart, nextLineEnd === -1 ? source.length : nextLineEnd);
        const nextLineElse = !sameLineElse && /^\s*else\b/.test(nextLine);
        if (sameLineElse || nextLineElse) {
          // Skip ALL chained `else if (...) { ... }` / `else { ... }` blocks.
          // Start position: the `else` token on either current or next line.
          let pos;
          if (sameLineElse) {
            const openBrace = line.indexOf("{");
            if (openBrace === -1) return null;
            pos = i + openBrace + 1;
          } else {
            // nextLine starts with `else`
            const openBraceInNext = nextLine.indexOf("{");
            if (openBraceInNext === -1) return null;
            pos = nextNonBlankStart + openBraceInNext + 1;
          }
          // Skip the matching close-brace, then check if another `else` follows.
          while (true) {
            let depth = 1;
            let k = pos;
            while (k < source.length && depth > 0) {
              if (source[k] === "{") depth++;
              else if (source[k] === "}") depth--;
              k++;
              if (k > pos + 8000) return null;
            }
            if (depth !== 0) return null;
            // k is just past the matching close-brace. Check for `else` on
            // same or next non-blank line.
            // First, find rest of current line after the close-brace.
            let lineRest = "";
            const ln = source.indexOf("\n", k);
            lineRest = source.slice(k, ln === -1 ? source.length : ln);
            if (/^\s*else\b/.test(lineRest)) {
              const ob = lineRest.indexOf("{");
              if (ob === -1) return null;
              pos = k + ob + 1;
              continue;
            }
            // Move to next non-blank line.
            let nb = ln + 1;
            while (nb < source.length) {
              const ne = source.indexOf("\n", nb);
              const nl = source.slice(nb, ne === -1 ? source.length : ne);
              if (nl.trim() === "") { nb = ne + 1; continue; }
              if (/^\s*else\b/.test(nl)) {
                const ob = nl.indexOf("{");
                if (ob === -1) return null;
                pos = nb + ob + 1;
                break;
              }
              break;
            }
            if (nb >= source.length) {
              // Reached end of source — exit
              i = source.length;
              break;
            }
            // Check if we updated pos for another else iteration
            const nlAtNb = source.indexOf("\n", nb);
            const nlLineAtNb = source.slice(nb, nlAtNb === -1 ? source.length : nlAtNb);
            if (/^\s*else\b/.test(nlLineAtNb) && pos > k) {
              continue;     // another else iteration
            }
            // No more else; advance i past the close-brace's line.
            while (k < source.length && source[k] !== "\n") k++;
            i = k + 1;
            break;
          }
          bodyIndent = null;
          continue;
        }
        // Plain close-brace: step out (do not push to lines).
        bodyIndent = indent;
        i = lineEnd + 1;
        continue;
      }
    }
    // If we see an opening brace (line ends in `{`), absorb the entire
    // matching `{...}` block as a single body element. This permits inline
    // if-blocks and small loops inside the extended tail. Refuse if the
    // block is too large (>15 lines) or if it contains any of the unsafe
    // tokens (goto / break / continue / case / do-while close).
    if (/\{\s*$/.test(line)) {
      // Find the matching close brace.
      let depth = 0;
      let k = i;
      let blockEnd = -1;
      while (k < source.length) {
        const ch = source[k];
        if (ch === "{") depth++;
        else if (ch === "}") {
          depth--;
          if (depth === 0) { blockEnd = k; break; }
        }
        k++;
      }
      if (blockEnd === -1) return null;
      // Find the line containing blockEnd.
      let lineEndK = source.indexOf("\n", blockEnd);
      if (lineEndK === -1) lineEndK = source.length;
      const block = source.slice(i, lineEndK);
      // Safety: block ≤ 15 lines, no unsafe tokens (besides return).
      const blockLines = block.split("\n");
      if (blockLines.length > 15) return null;
      // Allow nested ifs but disallow goto / break / continue / loop closes
      // inside (they'd target outer loops that may not exist at the goto
      // site).
      if (/\bgoto\s+\w+\s*;/.test(block)) return null;
      if (/\b(break|continue)\s*;/.test(block)) return null;
      if (/^\s*\}\s*while\s*\(/m.test(block)) return null;
      if (/\b(case\b|default\s*:)/.test(block)) return null;
      // Push the whole block as one logical line group; don't push as one
      // string with embedded newlines so re-indenting works downstream.
      // Use the original lines so structure is preserved.
      for (const bl of blockLines) lines.push(bl);
      if (lines.length > maxLines) return null;
      i = lineEndK + 1;
      // After absorbing a block, the previous bodyIndent still applies.
      continue;
    }
    // Refuse if we hit a closing brace AND the next line is `else` or
    // `while (` (do-while close) — those mean the surrounding control flow
    // is non-trivial; bail to keep semantics safe.
    // Stop at another label definition.
    if (/^[ \t]*[A-Za-z_]\w*:\s*$/.test(line) && line.trim() !== "") {
      // Hitting another label — skip the label line but continue reading
      // its body. In the original C, fall-through reaches both labels'
      // bodies sequentially, so the extracted post-label tail must include
      // them. (Stop only if the new label is a switch-case marker which
      // would make case_*: appear inline outside a switch.)
      if (/^switchD_|^case_/.test(line.trim().replace(/:.*$/, ""))) break;
      i = lineEnd + 1;
      continue;
    }
    // Refuse: gotos inside the extended body to OTHER labels (could be
    // unsafe to inline at a different goto site).
    if (/\bgoto\s+\w+\s*;/.test(line)) {
      return null;
    }
    // Refuse: bare `break;` or `continue;` would target a different loop
    // when inlined at a non-co-located goto site.
    if (/^\s*(break|continue)\s*;\s*$/.test(line)) {
      return null;
    }
    // Refuse: do-while `} while(...)` close — we're inside a loop and
    // walking out would change loop semantics for the goto-site.
    if (/^\s*\}\s*while\s*\(/.test(line)) {
      return null;
    }
    // Refuse: switch case labels (we shouldn't be extracting across switch
    // arms).
    if (/^\s*(case\b|default\s*:)/.test(line)) {
      return null;
    }
    lines.push(line);
    if (/\breturn\b[^;]*;/.test(line)) {
      foundReturn = true;
      break;
    }
    i = lineEnd + 1;
  }
  if (!foundReturn) return null;
  if (scopeExits === 0) return null;  // didn't actually extend; no benefit
  return lines.join("\n");
}

// Return true iff `body` (raw string of source lines) is brace-balanced —
// every opening brace inside the body is matched by a closing brace inside
// it. Used by inlineIfGoto to refuse to inline truncated bodies that would
// produce malformed JS when wrapped in `{ ... }`.
function isBraceBalanced(body) {
  let depth = 0;
  for (let k = 0; k < body.length; k++) {
    const c = body[k];
    if (c === '"' || c === "'") {
      const q = c;
      k++;
      while (k < body.length && body[k] !== q) {
        if (body[k] === '\\') k++;
        k++;
      }
      continue;
    }
    if (c === '/' && body[k + 1] === '/') {
      // line comment — skip to end of line
      while (k < body.length && body[k] !== '\n') k++;
      continue;
    }
    if (c === '/' && body[k + 1] === '*') {
      k += 2;
      while (k < body.length && !(body[k] === '*' && body[k + 1] === '/')) k++;
      k++; // consume `/`
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') depth--;
  }
  return depth === 0;
}

// CONCAT44(A,B) packs two 32-bit values into a 64-bit value. Ghidra often
// emits this in patterns like:
//   uVar = CONCAT44(in_EDX, in_EAX);
//   ... (uVar >> 0x20) ...    // intended: in_EDX  (high half)
//   ... uVar ...               // intended: in_EAX  (low half)
//
// JS bitwise operators mask shift counts to 5 bits, so `>>> 0x20` ≡ `>>> 0`
// and the high half collapses to the low half — silently corrupting any
// code that relies on the high half being EDX.
//
// This pass detects the pattern at SOURCE level and rewrites direct uses
// of the var as either `A` (low) or `B` (high), bypassing the broken shift
// emit. Conservative: only triggers when the variable is assigned exactly
// once and only via `CONCAT44(<simple>, <simple>)`.
function unpackConcat44Halves(source) {
  // Find every `<type>? <name> = CONCAT44(<A>, <B>);` and `<name> = CONCAT44(...)` line.
  // For each such name, we'll substitute uses across the function body.
  // To stay safe, only rewrite within the SAME function (no cross-function
  // contamination). Functions are top-level in Ghidra output: split on
  // `\n}\n` for crude function boundaries.
  const fnBlocks = source.split(/(?<=\n\})\n/);
  return fnBlocks.map(block => unpackConcat44InFn(block)).join("\n");
}

function unpackConcat44InFn(block) {
  // Detect: `[type ]NAME = CONCAT44(EXPR_A,EXPR_B);` (where the args are
  // simple register-like identifiers / no nested commas).
  const re = /^[ \t]*([A-Za-z_]\w*)\s*=\s*CONCAT44\(([^(),]+),\s*([^(),]+)\)\s*;\s*$/gm;
  const assigns = [];
  let m;
  while ((m = re.exec(block)) !== null) {
    assigns.push({ name: m[1], hi: m[2].trim(), lo: m[3].trim(), at: m.index });
  }
  if (assigns.length === 0) return block;
  // For each unique name, count assignments. Only safe when assigned exactly
  // once via CONCAT44.
  const counts = new Map();
  for (const a of assigns) counts.set(a.name, (counts.get(a.name) || 0) + 1);
  // Also count any other assignments to that name elsewhere in the block.
  // Pattern: `NAME = ` (not preceded by ==, !=, <=, >=, &=, |=, ^=, etc.).
  let out = block;
  for (const a of assigns) {
    if (counts.get(a.name) !== 1) continue;
    const rOther = new RegExp(`\\b${a.name}\\s*=(?!=)`, "g");
    let other = 0;
    let mm;
    while ((mm = rOther.exec(block)) !== null) other++;
    if (other !== 1) continue;
    // Replace `((uVar) >>> 0x20)` (or with `>> 0x20`) → hi, and bare uses → lo.
    // Be careful with operator precedence: only replace when the use is
    // a clean read (not address-of, not assignment).
    // Pattern A: `(unsigned)NAME >> 0x20`, `((NAME) >> 0x20)`, `NAME >> 0x20`
    const hiPat = new RegExp(`\\b${a.name}\\s*>>>?\\s*0x20\\b`, "g");
    out = out.replace(hiPat, `(${a.hi})`);
    // Cast forms: `(short)((ulonglong)NAME >> 0x20)` already handled by the
    // hiPat above replacing the `NAME >> 0x20` core, but the surrounding
    // cast remains and is harmless.
    // Pattern B: bare `NAME` reads → lo. Avoid the assignment line itself.
    // Replace `(short)NAME`, `(int)NAME`, `(uint)NAME`, `NAME` in expressions.
    // Conservative: only inside parenthesised cast contexts and direct
    // expression-only use (avoid `&NAME`, `NAME =`).
    // Skip the assignment line. Track its character position in `out`.
    // (assigns[i].at is offset in original block — ok approximation since
    // we replaced only `>> 0x20` forms above which kept length stable... actually no,
    // length may differ. Recompute by re-finding the assignment).
    const reAssign = new RegExp(`^[ \\t]*${a.name}\\s*=\\s*CONCAT44\\([^()]*\\)\\s*;\\s*$`, "m");
    const assignMatch = reAssign.exec(out);
    if (!assignMatch) continue;
    const assignStart = assignMatch.index;
    const assignEnd = assignStart + assignMatch[0].length;
    // Replace uses outside the assignment line.
    const before = out.slice(0, assignStart);
    const middle = out.slice(assignStart, assignEnd);
    const after = out.slice(assignEnd);
    const usePat = new RegExp(`\\b${a.name}\\b`, "g");
    const replaceUses = s => s.replace(usePat, `(${a.lo})`);
    out = before + middle + replaceUses(after);
  }
  return out;
}

// Ghidra preserves C++-style symbols verbatim in C output, including
// templates (`char_traits<char>::move`) and qualifiers (`__cdecl`). Tree-
// sitter-c can't parse these — sanitise by flattening templates and dropping
// calling-convention markers.
function sanitiseCxxSymbols(source) {
  return source
    // Drop calling-convention attributes — tree-sitter-c handles them but
    // some appear in unusual positions; safe to remove.
    .replace(/\b__(cdecl|stdcall|fastcall|thiscall)\b/g, "")
    // Flatten `name<args>::method` → `name_args__method`. Greedy enough for
    // single-arg templates which is all Ghidra emits for STL.
    .replace(/([A-Za-z_]\w*)<([^<>]+)>::([A-Za-z_]\w*)/g, (_, a, b, c) =>
      `${a}_${b.replace(/[^A-Za-z0-9_]/g, "_")}__${c}`);
}

// Parse a single Ghidra C function and return { js, info } where info contains
// metadata (function name, addr, imports, called functions).
//
// `forceAddr` (optional): an integer RVA. When set, the translator forces
// the function name to FUN_<padded-hex> regardless of what Ghidra called it.
// The batch driver passes this from the file basename so functions named
// like Win32 imports (RtlUnwind, _strlen, etc.) don't collide with their
// runtime counterparts.
export async function translateFunction(source, forceAddr, opts = {}) {
  source = unpackConcat44Halves(fixDanglingLabels(inlineForwardGotos(sanitiseCxxSymbols(stripWideStringPrefix(stripIntSuffixes(normalizeTypes(source)))))));
  const parser = await getParser();
  const tree = parser.parse(source);
  const ctx = {
    source,
    imports: new Set(),     // Win32 imports referenced
    builtins: new Set(),    // Ghidra pseudo-fns referenced (CONCAT*, CARRY*, ...)
    callsFun: new Set(),    // FUN_xxx referenced
    forceAddr: forceAddr,
    charDats: opts.charDats || new Set(),    // DAT addresses that are byte-sized
    // Per-call-site register-arg propagation:
    //   regConsumers: Map<calleeAddr, Set<reg>> — which functions read which regs
    //   callsiteRegs: Map<callerAddr, Map<calleeAddr, {eax,ebx,...}>> — captured state
    // When emitting a call to a known consumer, prepend `regs.<reg> = <captured>`
    // to satisfy the callee's register input. Without this, `unaff_*` reads return 0.
    regConsumers: opts.regConsumers || new Map(),
    callsiteRegs: opts.callsiteRegs || new Map(),
    locals: new Set(),      // names declared as locals (so we don't mistake for DAT)
    paramNames: new Set(),
    varPointee: new Map(),  // pointer-typed local name → accessor (u8/i8/u16/i16/u32) of pointed-to element
    varNarrowMask: new Map(),  // sub-DWORD-typed local name → mask string (e.g. "& 0xff", "& 0xffff")
    // Heap-backed locals (those whose address is taken or that are arrays).
    // Map: name -> { offset, size, isArray }
    heapLocals: new Map(),
    frameSize: 0,
    funcName: null,
    funcAddr: null,
  };
  const root = tree.rootNode;
  let out = "";
  for (const child of root.namedChildren) {
    if (child.type === "function_definition") {
      out += emitFunction(child, ctx);
    }
    // Skip top-level comments / WARNING blocks
  }
  // Tree-sitter-c sometimes parses Ghidra's output as one big ERROR node
  // (constructs we haven't fixed up). Emit a placeholder export so dependent
  // modules still resolve their imports — calling it throws loudly.
  if (out === "" && typeof forceAddr === "number") {
    ctx.funcName = `FUN_${forceAddr.toString(16).padStart(8, "0")}`;
    ctx.funcAddr = forceAddr;
    out = `export function ${ctx.funcName}(heap, ...args) {\n` +
          `  throw new Error("c-to-js: parse failed for ${ctx.funcName} — function not translated");\n` +
          `}\n`;
  }
  const header = renderHeader(ctx);
  return {
    js: header + "\n" + out,
    info: {
      funcName: ctx.funcName,
      funcAddr: ctx.funcAddr,
      imports: [...ctx.imports],
      calls: [...ctx.callsFun],
    },
  };
}

// Walk the function body and find which locals have their address taken
// (either via &, struct-field syntax `local.field`, or array syntax).
// Each implies the local needs to live on the heap so the field/array access
// can read/write into a contiguous block of memory.
// Names that look like locals but are actually globals/constants emitted by
// Ghidra. Never allocate a stack slot for these — `&DAT_xxx` is the
// constant 0xxxx (a fixed virtual address), not a stack-frame address.
function isGhidraGlobalName(name) {
  // Direct address forms: DAT_005f1234, FUN_00401000, LAB_00450e67, UNK_xxx,
  // s_<text>_<addr>, plus DAT_<addr>_<width> (sub-DWORD typed slice).
  if (/^_?(DAT|FUN|LAB|UNK)_[0-9a-fA-F]+(_\d+)?$/.test(name)) return true;
  // PTR_<targetname>_<addr> — Ghidra's pointer-pointing-to-something label
  // (PTR_FUN_005ee534, PTR_LOOP_005ec500, PTR_s_GSK_005ebbcc, ...).
  if (/^PTR_[A-Za-z0-9_]*_[0-9a-fA-F]+$/.test(name)) return true;
  // s_<text>_<addr> — string literal global.
  if (/^s_[A-Za-z0-9_]*_[0-9a-fA-F]{6,8}$/.test(name)) return true;
  // switchD_<addr>_caseD_<n> — Ghidra's per-case jump-table label.
  if (/^switchD_[0-9a-fA-F]+_caseD_[0-9a-fA-F]+$/.test(name)) return true;
  return false;
}

function findAddressTakenLocals(bodyNode, source) {
  const taken = new Set();
  function walk(n) {
    if (n.type === "pointer_expression") {
      if (n.firstChild && n.firstChild.text === "&") {
        const arg = n.namedChildren[0];
        if (arg && arg.type === "identifier") {
          const name = source.slice(arg.startIndex, arg.endIndex);
          if (!isGhidraGlobalName(name)) taken.add(name);
        }
      }
    }
    if (n.type === "field_expression") {
      // local.field on a non-pointer LHS — local must be a struct on the heap.
      const arg = n.childForFieldName("argument");
      const opNode = n.children.find(c => c.text === "." || c.text === "->");
      if (arg && arg.type === "identifier" && opNode && opNode.text === ".") {
        const fieldNode = n.childForFieldName("field");
        const fieldName = fieldNode ? source.slice(fieldNode.startIndex, fieldNode.endIndex) : "";
        // _<off>_<width>_ on a non-DAT identifier is a sub-DWORD slice (handled
        // arithmetically); not a struct address. Skip.
        if (!/^_\d+_\d+_$/.test(fieldName)) {
          const name = source.slice(arg.startIndex, arg.endIndex);
          if (!isGhidraGlobalName(name)) taken.add(name);
        }
      }
    }
    if (n.type === "subscript_expression") {
      // local[i] — if local is declared as an array we'll catch via findArrayLocals.
      // If it's a pointer we don't need to heap-back. No-op here.
    }
    for (const c of n.namedChildren) walk(c);
  }
  walk(bodyNode);
  return taken;
}

// Walk the body and find which locals have `.field` access on them. Returns
// a Set of identifier names — these need to be heap-backed as struct slots.
function findStructAccess(bodyNode, source) {
  const access = new Set();
  function walk(n) {
    if (n.type === "field_expression") {
      const arg = n.childForFieldName("argument");
      const opNode = n.children.find(c => c.text === "." || c.text === "->");
      if (arg && arg.type === "identifier" && opNode && opNode.text === ".") {
        const fieldNode = n.childForFieldName("field");
        const fieldName = fieldNode ? source.slice(fieldNode.startIndex, fieldNode.endIndex) : "";
        if (!/^_\d+_\d+_$/.test(fieldName)) {
          const name = source.slice(arg.startIndex, arg.endIndex);
          if (!isGhidraGlobalName(name)) access.add(name);
        }
      }
    }
    for (const c of n.namedChildren) walk(c);
  }
  walk(bodyNode);
  return access;
}

// Walk the function body and collect array-typed locals (BYTE foo[63]).
// Returns Map name -> array size in BYTES (count × element width).
// Element width is inferred from the declaration's type:
//   undefined1/byte/char/uchar    -> 1
//   undefined2/short/ushort       -> 2
//   default (int/uint/pointer/…)  -> 4
// Collect every Ghidra-named `local_<hex>` declaration in the function body
// along with its parsed offset. Returns Map name -> integer X. The hex
// value is the offset from the frame top (Ghidra's naming convention).
function collectAllLocalHexDecls(bodyNode, source) {
  const out = new Map();
  function walk(node) {
    if (!node) return;
    if (node.type === "declaration") {
      for (const c of node.namedChildren) {
        if (c.type === "init_declarator" || c.type === "identifier" ||
            c.type === "pointer_declarator" || c.type === "array_declarator") {
          const id = c.type === "identifier" ? c : findIdentifier(c);
          if (id) {
            const name = source.slice(id.startIndex, id.endIndex);
            const m = /^local_([0-9a-fA-F]+)$/.exec(name);
            if (m) out.set(name, parseInt(m[1], 16));
          }
        }
      }
    }
    for (const c of node.namedChildren || []) walk(c);
  }
  walk(bodyNode);
  return out;
}

function findArrayLocals(bodyNode, source) {
  const arrays = new Map();
  for (const child of bodyNode.namedChildren) {
    if (child.type !== "declaration") continue;
    // Determine element width from the declaration's type field.
    const typeNode = child.childForFieldName("type");
    const typeText = typeNode ? source.slice(typeNode.startIndex, typeNode.endIndex).trim() : "";
    let elemWidth = 4;
    if (/^(undefined1|byte|char|uchar|BYTE|CHAR|bool)\b/.test(typeText)) elemWidth = 1;
    else if (/^(undefined2|short|ushort|SHORT|USHORT|WORD|wchar_t)\b/.test(typeText)) elemWidth = 2;
    for (const init of child.namedChildren) {
      if (init.type === "init_declarator" || init.type === "array_declarator") {
        const arr = init.type === "array_declarator"
          ? init
          : init.namedChildren.find(c => c.type === "array_declarator");
        if (!arr) continue;
        const id = findIdentifier(arr);
        const sizeNode = arr.childForFieldName("size") || arr.namedChildren.find(c => c.type === "number_literal");
        if (id && sizeNode) {
          const name = source.slice(id.startIndex, id.endIndex);
          const count = parseInt(source.slice(sizeNode.startIndex, sizeNode.endIndex), 0);
          arrays.set(name, (count || 1) * elemWidth);
        }
      }
    }
  }
  return arrays;
}

// Identify forward gotos at any nesting depth inside the function body. A
// "forward goto" is a `goto LABEL` whose target `LABEL:` appears later in
// source (within the same enclosing compound). We lower forward labels to
// labeled-break patterns by wrapping the preceding siblings of the labeled
// statement in `LABEL: { ... }`; the goto becomes `break LABEL`.
//
// Returns:
//   forwardLabels: Set<string> — all label names lowered (any nesting depth).
//   compoundLabels: Map<nodeId, [{idx, name}, ...]> — per-compound label list
//     in ascending child-index order. Used by emitBlock to apply wrapping.
function collectForwardLabels(bodyNode, source) {
  const forwardLabels = new Set();
  const compoundLabels = new Map();
  function visitCompound(compound) {
    const children = compound.namedChildren.filter(c => c.type !== "comment");
    const labelIndex = new Map(); // labelName → child index
    for (let i = 0; i < children.length; i++) {
      if (children[i].type === "labeled_statement") {
        const id = children[i].namedChildren[0];
        if (id) {
          const name = source.slice(id.startIndex, id.endIndex);
          labelIndex.set(name, i);
        }
      }
    }
    if (labelIndex.size > 0) {
      const labelsHere = [];
      for (const [name, idx] of labelIndex) {
        // Only lower if at least one forward goto exists AND no backward
        // goto in this compound's tail. Mixed-direction labels (backward
        // edges = loops) need restructuring we don't model — leave them as
        // early-return fallbacks.
        const hasForward  = anyGotoTo(children.slice(0, idx), name, source);
        const hasBackward = anyGotoTo(children.slice(idx + 1), name, source);
        // Also reject if any descendant elsewhere in the function targets
        // this label — those gotos would emit `break LABEL` from a scope
        // where the labeled block isn't open (= JS parse error). Keep the
        // check local to this compound; cross-compound conflicts are
        // detected at union-time below.
        if (hasForward && !hasBackward) {
          labelsHere.push({ idx, name });
        }
      }
      if (labelsHere.length > 0) {
        // If the same name was already chosen at a different compound,
        // skip — break LABEL would resolve ambiguously. Keep the first
        // occurrence (outermost wins by walk order).
        const filtered = labelsHere.filter(l => !forwardLabels.has(l.name));
        if (filtered.length > 0) {
          compoundLabels.set(compound.id, filtered);
          for (const l of filtered) forwardLabels.add(l.name);
        }
      }
    }
    // Recurse into all descendant compound_statements.
    for (const c of children) {
      visitDescendantCompounds(c, visitCompound);
    }
  }
  visitCompound(bodyNode);
  return { forwardLabels, compoundLabels };
}

// Walk children looking for compound_statement nodes; invoke cb for each one
// found. Stops descending when it hits a compound (the caller drives the
// recursion).
function visitDescendantCompounds(node, cb) {
  if (!node || node.type === "comment") return;
  if (node.type === "compound_statement") { cb(node); return; }
  for (const c of node.namedChildren) visitDescendantCompounds(c, cb);
}

// Recursive walk of statements looking for `goto LABEL`.
function anyGotoTo(nodes, labelName, source) {
  for (const n of nodes) {
    if (!n || n.type === "comment") continue;
    if (n.type === "goto_statement") {
      const lblNode = n.childForFieldName("label") || n.namedChildren[0];
      if (lblNode) {
        const lbl = source.slice(lblNode.startIndex, lblNode.endIndex);
        if (lbl === labelName) return true;
      }
    }
    if (anyGotoTo(n.namedChildren, labelName, source)) return true;
  }
  return false;
}

// Function-body emit with forward-goto lowering. Wraps each forward-target
// label's preceding statements in a labeled JS block; emits the labeled
// statement itself as `;`. The companion change in `emitStatement` for
// `goto_statement` checks `ctx.openLabels` and emits `break LABEL` for
// labels currently in scope (i.e. ones whose labeled-block wrapper is open).
function emitFunctionBody(bodyNode, ctx) {
  const labelIdxs = ctx.compoundLabels.get(bodyNode.id) || [];
  // Function body: hoist declarations OUT of any labeled-block wrappers so
  // their `let` bindings remain visible after the blocks close.
  return emitWrappedCompound(bodyNode, ctx, labelIdxs, /* hoistDecls */ true);
}

// Emit a compound_statement with labeled-block wrappers applied.
// `labelIdxs` is the list of `{idx, name}` from ctx.compoundLabels for this
// compound (may be empty).
function emitWrappedCompound(compound, ctx, labelIdxs, hoistDecls) {
  const children = compound.namedChildren.filter(c => c.type !== "comment");
  let firstNonDecl = 0;
  if (hoistDecls) {
    while (firstNonDecl < children.length && children[firstNonDecl].type === "declaration") {
      firstNonDecl++;
    }
  }
  const lines = [];
  for (let i = 0; i < firstNonDecl; i++) {
    const s = emitStatement(children[i], ctx);
    if (s) lines.push(s);
  }
  // Open labeled blocks in reverse-position order so the latest-position
  // label becomes the outermost. Push labels onto the open-label stack so
  // descendant gotos resolve to `break LABEL`.
  const reversed = [...labelIdxs].reverse();
  for (const { name } of reversed) {
    lines.push(`${name}: {`);
    ctx.openLabels.push(name);
  }
  let openHere = labelIdxs.map(l => l.name);
  for (let i = firstNonDecl; i < children.length; i++) {
    const labelHere = labelIdxs.find(l => l.idx === i);
    if (labelHere) {
      // Close the corresponding labeled block (innermost match on the stack).
      const popIdx = openHere.lastIndexOf(labelHere.name);
      if (popIdx >= 0) {
        lines.push("}");
        openHere.splice(popIdx, 1);
        // Pop the matching name from ctx.openLabels (LIFO of just-pushed).
        const stackIdx = ctx.openLabels.lastIndexOf(labelHere.name);
        if (stackIdx >= 0) ctx.openLabels.splice(stackIdx, 1);
      }
      // Emit the labeled_statement's wrapped statement without re-emitting
      // the label (label was already opened above).
      const stmtNode = children[i].namedChildren[1];
      const inner = stmtNode ? emitStatement(stmtNode, ctx) : "";
      if (inner && inner !== ";" && !/^\s*$/.test(inner)) lines.push(inner);
      continue;
    }
    const s = emitStatement(children[i], ctx);
    if (s) lines.push(s);
  }
  while (openHere.length) {
    lines.push("}");
    const name = openHere.pop();
    const stackIdx = ctx.openLabels.lastIndexOf(name);
    if (stackIdx >= 0) ctx.openLabels.splice(stackIdx, 1);
  }
  return "{\n" + lines.map(l => l.split("\n").map(x => "  " + x).join("\n")).join("\n") + "\n}";
}

function renderHeader(ctx) {
  const lines = [];
  lines.push(`// Auto-translated from Ghidra C by tools/c-to-js/translate.js.`);
  lines.push(`// Source: decompiled/c/${(ctx.funcAddr || 0).toString(16)}.c`);
  lines.push(`// Edit by hand only after diff-test passes — re-running the translator will overwrite.`);
  lines.push("");
  lines.push(`/** @typedef {import("../../runtime/heap.js").Heap} Heap */`);
  lines.push("");
  if (ctx.imports.size > 0) {
    lines.push(`import { ${[...ctx.imports].sort().join(", ")} } from "../../runtime/win32.js";`);
  }
  if (ctx.builtins.size > 0) {
    lines.push(`import { ${[...ctx.builtins].sort().join(", ")} } from "../../runtime/ghidra-builtins.js";`);
  }
  if (ctx.usesCallIndirect) {
    lines.push(`import { callIndirect } from "../../runtime/win32/context.js";`);
  }
  if (ctx.usesRegs) {
    lines.push(`import { regs } from "../../runtime/regs.js";`);
  }
  if (ctx.callsFun.size > 0) {
    const calls = [...ctx.callsFun].sort();
    for (const c of calls) {
      // Skip self-references — the function is already defined in this file.
      if (c === ctx.funcName) continue;
      // Each callee lives in ported/<addr>.js (one-per-file convention).
      // Strip leading zeros to match decompiled/c/<unpadded>.c naming.
      const addr = parseInt(c.replace(/^FUN_/, ""), 16).toString(16);
      lines.push(`import { ${c} } from "./${addr}.js";`);
    }
  }
  return lines.join("\n");
}

// ---- Emit functions ----

function emitFunction(node, ctx) {
  // function_definition has children: type, declarator, body
  const declarator = node.childForFieldName("declarator");
  const body = node.childForFieldName("body");
  const fnDeclarator = findChild(declarator, "function_declarator") || declarator;
  const nameNode = fnDeclarator.childForFieldName("declarator");
  const ghidraName = text(nameNode, ctx);
  // Force-name to FUN_<padded-hex> when caller provided an address. This
  // prevents collisions with Win32 / Ghidra-builtin names that Ghidra picked
  // up as function identifiers (RtlUnwind, _strlen, etc.).
  let name;
  if (typeof ctx.forceAddr === "number") {
    ctx.funcAddr = ctx.forceAddr;
    name = `FUN_${ctx.forceAddr.toString(16).padStart(8, "0")}`;
  } else {
    name = ghidraName;
    const m = /^FUN_([0-9a-fA-F]+)$/.exec(name);
    if (m) ctx.funcAddr = parseInt(m[1], 16);
  }
  ctx.funcName = name;
  // Collect param names (so we recognize them as local references)
  const params = fnDeclarator.childForFieldName("parameters");
  const paramList = collectParams(params, ctx);
  for (const p of paramList) ctx.paramNames.add(p);

  // Pre-pass: discover heap-backed locals (address-taken + arrays + addr-taken params).
  const addrTaken = findAddressTakenLocals(body, ctx.source);
  const arrays = findArrayLocals(body, ctx.source);
  const structAccess = findStructAccess(body, ctx.source);  // names with .field
  // Allocate stack-frame offsets. Arrays use their declared size; struct-accessed
  // locals get a generous 128-byte slot (covers all common Win32 structs);
  // pure address-taken scalars use 4.
  let offset = 0;
  // Address-taken parameters need a heap slot too — caller passes by value, we
  // copy into the slot so callees can read/write it.
  ctx.addrTakenParams = new Set();
  for (const name of addrTaken) {
    if (ctx.paramNames.has(name)) {
      ctx.addrTakenParams.add(name);
      ctx.heapLocals.set(name, { offset, size: 4, isArray: false });
      offset += 4;
      continue;
    }
    let size, isArray;
    if (arrays.has(name)) { size = arrays.get(name); isArray = true; }
    else if (structAccess.has(name)) { size = 128; isArray = false; }
    else { size = 4; isArray = false; }
    ctx.heapLocals.set(name, { offset, size, isArray });
    offset += (size + 3) & ~3;
  }
  // Arrays not explicitly &-taken may still decay to a pointer.
  for (const [name, size] of arrays) {
    if (ctx.heapLocals.has(name)) continue;
    if (ctx.paramNames.has(name)) continue;
    ctx.heapLocals.set(name, { offset, size, isArray: true });
    offset += (size + 3) & ~3;
  }

  // Stack-frame aliasing for Ghidra-named `local_<hex>` variables. Ghidra
  // names stack locals by their offset from the frame top — `local_470` and
  // `local_46c` are at offsets that share the same physical storage (the
  // smaller hex value is at a HIGHER address, i.e. inside `local_470`'s
  // memory if local_470 names a struct). When the binary memsets `local_470`
  // and then writes to `local_46c`, the write must land inside the same
  // heap region, otherwise structures passed to APIs (DDSURFACEDESC, etc.)
  // are silently empty.
  //
  // If any `local_<hex>` is heap-backed (address-taken or array), find the
  // largest offset (= the bottom-of-frame anchor), and re-home every other
  // `local_<hex>` to live inside that anchor's heap region at the
  // appropriate sub-offset. Other locals (not `local_<hex>`) are unaffected.
  const localHexNodes = collectAllLocalHexDecls(body, ctx.source);
  let anchorName = null, anchorX = -1, anchorOffset = -1;
  for (const [name, x] of localHexNodes) {
    if (ctx.heapLocals.has(name) && x > anchorX) {
      anchorName = name;
      anchorX = x;
      anchorOffset = ctx.heapLocals.get(name).offset;
    }
  }
  if (anchorName !== null) {
    // Grow the anchor's heap region so it covers all overlapping local_X.
    const anchorInfo = ctx.heapLocals.get(anchorName);
    let maxEnd = anchorInfo.offset + anchorInfo.size;
    for (const [name, x] of localHexNodes) {
      if (name === anchorName) continue;
      if (x > anchorX) continue;  // outside anchor's frame
      const subOff = anchorOffset + (anchorX - x);
      const sz = arrays.get(name) || 4;
      const end = subOff + ((sz + 3) & ~3);
      if (end > maxEnd) maxEnd = end;
      // If this local was previously assigned its own heap slot, we want
      // it to alias the anchor instead. Overwrite its heapLocals entry.
      ctx.heapLocals.set(name, { offset: subOff, size: sz, isArray: arrays.has(name) });
    }
    // Resize the anchor so we don't underestimate the frame.
    anchorInfo.size = Math.max(anchorInfo.size, maxEnd - anchorOffset);
    if (anchorOffset + anchorInfo.size > offset) offset = anchorOffset + anchorInfo.size;
  }
  ctx.frameSize = offset;

  // Pre-pass: identify forward gotos at any nesting depth, recording per-
  // compound the labels to wrap and the union of all forward-label names.
  // ctx.openLabels is the live stack of currently-open labeled-block
  // wrappers, consulted by the `goto_statement` emit to choose `break`.
  const fwd = collectForwardLabels(body, ctx.source);
  ctx.forwardLabels = fwd.forwardLabels;
  ctx.compoundLabels = fwd.compoundLabels;
  ctx.openLabels = [];

  // Function signature uses our (possibly forced) FUN_<addr> name. Keep
  // the original parameter names — those came from Ghidra and don't collide.
  const sig = `export function ${ctx.funcName}(heap${paramList.length ? ", " + paramList.join(", ") : ""}) `;
  let bodyJs = ctx.forwardLabels.size > 0
    ? emitFunctionBody(body, ctx)
    : emitBlock(body, ctx);
  // Tail-call propagation: every `<call>(...);\n  return;` becomes
  // `return <call>(...);`. Ghidra emits void-returning C for any function
  // whose return value isn't *visibly* used inside the function, but the
  // x86 ABI still leaves the last call's result in EAX — and *callers*
  // routinely read it (e.g. FUN_009bb4b4 returns via EAX even though Ghidra
  // typed it `void`). Without this rewrite, those callers see undefined and
  // the boot path takes its error branch.
  // Walks the body matching `IDENT(...);\s*return;` pairs with balanced
  // parentheses, replacing each with `return IDENT(...);`. Safe because:
  //   - the call still happens
  //   - existing `return X;` (with a value) is untouched
  //   - the only behavioural change is the function returns the call's
  //     value instead of undefined, matching x86 ABI semantics
  bodyJs = promoteTrailingCallsToReturns(bodyJs);
  // Ghidra emits `return CONCAT44(in_EDX, in_EAX)` when it can't recover
  // the return value of a function — meaning the binary returns whatever
  // EAX:EDX held at function exit (typically the result of the last sub-call,
  // since x86 cdecl/stdcall leaves return values in EAX). With our zero-init
  // of `in_*` locals, the literal translation always returns 0, which most
  // callers treat as failure. Return 1 instead so success-by-default callers
  // proceed. Match the exact pattern only — any function that does compute
  // a value still uses its explicit return.
  bodyJs = bodyJs.replace(/return CONCAT44\(in_EDX, in_EAX\)/g, "return 1");
  // Register-arg propagation: callees that read `in_<REG>`/`unaff_<REG>`
  // initialize the local from the corresponding `regs.*` cell. See
  // runtime/regs.js for the model. `unaff_*` and `in_*` are equivalent
  // for our purposes — both name a register live on entry.
  //
  // Replacement is a textual swap of `let <name> = 0;` (Ghidra's exact
  // declaration form) → `let <name> = regs.<reg>... ;`.
  const REG_INITS = [
    // 32-bit
    ["EAX", "regs.eax >>> 0"], ["EBX", "regs.ebx >>> 0"],
    ["ECX", "regs.ecx >>> 0"], ["EDX", "regs.edx >>> 0"],
    ["ESI", "regs.esi >>> 0"], ["EDI", "regs.edi >>> 0"],
    ["EBP", "regs.ebp >>> 0"],
    // 16-bit (low word)
    ["AX",  "regs.eax & 0xffff"], ["BX",  "regs.ebx & 0xffff"],
    ["CX",  "regs.ecx & 0xffff"], ["DX",  "regs.edx & 0xffff"],
    ["SI",  "regs.esi & 0xffff"], ["DI",  "regs.edi & 0xffff"],
    ["BP",  "regs.ebp & 0xffff"],
    // 8-bit low / high
    ["AL",  "regs.eax & 0xff"], ["AH",  "(regs.eax >>> 8) & 0xff"],
    ["BL",  "regs.ebx & 0xff"], ["BH",  "(regs.ebx >>> 8) & 0xff"],
    ["CL",  "regs.ecx & 0xff"], ["CH",  "(regs.ecx >>> 8) & 0xff"],
    ["DL",  "regs.edx & 0xff"], ["DH",  "(regs.edx >>> 8) & 0xff"],
    // Flags
    ["ZF",  "regs.zf | 0"], ["CF",  "regs.cf | 0"],
  ];
  for (const [reg, init] of REG_INITS) {
    // Note: we do NOT propagate `extraout_*` here — those are register
    // values AFTER a sub-call returned, and approximating them as
    // entry-state is wrong when the sub-call genuinely modifies the
    // register. Defer to a future pass that re-reads regs.* after each call.
    for (const prefix of ["in_", "unaff_"]) {
      const decl = `let ${prefix}${reg} = 0;`;
      if (bodyJs.includes(decl)) {
        bodyJs = bodyJs.split(decl).join(`let ${prefix}${reg} = ${init};`);
        ctx.usesRegs = true;
      }
    }
  }
  if (ctx.frameSize === 0) {
    return sig + bodyJs + "\n";
  }
  // Wrap body in stack-frame allocation/deallocation. Address-taken parameters
  // get their initial value copied onto the frame so callees see the latest.
  const addrLines = [...ctx.heapLocals.entries()]
    .map(([n, info]) => `  const __addr_${n} = __sp + ${info.offset};`)
    .join("\n");
  const paramCopyLines = [...ctx.addrTakenParams]
    .map(n => `  heap.setU32(__addr_${n}, (${n}) >>> 0);`)
    .join("\n");
  const wrapper = `{
  const __sp = heap.allocFrame(${ctx.frameSize});
${addrLines}
${paramCopyLines ? paramCopyLines + "\n" : ""}  try ${bodyJs} finally {
    heap.freeFrame(${ctx.frameSize});
  }
}`;
  return sig + wrapper + "\n";
}

function collectParams(paramsNode, ctx) {
  const out = [];
  if (!paramsNode) return out;
  for (const child of paramsNode.namedChildren) {
    if (child.type !== "parameter_declaration") continue;
    const declNode = child.childForFieldName("declarator");
    if (!declNode) continue;     // (void) — no name
    // declarator may be a pointer_declarator; descend to find the identifier
    const id = findIdentifier(declNode);
    if (!id) continue;
    const name = text(id, ctx);
    out.push(name);
    // If parameter is `T *name`, register the pointee width so pointer
    // arithmetic in the body scales `name + N` to `name + N*sizeof(T)`
    // — same behaviour as for local-variable pointer declarations. Without
    // this, dword-stride loops in string functions (`uint *p; p = p + 1;`)
    // stride by 1 byte instead of 4, becoming infinite re-reads of
    // overlapping bytes.
    if (declNode.type === "pointer_declarator") {
      const typeNode = child.childForFieldName("type");
      const typeText = typeNode ? text(typeNode, ctx) : "";
      const acc = pointeeAccForDeclTop(declNode, typeText);
      if (acc) ctx.varPointee.set(name, acc);
    }
  }
  return out;
}

function findIdentifier(node) {
  if (!node) return null;
  if (node.type === "identifier") return node;
  for (const c of node.namedChildren) {
    const r = findIdentifier(c);
    if (r) return r;
  }
  return null;
}

function emitBlock(node, ctx) {
  // If this compound has forward labels assigned to it, route through the
  // labeled-block wrapper so nested gotos lower to `break LABEL`.
  if (ctx.compoundLabels && ctx.compoundLabels.has(node.id)) {
    return emitWrappedCompound(node, ctx, ctx.compoundLabels.get(node.id), /* hoistDecls */ false);
  }
  const lines = [];
  for (const child of node.namedChildren) {
    if (child.type === "comment") continue;
    const s = emitStatement(child, ctx);
    if (s) lines.push(s);
  }
  return "{\n" + lines.map(l => l.split("\n").map(x => "  " + x).join("\n")).join("\n") + "\n}";
}

function emitSwitchBody(node, ctx) {
  // Switch body is a compound_statement containing case_statement children.
  // tree-sitter-c shape: case_statement has the case value as its first named
  // child (a number_literal or expression), then the body statements follow.
  // For `default:` there's no value, only body statements.
  const lines = ["{"];
  for (const child of node.namedChildren) {
    if (child.type === "comment") continue;
    if (child.type === "case_statement") {
      const named = child.namedChildren.filter(c => c.type !== "comment");
      // Detect default vs case: tree-sitter-c marks default with no `value`
      // field. Check by looking at the leading token of the case_statement
      // (raw children include the keyword).
      const kw = child.firstChild ? child.firstChild.text : "case";
      let labelText, bodyStart;
      if (kw === "default") {
        labelText = "default:";
        bodyStart = 0;
      } else {
        labelText = `case ${emitExpr(named[0], ctx)}:`;
        bodyStart = 1;
      }
      lines.push("  " + labelText);
      for (let i = bodyStart; i < named.length; i++) {
        const sub = named[i];
        const stmtJs = emitStatement(sub, ctx);
        if (stmtJs) {
          for (const line of stmtJs.split("\n")) lines.push("    " + line);
        }
      }
    } else {
      const stmtJs = emitStatement(child, ctx);
      if (stmtJs) {
        for (const line of stmtJs.split("\n")) lines.push("  " + line);
      }
    }
  }
  lines.push("}");
  return lines.join("\n");
}

function emitStatement(node, ctx) {
  switch (node.type) {
    case "compound_statement": return emitBlock(node, ctx);
    case "expression_statement": {
      // single expression followed by ';'
      const expr = node.namedChildren.find(c => c.type !== "comment");
      if (!expr) return "";
      return emitExpr(expr, ctx) + ";";
    }
    case "declaration": return emitDeclaration(node, ctx);
    case "if_statement": {
      const cond = node.childForFieldName("condition");
      const conseq = node.childForFieldName("consequence");
      const alt = node.childForFieldName("alternative");
      let s = `if (${emitExpr(unwrapParens(cond), ctx)}) ${ensureBlock(emitStatement(conseq, ctx))}`;
      if (alt) {
        // alt may be the statement itself, or an else_clause wrapper
        const altInner = alt.type === "else_clause"
          ? (alt.namedChildren.find(c => c.type !== "comment") || alt)
          : alt;
        s += ` else ${ensureBlock(emitStatement(altInner, ctx))}`;
      }
      return s;
    }
    case "else_clause": {
      const child = node.namedChildren.find(c => c.type !== "comment");
      return child ? emitStatement(child, ctx) : "";
    }
    case "while_statement": {
      const cond = node.childForFieldName("condition");
      const body = node.childForFieldName("body");
      return `while (${emitExpr(unwrapParens(cond), ctx)}) ${ensureBlock(emitStatement(body, ctx))}`;
    }
    case "do_statement": {
      const cond = node.childForFieldName("condition");
      const body = node.childForFieldName("body");
      return `do ${ensureBlock(emitStatement(body, ctx))} while (${emitExpr(unwrapParens(cond), ctx)});`;
    }
    case "for_statement": {
      // tree-sitter-c exposes init/condition/update/body as named children but
      // not always via field names — walk children in order and identify them.
      const init = node.childForFieldName("initializer");
      const cond = node.childForFieldName("condition");
      const upd  = node.childForFieldName("update");
      const body = node.childForFieldName("body");
      const initText = init
        ? (init.type === "declaration" ? emitDeclaration(init, ctx).replace(/;$/, "") : emitExpr(init, ctx))
        : "";
      const condText = cond ? emitExpr(cond, ctx) : "";
      // For-loop update runs every iteration. Wrap assignment RHS to enforce
      // C uint32 wrap (JS Numbers don't truncate on overflow, so a `for (X =
      // 0xffffffff; X != 0; X = X + 1)` loop becomes infinite).
      let updText = upd ? emitExpr(upd, ctx) : "";
      if (upd && upd.type === "assignment_expression") {
        // Only wrap simple `IDENT = EXPR` (not `+=`, not heap.setU*).
        const m = updText.match(/^([_A-Za-z][\w]*)\s*=\s*(.+)$/);
        if (m) updText = `${m[1]} = (${m[2]}) >>> 0`;
      }
      return `for (${initText}; ${condText}; ${updText}) ${ensureBlock(emitStatement(body, ctx))}`;
    }
    case "switch_statement": {
      const cond = node.childForFieldName("condition");
      const body = node.childForFieldName("body");
      return `switch (${emitExpr(unwrapParens(cond), ctx)}) ${emitSwitchBody(body, ctx)}`;
    }
    case "labeled_statement": {
      // `label: stmt` — JS supports labels too. The label is always the first
      // named child (a statement_identifier); the wrapped statement follows.
      // Tree-sitter-c will produce an EMPTY expression_statement child when
      // the label sits at the end of a block. Detect that and emit a no-op.
      const children = node.namedChildren.filter(c => c.type !== "comment");
      const labelNode = children[0];
      const stmtNode = children[1];
      const labelText = labelNode ? text(labelNode, ctx) : "L";
      let inner = stmtNode ? emitStatement(stmtNode, ctx) : "";
      if (!inner || inner === ";" || /^\s*$/.test(inner)) inner = ";";
      return `${labelText}: ${inner}`;
    }
    case "goto_statement": {
      const labelNode = node.childForFieldName("label") || node.namedChildren[0];
      const labelName = text(labelNode, ctx);
      // Forward gotos at any nesting depth lower to `break LABEL` when a
      // labeled-block wrapper for LABEL is currently open (see
      // emitWrappedCompound / collectForwardLabels). The open-label stack
      // tracks which wrappers are live at this emit point; if LABEL isn't
      // open, the goto is either backward or to a label in a non-ancestor
      // scope — fall through to the early-return fallback.
      if (ctx.openLabels && ctx.openLabels.includes(labelName)) {
        return `break ${labelName};`;
      }
      // Backward / cross-scope gotos: we don't model them yet. Emit an
      // early-return so the function bails gracefully instead of throwing
      // and aborting the whole tick. Logged once via globalThis to surface
      // which sites need real lowering.
      return `/* goto ${labelName} — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("${ctx.funcName}/${labelName}"); return 0;`;
    }
    case "return_statement": {
      const expr = node.namedChildren.find(c => c.type !== "comment");
      return expr ? `return ${emitExpr(expr, ctx)};` : `return;`;
    }
    case "break_statement": return "break;";
    case "continue_statement": return "continue;";
    case "comment": return "";
    default:
      throw new Error(`unsupported statement: ${node.type} — ${text(node, ctx).slice(0, 60)}`);
  }
}

function emitDeclaration(node, ctx) {
  // declaration: type [pointer_declarator | init_declarator | identifier]+ ';'
  const decls = [];
  // Capture the declaration's type once — every declarator on this line
  // shares it. Used to remember pointed-to width for `arr[i]` subscripts.
  let typeText = "";
  for (const child of node.namedChildren) {
    if (child.type === "primitive_type" || child.type === "sized_type_specifier" ||
        child.type === "type_identifier") {
      typeText = text(child, ctx).trim();
      break;
    }
  }
  // Count nested pointer_declarator depth so we distinguish `T *p` (1 star)
  // from `T **pp` (2 stars). Element width for double-pointer is u32.
  function pointerDepth(declNode) {
    let d = 0, cur = declNode;
    while (cur && cur.type === "pointer_declarator") { d++; cur = cur.childForFieldName("declarator"); }
    return d;
  }
  function pointeeAccForDecl(declNode, typeText) {
    if (!typeText) return null;
    const depth = pointerDepth(declNode);
    if (depth >= 2) return "u32";  // pointer-to-pointer → element is pointer
    return pointerCastToAccessor(typeText);
  }
  // Sub-DWORD type for non-pointer locals — used to mask assignments so
  // `ushort uVar = DAT_xxx` doesn't carry the upper 16 bits of an u32 read.
  // Detected here, applied by emitAssignment via ctx.varNarrowMask.
  let narrowMask = null;
  if (/^(byte|char|uchar|undefined1|BYTE|CHAR|bool)$/.test(typeText)) narrowMask = "& 0xff";
  else if (/^(short|ushort|undefined2|SHORT|USHORT|WORD|wchar_t)$/.test(typeText)) narrowMask = "& 0xffff";
  for (const child of node.namedChildren) {
    if (child.type === "init_declarator") {
      const decl = child.childForFieldName("declarator");
      const value = child.childForFieldName("value");
      const id = findIdentifier(decl);
      if (id) {
        const name = text(id, ctx);
        ctx.locals.add(name);
        // If declarator is a pointer_declarator, this variable holds a pointer
        // — record the pointed-to width so subscript reads use the right accessor.
        if (decl && decl.type === "pointer_declarator") {
          const acc = pointeeAccForDecl(decl, typeText);
          if (acc) ctx.varPointee.set(name, acc);
        } else if (narrowMask) {
          ctx.varNarrowMask.set(name, narrowMask);
        }
        if (ctx.heapLocals.has(name)) {
          if (value) {
            decls.push(`heap.setU32(__addr_${name}, (${emitExpr(value, ctx)}) >>> 0);`);
          }
        } else {
          let initExpr = value ? emitExpr(value, ctx) : "0";
          if (value && narrowMask) initExpr = `(${initExpr}) ${narrowMask}`;
          decls.push(`let ${name} = ${initExpr};`);
        }
      }
    } else if (child.type === "identifier"
            || child.type === "pointer_declarator"
            || child.type === "array_declarator") {
      const id = child.type === "identifier" ? child : findIdentifier(child);
      if (id) {
        const name = text(id, ctx);
        // `extraout_<REG>` declarations: skip only when the use-site lowering
        // has a matching entry in EXTRAOUT_READ (i.e., byte-width regs).
        // Wider regs keep the legacy `let extraout_X = 0;` binding.
        const _extra = /^extraout_([A-Z]{2,3})$/.exec(name);
        if (_extra && EXTRAOUT_READ[_extra[1]]) continue;
        ctx.locals.add(name);
        if (child.type === "pointer_declarator") {
          const acc = pointeeAccForDecl(child, typeText);
          if (acc) ctx.varPointee.set(name, acc);
        } else if (narrowMask) {
          ctx.varNarrowMask.set(name, narrowMask);
        }
        if (!ctx.heapLocals.has(name)) {
          decls.push(`let ${name} = 0;`);
        }
      }
    }
  }
  return decls.join("\n");
}

// ---- Expressions ----

function emitExpr(node, ctx) {
  if (!node) return "";
  switch (node.type) {
    case "parenthesized_expression":
      return `(${emitExpr(node.namedChildren[0], ctx)})`;
    case "identifier":
      return emitIdentifier(node, ctx);
    case "ERROR": {
      // Ghidra emits the literal token `ERROR` when it failed to decompile a
      // sub-expression. Emit a runtime throw so the function fails loudly if
      // the path is exercised; everything else can still translate.
      return `(function(){ throw new Error("ghidra-decompile ERROR at ${ctx.funcName}"); })()`;
    }
    case "number_literal":
      return text(node, ctx);
    case "char_literal": {
      // Convert C char literal to its numeric code so comparisons work in
      // JS (where `0 == '\0'` is false because '\0' coerces to NaN).
      const t = text(node, ctx);
      // Strip outer quotes; handle escapes.
      const inner = t.slice(1, -1);
      let code;
      if (inner.length === 1) code = inner.charCodeAt(0);
      else if (inner === "\\0") code = 0;
      else if (inner === "\\n") code = 10;
      else if (inner === "\\r") code = 13;
      else if (inner === "\\t") code = 9;
      else if (inner === "\\b") code = 8;
      else if (inner === "\\f") code = 12;
      else if (inner === "\\v") code = 11;
      else if (inner === "\\a") code = 7;
      else if (inner === "\\?") code = 63;
      else if (inner === "\\\\") code = 92;
      else if (inner === "\\'") code = 39;
      else if (inner === "\\\"") code = 34;
      else if (inner.startsWith("\\x") || inner.startsWith("\\X")) code = parseInt(inner.slice(2), 16);
      else if (inner.startsWith("\\") && /^\\[0-7]+$/.test(inner)) code = parseInt(inner.slice(1), 8);
      else if (inner.startsWith("\\")) code = inner.charCodeAt(1) || 0;
      else code = inner.charCodeAt(0) || 0;
      return String(code);
    }
    case "string_literal":
      return text(node, ctx);
    case "true":  return "true";
    case "false": return "false";
    case "null":  return "0";
    case "binary_expression": return emitBinary(node, ctx);
    case "unary_expression":  return emitUnary(node, ctx);
    case "update_expression": return emitUpdate(node, ctx);
    case "assignment_expression": return emitAssignment(node, ctx);
    case "call_expression":   return emitCall(node, ctx);
    case "cast_expression":   return emitCast(node, ctx);
    case "pointer_expression": return emitPointer(node, ctx);  // *p, &v
    case "subscript_expression": return emitSubscript(node, ctx);
    case "field_expression":  return emitField(node, ctx);
    case "conditional_expression": {
      const cond = node.childForFieldName("condition");
      const conseq = node.childForFieldName("consequence");
      const alt = node.childForFieldName("alternative");
      return `(${emitExpr(cond, ctx)} ? ${emitExpr(conseq, ctx)} : ${emitExpr(alt, ctx)})`;
    }
    case "comma_expression":
      return node.namedChildren.map(c => emitExpr(c, ctx)).join(", ");
    case "sizeof_expression":
      throw new Error("sizeof not yet supported");
    case "compound_literal_expression":
      throw new Error("compound literal not yet supported");
    default:
      throw new Error(`unsupported expr: ${node.type} — ${text(node, ctx).slice(0, 60)}`);
  }
}

function emitIdentifier(node, ctx) {
  const name = text(node, ctx);
  // `extraout_<REG>` — Ghidra's name for "register state AFTER a sub-call
  // returned at this source position". Lower to an inline regs.* read so
  // each use reflects the most-recent register state (regs.eax is
  // automatically captured per call; other regs come from caller-side
  // post-call propagation, see Stage 2). Without this lowering the
  // declaration `let extraout_X = 0;` makes every read return 0,
  // dropping critical data flow (e.g. FUN_0045abea reads extraout_CH
  // to populate the sprite-table active index DAT_008d7eb6).
  const extra = /^extraout_([A-Z]{2,3})$/.exec(name);
  if (extra) {
    const reg = extra[1];
    const expr = EXTRAOUT_READ[reg];
    if (expr) {
      ctx.usesRegs = true;
      return expr;
    }
    // Wider register: keep the legacy "always 0" semantics. The original
    // declaration `let extraout_X = 0;` will still be emitted (skipped
    // only when EXTRAOUT_READ has a matching entry).
  }
  // Heap-backed local (address-taken or array) — read from heap.
  if (ctx.heapLocals.has(name)) {
    const info = ctx.heapLocals.get(name);
    // Arrays decay to a pointer (the address); scalars yield their value.
    return info.isArray ? `__addr_${name}` : `heap.u32(__addr_${name})`;
  }
  // Local / param — leave untouched
  if (ctx.locals.has(name) || ctx.paramNames.has(name)) return name;
  // DAT_<hex>_<width> — Ghidra's typed sub-DWORD global. _2 = u16, _1 = u8.
  // (Recognise this BEFORE the bare DAT_<hex> match so the suffix isn't lost.)
  let m = /^_?DAT_([0-9a-fA-F]+)_(\d+)$/.exec(name);
  if (m) {
    const addr = `0x${m[1]}`;
    const width = parseInt(m[2], 10);
    return width === 1 ? `heap.u8(${addr})`
         : width === 2 ? `heap.u16(${addr})`
         : `heap.u32(${addr})`;
  }
  // DAT_<hex> or _DAT_<hex> — global memory at that address. Default to
  // 32-bit unless the global pre-pass identified this address as a
  // byte-sized DAT (see scan-char-dats.js — built from char-literal
  // comparisons + adjacency).
  m = /^_?DAT_([0-9a-fA-F]+)$/.exec(name);
  if (m) {
    const padded = m[1].toLowerCase().padStart(8, "0");
    if (ctx.charDats && ctx.charDats.has(padded)) return `heap.u8(0x${m[1]})`;
    return `heap.u32(0x${m[1]})`;
  }
  // s_..._<hex> — string literal global; treat as a pointer (the address).
  m = /_([0-9a-fA-F]{6,8})$/.exec(name);
  if (m && /^s_/.test(name)) return `0x${m[1]}`;
  // PTR_<hex> — pointer table entry. Treat as u32 read.
  m = /^PTR_[A-Za-z0-9_]*_([0-9a-fA-F]+)$/.exec(name);
  if (m) return `heap.u32(0x${m[1]})`;
  // FUN_<hex> referenced as a value (function pointer). Emit the integer
  // RVA, not the JS function name — the binary stores function pointers in
  // memory and dispatches via callIndirect, which looks the address up in
  // state.fnDispatch. Returning the JS reference would make `(FUN_xxx) >>> 0`
  // collapse to 0 (Number(jsFn) is NaN, NaN >>> 0 = 0), zeroing every
  // function-pointer table the binary writes.
  m = /^FUN_([0-9a-fA-F]+)$/.exec(name);
  if (m) return `0x${m[1]}`;
  // LAB_<hex> — a code-label address constant (jump-table entry).
  m = /^LAB_([0-9a-fA-F]+)$/.exec(name);
  if (m) return `0x${m[1]}`;
  // UNK_<hex> — uninitialised data slot at that address. Treat like DAT_.
  m = /^UNK_([0-9a-fA-F]+)$/.exec(name);
  if (m) return `heap.u32(0x${m[1]})`;
  // Ghidra pseudo-functions (CONCAT*, CARRY*, SBORROW*, SCARRY*, etc.) come
  // from a separate runtime module so the Win32 surface stays clean.
  if (GHIDRA_BUILTINS.has(name)) {
    ctx.builtins.add(name);
    return name;
  }
  // Width-meaningful type names that leaked through (typedef tracking
  // failed). They should have been consumed by emitCast/emitCall/emitBinary
  // — appearing here means the parse went a way we didn't anticipate. Emit
  // a benign placeholder rather than fail the whole module load; diff-test
  // will catch the semantic regression.
  if (WIDTH_MEANINGFUL_TYPES.includes(name)) return "0";
  // Otherwise assume it's a Win32 import. Win32 names can be:
  //   - CamelCase: MessageBoxA, RegOpenKeyA
  //   - lowercase: timeGetTime, wsprintfA, mmioOpen
  //   - underscore-prefixed: _strlen, _mbsupr, _stricmp
  // Recognise any identifier that isn't a known local/param/builtin.
  if (/^_?[A-Za-z][A-Za-z0-9_]*$/.test(name)) {
    ctx.imports.add(name);
    return name;
  }
  // Fallback: emit as-is (some unrecognized symbol).
  return name;
}

// (T)X — narrow X to the width of T. JS has no implicit byte/short types,
// so we apply an explicit mask + sign-extend matching the C cast.
function emitCast(node, ctx) {
  const typeNode = node.childForFieldName("type");
  const valueNode = node.childForFieldName("value");
  const typeText = typeNode ? text(typeNode, ctx).trim() : "";
  const valueExpr = emitExpr(valueNode, ctx);
  // Strip pointer suffix and any leading qualifiers; we only care about the
  // numeric width and signedness.
  const isPtr = /[\*\[]/.test(typeText);
  if (isPtr) return valueExpr;
  const t = typeText.replace(/\s+/g, " ").trim();
  // Special case: `(char)DAT_xxxx` and similar — read directly at byte width.
  if (valueNode.type === "identifier") {
    const name = text(valueNode, ctx);
    const datMatch = /^_?DAT_([0-9a-fA-F]+)$/.exec(name);
    if (datMatch) {
      const addr = `0x${datMatch[1]}`;
      if (t === "char")          return `heap.i8(${addr})`;
      if (t === "byte" || t === "uchar" || t === "unsigned char" || t === "undefined1") return `heap.u8(${addr})`;
      if (t === "short")         return `heap.i16(${addr})`;
      if (t === "ushort" || t === "unsigned short" || t === "undefined2") return `heap.u16(${addr})`;
      // `(int)DAT_xxx` is a SIGNED 32-bit read. Without this, the translator
      // emits `heap.u32(addr) >>> 0` (unsigned), which makes comparisons like
      // `(int)DAT < 0x1df` fail when the byte stored is 0xfffffdbc (signed -580
      // → ~4.29B unsigned). Use the heap's signed-int accessor instead.
      if (t === "int" || t === "long" || t === "signed int" || t === "signed long") {
        return `heap.i32(${addr})`;
      }
      // `(uint)DAT_xxx` and `(undefined4)DAT_xxx` keep unsigned semantics.
      if (t === "uint" || t === "unsigned int" || t === "ulong" || t === "unsigned long" || t === "undefined4") {
        return `heap.u32(${addr})`;
      }
    }
  }
  // Otherwise, apply width-narrow + sign-extend on the value.
  if (t === "char")             return `((${valueExpr}) << 24 >> 24)`;
  if (t === "byte" || t === "uchar" || t === "unsigned char" || t === "undefined1") return `((${valueExpr}) & 0xff)`;
  if (t === "short")            return `((${valueExpr}) << 16 >> 16)`;
  if (t === "ushort" || t === "unsigned short" || t === "undefined2") return `((${valueExpr}) & 0xffff)`;
  if (t === "int" || t === "long" || t === "signed int" || t === "signed long") {
    // SIGNED 32-bit cast — C semantics treat the result as signed. Use `| 0`
    // (sign-extend) so comparisons like `(int)X < 0x1df` behave correctly
    // when X carries a value with the top bit set (e.g. 0xfffffdbc → -580
    // < 479 is TRUE, but unsigned 4294966716 < 479 is FALSE).
    return `((${valueExpr}) | 0)`;
  }
  if (t === "uint" || t === "unsigned int" ||
      t === "ulong" || t === "unsigned long" || t === "undefined4" ||
      t === "longlong" || t === "ulonglong") {
    // 32-bit unsigned width — JS Numbers wrap with `>>> 0`.
    return `((${valueExpr}) >>> 0)`;
  }
  // Unknown type — drop the cast (preserves prior behavior).
  return valueExpr;
}

function emitBinary(node, ctx) {
  const leftNode = node.childForFieldName("left");
  const rightNode = node.childForFieldName("right");
  let op = node.childForFieldName("operator").text;

  // Tree-sitter-c without typedef-tracking sometimes parses `(TYPE)*X` as a
  // binary multiplication `(TYPE) * X`. Detect this and reinterpret as a
  // typed dereference.
  if (op === "*" && leftNode && leftNode.type === "parenthesized_expression") {
    const innerLeft = leftNode.namedChildren[0];
    if (innerLeft && innerLeft.type === "identifier") {
      const typeName = text(innerLeft, ctx);
      if (WIDTH_MEANINGFUL_TYPES.includes(typeName)) {
        const rhs = emitExpr(rightNode, ctx);
        if (typeName === "char") return `heap.i8(${rhs})`;
        if (typeName === "byte" || typeName === "uchar" || typeName === "undefined1") return `heap.u8(${rhs})`;
        if (typeName === "short") return `heap.i16(${rhs})`;
        if (typeName === "ushort" || typeName === "undefined2") return `heap.u16(${rhs})`;
        if (typeName === "uint" || typeName === "undefined4") return `heap.u32(${rhs})`;
        return `heap.u32(${rhs})`;
      }
    }
  }

  const left = emitExpr(leftNode, ctx);
  const right = emitExpr(rightNode, ctx);
  // C `>>` on uint is logical (unsigned). Without strong type info, default to logical >>>
  // — Ghidra usually emits `>>` after producing uint locals, so this matches the common case.
  if (op === ">>") op = ">>>";
  // Pointer arithmetic: if LHS is a typed-pointer local (`T *p`), then `p + N`
  // means `address-of-p + N * sizeof(T)`. Translator otherwise produces a raw
  // byte add, miscomputing the destination by sizeof(T)-1 each step. Only
  // scales when LHS is a bare identifier (a cast like `(int)p + 1` strips
  // pointer-ness in C and intentionally adds raw bytes).
  if ((op === "+" || op === "-") && leftNode.type === "identifier") {
    const leftName = text(leftNode, ctx);
    const acc = ctx.varPointee.get(leftName);
    if (acc) {
      const elemSize = (acc === "u8" || acc === "i8") ? 1
                     : (acc === "u16" || acc === "i16") ? 2 : 4;
      if (elemSize !== 1) return `${left} ${op} ((${right}) * ${elemSize})`;
    }
  }
  // Comparisons against negative literals. Our locals are wrapped to unsigned 32-bit
  // via `>>> 0` after most expressions, so `iVar != -1` (when iVar carries 0xffffffff)
  // is always true in JS. Sign-extend the non-literal side with `| 0` so the comparison
  // matches C's signed-int semantics. `heap.i32`/`i16`/`i8` already return signed
  // values; `| 0` is a no-op for them. For unsigned values stored as 0xffffffff,
  // `| 0` converts to -1, making the comparison correct.
  const COMPARE_OPS = ["==", "!=", "===", "!==", "<", "<=", ">", ">="];
  if (COMPARE_OPS.includes(op) && /^-\d+$/.test(right)) {
    return `(${left} | 0) ${op} ${right}`;
  }
  if (COMPARE_OPS.includes(op) && /^-\d+$/.test(left)) {
    return `${left} ${op} (${right} | 0)`;
  }
  // Logical-and / logical-or kept as `&&` / `||`.
  return `${left} ${op} ${right}`;
}

function emitUnary(node, ctx) {
  const op = node.childForFieldName("operator").text;
  const arg = emitExpr(node.childForFieldName("argument"), ctx);
  return `${op}${arg}`;
}

function emitUpdate(node, ctx) {
  // ++a or a++ etc.
  const op = node.firstChild.text;
  if (op === "++" || op === "--") {
    // prefix form
    if (node.firstChild.type === op) {
      return `${op}${emitExpr(node.namedChildren[0], ctx)}`;
    }
  }
  // suffix or other
  return text(node, ctx);
}

function emitAssignment(node, ctx) {
  const left = node.childForFieldName("left");
  const op = node.childForFieldName("operator").text;
  const right = emitExpr(node.childForFieldName("right"), ctx);
  // If LHS is DAT_xxx (with optional _<width> suffix), emit appropriately.
  if (left.type === "identifier") {
    const name = text(left, ctx);
    // DAT_<hex>_<width> — typed sub-DWORD write
    let m = /^_?DAT_([0-9a-fA-F]+)_(\d+)$/.exec(name);
    if (m) {
      const addr = `0x${m[1]}`;
      const width = parseInt(m[2], 10);
      const setFn = width === 1 ? "setU8" : width === 2 ? "setU16" : "setU32";
      const readFn = width === 1 ? "u8" : width === 2 ? "u16" : "u32";
      const mask = width === 1 ? "0xff" : width === 2 ? "0xffff" : "0xffffffff";
      if (op === "=") {
        return `heap.${setFn}(${addr}, (${right}) & ${mask})`;
      }
      const binop = op.slice(0, op.length - 1);
      const opMap = { ">>": ">>>" };
      const finalOp = opMap[binop] || binop;
      return `heap.${setFn}(${addr}, ((heap.${readFn}(${addr})) ${finalOp} (${right})) & ${mask})`;
    }
    m = /^_?DAT_([0-9a-fA-F]+)$/.exec(name);
    if (m) {
      // Default 32-bit, but use byte width if pre-pass identified this DAT
      // as char-sized (see scan-char-dats.js). Without this guard, setU32
      // to a char DAT spills 3 zero bytes into adjacent char DATs.
      const padded = m[1].toLowerCase().padStart(8, "0");
      const isByte = ctx.charDats && ctx.charDats.has(padded);
      const setFnD = isByte ? "setU8" : "setU32";
      const readFnD = isByte ? "u8" : "u32";
      const maskD = isByte ? "0xff" : "0xffffffff";
      const wrapD = isByte ? `& ${maskD}` : ">>> 0";
      // Compound op (e.g. += , |=) — compute RHS as full expr based on op.
      if (op === "=") {
        return `heap.${setFnD}(0x${m[1]}, (${right}) ${wrapD})`;
      }
      const binop = op.slice(0, op.length - 1); // strip '='
      const rread = `heap.${readFnD}(0x${m[1]})`;
      const opMap = { ">>": ">>>" };
      const finalOp = opMap[binop] || binop;
      return `heap.${setFnD}(0x${m[1]}, ((${rread}) ${finalOp} (${right})) ${wrapD})`;
    }
    // PTR_<targetname>_<addr> on LHS — write through to that address.
    m = /^PTR_[A-Za-z0-9_]*_([0-9a-fA-F]+)$/.exec(name);
    if (m) {
      if (op === "=") {
        return `heap.setU32(0x${m[1]}, (${right}) >>> 0)`;
      }
      const binop = op.slice(0, op.length - 1);
      const opMap = { ">>": ">>>" };
      const finalOp = opMap[binop] || binop;
      return `heap.setU32(0x${m[1]}, ((heap.u32(0x${m[1]})) ${finalOp} (${right})) >>> 0)`;
    }
    // Heap-backed local — write through the heap
    if (ctx.heapLocals.has(name)) {
      const addrJs = `__addr_${name}`;
      if (op === "=") {
        return `heap.setU32(${addrJs}, (${right}) >>> 0)`;
      }
      const binop = op.slice(0, op.length - 1);
      const opMap = { ">>": ">>>" };
      const finalOp = opMap[binop] || binop;
      return `heap.setU32(${addrJs}, ((heap.u32(${addrJs})) ${finalOp} (${right})) >>> 0)`;
    }
    // Ghidra SEH pseudo-globals (`ExceptionList`, `Arguments`) — assignments
    // to imports would throw "Assignment to constant variable" since ESM
    // imports are immutable. We don't model SEH, so writes are no-ops.
    if (GHIDRA_BUILTINS.has(name)) {
      return `void (${right}) /* assign to ${name} elided (SEH not modelled) */`;
    }
    // Local / param assignment — wrap with `>>> 0` to enforce uint32 wrap.
    // C uint counters routinely depend on overflow wrap (e.g. `for (X =
    // 0xffffffff; X != 0; X = X + 1)` — exits on wrap to 0). JS Numbers
    // don't truncate, so without this loops escape to infinity. Address
    // arithmetic stays correct because all VAs fit in 32-bit unsigned.
    // For sub-DWORD-typed locals (`ushort`, `byte`, …), narrow to the
    // declared width so comparisons against ushort sentinels (e.g. 0xffff)
    // behave like C and the value can't carry stale upper bits from a u32 read.
    const narrow = ctx.varNarrowMask.get(name);
    if (op === "=") {
      if (narrow) return `${name} = ((${right}) ${narrow})`;
      return `${name} = ((${right}) >>> 0)`;
    }
    // Compound ops: lower to plain `=` so we can apply the wrap.
    const binop = op.slice(0, op.length - 1);
    const opMap = { ">>": ">>>" };
    const finalOp = opMap[binop] || binop;
    if (narrow) return `${name} = ((${name} ${finalOp} (${right})) ${narrow})`;
    return `${name} = ((${name} ${finalOp} (${right})) >>> 0)`;
  }
  // Pointer dereference LHS: *expr = value
  // If inner is `(TYPE *)X`, narrow the write/read to TYPE's width.
  if (left.type === "pointer_expression" && left.firstChild && left.firstChild.text === "*") {
    const inner = left.namedChildren[0];
    let setFn = "setU32", getFn = "u32", mask = "0xffffffff";
    let valueExpr;
    if (inner.type === "cast_expression") {
      const typeNode = inner.childForFieldName("type");
      const valueNode = inner.childForFieldName("value");
      const typeText = typeNode ? text(typeNode, ctx).trim() : "";
      valueExpr = emitExpr(valueNode, ctx);
      const accessor = pointerCastToAccessor(typeText);
      if (accessor) {
        getFn = accessor;
        setFn = "set" + accessor[0].toUpperCase() + accessor.slice(1);
        mask = accessor === "u8" || accessor === "i8" ? "0xff"
             : accessor === "u16" || accessor === "i16" ? "0xffff"
             : "0xffffffff";
      }
    } else {
      valueExpr = emitExpr(inner, ctx);
    }
    if (op === "=") return `heap.${setFn}(${valueExpr}, (${right}) & ${mask})`;
    const binop = op.slice(0, op.length - 1);
    const opMap = { ">>": ">>>" };
    const finalOp = opMap[binop] || binop;
    return `heap.${setFn}(${valueExpr}, ((heap.${getFn}(${valueExpr})) ${finalOp} (${right})) & ${mask})`;
  }

  // Subscript LHS: a[i] = v — width tracks a's pointed-to type if known.
  if (left.type === "subscript_expression") {
    const arr = left.childForFieldName("argument");
    const idx = left.childForFieldName("index");
    let acc = "u32";
    if (arr.type === "identifier") {
      const name = text(arr, ctx);
      if (ctx.varPointee.has(name)) acc = ctx.varPointee.get(name);
    }
    if (arr.type === "cast_expression") {
      const typeNode = arr.childForFieldName("type");
      if (typeNode) {
        const t = pointerCastToAccessor(text(typeNode, ctx).trim());
        if (t) acc = t;
      }
    }
    const stride = acc === "u8" || acc === "i8" ? ""
                : acc === "u16" || acc === "i16" ? " * 2"
                : " * 4";
    const setFn = "set" + acc[0].toUpperCase() + acc.slice(1);
    const mask = acc === "u8" || acc === "i8" ? "0xff"
               : acc === "u16" || acc === "i16" ? "0xffff"
               : "0xffffffff";
    const addrJs = `(${emitExpr(arr, ctx)} + (${emitExpr(idx, ctx)})${stride})`;
    if (op === "=") return `heap.${setFn}(${addrJs}, (${right}) & ${mask})`;
    const binop = op.slice(0, op.length - 1);
    const opMap = { ">>": ">>>" };
    const finalOp = opMap[binop] || binop;
    return `heap.${setFn}(${addrJs}, ((heap.${acc}(${addrJs})) ${finalOp} (${right})) & ${mask})`;
  }

  // Field-expression LHS: local.field = v   or   ptr->field = v
  if (left.type === "field_expression") {
    const fnode = left.childForFieldName("field");
    const fieldName = fnode ? text(fnode, ctx) : "";
    const arg = left.childForFieldName("argument");
    const opNode = left.children.find(c => c.text === "." || c.text === "->");

    // _<off>_<width>_ slice — typed sub-DWORD write at offset.
    const fieldMatch = /^_(\d+)_(\d+)_$/.exec(fieldName);
    if (fieldMatch && arg.type === "identifier") {
      const argName = text(arg, ctx);
      const offset = parseInt(fieldMatch[1], 10);
      const width = parseInt(fieldMatch[2], 10);
      // Heap-backed local: write through the slot.
      if (ctx.heapLocals.has(argName)) {
        const addr = `(__addr_${argName} + ${offset})`;
        if (width === 1) return `heap.setU8(${addr}, (${right}) & 0xff)`;
        if (width === 2) return `heap.setU16(${addr}, (${right}) & 0xffff)`;
        return `heap.setU32(${addr}, (${right}) >>> 0)`;
      }
      // DAT_xxx global: write directly at addr+offset.
      const datMatch = /^_?DAT_([0-9a-fA-F]+)$/.exec(argName);
      if (datMatch) {
        const addr = `(0x${datMatch[1]} + ${offset})`;
        if (width === 1) return `heap.setU8(${addr}, (${right}) & 0xff)`;
        if (width === 2) return `heap.setU16(${addr}, (${right}) & 0xffff)`;
        return `heap.setU32(${addr}, (${right}) >>> 0)`;
      }
    }

    // Named struct field write
    const STRUCT = (typeof STRUCT_FIELDS !== "undefined") ? STRUCT_FIELDS : null;
    const info = STRUCT && STRUCT[fieldName];
    if (info) {
      let baseJs;
      if (opNode && opNode.text === "->") baseJs = emitExpr(arg, ctx);
      else if (arg.type === "identifier" && ctx.heapLocals.has(text(arg, ctx))) {
        baseJs = `__addr_${text(arg, ctx)}`;
      } else {
        baseJs = emitExpr(arg, ctx);
      }
      const eff = info.offset === 0 ? baseJs : `(${baseJs} + ${info.offset})`;
      if (info.width === 1) return `heap.setU8(${eff}, (${right}) & 0xff)`;
      if (info.width === 2) return `heap.setU16(${eff}, (${right}) & 0xffff)`;
      return `heap.setU32(${eff}, (${right}) >>> 0)`;
    }
  }

  // Fallback for unhandled LHS forms — emit a runtime throw so the file
  // parses but flags itself loudly when called.
  return `(function(){ throw new Error("c-to-js: unhandled LHS form ${left.type} in ${ctx.funcName}"); })()`;
}

// Apply a width-narrow + sign-extend matching a C cast. Used by emitCall and
// emitCast — both routes encounter type casts depending on how tree-sitter
// parsed the source.
function applyTypeCast(typeName, argJs) {
  if (typeName === "char")    return `((${argJs}) << 24 >> 24)`;
  if (typeName === "short")   return `((${argJs}) << 16 >> 16)`;
  if (typeName === "byte" || typeName === "uchar" || typeName === "undefined1") return `((${argJs}) & 0xff)`;
  if (typeName === "ushort" || typeName === "undefined2") return `((${argJs}) & 0xffff)`;
  if (typeName === "uint" || typeName === "undefined4") return `((${argJs}) >>> 0)`;
  if (typeName === "ulong" || typeName === "ulonglong" || typeName === "undefined8") return `((${argJs}) >>> 0)`;
  if (typeName === "int" || typeName === "long" || typeName === "signed" || typeName === "unsigned") return `((${argJs}) | 0)`;
  return `(${argJs})`;
}

// Special-case `(TYPE)IDENTIFIER` for DAT_xxx — read at the cast's width
// directly, instead of "read u32, mask to width". Returns the JS string if
// the special case matches, else null.
function maybeTypedDatRead(typeName, argNode, ctx) {
  if (argNode.type !== "identifier") return null;
  const argName = text(argNode, ctx);
  const datMatch = /^_?DAT_([0-9a-fA-F]+)$/.exec(argName);
  if (!datMatch) return null;
  const addr = `0x${datMatch[1]}`;
  if (typeName === "char")    return `heap.i8(${addr})`;
  if (typeName === "byte" || typeName === "uchar" || typeName === "undefined1") return `heap.u8(${addr})`;
  if (typeName === "short")   return `heap.i16(${addr})`;
  if (typeName === "ushort" || typeName === "undefined2") return `heap.u16(${addr})`;
  if (typeName === "uint" || typeName === "undefined4") return `heap.u32(${addr})`;
  return null;
}

// Tree-sitter-c parses chained type casts like `(uint)(ushort)(EXPR)` as
// nested call_expressions when typedef tracking missed the type names. The
// AST shape is:
//
//   call(fn=call(fn=(uint), args=[(ushort)]), args=[(EXPR)])
//
// Walk the chain: at each level, the OUTER node holds one cast type (its
// `fn` is `(T)`) and either bottoms out at the actual EXPR (in `args`) or
// nests another cast call. Returns { types: [T1, T2, ...], innerNode } when
// the whole chain is a cast chain — types are listed outer→inner so the
// caller applies them in order. Returns null otherwise.
function detectChainedCastCall(node, ctx) {
  if (node.type !== "call_expression") return null;
  const types = [];
  let cur = node;
  let innerNode = null;
  // First pass: walk outside-in, collecting cast types from the fn-side.
  // The "value" being cast is in the args of the outermost call we encountered.
  // The fn-side of each subsequent call carries the next cast layer.
  // Note: in `(T1)(T2)(EXPR)` parsed as call(call((T1),(T2)),(EXPR)):
  //   outer.fn = call((T1),(T2))   → we recurse into this for casts T1, T2
  //   outer.args = (EXPR)          → the actual value
  while (cur && cur.type === "call_expression") {
    const fn = cur.childForFieldName("function");
    const args = cur.childForFieldName("arguments");
    if (!fn || !args || args.namedChildren.length !== 1) return null;
    // If this call's fn is a parenthesized identifier of a type, it's a
    // single cast `(T)(value)` — value lives in args.
    if (fn.type === "parenthesized_expression") {
      const innerFn = fn.namedChildren[0];
      if (!innerFn || innerFn.type !== "identifier") return null;
      const tname = text(innerFn, ctx);
      if (!WIDTH_MEANINGFUL_TYPES.includes(tname)) return null;
      types.push(tname);
      // The args' sole child is the value being cast — could itself be a
      // chained cast call to recurse into, OR a parenthesized expression
      // whose inner is the actual EXPR, OR another shape.
      const arg = args.namedChildren[0];
      if (arg.type === "call_expression") {
        cur = arg;  // recurse into next cast
        continue;
      }
      // Bottomed out — the actual expression to apply all casts to.
      innerNode = arg;
      break;
    }
    // If fn is itself a call_expression, that means `cur` is `(call)(args)`
    // — the outer cast wraps a chain. Ghidra produces this shape for 3+
    // level chains. Treat the entire fn as the next chain to unfold and
    // the args as the actual value.
    if (fn.type === "call_expression") {
      // Recursively unfold the fn-side chain to collect more types
      const innerChain = detectChainedCastCall(fn, ctx);
      if (!innerChain) return null;
      // The fn-side chain has its OWN inner expression — but in this
      // pattern, the args of `cur` is the real value, not fn's inner.
      // Tree-sitter's parse of `(T1)(T2)(EXPR)` actually puts the chain
      // entirely on the fn-side of the outermost call.
      types.push(...innerChain.types);
      innerNode = args.namedChildren[0];
      break;
    }
    return null;
  }
  if (!innerNode || types.length === 0) return null;
  return { types, innerNode };
}

function emitCall(node, ctx) {
  const fnNode = node.childForFieldName("function");
  const argsNode = node.childForFieldName("arguments");

  // Chained type-cast detection — must run before the per-shape branches so
  // that `(uint)(ushort)(EXPR)` doesn't fall through to callIndirect.
  const chain = detectChainedCastCall(node, ctx);
  if (chain) {
    const innerJs = emitExpr(chain.innerNode, ctx);
    // Apply casts inside-out (the innermost cast is applied first, then
    // each outer one wraps it). `chain.types` is outer→inner order, so we
    // walk it in reverse.
    let result = innerJs;
    for (let i = chain.types.length - 1; i >= 0; i--) {
      // Innermost cast on a DAT_xxx identifier reads at that width.
      if (i === chain.types.length - 1) {
        const typed = maybeTypedDatRead(chain.types[i], chain.innerNode, ctx);
        if (typed) { result = typed; continue; }
      }
      result = applyTypeCast(chain.types[i], result);
    }
    return result;
  }

  // Determine callee name and category
  if (fnNode.type === "identifier") {
    const name = text(fnNode, ctx);
    // Width-meaningful type "calls": tree-sitter-c sometimes parses `(byte)X`
    // as call_expression `byte(X)` when its typedef tracking misses the
    // declaration. Reinterpret as a cast so we get the right width semantics.
    if (WIDTH_MEANINGFUL_TYPES.includes(name) && argsNode && argsNode.namedChildren.length === 1) {
      const argNode = argsNode.namedChildren[0];
      const typed = maybeTypedDatRead(name, argNode, ctx);
      if (typed) return typed;
      return applyTypeCast(name, emitExpr(argNode, ctx));
    }
    const args = argsNode ? argsNode.namedChildren.filter(c => c.type !== "comment").map(c => emitExpr(c, ctx)) : [];
    const mFun = /^FUN_([0-9a-fA-F]+)$/.exec(name);
    if (mFun) {
      ctx.callsFun.add(name);
      ctx.usesRegs = true;
      const calleeAddr = parseInt(mFun[1], 16);
      // Caller-side register-arg propagation. If callee reads `unaff_*`/`in_*`
      // and we have a traced register snapshot for THIS call site, set those
      // registers before the call. Without this, the callee sees 0s and
      // either bails or reads garbage.
      const consumed = ctx.regConsumers.get(calleeAddr);
      const callerSiteRegs = ctx.callsiteRegs.get(ctx.forceAddr);
      const captured = callerSiteRegs && callerSiteRegs.get(calleeAddr);
      // Schema: { pre: {eax,ebx,...}, post: {eax,ebx,...} }
      const capturedPre = captured && captured.pre;
      const capturedPost = captured && captured.post;
      // Pre-call writes: when callee reads a register on entry, set it from
      // the traced caller-state.
      // Skip EBP — it is the x86 stack frame base pointer in every standard
      // calling convention, never a function parameter. Captured EBP values
      // are nearly always either a stack address or a return-address from
      // an earlier CALL — both meaningless cross-call. Surfaced after
      // FUN_005e3f31 stored a captured 0x42b079 (an instruction PC inside
      // FUN_004298a0) as a function pointer and tried to callIndirect it.
      const preWrites = [];
      if (consumed && capturedPre) {
        for (const reg of consumed) {
          if (reg === 'ebp') continue;
          const val = capturedPre[reg];
          if (val !== undefined && val !== 0) {
            preWrites.push(`regs.${reg} = 0x${val.toString(16)}`);
          }
        }
      }
      // Post-call writes: when the callee returns with caller-saved registers
      // changed, propagate so the *next* call site reads the correct value.
      // Limit to ecx/edx — Microsoft x86 ABI marks eax/ecx/edx as
      // caller-saved (callee may freely modify), while ebx/esi/edi/ebp are
      // callee-saved (callee must restore on exit). Skip eax (already set
      // by `regs.eax = FUN_X(...)`). Trace-noise on callee-saved regs from
      // entry-point traces was masking real bugs by overwriting state.
      const postWrites = [];
      if (capturedPost) {
        for (const reg of ['ecx', 'edx']) {
          const postVal = capturedPost[reg];
          const preVal = capturedPre ? capturedPre[reg] : undefined;
          if (postVal !== undefined && postVal !== 0 && postVal !== preVal) {
            postWrites.push(`regs.${reg} = 0x${postVal.toString(16)}`);
          }
        }
      }
      const fnCall = `${name}(heap${args.length ? ", " + args.join(", ") : ""})`;
      // Build the call expression. Use comma-expression so the value is
      // always the function's return (kept in regs.eax).
      const parts = [];
      if (preWrites.length > 0) parts.push(...preWrites);
      parts.push(`regs.eax = ${fnCall}`);
      if (postWrites.length > 0) {
        parts.push(...postWrites);
        parts.push(`regs.eax`);
      }
      return parts.length === 1 ? `(${parts[0]})` : `(${parts.join(", ")})`;
    }
    if (GHIDRA_BUILTINS.has(name)) {
      ctx.builtins.add(name);
      return `${name}(${args.join(", ")})`;
    }
    if (/^_?[A-Za-z][A-Za-z0-9_]*$/.test(name)) {
      ctx.imports.add(name);
      return `${name}(heap${args.length ? ", " + args.join(", ") : ""})`;
    }
    return `${name}(${args.join(", ")})`;
  }
  // Single-cast `(TYPE)(EXPR)` — fnNode is parenthesized type identifier.
  if (fnNode.type === "parenthesized_expression" && argsNode) {
    const inner = fnNode.namedChildren[0];
    if (inner && inner.type === "identifier") {
      const typeName = text(inner, ctx);
      if (WIDTH_MEANINGFUL_TYPES.includes(typeName) && argsNode.namedChildren.length === 1) {
        const argNode = argsNode.namedChildren[0];
        const typed = maybeTypedDatRead(typeName, argNode, ctx);
        if (typed) return typed;
        return applyTypeCast(typeName, emitExpr(argNode, ctx));
      }
    }
  }
  const args = argsNode ? argsNode.namedChildren.filter(c => c.type !== "comment").map(c => emitExpr(c, ctx)) : [];
  // Indirect call: (*expr)(args) — call through a function pointer.
  // expr is typically a heap.u32(addr) expression. Route through the
  // runtime's callIndirect so it can look up state.fnDispatch.
  ctx.usesCallIndirect = true;
  // If fnNode is a parenthesized pointer dereference like (*DAT_xxx), we
  // want the inner address — emitting `*DAT_xxx` as expression yields
  // heap.u32(addr), which is exactly the pointer value we want to pass.
  let targetExpr;
  if (fnNode.type === "parenthesized_expression") {
    const inner = fnNode.namedChildren[0];
    if (inner && inner.type === "pointer_expression" && inner.firstChild && inner.firstChild.text === "*") {
      // *expr — emit just expr (the address)
      targetExpr = emitExpr(inner.namedChildren[0], ctx);
    } else {
      targetExpr = emitExpr(inner, ctx);
    }
  } else if (fnNode.type === "pointer_expression" && fnNode.firstChild && fnNode.firstChild.text === "*") {
    targetExpr = emitExpr(fnNode.namedChildren[0], ctx);
  } else {
    targetExpr = emitExpr(fnNode, ctx);
  }
  ctx.usesRegs = true;
  return `(regs.eax = callIndirect(heap, ${targetExpr}${args.length ? ", " + args.join(", ") : ""}))`;
}

function emitPointer(node, ctx) {
  // *expr or &expr
  const op = node.firstChild.text;
  const arg = emitExpr(node.namedChildren[0], ctx);
  if (op === "&") {
    // & on a global (DAT_xxx, PTR_xxx_addr, s_xxx_addr) returns its address.
    const inner = node.namedChildren[0];
    if (inner.type === "identifier") {
      const name = text(inner, ctx);
      // Heap-backed local — return its frame address
      if (ctx.heapLocals.has(name)) return `__addr_${name}`;
      let m = /^_?DAT_([0-9a-fA-F]+)$/.exec(name);
      if (m) return `0x${m[1]}`;
      m = /^PTR_[A-Za-z0-9_]*_([0-9a-fA-F]+)$/.exec(name);
      if (m) return `0x${m[1]}`;
      m = /^LAB_([0-9a-fA-F]+)$/.exec(name);
      if (m) return `0x${m[1]}`;
      m = /^FUN_([0-9a-fA-F]+)$/.exec(name);
      if (m) return `0x${m[1]}`;
      m = /_([0-9a-fA-F]{6,8})$/.exec(name);
      if (m && /^s_/.test(name)) return `0x${m[1]}`;
    }
    // & of a field expression (struct->field or local.field) → address of that
    // field = base address + field offset.
    if (inner.type === "field_expression") {
      const fnode = inner.childForFieldName("field");
      const fieldName = fnode ? text(fnode, ctx) : "";
      const info = lookupStructField(fieldName);
      if (info) {
        const argNode = inner.childForFieldName("argument");
        const opNode = inner.children.find(c => c.text === "." || c.text === "->");
        let baseJs;
        if (opNode && opNode.text === "->") {
          baseJs = emitExpr(argNode, ctx);
        } else if (argNode.type === "identifier" && ctx.heapLocals.has(text(argNode, ctx))) {
          baseJs = `__addr_${text(argNode, ctx)}`;
        } else {
          baseJs = emitExpr(argNode, ctx);
        }
        return info.offset === 0 ? baseJs : `(${baseJs} + ${info.offset})`;
      }
    }
    throw new Error(`& of non-DAT identifier not yet supported: ${text(node, ctx).slice(0, 80)}`);
  }
  // *expr → typed read. Three width sources (priority order):
  //   1. inner is `(TYPE *)X`        → use TYPE's accessor
  //   2. inner is a local declared as `T *p` → use ctx.varPointee[p]
  //   3. default                     → u32
  const inner = node.namedChildren[0];
  if (inner && inner.type === "cast_expression") {
    const typeNode = inner.childForFieldName("type");
    const valueNode = inner.childForFieldName("value");
    const typeText = typeNode ? text(typeNode, ctx).trim() : "";
    const valueExpr = emitExpr(valueNode, ctx);
    const accessor = pointerCastToAccessor(typeText);
    if (accessor) return `heap.${accessor}(${valueExpr})`;
  }
  if (inner && inner.type === "identifier") {
    const name = text(inner, ctx);
    if (ctx.varPointee.has(name)) {
      return `heap.${ctx.varPointee.get(name)}(${arg})`;
    }
  }
  return `heap.u32(${arg})`;
}

// Map a `(TYPE *)` cast's TYPE to an accessor name (u8/i8/u16/i16/u32).
// Returns null if the type isn't a recognised pointer-to-scalar.
// Per-register read expression for `extraout_<REG>` use-site lowering.
// LIMITED to byte-width registers (8-bit halves of the four GP regs). The
// 32- and 16-bit forms are too often used as loop counters / iterators in
// Ghidra's decompiled C; propagating live state into them surfaces
// pre-existing translator bugs in unrelated functions (tight loops that
// previously exited because the read returned a dead 0). Byte registers
// are typically real output channels (sprite-table indices, palette
// entries, etc.) — propagating those is safer and unblocks the
// title-screen render path. Wider registers can be added back per-case
// once their downstream loops are audited.
const EXTRAOUT_READ = {
  AL: "(regs.eax & 0xff)",    AH: "((regs.eax >>> 8) & 0xff)",
  BL: "(regs.ebx & 0xff)",    BH: "((regs.ebx >>> 8) & 0xff)",
  CL: "(regs.ecx & 0xff)",    CH: "((regs.ecx >>> 8) & 0xff)",
  DL: "(regs.edx & 0xff)",    DH: "((regs.edx >>> 8) & 0xff)",
};

function pointerDepthOf(declNode) {
  let d = 0;
  let cur = declNode;
  while (cur && cur.type === "pointer_declarator") {
    d++;
    cur = cur.childForFieldName("declarator");
  }
  return d;
}

function pointeeAccForDeclTop(declNode, typeText) {
  if (!typeText) return null;
  const depth = pointerDepthOf(declNode);
  if (depth >= 2) return "u32";
  return pointerCastToAccessor(typeText);
}

function pointerCastToAccessor(typeText) {
  // The type text in tree-sitter-c includes the trailing `*`; e.g. "ushort *"
  // or "char  *" (single-star = pointed-to value), "undefined **" (double
  // star = pointer-to-pointer, stride is pointer-size = 4). Count stars to
  // distinguish.
  const stars = (typeText.match(/\*/g) || []).length;
  const t = typeText.replace(/\*+/g, "").replace(/\s+/g, " ").trim();
  if (stars >= 2) return "u32";  // double-pointer → element is pointer (4-byte)
  if (t === "char")            return "i8";
  if (t === "byte" || t === "uchar" || t === "unsigned char" || t === "undefined1" || t === "undefined") return "u8";
  if (t === "short")           return "i16";
  if (t === "ushort" || t === "unsigned short" || t === "undefined2") return "u16";
  if (t === "int" || t === "long" || t === "signed int") return "i32";
  if (t === "uint" || t === "unsigned int" || t === "ulong" || t === "unsigned long" || t === "undefined4") return "u32";
  return null;
}

function emitSubscript(node, ctx) {
  // a[i] in Ghidra C is pointer arithmetic + dereference. Element width is
  // a's pointed-to type. Width sources, in priority order:
  //   1. a is a local declared as `T *a;`  → use ctx.varPointee[a]
  //   2. a is `(T *)X`                     → use T's accessor
  //   3. a is `&DAT_xxx` and there's a containing `(T)` cast — handled by emitCast
  //   4. default: u32 (preserves prior behaviour)
  const arr  = node.childForFieldName("argument");
  const idx  = node.childForFieldName("index");
  const arrJs = emitExpr(arr, ctx);
  const idxJs = emitExpr(idx, ctx);
  let acc = "u32";
  if (arr.type === "identifier") {
    const name = text(arr, ctx);
    if (ctx.varPointee.has(name)) acc = ctx.varPointee.get(name);
  }
  if (arr.type === "cast_expression") {
    const typeNode = arr.childForFieldName("type");
    if (typeNode) {
      const t = pointerCastToAccessor(text(typeNode, ctx).trim());
      if (t) acc = t;
    }
  }
  // Element-width-sized stride: u8 → +i, u16 → +i*2, u32 → +i*4.
  const stride = acc === "u8" || acc === "i8" ? ""
              : acc === "u16" || acc === "i16" ? " * 2"
              : " * 4";
  return `heap.${acc}(${arrJs} + (${idxJs})${stride})`;
}

// Hard-coded layouts for the Windows / RCT structs Ghidra references by name.
// Each entry maps field name → { offset, width }. Width is bytes (1, 2, 4).
// Inferred from MSDN headers (RECT/MSG/POINT/OSVERSIONINFO/MEMORYSTATUS/etc.).
const STRUCT_FIELDS = {
  // RECT { LONG left, top, right, bottom; }
  left:   { offset: 0,  width: 4 },
  top:    { offset: 4,  width: 4 },
  right:  { offset: 8,  width: 4 },
  bottom: { offset: 12, width: 4 },
  // POINT { LONG x, y; }
  x:      { offset: 0,  width: 4 },
  y:      { offset: 4,  width: 4 },
  // SYSTEMTIME { WORD wYear; WORD wMonth; WORD wDayOfWeek; WORD wDay; ... }
  wDay:   { offset: 6,  width: 2 },
  wHour:  { offset: 8,  width: 2 },
  // OSVERSIONINFO { DWORD dwOSVersionInfoSize; ...; ...; ...; CHAR szCSDVersion[128]; }
  dwOSVersionInfoSize: { offset: 0, width: 4 },
  // MEMORYSTATUS { DWORD dwLength; DWORD dwMemoryLoad; SIZE_T dwTotalPhys; SIZE_T dwAvailPhys;
  //               SIZE_T dwTotalPageFile; SIZE_T dwAvailPageFile; SIZE_T dwTotalVirtual; SIZE_T dwAvailVirtual; }
  dwMemoryLoad:    { offset: 4,  width: 4 },
  dwAvailPhys:     { offset: 12, width: 4 },
  dwAvailPageFile: { offset: 20, width: 4 },
  dwAvailVirtual:  { offset: 28, width: 4 },
  // SYSTEM_INFO (skipped most; common one)
  dwProcessorType: { offset: 24, width: 4 },
  // MMCKINFO / MMIOINFO (multimedia chunks)
  ckid:            { offset: 0,  width: 4 },
  fccType:         { offset: 8,  width: 4 },
  dwDataOffset:    { offset: 12, width: 4 },
  pchNext:         { offset: 16, width: 4 },
  pchEndWrite:     { offset: 24, width: 4 },
  // MSG { HWND hwnd; UINT message; WPARAM wParam; LPARAM lParam; DWORD time; POINT pt; }
  message:         { offset: 4,  width: 4 },
  // PALETTEENTRY { BYTE peRed, peGreen, peBlue, peFlags; }
  peRed:           { offset: 0,  width: 1 },
  peFlags:         { offset: 3,  width: 1 },
  // CPINFO { UINT MaxCharSize; ... }
  MaxCharSize:     { offset: 0,  width: 4 },
  // STARTUPINFO has cbReserved2
  cbReserved2:     { offset: 60, width: 4 },
  // Generic "size" markers
  cbSize:          { offset: 0,  width: 4 },
  dwSize:          { offset: 0,  width: 4 },
  dwFlags:         { offset: 4,  width: 4 },  // close enough for many structs
  // LOGFONT
  lfHeight:        { offset: 0,  width: 4 },
  lfFaceName:      { offset: 28, width: 1 }, // start of CHAR array
  // WAVEOUTCAPS / etc.
  szPname:         { offset: 16, width: 1 }, // start of CHAR array
  // Misc unused / unsupported
  unused:          { offset: 0,  width: 4 },
  // SYSTEMTIME (more fields)
  wMonth:          { offset: 2,  width: 2 },
  wMinute:         { offset: 10, width: 2 },
  // OSVERSIONINFO
  dwPlatformId:    { offset: 16, width: 4 },
  // LOGFONT (more fields)
  lfWeight:        { offset: 16, width: 4 },
  // MMCKINFO
  cksize:          { offset: 4,  width: 4 },
  // hWnd appears in many structs — usually at offset 0 or 4 depending on struct.
  // DRAWITEMSTRUCT has hwndItem at offset 16. WNDCLASSEX doesn't have hWnd.
  // Default to offset 4 (most common in callback structs). Diff-test will surface
  // mismatches.
  hWnd:            { offset: 4,  width: 4 },
  hwndItem:        { offset: 16, width: 4 },
  // PALETTEENTRY (more)
  peBlue:          { offset: 2,  width: 1 },
  // SYSTEMTIME (more)
  wYear:           { offset: 0,  width: 2 },
  wSecond:         { offset: 12, width: 2 },
  // OSVERSIONINFO
  dwMajorVersion:  { offset: 4,  width: 4 },
  // LOGFONT (more)
  lfCharSet:       { offset: 23, width: 1 },
  // WNDCLASSA (binary uses RegisterClassA, not Ex). WNDCLASSEX has a
  // leading cbSize field that shifts everything by 4. Keep WNDCLASSA
  // offsets — the boot path doesn't use WNDCLASSEX.
  style:           { offset: 0,  width: 4 },
  // DRAWITEMSTRUCT
  uID:             { offset: 8,  width: 4 },
  // LOGPALETTE
  palPalEntry:     { offset: 4,  width: 4 },
  // RGNDATA
  rdh:             { offset: 0,  width: 4 },  // RGNDATAHEADER starts at 0
  nCount:          { offset: 4,  width: 4 },  // RGNDATAHEADER.nCount
  // SYSTEMTIME (more)
  wDayOfWeek:      { offset: 4,  width: 2 },
  wMilliseconds:   { offset: 14, width: 2 },
  // OSVERSIONINFO (more)
  dwMinorVersion:  { offset: 8,  width: 4 },
  // WNDCLASSA (more) — see note at `style` above.
  lpfnWndProc:     { offset: 4,  width: 4 },
  // LOGFONT (more)
  lfItalic:        { offset: 21, width: 1 },
  // PALETTEENTRY (more)
  peGreen:         { offset: 1,  width: 1 },
  // DRAWITEMSTRUCT
  uFlags:          { offset: 12, width: 4 },
  // MMIOINFO
  pchEndRead:      { offset: 28, width: 4 },
  // OSVERSIONINFO
  dwBuildNumber:   { offset: 12, width: 4 },
  // NOTIFYICONDATA
  uCallbackMessage:{ offset: 12, width: 4 },
  hIcon:           { offset: 16, width: 4 },     // shared: WNDCLASSA hIcon AND NOTIFYICONDATA hIcon
  // WNDCLASSA — note: this collides with NOTIFYICONDATA.hIcon above.
  // The same offset (12) coincidentally works for cbWndExtra in WNDCLASSA.
  cbWndExtra:      { offset: 12, width: 4 },
  // LOGFONT (more)
  lfUnderline:     { offset: 22, width: 1 },
  // LOGPALETTE
  palVersion:      { offset: 0,  width: 2 },
  // CPINFOEX
  LeadByte:        { offset: 4,  width: 1 },
  // STARTUPINFO
  lpReserved2:     { offset: 64, width: 4 },
  // NOTIFYICONDATA
  szTip:           { offset: 24, width: 1 },  // start of CHAR array
  // LOGPALETTE
  palNumEntries:   { offset: 2,  width: 2 },
  // WNDCLASSA
  cbClsExtra:      { offset: 8,  width: 4 },
  // anonymous union member 's' — fallback to offset 0
  s:               { offset: 0,  width: 4 },
  // WNDCLASSA
  hInstance:       { offset: 16, width: 4 },
  // SYSTEM_INFO (anonymous union: { dwOemId } | { wProcessorArchitecture, wReserved })
  wProcessorArchitecture: { offset: 0, width: 2 },
  // MEMORYSTATUS (more)
  dwTotalPhys:     { offset: 8,  width: 4 },
  // WNDCLASSA (more)
  hCursor:         { offset: 24, width: 4 },
  hbrBackground:   { offset: 28, width: 4 },
  lpszMenuName:    { offset: 32, width: 4 },
  lpszClassName:   { offset: 36, width: 4 },
  // MEMORYSTATUS (more)
  dwTotalPageFile: { offset: 16, width: 4 },
  dwTotalVirtual:  { offset: 24, width: 4 },
  dwLength:        { offset: 0,  width: 4 },
};

// Generic fallback for unknown field names: many functions read fields once
// and the diff-test will catch wrong offsets. We gate this behind a flag so
// translation succeeds for the binary as a whole; per-function correctness is
// a separate pass.
const ALLOW_GENERIC_FIELD_FALLBACK = true;

function lookupStructField(name) {
  return STRUCT_FIELDS[name] || null;
}

function emitField(node, ctx) {
  // Two patterns we handle:
  //   1. Ghidra's "type-cast field" notation on globals: DAT_xxx._<off>_<width>_
  //      = a sub-DWORD read at a fixed offset and width.
  //      e.g. DAT_005e9100._0_2_ = u16 at 0x5e9100
  //           DAT_005e9100._0_1_ = u8  at 0x5e9100
  //           DAT_005e9100._4_2_ = u16 at 0x5e9104
  //   2. Pointer-to-struct field: param_1->name — without type info we can't
  //      resolve the offset, so we throw and surface the function for hand
  //      review later.
  const arg = node.childForFieldName("argument");
  const field = node.childForFieldName("field");
  if (!arg || !field) {
    throw new Error(`field expression not yet supported: ${text(node, ctx).slice(0, 80)}`);
  }
  const fieldName = text(field, ctx);
  const fieldMatch = /^_(\d+)_(\d+)_$/.exec(fieldName);
  // Pattern 1: argument is a DAT_<addr> identifier and field is _<off>_<width>_
  if (arg.type === "identifier" && fieldMatch) {
    const argName = text(arg, ctx);
    const datMatch = /^_?DAT_([0-9a-fA-F]+)$/.exec(argName);
    if (datMatch) {
      const addr = parseInt(datMatch[1], 16);
      const offset = parseInt(fieldMatch[1], 10);
      const width = parseInt(fieldMatch[2], 10);
      const eff = addr + offset;
      switch (width) {
        case 1: return `heap.u8(0x${eff.toString(16)})`;
        case 2: return `heap.u16(0x${eff.toString(16)})`;
        case 4: return `heap.u32(0x${eff.toString(16)})`;
      }
    }
  }
  // Pattern 2: <expr>._<off>_<width>_ — sub-DWORD slice of any integer value.
  // Mask + shift the JS expression. Works for params, locals, and subscript exprs.
  if (fieldMatch) {
    const offset = parseInt(fieldMatch[1], 10);
    const width = parseInt(fieldMatch[2], 10);
    const argJs = emitExpr(arg, ctx);
    const shift = offset * 8;
    const mask = width === 1 ? 0xff : width === 2 ? 0xffff : 0xffffffff;
    const inner = shift === 0 ? argJs : `((${argJs}) >>> ${shift})`;
    return `(${inner} & 0x${mask.toString(16)})`;
  }
  // Pattern 3: named struct field. Use STRUCT_FIELDS lookup for known
  // Win32 structs. The argument is either a struct value (local) or a pointer.
  let fieldInfo = lookupStructField(fieldName);
  // Generic fallback: assume offset 0, width 4 — will be wrong for some
  // structs but lets translation complete; diff-test surfaces actual mismatches.
  if (!fieldInfo && ALLOW_GENERIC_FIELD_FALLBACK) {
    fieldInfo = { offset: 0, width: 4, _fallback: true };
  }
  if (fieldInfo) {
    // Determine base address: for `local.field` the base is &local; for
    // `ptr->field` the base is the pointer's value.
    let baseJs;
    const arrow = node.text.includes("->");
    if (arrow) {
      baseJs = emitExpr(arg, ctx);
    } else {
      // local.field — base is the local's address. For heap-backed locals,
      // we have __addr_local already.
      if (arg.type === "identifier") {
        const argName = text(arg, ctx);
        if (ctx.heapLocals.has(argName)) {
          baseJs = `__addr_${argName}`;
        } else {
          throw new Error(`field on non-heap local not supported: ${text(node, ctx).slice(0, 80)}`);
        }
      } else if (arg.type === "subscript_expression" || arg.type === "field_expression") {
        // Complex base — array element (local[i].field) or nested field
        // (local.outer.inner). Emit best-effort: take the base expression
        // (which should already produce an address via emitExpr's subscript
        // / nested-field paths), and add the field offset.
        baseJs = emitExpr(arg, ctx);
      } else {
        throw new Error(`field on complex base not supported: ${text(node, ctx).slice(0, 80)}`);
      }
    }
    const eff = fieldInfo.offset === 0 ? baseJs : `(${baseJs} + ${fieldInfo.offset})`;
    switch (fieldInfo.width) {
      case 1: return `heap.u8(${eff})`;
      case 2: return `heap.u16(${eff})`;
      case 4: return `heap.u32(${eff})`;
    }
  }
  throw new Error(`field expression not yet supported: ${text(node, ctx).slice(0, 80)}`);
}

// ---- Helpers ----

function text(node, ctx) {
  return node ? ctx.source.slice(node.startIndex, node.endIndex) : "";
}

function findChild(node, type) {
  if (!node) return null;
  if (node.type === type) return node;
  for (const c of node.namedChildren) {
    const r = findChild(c, type);
    if (r) return r;
  }
  return null;
}

function unwrapParens(node) {
  while (node && node.type === "parenthesized_expression") {
    node = node.namedChildren[0];
  }
  return node;
}

function ensureBlock(stmt) {
  if (stmt.startsWith("{")) return stmt;
  return `{\n  ${stmt}\n}`;
}
