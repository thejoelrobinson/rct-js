
void FUN_00403370(undefined4 param_1)

{
  int local_c;
  byte local_8 [4];
  
  FUN_0040330f(param_1,&local_c,local_8);
  (&DAT_005f1b60)[local_c] = (&DAT_005f1b60)[local_c] & ~local_8[0];
  return;
}

