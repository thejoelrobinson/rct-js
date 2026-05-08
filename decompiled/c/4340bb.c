
void FUN_004340bb(void)

{
  ushort uVar1;
  ushort uVar2;
  int iVar3;
  int unaff_ESI;
  
  iVar3 = *(int *)(unaff_ESI + 8);
  if ((iVar3 != 0) && (*(char *)(iVar3 + 0x10) != '\x02')) {
    *(char *)(iVar3 + 0x10) = *(char *)(iVar3 + 0x10) + '\x01';
    uVar1 = *(ushort *)(iVar3 + 0xc);
    uVar2 = *(ushort *)(iVar3 + 0xe);
    *(short *)(iVar3 + 0xc) = *(short *)(iVar3 + 0xc) << 1;
    *(short *)(iVar3 + 0xe) = *(short *)(iVar3 + 0xe) << 1;
    *(short *)(unaff_ESI + 0x170) = *(short *)(unaff_ESI + 0x170) - (uVar1 >> 1);
    *(short *)(unaff_ESI + 0x172) = *(short *)(unaff_ESI + 0x172) - (uVar2 >> 1);
    FUN_005e43de();
  }
  return;
}

