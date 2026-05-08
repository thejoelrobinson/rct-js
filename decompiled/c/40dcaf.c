
void FUN_0040dcaf(int param_1)

{
  if (DAT_005ec054 == 0) {
    DAT_005ec054 = param_1;
    DAT_005ec058 = param_1;
    *(undefined4 *)(param_1 + 0x10) = 0;
  }
  else {
    *(int *)(DAT_005ec058 + 0x10) = param_1;
    DAT_005ec058 = param_1;
    *(undefined4 *)(param_1 + 0x10) = 0;
  }
  return;
}

