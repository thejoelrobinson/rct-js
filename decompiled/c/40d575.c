
undefined4 FUN_0040d575(int param_1)

{
  LONG LVar1;
  
  *(undefined4 *)(&DAT_005f03a0 + param_1 * 0x16c) = 0;
  *(undefined4 *)(&DAT_005f0500 + param_1 * 0x16c) = 1;
  while( true ) {
    LVar1 = InterlockedExchange((LONG *)&DAT_005ebfe4,1);
    if (LVar1 == 0) break;
    Sleep(10);
  }
  if (*(int *)(&DAT_005f04c0 + param_1 * 0x16c) != 0) {
    FUN_004123ff(&DAT_005f04c0 + param_1 * 0x16c,&DAT_005f04bc + param_1 * 0x16c);
  }
  if (*(int *)(&DAT_005ebfe8 + param_1 * 4) != 0) {
    (**(code **)(**(int **)(&DAT_005ebfe8 + param_1 * 4) + 0x48))
              (*(undefined4 *)(&DAT_005ebfe8 + param_1 * 4));
    (**(code **)(**(int **)(&DAT_005ebfe8 + param_1 * 4) + 8))
              (*(undefined4 *)(&DAT_005ebfe8 + param_1 * 4));
    *(undefined4 *)(&DAT_005ebfe8 + param_1 * 4) = 0;
  }
  InterlockedExchange((LONG *)&DAT_005ebfe4,0);
  return 1;
}

