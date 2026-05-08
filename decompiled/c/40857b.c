
void FUN_0040857b(int param_1,undefined1 *param_2)

{
  undefined1 uVar1;
  int local_124;
  char local_120 [280];
  int local_8;
  
  GetCurrentDirectoryA(0x117,local_120);
  uVar1 = FUN_00413700((int)local_120[0]);
  *param_2 = uVar1;
  GetLogicalDriveStringsA(0x117,local_120);
  local_8 = 0;
  for (local_124 = 0; local_124 < 8; local_124 = local_124 + 1) {
    uVar1 = FUN_00413700((int)local_120[local_8]);
    *(undefined1 *)(local_124 + param_1) = uVar1;
    if (local_120[local_8] != '\0') {
      for (; local_120[local_8] != '\0'; local_8 = local_8 + 1) {
      }
      local_8 = local_8 + 1;
    }
  }
  *(undefined1 *)(param_1 + 8) = 0;
  return;
}

