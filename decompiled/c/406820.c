
undefined4 FUN_00406820(void)

{
  int iVar1;
  undefined4 uVar2;
  int iVar3;
  int local_34;
  undefined1 local_2c [4];
  byte local_28;
  undefined4 local_24;
  undefined4 local_20;
  undefined4 local_1c;
  undefined4 local_18;
  undefined4 local_14;
  
  iVar1 = FUN_004108b9();
  if (iVar1 == 0) {
    uVar2 = 0;
  }
  else {
    local_34 = 0;
    DAT_005ebed4 = FUN_004133c0(DAT_005ec120 * 0x1c);
    if (DAT_005ebed4 == 0) {
      uVar2 = 0;
    }
    else {
      FUN_00410908();
      while (iVar1 = FUN_0041091d(), iVar1 != 0) {
        iVar3 = FUN_0041095e(iVar1);
        if (iVar3 != 0) {
          iVar3 = FUN_004109c9(iVar1,local_2c);
          if (iVar3 == 0) {
            return 0;
          }
          FUN_00410780();
          *(int *)(DAT_005ebed4 + local_34 * 0x1c) = iVar1;
          if ((local_28 & 4) == 0) {
            *(undefined4 *)(DAT_005ebed4 + 4 + local_34 * 0x1c) = 0;
          }
          else {
            *(undefined4 *)(DAT_005ebed4 + 4 + local_34 * 0x1c) = 1;
          }
          *(undefined4 *)(DAT_005ebed4 + 8 + local_34 * 0x1c) = local_24;
          *(undefined4 *)(DAT_005ebed4 + 0xc + local_34 * 0x1c) = local_20;
          *(undefined4 *)(DAT_005ebed4 + 0x10 + local_34 * 0x1c) = local_1c;
          *(undefined4 *)(DAT_005ebed4 + 0x14 + local_34 * 0x1c) = local_18;
          *(undefined4 *)(DAT_005ebed4 + 0x18 + local_34 * 0x1c) = local_14;
          local_34 = local_34 + 1;
        }
      }
      DAT_005ebed0 = local_34;
      DAT_005ec168 = 4;
      uVar2 = 1;
    }
  }
  return uVar2;
}

