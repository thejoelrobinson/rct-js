
void FUN_0040dd0c(int param_1)

{
  undefined4 local_8;
  
  if (DAT_005ec054 == param_1) {
    if (DAT_005ec058 == param_1) {
      DAT_005ec058 = 0;
    }
    DAT_005ec054 = *(int *)(param_1 + 0x10);
  }
  else {
    for (local_8 = DAT_005ec054; *(int *)(local_8 + 0x10) != param_1;
        local_8 = *(int *)(local_8 + 0x10)) {
    }
    if (DAT_005ec058 == param_1) {
      DAT_005ec058 = local_8;
      *(undefined4 *)(local_8 + 0x10) = 0;
    }
    else {
      *(undefined4 *)(local_8 + 0x10) = *(undefined4 *)(param_1 + 0x10);
    }
  }
  *(undefined4 *)(param_1 + 0x10) = 0;
  return;
}

