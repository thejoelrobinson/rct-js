
void FUN_00418c80(int param_1,undefined4 *param_2)

{
  if (param_1 == 0) {
    if ((param_2[3] & 0x1000) != 0) {
      FUN_00417140(param_2);
    }
  }
  else if ((param_2[3] & 0x1000) != 0) {
    FUN_00417140(param_2);
    param_2[6] = 0;
    param_2[3] = param_2[3] & 0xffffeeff;
    *param_2 = 0;
    param_2[2] = 0;
    return;
  }
  return;
}

