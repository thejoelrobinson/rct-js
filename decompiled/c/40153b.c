
int FUN_0040153b(int param_1)

{
  int iVar1;
  int local_c;
  int local_8;
  
  iVar1 = FUN_00401220(param_1);
  local_8 = param_1;
  if (iVar1 == 0) {
    do {
      local_8 = local_8 + -1;
      local_c = param_1 + 1;
      if ((0 < local_8) && (iVar1 = FUN_00401220(local_8), iVar1 != 0)) {
        return local_8;
      }
      if ((local_c < 8) && (iVar1 = FUN_00401220(local_c), iVar1 != 0)) {
        return local_c;
      }
      param_1 = local_c;
    } while (local_c < 8 || 0 < local_8);
    param_1 = 0;
  }
  return param_1;
}

