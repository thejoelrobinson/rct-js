
int FUN_00408d19(int param_1)

{
  int iVar1;
  
  DAT_005f0954 = param_1;
  iVar1 = (**(code **)(*DAT_005ebf30 + 0x20))(DAT_005ebf30,0,0,0,FUN_00408c1c);
  if (iVar1 == 0) {
    iVar1 = param_1 + DAT_005ebf58;
  }
  return iVar1;
}

