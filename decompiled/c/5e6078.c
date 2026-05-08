
undefined4 FUN_005e6078(void)

{
  undefined4 uVar1;
  undefined4 uVar2;
  char cVar3;
  undefined4 unaff_EBX;
  int unaff_ESI;
  char *unaff_EDI;
  undefined6 uVar4;
  undefined4 uVar5;
  int iVar6;
  
  DAT_005f54f0 = 0xffff;
  iVar6 = 0;
  uVar1 = FUN_005e3ace();
  uVar5 = unaff_EBX;
  uVar2 = uVar1;
  if (unaff_ESI != 0) {
    uVar4 = FUN_005e3874();
    uVar1 = (undefined4)uVar4;
    if ((short)((uint6)uVar4 >> 0x20) == -1) goto LAB_005e6105;
    if (*unaff_EDI == '\f') {
      if ((DAT_00991f30 >> 3 & 1) == 0) {
        FUN_005e613e();
        cVar3 = (char)unaff_EBX;
        if (((cVar3 == '\x02') || (cVar3 == '\b')) || (cVar3 == '\x03')) {
          iVar6 = CONCAT31((int3)((uint)iVar6 >> 8),3);
        }
      }
      else {
        iVar6 = CONCAT31((int3)((uint)iVar6 >> 8),DAT_00991f5b);
      }
      goto LAB_005e6105;
    }
  }
  if ((((*unaff_EDI == '\x01') && ((*(ushort *)(unaff_ESI + 0x32) & 0x80) != 0)) &&
      ((short)(*(short *)(unaff_ESI + 0x20) + *(short *)(unaff_ESI + 0x24) + -0x13) <= (short)uVar1)
      ) && ((short)(*(short *)(unaff_ESI + 0x22) + *(short *)(unaff_ESI + 0x26) + -0x13) <=
            (short)unaff_EBX)) {
    iVar6 = 5;
  }
LAB_005e6105:
  FUN_005e65cf(iVar6,uVar5);
  if (DAT_00991f36 == '\b') {
    iVar6 = 5;
  }
  if ((char)iVar6 != DAT_00991f34) {
    DAT_00991f34 = (char)iVar6;
    uVar2 = FUN_00404ba4((&DAT_009a1550)[iVar6]);
  }
  return uVar2;
}

