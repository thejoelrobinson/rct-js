
void FUN_00414da0(void)

{
  BOOL BVar1;
  uint uVar2;
  uint uVar3;
  uint uVar4;
  BYTE *pBVar5;
  ushort *puVar6;
  undefined4 *puVar7;
  _cpinfo local_514;
  undefined4 local_500 [64];
  undefined1 local_400 [256];
  undefined1 local_300 [256];
  ushort local_200 [256];
  
  BVar1 = GetCPInfo(DAT_005f0228,&local_514);
  if (BVar1 == 1) {
    uVar2 = 0;
    do {
      *(char *)((int)local_500 + uVar2) = (char)uVar2;
      uVar2 = uVar2 + 1;
    } while (uVar2 < 0x100);
    local_500[0]._0_1_ = 0x20;
    if (local_514.LeadByte[0] != 0) {
      pBVar5 = local_514.LeadByte + 1;
      do {
        uVar2 = (uint)local_514.LeadByte[0];
        if (uVar2 <= *pBVar5) {
          uVar3 = (*pBVar5 - uVar2) + 1;
          puVar7 = (undefined4 *)((int)local_500 + uVar2);
          for (uVar4 = uVar3 >> 2; uVar4 != 0; uVar4 = uVar4 - 1) {
            *puVar7 = 0x20202020;
            puVar7 = puVar7 + 1;
          }
          for (uVar3 = uVar3 & 3; uVar3 != 0; uVar3 = uVar3 - 1) {
            *(undefined1 *)puVar7 = 0x20;
            puVar7 = (undefined4 *)((int)puVar7 + 1);
          }
        }
        local_514.LeadByte[0] = pBVar5[1];
        pBVar5 = pBVar5 + 2;
      } while (local_514.LeadByte[0] != 0);
    }
    FUN_00417860(1,local_500,0x100,local_200,DAT_005f0228,DAT_005f022c,0);
    FUN_00416d00(DAT_005f022c,0x100,local_500,0x100,local_400,0x100,DAT_005f0228,0);
    FUN_00416d00(DAT_005f022c,0x200,local_500,0x100,local_300,0x100,DAT_005f0228,0);
    uVar2 = 0;
    puVar6 = local_200;
    do {
      if ((*puVar6 & 1) == 0) {
        if ((*puVar6 & 2) == 0) {
          (&DAT_005f0128)[uVar2] = 0;
        }
        else {
          *(byte *)((int)&DAT_005f0020 + uVar2 + 1) =
               *(byte *)((int)&DAT_005f0020 + uVar2 + 1) | 0x20;
          (&DAT_005f0128)[uVar2] = local_300[uVar2];
        }
      }
      else {
        *(byte *)((int)&DAT_005f0020 + uVar2 + 1) = *(byte *)((int)&DAT_005f0020 + uVar2 + 1) | 0x10
        ;
        (&DAT_005f0128)[uVar2] = local_400[uVar2];
      }
      uVar2 = uVar2 + 1;
      puVar6 = puVar6 + 1;
    } while (uVar2 < 0x100);
    return;
  }
  uVar2 = 0;
  do {
    if ((uVar2 < 0x41) || (0x5a < uVar2)) {
      if ((uVar2 < 0x61) || (0x7a < uVar2)) {
        (&DAT_005f0128)[uVar2] = 0;
      }
      else {
        *(byte *)((int)&DAT_005f0020 + uVar2 + 1) = *(byte *)((int)&DAT_005f0020 + uVar2 + 1) | 0x20
        ;
        (&DAT_005f0128)[uVar2] = (char)uVar2 + -0x20;
      }
    }
    else {
      *(byte *)((int)&DAT_005f0020 + uVar2 + 1) = *(byte *)((int)&DAT_005f0020 + uVar2 + 1) | 0x10;
      (&DAT_005f0128)[uVar2] = (char)uVar2 + ' ';
    }
    uVar2 = uVar2 + 1;
  } while (uVar2 < 0x100);
  return;
}

