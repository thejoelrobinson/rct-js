
void FUN_00458f0f(void)

{
  char cVar1;
  uint in_EAX;
  char *pcVar2;
  char *unaff_EDI;
  
  pcVar2 = (&PTR_s_March_006432ac)[in_EAX & 7];
  do {
    cVar1 = *pcVar2;
    *unaff_EDI = cVar1;
    pcVar2 = pcVar2 + 1;
    unaff_EDI = unaff_EDI + 1;
  } while (cVar1 != '\0');
  return;
}

