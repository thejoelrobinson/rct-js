
void FUN_0044e2ed(void)

{
  ushort uVar1;
  int unaff_ESI;
  int unaff_EDI;
  bool bVar2;
  
  if ((*(uint *)(unaff_ESI + 0x10) >> 5 & 1) == 0) {
    bVar2 = (short)(*(short *)(*(int *)(unaff_ESI + 0x1c) + 0x56) + 1 + *(short *)(unaff_ESI + 0x22)
                   ) == 0;
    FUN_005e6aae();
    if (!bVar2) {
      uVar1 = *(ushort *)(unaff_ESI + 0x30);
      FUN_005ddbe1();
      if (((&DAT_005f6be7)[(uint)(byte)(&DAT_00887421)[(uint)uVar1 * 0x260] * 4] & 1) != 0) {
        *(undefined2 *)(unaff_EDI + 0xe) = 1;
        *(short *)(unaff_EDI + 8) = *(short *)(unaff_EDI + 8) << 1;
        *(short *)(unaff_EDI + 10) = *(short *)(unaff_EDI + 10) << 1;
        *(short *)(unaff_EDI + 4) = *(short *)(unaff_EDI + 4) << 1;
        *(short *)(unaff_EDI + 6) = *(short *)(unaff_EDI + 6) << 1;
      }
      FUN_009b438b();
    }
  }
  return;
}

