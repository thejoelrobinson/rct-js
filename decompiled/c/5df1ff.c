
void FUN_005df1ff(void)

{
  char *pcVar1;
  int unaff_ESI;
  
  pcVar1 = (char *)(unaff_ESI + 5);
  *pcVar1 = *pcVar1 + '\x01';
  if (*pcVar1 == '\0') {
    *(char *)(unaff_ESI + 5) = *(char *)(unaff_ESI + 5) + -1;
  }
  return;
}

