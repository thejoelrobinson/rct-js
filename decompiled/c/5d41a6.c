
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_005d41a6(void)

{
  undefined4 uVar1;
  undefined4 extraout_ECX;
  uint extraout_EDX;
  undefined4 extraout_EDX_00;
  uint uVar2;
  int iVar3;
  undefined1 uVar4;
  
  FUN_005e687d();
  uVar2 = extraout_EDX & 0xff;
  iVar3 = uVar2 * 0x260;
  if ((((&DAT_00887422)[uVar2 * 0x130] & 0x80) == 0) &&
     (uVar4 = (&DAT_00887441)[iVar3] == '\0', (bool)uVar4)) {
    uVar2 = extraout_EDX;
    FUN_005dd134();
    FUN_0042635e();
    FUN_005e3b2b(uVar2,extraout_ECX);
    if (((bool)uVar4) || ((short)uVar2 != *(short *)(iVar3 + 0x30))) {
      FUN_005d3b30();
      DAT_00652289 = (byte)extraout_EDX_00;
      FUN_005d3527(extraout_EDX_00);
    }
    else {
      *(short *)(iVar3 + 0x30) = (short)uVar2;
      FUN_005d21fa();
      DAT_00652289 = (byte)uVar2;
    }
    FUN_005e680e();
    DAT_00991f30 = DAT_00991f30 | 0x40;
    DAT_00652294 = (&DAT_005f598e)[(uint)(byte)(&DAT_00887420)[(uint)DAT_00652289 * 0x260] * 4] +
                   '\x10';
    DAT_00652295 = 0;
    DAT_00652296 = 0;
    DAT_00652297 = 0;
    DAT_00652298 = 0;
    DAT_00652299 = 0;
    DAT_0065229a = 0;
    DAT_00652290 = 0;
    DAT_00652288 = 4;
    DAT_00652292 = 0;
    DAT_00652293 = 0;
    uVar1 = FUN_005d13e2();
    return uVar1;
  }
  DAT_00971e8a._2_2_ = (&DAT_00887442)[uVar2 * 0x130];
  _DAT_00971e8e = (&DAT_00887444)[uVar2 * 0x98];
  uVar1 = FUN_00427108();
  return uVar1;
}

