
void FUN_00428cc9(void)

{
  int unaff_ESI;
  
  if (*(int *)(unaff_ESI + 8) == 0) {
    FUN_005e429d();
    *(ushort *)(unaff_ESI + 0x32) = *(ushort *)(unaff_ESI + 0x32) | 4;
    FUN_005e43de();
  }
  return;
}

