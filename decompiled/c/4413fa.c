
void FUN_004413fa(void)

{
  undefined1 uVar1;
  char unaff_BL;
  int unaff_EDI;
  
  (&DAT_0088752a)[unaff_EDI] = (&DAT_0088752a)[unaff_EDI] + unaff_BL;
  (&DAT_00887529)[unaff_EDI] = (&DAT_00887529)[unaff_EDI] + '\x01';
  if (0x18 < (byte)(&DAT_00887529)[unaff_EDI]) {
    LOCK();
    uVar1 = (&DAT_0088752a)[unaff_EDI];
    (&DAT_0088752a)[unaff_EDI] = 0;
    UNLOCK();
    (&DAT_00887528)[unaff_EDI] = uVar1;
    (&DAT_00887529)[unaff_EDI] = 0;
    (&DAT_0088751d)[unaff_EDI] = (&DAT_0088751d)[unaff_EDI] | 1;
  }
  return;
}

