// COM object infrastructure.
//
// A COM object in memory is laid out as:
//   [object_ptr]  →  [vtable_ptr][private_state...]
//   [vtable_ptr]  →  [method0_addr][method1_addr]...
//
// When the binary calls `mov eax, [obj_ptr]; call [eax + N*4]`, eax becomes
// the vtable pointer and the call goes to method N. Each method's address is
// a sentinel (>= 0xF0000000); the interpreter's shim trap dispatches to a JS
// handler. The first arg on the stack is `this` (the object pointer).
//
// We use this for IDirectDraw, IDirectDrawSurface, IDirectSound, etc.

const COM_SENTINEL_BASE = 0xF2000000 >>> 0;
let _nextComSentinel = COM_SENTINEL_BASE;

// Builds an object + vtable in `cpu.memory`, registers each method's sentinel
// in the SHIMS map. Returns the object pointer that the binary will use.
//
// methods is an array of { name, argCount, handler } in vtable order.
// argCount EXCLUDES the implicit `this` (we add 1 to all argCounts).
//
// `objectExtra` is extra bytes to allocate after the vtable pointer for the
// object's own state (most COM objects don't have any from our perspective).
export function makeComObject(allocFn, registerShim, methods, objectExtra = 0) {
  // Allocate vtable: 4 bytes per method.
  const vtableAddr = allocFn(methods.length * 4);
  // Allocate object: 4 bytes for vtable ptr + extra state.
  const objAddr = allocFn(4 + objectExtra);

  // Write vtable pointer as first dword of object.
  writeU32(allocFn._mem, objAddr, vtableAddr);

  // For each method, allocate a sentinel and write into the vtable.
  for (let i = 0; i < methods.length; i++) {
    const m = methods[i];
    const sentinel = _nextComSentinel; _nextComSentinel += 4;
    writeU32(allocFn._mem, vtableAddr + i * 4, sentinel);
    // Method shim takes (argCount + 1) args because of `this`.
    registerShim(sentinel, {
      argCount: m.argCount + 1,
      ret: m.handler ?? (() => 0x80004005),  // default: E_FAIL
      name: m.name,
      log: false,
    });
  }
  return objAddr;
}

function writeU32(mem, addr, value) {
  mem[addr]     =  value        & 0xff;
  mem[addr + 1] = (value >>> 8)  & 0xff;
  mem[addr + 2] = (value >>> 16) & 0xff;
  mem[addr + 3] = (value >>> 24) & 0xff;
}
