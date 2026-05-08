
undefined2 FUN_005e680e(void)

{
  undefined1 in_AL;
  undefined2 uVar1;
  short in_DX;
  short extraout_DX;
  int unaff_ESI;
  
  if ((DAT_00991f30 >> 3 & 1) != 0) {
    if (((*(char *)(unaff_ESI + 0x174) == DAT_00991f5a) &&
        (*(short *)(unaff_ESI + 0x30) == DAT_00991f58)) && (in_DX == DAT_00991f5c)) {
      uVar1 = FUN_005e687d();
      return uVar1;
    }
    in_AL = FUN_005e687d();
    in_DX = extraout_DX;
  }
  DAT_00991f30 = DAT_00991f30 & 0xffffffbf | 8;
  DAT_00991f5b = in_AL;
  DAT_00991f5c = in_DX;
  DAT_00991f5a = *(undefined1 *)(unaff_ESI + 0x174);
  DAT_00991f58 = *(undefined2 *)(unaff_ESI + 0x30);
  return *(undefined2 *)(unaff_ESI + 0x30);
}

