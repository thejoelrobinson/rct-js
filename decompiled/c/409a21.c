
void FUN_00409a21(int param_1)

{
  int *local_10;
  int *local_c;
  int *local_8;
  
  if ((param_1 != 0) && (DAT_005ebf48 != (int *)0x0)) {
    local_8 = DAT_005ebf48;
    local_10 = (int *)0x0;
    local_c = (int *)0x0;
    while ((local_8 != (int *)0x0 && (local_10 == (int *)0x0))) {
      if (*local_8 == param_1) {
        local_10 = local_8;
      }
      else {
        local_c = local_8;
        local_8 = (int *)local_8[2];
      }
    }
    if (local_8 != (int *)0x0) {
      (**(code **)(*(int *)local_8[1] + 8))(local_8[1]);
      FUN_00413470(param_1);
      if (local_c == (int *)0x0) {
        DAT_005ebf48 = (int *)local_8[2];
      }
      else {
        local_c[2] = local_8[2];
      }
      FUN_00413470(local_8);
    }
  }
  return;
}

