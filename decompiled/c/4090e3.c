
void FUN_004090e3(void)

{
  undefined4 uVar1;
  int iVar2;
  int iVar3;
  int local_40;
  undefined4 local_34;
  undefined4 local_30;
  int local_2c;
  int local_28;
  int local_24;
  undefined4 local_20;
  int local_1c;
  int local_18;
  int local_14;
  int local_10;
  int local_c;
  int local_8;
  
  local_10 = DAT_005f138c + DAT_005f1a10;
  local_c = DAT_005f12a4 + DAT_005f1a14;
  if (DAT_005ebf54 == 0) {
    if (1 < DAT_005f0950) {
      uVar1 = *DAT_005ebf38;
      for (local_40 = 0; local_40 < DAT_005f0950 + -1; local_40 = local_40 + 1) {
        iVar2 = (**(code **)(*(int *)DAT_005ebf38[local_40] + 0x60))(DAT_005ebf38[local_40]);
        if ((iVar2 != 0) && (iVar2 = FUN_00408d5d(), iVar2 == 0)) {
          return;
        }
        DAT_005ebf38[local_40] = DAT_005ebf38[local_40 + 1];
      }
      DAT_005ebf38[local_40] = uVar1;
    }
  }
  else if ((DAT_005f0950 < 2) || (DAT_005ebf4c != 0)) {
    if (DAT_005f12a8 != 0) {
      (**(code **)(*DAT_005ebf30 + 0x58))(DAT_005ebf30,1,0);
    }
  }
  else {
    if (DAT_005f1298 != 0) {
      if (DAT_005f12ac < local_10) {
        local_10 = DAT_005f12ac;
      }
      if (DAT_005f129c < local_c) {
        local_c = DAT_005f129c;
      }
      local_2c = local_10 - DAT_005f1a10;
      local_28 = local_c - DAT_005f1a14;
      local_30 = 0;
      local_34 = 0;
      local_20 = 0;
      local_24 = DAT_005f0ef4 * 0x40 + 0x40;
      local_1c = local_24 + local_2c;
      (&DAT_005f0f00)[DAT_005f0ef4 * 4] = DAT_005f1a10;
      (&DAT_005f0f04)[DAT_005f0ef4 * 4] = DAT_005f1a14;
      (&DAT_005f0f08)[DAT_005f0ef4 * 4] = local_10;
      (&DAT_005f0f0c)[DAT_005f0ef4 * 4] = local_c;
      local_18 = local_28;
      local_14 = local_28;
      local_8 = local_2c;
      do {
        iVar2 = (**(code **)(*DAT_005ebf40 + 0x14))
                          (DAT_005ebf40,&local_24,*DAT_005ebf38,&DAT_005f0f00 + DAT_005f0ef4 * 4,
                           0x1000000,0);
        if ((iVar2 == -0x7789fe3e) && (iVar3 = FUN_00408d5d(), iVar3 == 0)) break;
      } while (iVar2 == -0x7789fe3e);
      do {
        iVar2 = (**(code **)(*(int *)*DAT_005ebf38 + 0x14))
                          (*DAT_005ebf38,&DAT_005f0f00 + DAT_005f0ef4 * 4,DAT_005ebf40,&local_34,
                           0x1008000,0);
        if ((iVar2 == -0x7789fe3e) && (iVar3 = FUN_00408d5d(), iVar3 == 0)) break;
      } while (iVar2 == -0x7789fe3e);
    }
    do {
      iVar2 = (**(code **)(*DAT_005ebf34 + 0x2c))(DAT_005ebf34,0,1);
      if ((iVar2 == -0x7789fe3e) && (iVar3 = FUN_00408d5d(), iVar3 == 0)) break;
    } while (iVar2 == -0x7789fe3e);
    DAT_005f0ef4 = DAT_005f0ef4 + 1;
    DAT_005f12a0 = DAT_005f0ef4;
    iVar2 = DAT_005f12a8;
    if (DAT_005f0950 <= DAT_005f0ef4) {
      DAT_005f0ef4 = 0;
      DAT_005f12a0 = DAT_005f0ef4;
    }
    while (iVar2 != 0) {
      iVar2 = (**(code **)(*DAT_005ebf34 + 0x48))(DAT_005ebf34,2);
    }
    if ((&DAT_005f0f08)[DAT_005f0ef4 * 4] != (&DAT_005f0f00)[DAT_005f0ef4 * 4] &&
        -1 < (int)((&DAT_005f0f08)[DAT_005f0ef4 * 4] - (&DAT_005f0f00)[DAT_005f0ef4 * 4])) {
      local_8 = (&DAT_005f0f08)[DAT_005f0ef4 * 4] - (&DAT_005f0f00)[DAT_005f0ef4 * 4];
      local_18 = (&DAT_005f0f0c)[DAT_005f0ef4 * 4] - (&DAT_005f0f04)[DAT_005f0ef4 * 4];
      local_20 = 0;
      local_24 = DAT_005f0ef4 * 0x40 + 0x40;
      local_1c = local_24 + local_8;
      local_14 = local_18;
      do {
        iVar2 = (**(code **)(*(int *)*DAT_005ebf38 + 0x14))
                          (*DAT_005ebf38,&DAT_005f0f00 + DAT_005f0ef4 * 4,DAT_005ebf40,&local_24,
                           0x1000000,0);
        if ((iVar2 == -0x7789fe3e) && (iVar3 = FUN_00408d5d(), iVar3 == 0)) break;
      } while (iVar2 == -0x7789fe3e);
      (&DAT_005f0f00)[DAT_005f0ef4 * 4] = 0;
      (&DAT_005f0f08)[DAT_005f0ef4 * 4] = (&DAT_005f0f00)[DAT_005f0ef4 * 4];
    }
  }
  return;
}

