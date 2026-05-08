
void FUN_0040c8a6(undefined4 param_1,undefined4 param_2,undefined4 param_3,undefined4 param_4,
                 undefined4 param_5)

{
  LONG LVar1;
  int local_8;
  
  LVar1 = InterlockedExchange((LONG *)&DAT_005ebfe4,1);
  if (LVar1 == 0) {
    for (local_8 = 0; local_8 < 4; local_8 = local_8 + 1) {
      if (*(int *)(&DAT_005f03a0 + local_8 * 0x16c) != 0) {
        FUN_0040bc20(param_1,param_2,param_3,param_4,param_5,local_8);
      }
    }
    InterlockedExchange((LONG *)&DAT_005ebfe4,0);
  }
  return;
}

