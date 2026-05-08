
void FUN_0042f6df(void)

{
  char in_AL;
  int iVar1;
  
  if (DAT_005f88ac == 0x400) {
    iVar1 = FUN_00408342(DAT_005f88a4,&DAT_005f88b0,0x400);
    if (iVar1 != 0x400) {
      DAT_005f88af = 1;
    }
    DAT_005f88a8 = (char *)&DAT_005f88b0;
    DAT_005f88ac = 0;
  }
  *DAT_005f88a8 = in_AL;
  DAT_005f8d36._0_1_ = (char)DAT_005f8d36 + in_AL;
  DAT_005f8d36 = DAT_005f8d36 << 3 | (uint)(DAT_005f8d36._1_3_ >> 0x15);
  DAT_005f88a8 = DAT_005f88a8 + 1;
  DAT_005f88ac = DAT_005f88ac + 1;
  return;
}

