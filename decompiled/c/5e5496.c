
undefined8 FUN_005e5496(void)

{
  short sVar1;
  short sVar2;
  short sVar3;
  short sVar4;
  int iVar5;
  undefined4 in_EAX;
  undefined4 in_ECX;
  undefined4 in_EDX;
  int unaff_ESI;
  int *piVar6;
  
  sVar1 = *(short *)(unaff_ESI + 0x16);
  sVar2 = *(short *)(unaff_ESI + 0x18);
  if (sVar1 != -0x8000) {
    sVar3 = *(short *)(unaff_ESI + 0x1a);
    sVar4 = *(short *)(unaff_ESI + 0x1c);
    for (piVar6 = &DAT_009a121c; iVar5 = *piVar6, iVar5 != 0; piVar6 = piVar6 + 1) {
      if ((((*(char *)(iVar5 + 0x10) == '\0') && (*(short *)(iVar5 + 8) < sVar3)) &&
          (*(short *)(iVar5 + 10) < sVar4)) &&
         ((sVar1 < (short)(*(short *)(iVar5 + 8) + *(short *)(iVar5 + 0xc)) &&
          (sVar2 < (short)(*(short *)(iVar5 + 10) + *(short *)(iVar5 + 0xe)))))) {
        FUN_005e117d(in_ECX);
      }
    }
  }
  return CONCAT44(in_EDX,in_EAX);
}

