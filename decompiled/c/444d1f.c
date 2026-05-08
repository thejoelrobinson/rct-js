
undefined4 FUN_00444d1f(void)

{
  undefined4 uVar1;
  undefined1 *unaff_ESI;
  uint uVar2;
  ushort *puVar3;
  
  uVar1 = FUN_00444c74();
  FUN_0045a930();
  *unaff_ESI = 0xff;
  if (*(ushort *)(unaff_ESI + 0xe) == 0x8000) {
    uVar2 = 0x4000;
  }
  else {
    uVar2 = (uint)(ushort)((*(ushort *)(unaff_ESI + 0xe) & 0xfe0) << 2 |
                          *(ushort *)(unaff_ESI + 0x10) >> 5);
  }
  puVar3 = &DAT_00991f8e + uVar2;
  while (&DAT_00743b94 + (uint)*puVar3 * 0x100 != unaff_ESI) {
    puVar3 = &DAT_00743b96 + (uint)*puVar3 * 0x80;
  }
  *puVar3 = *(ushort *)(unaff_ESI + 2);
  return uVar1;
}

