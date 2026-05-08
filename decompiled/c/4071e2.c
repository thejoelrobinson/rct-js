
undefined4 FUN_004071e2(void)

{
  int iVar1;
  
  DAT_005ebee8 = 0;
  if (DAT_005ebf00 != (int *)0x0) {
    iVar1 = (**(code **)(*DAT_005ebf00 + 0x24))(DAT_005ebf00,0x100,&DAT_005f1180);
    if (iVar1 == 0) {
      DAT_005ebee8 = 1;
    }
    else if ((iVar1 == -0x7ff8ffe2) || (iVar1 == -0x7ff8fff4)) {
      FUN_0040704d();
    }
  }
  return DAT_005ebee8;
}

