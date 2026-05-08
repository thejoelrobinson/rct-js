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

// Parse a single Ghidra C function and return { js, info } where info contains
// metadata (function name, addr, imports, called functions).
export async function translateFunction(source) {
  const parser = await getParser();
  const tree = parser.parse(source);
  const ctx = {
    source,
    imports: new Set(),     // Win32 imports referenced
    callsFun: new Set(),    // FUN_xxx referenced
    locals: new Set(),      // names declared as locals (so we don't mistake for DAT)
    paramNames: new Set(),
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
  const sig = `export function ${name}(heap${paramList.length ? ", " + paramList.join(", ") : ""}) `;
  const bodyJs = emitBlock(body, ctx);
  return sig + bodyJs + "\n";
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
        decls.push(`let ${name} = ${value ? emitExpr(value, ctx) : "0"};`);
      }
    } else if (child.type === "identifier") {
      // bare `int foo;` style declaration
      const name = text(child, ctx);
      ctx.locals.add(name);
      decls.push(`let ${name} = 0;`);
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
  // Local / param — leave untouched
  if (ctx.locals.has(name) || ctx.paramNames.has(name)) return name;
  // DAT_<hex> or _DAT_<hex> — global memory at that address. Treat as u32 read.
  let m = /^_?DAT_([0-9a-fA-F]+)$/.exec(name);
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
  // If LHS is DAT_xxx, emit setU32. Otherwise emit identifier = ...
  if (left.type === "identifier") {
    const name = text(left, ctx);
    const m = /^_?DAT_([0-9a-fA-F]+)$/.exec(name);
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
      let m = /^_?DAT_([0-9a-fA-F]+)$/.exec(name);
      if (m) return `0x${m[1]}`;
      m = /^PTR_[A-Za-z0-9_]*_([0-9a-fA-F]+)$/.exec(name);
      if (m) return `0x${m[1]}`;
      m = /_([0-9a-fA-F]{6,8})$/.exec(name);
      if (m && /^s_/.test(name)) return `0x${m[1]}`;
    }
    // Otherwise it's address-of-local — needs stack-frame allocation.
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

function emitField(node, ctx) {
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
