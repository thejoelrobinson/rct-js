
void FUN_004413c5(void)

{
  byte bVar1;
  char unaff_BL;
  int unaff_EDI;
  
  (&DAT_0088751c)[unaff_EDI] = (&DAT_0088751c)[unaff_EDI] + unaff_BL;
  (&DAT_0088751b)[unaff_EDI] = (&DAT_0088751b)[unaff_EDI] + '\x01';
  if (0x13 < (byte)(&DAT_0088751b)[unaff_EDI]) {
    LOCK();
    bVar1 = (&DAT_0088751c)[unaff_EDI];
    (&DAT_0088751c)[unaff_EDI] = 0;
    UNLOCK();
    (&DAT_0088751a)[unaff_EDI] = bVar1 >> 2;
    (&DAT_0088751b)[unaff_EDI] = 0;
    (&DAT_0088751d)[unaff_EDI] = (&DAT_0088751d)[unaff_EDI] | 1;
  }
  return;
}

