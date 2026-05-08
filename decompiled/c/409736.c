
void FUN_00409736(int param_1,undefined4 param_2)

{
  if ((*(short *)(param_1 + 0xc) != 0) && (*(int *)(param_1 + 0x80) != 0)) {
    (**(code **)(**(int **)(param_1 + 0x80) + 0x68))(*(undefined4 *)(param_1 + 0x80),param_2);
    *(undefined2 *)(param_1 + 0xc) = 0;
  }
  return;
}

