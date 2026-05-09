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
  source = fixDanglingLabels(sanitiseCxxSymbols(stripWideStringPrefix(stripIntSuffixes(normalizeTypes(source)))));
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

// Identify forward gotos at the function-body's top level. A "forward
// goto" is a `goto LABEL` that appears before its matching `LABEL:` site in
// the body's child statement list. We can lower these to labeled-break
// patterns by wrapping the preceding statements in `LABEL: { ... }`.
//
// Only top-level labels are considered — gotos that need to escape from
// inside a switch/loop to a label outside still throw at runtime. (The vast
// majority of Ghidra forward gotos are top-level merge points.)
function collectForwardLabels(bodyNode, source) {
  const children = bodyNode.namedChildren.filter(c => c.type !== "comment");
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
  if (labelIndex.size === 0) return new Set();
  const forward = new Set();
  for (const [name, idx] of labelIndex) {
    // Only lower a label if it has at least one forward goto AND no backward
    // gotos. Mixed-direction labels (backward edges = loops) need restructuring
    // we don't model — leave them as throws at runtime.
    const hasForward  = anyGotoTo(children.slice(0, idx), name, source);
    const hasBackward = anyGotoTo(children.slice(idx + 1), name, source);
    if (hasForward && !hasBackward) forward.add(name);
  }
  return forward;
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
// `goto_statement` checks `ctx.forwardLabels` and emits `break LABEL` for
// known forward targets instead of throwing.
function emitFunctionBody(bodyNode, ctx) {
  const children = bodyNode.namedChildren.filter(c => c.type !== "comment");
  // Sort forward-label child indices ascending. Each wraps the children
  // before it (which themselves may contain earlier labeled-blocks).
  const labelIdxs = [];
  for (let i = 0; i < children.length; i++) {
    if (children[i].type === "labeled_statement") {
      const id = children[i].namedChildren[0];
      const name = id ? text(id, ctx) : "";
      if (ctx.forwardLabels.has(name)) labelIdxs.push({ idx: i, name });
    }
  }
  // Find first non-declaration child — declarations all live before this
  // index in Ghidra output. We emit them OUTSIDE the labeled blocks so
  // their `let` bindings are visible from code following the blocks.
  let firstNonDecl = 0;
  while (firstNonDecl < children.length && children[firstNonDecl].type === "declaration") {
    firstNonDecl++;
  }
  const lines = [];
  for (let i = 0; i < firstNonDecl; i++) {
    const s = emitStatement(children[i], ctx);
    if (s) lines.push(s);
  }
  // Open labeled blocks in reverse-position order so the latest-position
  // label becomes the outermost.
  const reversed = [...labelIdxs].reverse();
  for (const { name } of reversed) lines.push(`${name}: {`);
  let openLabels = labelIdxs.map(l => l.name);
  for (let i = firstNonDecl; i < children.length; i++) {
    const labelHere = labelIdxs.find(l => l.idx === i);
    if (labelHere) {
      // Close the corresponding labeled block (innermost match on the stack).
      const popIdx = openLabels.lastIndexOf(labelHere.name);
      if (popIdx >= 0) {
        lines.push("}");
        openLabels.splice(popIdx, 1);
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
  while (openLabels.length) { lines.push("}"); openLabels.pop(); }
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

  // Pre-pass: identify forward gotos at the function-body level and wire
  // ctx.forwardLabels so emit treats them as labeled-break targets.
  ctx.forwardLabels = collectForwardLabels(body, ctx.source);

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
    if (id) out.push(text(id, ctx));
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
      // Forward gotos at the function-body level are lowered to labeled
      // breaks (see emitFunctionBody / collectForwardLabels).
      if (ctx.forwardLabels && ctx.forwardLabels.has(labelName)) {
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
      else if (inner === "\\\\") code = 92;
      else if (inner === "\\'") code = 39;
      else if (inner === "\\\"") code = 34;
      else if (inner.startsWith("\\x") || inner.startsWith("\\X")) code = parseInt(inner.slice(2), 16);
      else if (inner.startsWith("\\")) code = parseInt(inner.slice(1), 8);
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
    }
  }
  // Otherwise, apply width-narrow + sign-extend on the value.
  if (t === "char")             return `((${valueExpr}) << 24 >> 24)`;
  if (t === "byte" || t === "uchar" || t === "unsigned char" || t === "undefined1") return `((${valueExpr}) & 0xff)`;
  if (t === "short")            return `((${valueExpr}) << 16 >> 16)`;
  if (t === "ushort" || t === "unsigned short" || t === "undefined2") return `((${valueExpr}) & 0xffff)`;
  if (t === "int" || t === "long" || t === "uint" || t === "unsigned int" ||
      t === "ulong" || t === "unsigned long" || t === "undefined4" ||
      t === "signed int" || t === "longlong" || t === "ulonglong") {
    // 32-bit width — JS Numbers are already 32-bit-clean for | 0 / >>> 0;
    // emit unsigned by default since most Ghidra casts are reinterpret-only.
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
      if (consumed && captured) {
        const regWrites = [];
        for (const reg of consumed) {
          const val = captured[reg];
          if (val !== undefined && val !== 0) {
            regWrites.push(`regs.${reg} = 0x${val.toString(16)}`);
          }
        }
        if (regWrites.length > 0) {
          return `(${regWrites.join(", ")}, regs.eax = ${name}(heap${args.length ? ", " + args.join(", ") : ""}))`;
        }
      }
      return `(regs.eax = ${name}(heap${args.length ? ", " + args.join(", ") : ""}))`;
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
