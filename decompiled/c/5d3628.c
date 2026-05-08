
void FUN_005d3628(void)

{
  ushort *puVar1;
  ushort uVar2;
  ushort uVar3;
  ushort uVar4;
  ushort uVar5;
  ushort uVar6;
  ushort uVar7;
  ushort uVar8;
  ushort uVar9;
  int iVar10;
  byte bVar11;
  int unaff_ESI;
  undefined1 in_CF;
  
  bVar11 = FUN_005e68e2();
  if ((bool)in_CF) {
    return;
  }
  iVar10 = *(int *)(unaff_ESI + 8);
  if (bVar11 == 1) {
    puVar1 = (ushort *)(iVar10 + 0x12);
    uVar2 = *puVar1;
    *puVar1 = *puVar1 | 1;
  }
  else {
    if (bVar11 < 2) {
      puVar1 = (ushort *)(iVar10 + 0x12);
      uVar2 = *puVar1;
      *puVar1 = *puVar1 & 0xfffe;
      puVar1 = (ushort *)(iVar10 + 0x12);
      uVar3 = *puVar1;
      *puVar1 = *puVar1 & 0xfffd;
      puVar1 = (ushort *)(iVar10 + 0x12);
      uVar4 = *puVar1;
      *puVar1 = *puVar1 & 0xfffb;
      puVar1 = (ushort *)(iVar10 + 0x12);
      uVar5 = *puVar1;
      *puVar1 = *puVar1 & 0xfff7;
      puVar1 = (ushort *)(iVar10 + 0x12);
      uVar6 = *puVar1;
      *puVar1 = *puVar1 & 0xefff;
      puVar1 = (ushort *)(iVar10 + 0x12);
      uVar7 = *puVar1;
      *puVar1 = *puVar1 & 0xffdf;
      puVar1 = (ushort *)(iVar10 + 0x12);
      uVar8 = *puVar1;
      *puVar1 = *puVar1 & 0xffef;
      puVar1 = (ushort *)(iVar10 + 0x12);
      uVar9 = *puVar1;
      *puVar1 = *puVar1 & 0xffbf;
      if ((char)(((((((((uVar2 & 1) != 0) * '\x02' + ((uVar3 >> 1 & 1) != 0)) * '\x02' +
                     ((uVar4 >> 2 & 1) != 0)) * '\x02' + ((uVar5 >> 3 & 1) != 0)) * '\x02' +
                   ((uVar6 >> 0xc & 1) != 0)) * '\x02' + ((uVar7 >> 5 & 1) != 0)) * '\x02' +
                 ((uVar8 >> 4 & 1) != 0)) * '\x02' + ((uVar9 >> 6 & 1) != 0)) == '\0') {
        return;
      }
      goto LAB_005d3692;
    }
    puVar1 = (ushort *)(iVar10 + 0x12);
    uVar2 = *puVar1 >> 5;
    *puVar1 = *puVar1 | 0x20;
  }
  if ((uVar2 & 1) != 0) {
    return;
  }
LAB_005d3692:
  FUN_005e43de();
  return;
}

