
undefined1 FUN_0042f91e(void)

{
  undefined1 uVar1;
  
  if (DAT_005f88ac == 0) {
    FUN_00408276(DAT_005f88a4,&DAT_005f88b0,0x400);
    DAT_005f88ac = 0x400;
    DAT_005f88a8 = &DAT_005f88b0;
  }
  uVar1 = *(undefined1 *)DAT_005f88a8;
  DAT_005f88ac = DAT_005f88ac + -1;
  DAT_005f88a8 = (undefined4 *)((int)DAT_005f88a8 + 1);
  return uVar1;
}

