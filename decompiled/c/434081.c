
void FUN_00434081(void)

{
  ushort uVar1;
  int iVar2;
  int unaff_ESI;
  
  iVar2 = *(int *)(unaff_ESI + 8);
  if ((iVar2 != 0) && (*(char *)(iVar2 + 0x10) != '\0')) {
    *(char *)(iVar2 + 0x10) = *(char *)(iVar2 + 0x10) + -1;
    *(short *)(iVar2 + 0xc) = *(short *)(iVar2 + 0xc) >> 1;
    *(short *)(iVar2 + 0xe) = *(short *)(iVar2 + 0xe) >> 1;
    uVar1 = *(ushort *)(iVar2 + 0xe);
    *(short *)(unaff_ESI + 0x170) = *(short *)(unaff_ESI + 0x170) + (*(ushort *)(iVar2 + 0xc) >> 1);
    *(short *)(unaff_ESI + 0x172) = *(short *)(unaff_ESI + 0x172) + (uVar1 >> 1);
    FUN_005e43de();
  }
  return;
}

