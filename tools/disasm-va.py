#!/usr/bin/env python3
# VA-keyed x86 disassembler for binary/rct.exe — the reusable transcription aid
# for hybrid JS-prefix ports (see PORTING-ROADMAP ADDENDUM 17/18).
#
#   python3 tools/disasm-va.py 0x5dbff5            # 64 instrs from VA
#   python3 tools/disasm-va.py 0x5dbff5 0x5dc1a8   # VA range [start,end)
#   python3 tools/disasm-va.py 0x5dbff5 --count 120
#
# CODESEG file offset = VA - 0x41c000 + 0x1a600  (documented in the scaffold).
import sys, struct
from capstone import Cs, CS_ARCH_X86, CS_MODE_32

BIN = __file__.rsplit("/tools/", 1)[0] + "/binary/rct.exe"
VA_BASE = 0x41c000
FILE_BASE = 0x1a600

def va_to_off(va):
    return va - VA_BASE + FILE_BASE

def main():
    args = [a for a in sys.argv[1:]]
    if not args:
        print("usage: disasm-va.py <start_va> [end_va] [--count N]"); return
    start = int(args[0], 0)
    end = None
    count = 64
    if len(args) >= 2 and not args[1].startswith("--"):
        end = int(args[1], 0)
    if "--count" in args:
        count = int(args[args.index("--count") + 1], 0)
    with open(BIN, "rb") as f:
        data = f.read()
    off = va_to_off(start)
    # read a generous window
    win = data[off: off + (0x4000 if end is None else va_to_off(end) - off + 16)]
    md = Cs(CS_ARCH_X86, CS_MODE_32)
    md.detail = False
    n = 0
    for ins in md.disasm(win, start):
        if end is not None and ins.address >= end:
            break
        print(f"0x{ins.address:06x}: {ins.bytes.hex():<16} {ins.mnemonic} {ins.op_str}")
        n += 1
        if end is None and n >= count:
            break

if __name__ == "__main__":
    main()
