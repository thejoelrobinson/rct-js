
char FUN_0045a94c(void)

{
  char cVar1;
  char *unaff_ESI;
  char *unaff_EDI;
  
  for (; (cVar1 = *unaff_ESI, cVar1 == *unaff_EDI && (cVar1 != '\0')); unaff_ESI = unaff_ESI + 1) {
    unaff_EDI = unaff_EDI + 1;
  }
  return cVar1;
}

