
void FUN_0040d3a0(void)

{
  LONG LVar1;
  int local_8;
  
  for (local_8 = 0; local_8 < 4; local_8 = local_8 + 1) {
    FUN_0040d575(local_8);
  }
  if (DAT_005ebfdc != 0) {
    timeKillEvent(DAT_005ebfd8);
    timeEndPeriod(0x32);
    while( true ) {
      LVar1 = InterlockedExchange((LONG *)&DAT_005ebfe4,1);
      if (LVar1 == 0) break;
      Sleep(100);
    }
    InterlockedExchange((LONG *)&DAT_005ebfe4,0);
    DAT_005ebfdc = 0;
  }
  return;
}

