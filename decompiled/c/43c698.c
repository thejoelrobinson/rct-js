
void FUN_0043c698(void)

{
  char in_AL;
  int unaff_ESI;
  
  if (in_AL != *(char *)(unaff_ESI + 0x6d)) {
    *(char *)(unaff_ESI + 0x6d) = in_AL;
    if (0xfd < *(byte *)(unaff_ESI + 0x71)) {
      *(undefined1 *)(unaff_ESI + 0x70) = 0;
    }
    FUN_0043c60b();
  }
  return;
}

