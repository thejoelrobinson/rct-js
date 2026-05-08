
void FUN_00407a41(int *param_1)

{
  if (*param_1 != 0) {
    (**(code **)(*(int *)*param_1 + 8))(*param_1);
    *param_1 = 0;
    FUN_0040dd0c(param_1);
  }
  return;
}

