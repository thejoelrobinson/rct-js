
void FUN_00415580(undefined **param_1)

{
  VirtualFree(param_1[4],0,0x8000);
  if ((undefined **)PTR_LOOP_005ee520 == param_1) {
    PTR_LOOP_005ee520 = param_1[1];
  }
  if (param_1 != &PTR_LOOP_005ec500) {
    *(undefined **)param_1[1] = *param_1;
    *(undefined **)(*param_1 + 4) = param_1[1];
    HeapFree(DAT_005f3e44,0,param_1);
    return;
  }
  DAT_005ec510 = 0xffffffff;
  return;
}

