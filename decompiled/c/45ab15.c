
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

short FUN_0045ab15(void)

{
  short sVar1;
  undefined1 uVar2;
  bool bVar3;
  
  if ((char)((uint)(ushort)(DAT_006e3b82 + 4) *
             (uint)*(ushort *)(&DAT_0064bc60 + (DAT_006e3b80 & 7) * 2) >> 0x10) !=
      (char)((uint)DAT_006e3b82 * (uint)*(ushort *)(&DAT_0064bc60 + (DAT_006e3b80 & 7) * 2) >> 0x10)
     ) {
    FUN_0044470e();
    FUN_0044290a();
  }
  if (0xffee < (ushort)(DAT_006e3b82 << 2)) {
    FUN_0045818d();
    FUN_004314c5();
    FUN_0044408f();
    FUN_004440ac();
    FUN_00442516();
    FUN_00451d6e();
    uVar2 = (DAT_006e3b80 & 7) == 0;
    if ((DAT_006e3b80 & 7) < 2) {
      sVar1 = 100;
      do {
        FUN_0042e9e5();
        if (!(bool)uVar2) break;
        sVar1 = sVar1 + -1;
      } while (sVar1 != 0);
    }
    FUN_0042913a();
    FUN_00429249();
  }
  sVar1 = DAT_006e3b82 * 2 + 8;
  if (0xfff7 < (ushort)(DAT_006e3b82 * 2)) {
    sVar1 = FUN_0044a246();
  }
  bVar3 = 0xfffb < DAT_006e3b82;
  DAT_006e3b82 = DAT_006e3b82 + 4;
  if (bVar3) {
    DAT_006e3b80 = DAT_006e3b80 + 1;
    _DAT_005f54ec = _DAT_005f54ec | 2;
    FUN_00443f36();
    FUN_00429361();
    FUN_004294a2();
    sVar1 = FUN_00429502();
  }
  return sVar1;
}

