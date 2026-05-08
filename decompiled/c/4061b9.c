
void FUN_004061b9(void)

{
  if (DAT_005ebe50 != (code *)0x0) {
    (*DAT_005ebe50)();
    DAT_005ebe50 = (code *)0x0;
  }
  DAT_005e916c = 0;
  DAT_005ebe3c = 0;
  return;
}

