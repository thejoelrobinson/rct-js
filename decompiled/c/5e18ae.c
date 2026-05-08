
void FUN_005e18ae(void)

{
  undefined2 in_AX;
  undefined2 unaff_BX;
  int unaff_ESI;
  
  if ((*(short *)(unaff_ESI + 0x16e) == -1) && ((*(ushort *)(unaff_ESI + 0x32) & 4) == 0)) {
    *(undefined2 *)(unaff_ESI + 0x170) = in_AX;
    *(undefined2 *)(unaff_ESI + 0x172) = unaff_BX;
    *(ushort *)(unaff_ESI + 0x32) = *(ushort *)(unaff_ESI + 0x32) | 8;
  }
  return;
}

