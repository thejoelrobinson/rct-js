
void FUN_005e5f51(void)

{
  short sVar1;
  short sVar2;
  int iVar3;
  short sVar4;
  short sVar5;
  undefined *puVar6;
  
  puVar6 = &DAT_009a013c;
  sVar5 = 8;
  do {
    if (DAT_009a1164 <= puVar6) {
      return;
    }
    if ((short)(*(short *)(puVar6 + 0x20) + 10) < DAT_00971ed6) {
      sVar4 = *(short *)(puVar6 + 0x22) + 10;
      if ((*(ushort *)(puVar6 + 0x32) & 3) != 0) {
        sVar4 = *(short *)(puVar6 + 0x22) + -0x18;
      }
      if (DAT_00971ed8 <= sVar4) goto LAB_005e5f90;
    }
    else {
LAB_005e5f90:
      sVar4 = *(short *)(puVar6 + 0x20);
      sVar1 = *(short *)(puVar6 + 0x22);
      *(short *)(puVar6 + 0x20) = sVar5;
      *(short *)(puVar6 + 0x22) = sVar5 + 0x1e;
      sVar5 = sVar5 + 8;
      iVar3 = *(int *)(puVar6 + 8);
      if (iVar3 != 0) {
        sVar2 = *(short *)(puVar6 + 0x22);
        *(short *)(iVar3 + 4) = *(short *)(iVar3 + 4) - (sVar4 - *(short *)(puVar6 + 0x20));
        *(short *)(iVar3 + 6) = *(short *)(iVar3 + 6) - (sVar1 - sVar2);
      }
    }
    puVar6 = puVar6 + 0x178;
  } while( true );
}

