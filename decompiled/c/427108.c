
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_00427108(void)

{
  undefined4 in_EAX;
  undefined2 in_DX;
  undefined2 unaff_BX;
  int unaff_ESI;
  
  _DAT_005f4a98 = DAT_00971e86;
  _DAT_005f4a9c = DAT_00971e8a;
  _DAT_005f4aa0 = _DAT_00971e8e;
  _DAT_005f4aa4 = _DAT_00971e92;
  _DAT_005f4aa8 = DAT_00971e96;
  _DAT_005f4aac = 4;
  DAT_005f4a94 = unaff_BX;
  DAT_005f4a96 = in_DX;
  FUN_005e5b80();
  FUN_005e3f31();
  *(undefined **)(unaff_ESI + 0x1c) = &DAT_005f4ab4;
  *(ushort *)(unaff_ESI + 0x32) = *(ushort *)(unaff_ESI + 0x32) | 0x10;
  *(undefined2 *)(unaff_ESI + 0x15a) = 0;
  return in_EAX;
}

