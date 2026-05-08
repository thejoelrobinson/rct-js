
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_004298a0(void)

{
  int unaff_ESI;
  int unaff_EDI;
  
  _DAT_005f5118 = DAT_00971ed8 + -0x40;
  if ((_DAT_0099a500 & 1) != 0) {
    _DAT_005f5118 = DAT_00971ed8;
  }
  _DAT_005f5114 = DAT_00971ed6;
  FUN_005e3f31();
  *(undefined **)(unaff_ESI + 0x1c) = &DAT_005f5110;
  FUN_005e429d();
  *(ushort *)(unaff_EDI + 0x12) = *(ushort *)(unaff_EDI + 0x12) | 0x800;
  DAT_00991f88 = 0;
  DAT_005f4948 = 0;
  DAT_0099fde0 = 0;
  DAT_006522aa = 0;
  DAT_005f494a = 0;
  DAT_005f494b = 0;
  _DAT_00630b28 = 1;
  if ((_DAT_0099a500 & 1) == 0) {
    FUN_005e3f31();
    *(undefined **)(unaff_ESI + 0x1c) = &DAT_005f5124;
    *(uint *)(unaff_ESI + 0xc) = *(uint *)(unaff_ESI + 0xc) | 0xfffff;
    FUN_005e412c();
    FUN_005e3f31();
    *(undefined **)(unaff_ESI + 0x1c) = &DAT_005f5268;
    *(uint *)(unaff_ESI + 0xc) = *(uint *)(unaff_ESI + 0xc) | 0x1fc;
    *(undefined2 *)(unaff_ESI + 0x168) = 0;
    FUN_005e412c();
    FUN_00429aff();
    return;
  }
  FUN_005e3f31();
  *(undefined **)(unaff_ESI + 0x1c) = &DAT_005f531c;
  *(uint *)(unaff_ESI + 0xc) = *(uint *)(unaff_ESI + 0xc) | 0xf;
  FUN_005e412c();
  FUN_005e3f31();
  *(undefined **)(unaff_ESI + 0x1c) = &DAT_005f5360;
  FUN_005e412c();
  *(ushort *)(unaff_ESI + 0x32) = *(ushort *)(unaff_ESI + 0x32) | 0x10;
  FUN_00429aff();
  return;
}

