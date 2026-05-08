
void FUN_00401000(void)

{
  BYTE BVar1;
  LSTATUS LVar2;
  int iVar3;
  uint uVar4;
  uint uVar5;
  BYTE *pBVar6;
  BYTE *pBVar7;
  HKEY local_50;
  undefined4 local_4c;
  DWORD local_48;
  DWORD local_44;
  BYTE local_40 [63];
  undefined1 local_1;
  
  FUN_00402bd5();
  FUN_00401120(0);
  LVar2 = RegOpenKeyA((HKEY)0x80000002,s_Software_Fish_Technology_Group_R_005e90a0,&local_50);
  if (LVar2 == 0) {
    local_48 = 4;
    local_4c = 0;
    LVar2 = RegQueryValueExA(local_50,s_CDKey_005e9098,(LPDWORD)0x0,&local_44,(LPBYTE)&local_4c,
                             &local_48);
    if (LVar2 == 0) {
      DAT_005eee38 = local_4c;
    }
    RegCloseKey(local_50);
  }
  LVar2 = RegOpenKeyA((HKEY)0x80000003,s__DEFAULT_Software_Microsoft_MS_S_005e9060,&local_50);
  if (LVar2 == 0) {
    local_48 = 0x40;
    LVar2 = RegQueryValueExA(local_50,s_DefName_005e9058,(LPDWORD)0x0,&local_44,local_40,&local_48);
    if (LVar2 == 0) {
      uVar4 = 0xffffffff;
      local_1 = 0;
      pBVar6 = local_40;
      do {
        pBVar7 = pBVar6;
        if (uVar4 == 0) break;
        uVar4 = uVar4 - 1;
        pBVar7 = pBVar6 + 1;
        BVar1 = *pBVar6;
        pBVar6 = pBVar7;
      } while (BVar1 != '\0');
      uVar4 = ~uVar4;
      pBVar6 = pBVar7 + -uVar4;
      pBVar7 = &DAT_005eee40;
      for (uVar5 = uVar4 >> 2; uVar5 != 0; uVar5 = uVar5 - 1) {
        *(undefined4 *)pBVar7 = *(undefined4 *)pBVar6;
        pBVar6 = pBVar6 + 4;
        pBVar7 = pBVar7 + 4;
      }
      for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
        *pBVar7 = *pBVar6;
        pBVar6 = pBVar6 + 1;
        pBVar7 = pBVar7 + 1;
      }
    }
    RegCloseKey(local_50);
  }
  iVar3 = FUN_00403c2a();
  while (iVar3 != 0) {
    FUN_00402bef();
    FUN_004385d8();
    if (DAT_005e9104 != 0) {
      FUN_0040179d();
    }
    iVar3 = FUN_00403c2a();
  }
  FUN_004061b9();
  return;
}

