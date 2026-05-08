
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined8 FUN_00449904(void)

{
  undefined4 in_EAX;
  undefined2 extraout_CX;
  int iVar1;
  undefined4 in_EDX;
  uint uVar2;
  uint uVar3;
  int unaff_ESI;
  undefined1 in_ZF;
  
  FUN_005e3b2b();
  if (!(bool)in_ZF) {
    if (DAT_00630b21 == 2) {
      FUN_0043642b();
      _DAT_0099a020 = _DAT_0099a020 | 10;
      DAT_0099a02c._0_2_ = FUN_004490cb();
      DAT_0099a030._0_2_ = 0xffff;
      DAT_0099a02c._2_2_ = extraout_CX;
      FUN_0043642b();
    }
    uVar2 = *(uint *)(unaff_ESI + 0x14) & 0xfff887ff;
    uVar3 = 0;
    if (DAT_00630b21 < 2) {
      uVar3 = 0x1ffc00;
    }
    else {
      iVar1 = 0x10;
      if ((DAT_00630b19 != '\x06') && (iVar1 = 0x11, DAT_00630b19 != '\0')) {
        iVar1 = 0x12;
      }
      uVar2 = uVar2 | 1 << ((uint)DAT_00630b18 + DAT_00991f88 & 3) + 0xb | 1 << iVar1;
      if (DAT_00630b26 != 0xff) {
        uVar3 = ~(1 << ((uint)DAT_00630b26 + DAT_00991f88 & 3) + 0xb) & 0x7800;
      }
    }
    *(uint *)(unaff_ESI + 0x14) = uVar2;
    *(uint *)(unaff_ESI + 0x10) = uVar3;
    FUN_005e43de();
  }
  return CONCAT44(in_EDX,in_EAX);
}

