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
  "LOCK", "RtlUnwind", "Arguments", "ExceptionList",
]);

// Tree-sitter-c is a context-free parser, so it can't distinguish typedef'd
// type names from identifiers. Ghidra's output uses many Win32 type names
// in casts like `(LPBOOL)&x` — without knowing LPBOOL is a type, the parser
// reads this as `(LPBOOL) & &x`, a binary AND. We pre-strip cast prefixes
// for the well-known Win32 types so the AST comes out clean.
const WIN32_TYPE_NAMES = [
  // KERNEL32 / generic
  "LPBOOL", "LPBYTE", "LPCSTR", "LPDWORD", "LPSTR", "LPVOID", "LPCVOID",
  "BYTE", "WORD", "DWORD", "BOOL", "CHAR", "TCHAR", "WCHAR", "VOID", "PVOID",
  "UINT", "WPARAM", "LPARAM", "LRESULT", "HRESULT", "FARPROC", "size_t",
  "uint", "ushort", "uchar", "uint16_t", "uint32_t", "int32_t", "int16_t",
  "int8_t", "uint8_t", "long", "ulong",
  // HANDLE-like (each its own typedef)
  "HACCEL", "HBITMAP", "HBRUSH", "HCURSOR", "HDC", "HFILE", "HFONT", "HGDIOBJ",
  "HGLOBAL", "HICON", "HINSTANCE", "HKEY", "HMENU", "HMMIO", "HMODULE",
  "HPSTR", "HRSRC", "HWND",
  // Pointer-to-type
  "LPMSG", "LPRECT", "LPPOINT", "LPPALETTEENTRY", "LPSYSTEM_INFO",
  "LPOPENFILENAMEA", "LPSECURITY_ATTRIBUTES", "LPOVERLAPPED",
  // Multimedia
  "MMRESULT", "TIMERPROC", "WNDPROC", "DLGPROC",
  // Structured (rarely used as casts but harmless to include)
  "PHKEY", "PFILETIME",
];

const CAST_REGEX = new RegExp(
  // Match `(<type>[*]?[ ]*)<expr>` — strip the parenthesized type prefix.
  "\\((?:(?:" + WIN32_TYPE_NAMES.join("|") + ")\\s*\\*?\\s*)\\)",
  "g",
);

function stripWin32Casts(source) {
  return source.replace(CAST_REGEX, "");
}

// Parse a single Ghidra C function and return { js, info } where info contains
// metadata (function name, addr, imports, called functions).
export async function translateFunction(source) {
  source = stripWin32Casts(source);
  const parser = await getParser();
  const tree = parser.parse(source);
  const ctx = {
    source,
    imports: new Set(),     // Win32 imports referenced
    builtins: new Set(),    // Ghidra pseudo-fns referenced (CONCAT*, CARRY*, ...)
    callsFun: new Set(),    // FUN_xxx referenced
    locals: new Set(),      // names declared as locals (so we don't mistake for DAT)
    paramNames: new Set(),
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
function findAddressTakenLocals(bodyNode, source) {
  const taken = new Set();
  function walk(n) {
    if (n.type === "pointer_expression") {
      if (n.firstChild && n.firstChild.text === "&") {
        const arg = n.namedChildren[0];
        if (arg && arg.type === "identifier") {
          taken.add(source.slice(arg.startIndex, arg.endIndex));
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
          taken.add(source.slice(arg.startIndex, arg.endIndex));
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
          access.add(source.slice(arg.startIndex, arg.endIndex));
        }
      }
    }
    for (const c of n.namedChildren) walk(c);
  }
  walk(bodyNode);
  return access;
}

// Walk the function body and collect array-typed locals (BYTE foo[63]).
// Returns Map name -> array size (in bytes; assumes byte arrays for simplicity).
function findArrayLocals(bodyNode, source) {
  const arrays = new Map();
  for (const child of bodyNode.namedChildren) {
    if (child.type !== "declaration") continue;
    for (const init of child.namedChildren) {
      if (init.type === "init_declarator" || init.type === "array_declarator") {
        // array_declarator can appear directly or inside init_declarator
        const arr = init.type === "array_declarator"
          ? init
          : init.namedChildren.find(c => c.type === "array_declarator");
        if (!arr) continue;
        const id = findIdentifier(arr);
        const sizeNode = arr.childForFieldName("size") || arr.namedChildren.find(c => c.type === "number_literal");
        if (id && sizeNode) {
          const name = source.slice(id.startIndex, id.endIndex);
          const size = parseInt(source.slice(sizeNode.startIndex, sizeNode.endIndex), 0);
          arrays.set(name, size || 4);
        }
      }
    }
  }
  return arrays;
}

function renderHeader(ctx) {
  const lines = [];
  lines.push(`// Auto-translated from Ghidra C by tools/c-to-js/translate.js.`);
  lines.push(`// Source: decompiled/c/${(ctx.funcAddr || 0).toString(16)}.c`);
  lines.push(`// Edit by hand only after diff-test passes — re-running the translator will overwrite.`);
  lines.push("");
  lines.push(`/** @typedef {import("../runtime/heap.js").Heap} Heap */`);
  lines.push("");
  if (ctx.imports.size > 0) {
    lines.push(`import { ${[...ctx.imports].sort().join(", ")} } from "../runtime/win32.js";`);
  }
  if (ctx.builtins.size > 0) {
    lines.push(`import { ${[...ctx.builtins].sort().join(", ")} } from "../runtime/ghidra-builtins.js";`);
  }
  if (ctx.callsFun.size > 0) {
    const calls = [...ctx.callsFun].sort();
    for (const c of calls) {
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
  const name = text(nameNode, ctx);
  ctx.funcName = name;
  // FUN_<hex> → numeric addr
  const m = /^FUN_([0-9a-fA-F]+)$/.exec(name);
  if (m) ctx.funcAddr = parseInt(m[1], 16);
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
  ctx.frameSize = offset;

  const sig = `export function ${name}(heap${paramList.length ? ", " + paramList.join(", ") : ""}) `;
  const bodyJs = emitBlock(body, ctx);
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
      const updText  = upd  ? emitExpr(upd, ctx)  : "";
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
      const children = node.namedChildren.filter(c => c.type !== "comment");
      const labelNode = children[0];
      const stmtNode = children[1];
      const labelText = labelNode ? text(labelNode, ctx) : "L";
      return `${labelText}: ${stmtNode ? emitStatement(stmtNode, ctx) : ""}`;
    }
    case "goto_statement": {
      const labelNode = node.childForFieldName("label") || node.namedChildren[0];
      // JS doesn't support arbitrary goto. We emit a placeholder that throws —
      // diff-test will fail loudly if reached. Manual cleanup needed.
      return `/* goto ${text(labelNode, ctx)} */ throw new Error("goto ${text(labelNode, ctx)} not supported");`;
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
  // declaration: type init_declarator (',' init_declarator)* ';'
  const decls = [];
  for (const child of node.namedChildren) {
    if (child.type === "init_declarator") {
      const decl = child.childForFieldName("declarator");
      const value = child.childForFieldName("value");
      const id = findIdentifier(decl);
      if (id) {
        const name = text(id, ctx);
        ctx.locals.add(name);
        // Heap-backed local — its address slot was already declared in the
        // function prelude; if there's an initializer, emit a heap write.
        if (ctx.heapLocals.has(name)) {
          if (value) {
            decls.push(`heap.setU32(__addr_${name}, (${emitExpr(value, ctx)}) >>> 0);`);
          }
        } else {
          decls.push(`let ${name} = ${value ? emitExpr(value, ctx) : "0"};`);
        }
      }
    } else if (child.type === "identifier") {
      // bare `int foo;` style declaration
      const name = text(child, ctx);
      ctx.locals.add(name);
      if (!ctx.heapLocals.has(name)) {
        decls.push(`let ${name} = 0;`);
      }
    }
    // skip type qualifiers, primitive_type, etc.
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
    case "char_literal":
      return text(node, ctx); // 'A' → 'A' (JS chars are strings, but this works for char comparisons via charCodeAt — TODO)
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
    case "cast_expression":   return emitExpr(node.childForFieldName("value"), ctx); // drop the cast
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
  // DAT_<hex> or _DAT_<hex> — 32-bit global memory at that address.
  m = /^_?DAT_([0-9a-fA-F]+)$/.exec(name);
  if (m) return `heap.u32(0x${m[1]})`;
  // s_..._<hex> — string literal global; treat as a pointer (the address).
  m = /_([0-9a-fA-F]{6,8})$/.exec(name);
  if (m && /^s_/.test(name)) return `0x${m[1]}`;
  // PTR_<hex> — pointer table entry. Treat as u32 read.
  m = /^PTR_[A-Za-z0-9_]*_([0-9a-fA-F]+)$/.exec(name);
  if (m) return `heap.u32(0x${m[1]})`;
  // FUN_<hex> referenced as a value (function pointer)
  m = /^FUN_([0-9a-fA-F]+)$/.exec(name);
  if (m) {
    ctx.callsFun.add(name);
    return name;
  }
  // Ghidra pseudo-functions (CONCAT*, CARRY*, SBORROW*, SCARRY*, etc.) come
  // from a separate runtime module so the Win32 surface stays clean.
  if (GHIDRA_BUILTINS.has(name)) {
    ctx.builtins.add(name);
    return name;
  }
  // Otherwise assume it's a Win32 import (bare CamelCase identifier).
  if (/^[A-Z][A-Za-z0-9_]*$/.test(name)) {
    ctx.imports.add(name);
    return name;
  }
  // Fallback: emit as-is (some unrecognized symbol).
  return name;
}

function emitBinary(node, ctx) {
  const left = emitExpr(node.childForFieldName("left"), ctx);
  const right = emitExpr(node.childForFieldName("right"), ctx);
  let op = node.childForFieldName("operator").text;
  // C `>>` on uint is logical (unsigned). Without strong type info, default to logical >>>
  // — Ghidra usually emits `>>` after producing uint locals, so this matches the common case.
  if (op === ">>") op = ">>>";
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
      // Compound op (e.g. += , |=) — compute RHS as full expr based on op.
      if (op === "=") {
        return `heap.setU32(0x${m[1]}, (${right}) >>> 0)`;
      }
      const binop = op.slice(0, op.length - 1); // strip '='
      const rread = `heap.u32(0x${m[1]})`;
      const opMap = { ">>": ">>>" };
      const finalOp = opMap[binop] || binop;
      return `heap.setU32(0x${m[1]}, ((${rread}) ${finalOp} (${right})) >>> 0)`;
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
    // Local / param assignment — plain JS, but wrap for 32-bit semantics on numeric ops
    return `${name} ${op} ${right}`;
  }
  // Pointer/array LHS → fall back to general expr (might fail for now; will iterate)
  return `${emitExpr(left, ctx)} ${op} ${right}`;
}

function emitCall(node, ctx) {
  const fnNode = node.childForFieldName("function");
  const argsNode = node.childForFieldName("arguments");
  const args = argsNode ? argsNode.namedChildren.filter(c => c.type !== "comment").map(c => emitExpr(c, ctx)) : [];
  // Determine callee name and category
  if (fnNode.type === "identifier") {
    const name = text(fnNode, ctx);
    const mFun = /^FUN_([0-9a-fA-F]+)$/.exec(name);
    if (mFun) {
      ctx.callsFun.add(name);
      // FUN_xxx takes heap as first arg
      return `${name}(heap${args.length ? ", " + args.join(", ") : ""})`;
    }
    // Ghidra pseudo-fn — pure helper; no `heap` arg.
    if (GHIDRA_BUILTINS.has(name)) {
      ctx.builtins.add(name);
      return `${name}(${args.join(", ")})`;
    }
    // Win32 import — pass heap as first arg too (the runtime wrapper accepts it)
    if (/^[A-Z][A-Za-z0-9_]*$/.test(name)) {
      ctx.imports.add(name);
      return `${name}(heap${args.length ? ", " + args.join(", ") : ""})`;
    }
    // Local / unknown — bare call
    return `${name}(${args.join(", ")})`;
  }
  // Indirect call: (*ptr)(args) → fallback for now
  return `${emitExpr(fnNode, ctx)}(${args.join(", ")})`;
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
  // *expr → heap.u32(expr)
  return `heap.u32(${arg})`;
}

function emitSubscript(node, ctx) {
  // a[i] in Ghidra C is usually pointer arithmetic + dereference. Translate as
  // heap.u32(a + i*4) for u32 arrays. (Width inference is approximate; diff-test
  // catches mismatches.) Treat 8-bit ([byte_array]) and 16-bit similarly later.
  const arr  = node.childForFieldName("argument");
  const idx  = node.childForFieldName("index");
  const arrJs = emitExpr(arr, ctx);
  const idxJs = emitExpr(idx, ctx);
  // Heuristic: if the array expression is itself an &DAT_xxx or DAT_xxx, the
  // backing element is a global; we can't tell width without type info.
  // Default to u32; future work can specialize via casts in the source.
  return `heap.u32(${arrJs} + (${idxJs}) * 4)`;
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
  // WNDCLASSEX
  style:           { offset: 4,  width: 4 },
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
  // WNDCLASSEX (more)
  lpfnWndProc:     { offset: 8,  width: 4 },
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
  hIcon:           { offset: 16, width: 4 },
  // WNDCLASSEX
  cbWndExtra:      { offset: 16, width: 4 },
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
  // WNDCLASSEX
  cbClsExtra:      { offset: 12, width: 4 },
  // anonymous union member 's' — fallback to offset 0
  s:               { offset: 0,  width: 4 },
  // WNDCLASSEX
  hInstance:       { offset: 20, width: 4 },
  // SYSTEM_INFO (anonymous union: { dwOemId } | { wProcessorArchitecture, wReserved })
  wProcessorArchitecture: { offset: 0, width: 2 },
  // MEMORYSTATUS (more)
  dwTotalPhys:     { offset: 8,  width: 4 },
  // WNDCLASSEX (more)
  hCursor:         { offset: 32, width: 4 },
  hbrBackground:   { offset: 36, width: 4 },
  lpszMenuName:    { offset: 36, width: 4 },
  lpszClassName:   { offset: 40, width: 4 },
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
