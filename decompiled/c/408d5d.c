
undefined4 FUN_00408d5d(void)

{
  int iVar1;
  undefined4 uVar2;
  int local_10;
  int local_8;
  
  local_8 = DAT_005ebf48;
  iVar1 = (**(code **)(*DAT_005ebf34 + 0x6c))(DAT_005ebf34);
  if (iVar1 == 0) {
    if (DAT_005ebf54 == 0) {
      for (local_10 = 0; local_10 < DAT_005f0950; local_10 = local_10 + 1) {
        iVar1 = (**(code **)(**(int **)(DAT_005ebf38 + local_10 * 4) + 0x6c))
                          (*(undefined4 *)(DAT_005ebf38 + local_10 * 4));
        if (iVar1 != 0) {
          return 0;
        }
      }
    }
    else {
      iVar1 = (**(code **)(*DAT_005ebf40 + 0x6c))(DAT_005ebf40);
      if (iVar1 != 0) {
        return 0;
      }
      FUN_004119a0(DAT_005ebf40,s_InternalCursor_005ebfb8);
    }
    for (; local_8 != 0; local_8 = *(int *)(local_8 + 8)) {
      iVar1 = (**(code **)(**(int **)(local_8 + 4) + 0x6c))(*(undefined4 *)(local_8 + 4));
      if (iVar1 != 0) {
        return 0;
      }
    }
    uVar2 = 1;
  }
  else {
    uVar2 = 0;
  }
  return uVar2;
}

