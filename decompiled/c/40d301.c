
undefined4 FUN_0040d301(void)

{
  undefined4 uVar1;
  int local_8;
  
  if (DAT_005ebfdc == 0) {
    for (local_8 = 0; local_8 < 4; local_8 = local_8 + 1) {
      *(undefined4 *)(&DAT_005f03a0 + local_8 * 0x16c) = 0;
    }
    DAT_005ebfd8 = timeSetEvent(0x32,10,FUN_0040c8a6,0,1);
    if (DAT_005ebfd8 == 0) {
      uVar1 = 0;
    }
    else {
      DAT_005ebfdc = 1;
      uVar1 = 1;
    }
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}

