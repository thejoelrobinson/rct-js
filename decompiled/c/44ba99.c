
void FUN_0044ba99(void)

{
  int iVar1;
  uint uVar2;
  uint uVar3;
  short sVar4;
  short sVar5;
  short sVar6;
  int unaff_ESI;
  int iVar7;
  
  iVar1 = *(int *)(unaff_ESI + 0x1c);
  iVar7 = iVar1 + 0x40;
  sVar6 = *(short *)(iVar1 + 0x42);
  sVar4 = *(short *)(iVar1 + 0x44) - sVar6;
  uVar3 = *(uint *)(unaff_ESI + 0x10) >> 4;
  sVar5 = 8;
  do {
    uVar2 = uVar3 & 1;
    uVar3 = uVar3 >> 1;
    if (uVar2 == 0) {
      *(short *)(iVar7 + 2) = sVar6;
      sVar6 = sVar6 + sVar4;
      *(short *)(iVar7 + 4) = sVar6;
      sVar6 = sVar6 + 1;
    }
    iVar7 = iVar7 + 0x10;
    sVar5 = sVar5 + -1;
  } while (sVar5 != 0);
  return;
}

