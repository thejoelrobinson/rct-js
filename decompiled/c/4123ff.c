
undefined4 FUN_004123ff(int *param_1,int *param_2)

{
  if (*param_2 != 0) {
    GlobalFree((HGLOBAL)*param_2);
    *param_2 = 0;
  }
  if (*param_1 != 0) {
    mmioClose((HMMIO)*param_1,0);
    *param_1 = 0;
  }
  return 0;
}

