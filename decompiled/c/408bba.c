
undefined4 FUN_00408bba(void)

{
  int iVar1;
  undefined4 uVar2;
  
  if (DAT_005ebf30 == (int *)0x0) {
    uVar2 = 0;
  }
  else {
    DAT_005ebf58 = 0;
    iVar1 = (**(code **)(*DAT_005ebf30 + 0x20))(DAT_005ebf30,0,0,0,FUN_00408b9d);
    uVar2 = DAT_005ebf58;
    if (iVar1 != 0) {
      uVar2 = 0;
    }
  }
  return uVar2;
}

