
void FUN_0040904c(undefined4 *param_1)

{
  if ((*(short *)(param_1 + 3) != 0) && (param_1[0x20] != 0)) {
    (**(code **)(*(int *)param_1[0x20] + 0x80))(param_1[0x20],0);
    *(undefined2 *)(param_1 + 3) = 0;
    *param_1 = 0;
    *(undefined2 *)(param_1 + 2) = 0;
    *(undefined2 *)((int)param_1 + 6) = *(undefined2 *)(param_1 + 2);
    *(undefined2 *)(param_1 + 1) = 0;
    param_1[4] = 0;
    *(undefined2 *)((int)param_1 + 10) = 0;
  }
  return;
}

