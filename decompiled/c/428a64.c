
void FUN_00428a64(void)

{
  int unaff_ESI;
  
  if ((*(uint *)(unaff_ESI + 0x10) >> 6 & 1) == 0) {
    FUN_009b438b();
    FUN_009b438b(unaff_ESI);
  }
  return;
}

