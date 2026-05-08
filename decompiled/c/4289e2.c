
void FUN_004289e2(void)

{
  int unaff_ESI;
  
  if ((*(uint *)(unaff_ESI + 0x10) >> 5 & 1) == 0) {
    FUN_009b438b();
    FUN_009b438b(DAT_005f4b1e + *(short *)(unaff_ESI + 0x22) + 1,
                 DAT_005f4b1a + *(short *)(unaff_ESI + 0x20) + 7,unaff_ESI);
    FUN_009b438b();
  }
  return;
}

