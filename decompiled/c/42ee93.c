
int FUN_0042ee93(void)

{
  int iVar1;
  uint uVar2;
  uint uVar3;
  uint uVar4;
  byte *pbVar5;
  
  iVar1 = FUN_004083b5(&DAT_0099a888);
  if (iVar1 == -1) {
    iVar1 = FUN_004083b5(&DAT_0099aa88);
    if (iVar1 != -1) {
      DAT_005f8d3a = iVar1;
      iVar1 = FUN_004083e1(&DAT_0099a888);
      if (iVar1 != -1) {
        DAT_005f8d3e = iVar1;
        uVar2 = FUN_00408254(DAT_005f8d3a,0);
        FUN_00408210(DAT_005f8d3a,0);
        do {
          uVar3 = uVar2;
          if (0x10000 < uVar2) {
            uVar3 = 0x10000;
          }
          FUN_00408276(DAT_005f8d3a,&DAT_00981efc,uVar3);
          pbVar5 = &DAT_00981efc;
          uVar4 = uVar3;
          do {
            *pbVar5 = *pbVar5 >> 4 | *pbVar5 << 4;
            pbVar5 = pbVar5 + 1;
            uVar4 = uVar4 - 1;
          } while (uVar4 != 0);
          FUN_00408342(DAT_005f8d3e,&DAT_00981efc,uVar3);
          uVar2 = uVar2 - uVar3;
        } while (uVar2 != 0);
        FUN_00408387(DAT_005f8d3a);
        iVar1 = FUN_00408387(DAT_005f8d3e);
        return iVar1;
      }
      iVar1 = FUN_00408387(DAT_005f8d3a);
    }
  }
  else {
    iVar1 = FUN_00408387(iVar1);
  }
  return iVar1;
}

