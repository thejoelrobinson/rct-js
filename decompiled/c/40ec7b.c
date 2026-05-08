
void FUN_0040ec7b(int param_1,int param_2,int param_3,undefined4 *param_4)

{
  int local_c;
  
  for (local_c = param_2; local_c < param_3 + param_2; local_c = local_c + 1) {
    *(undefined4 *)(*(int *)(param_1 + 0x88) + 0x28 + local_c * 4) = *param_4;
    param_4 = param_4 + 1;
  }
  return;
}

