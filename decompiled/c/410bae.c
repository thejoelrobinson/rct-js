
undefined4 FUN_00410bae(void)

{
  int iVar1;
  undefined4 local_80;
  undefined4 local_7c;
  undefined4 local_78;
  undefined4 local_74;
  undefined4 local_70;
  
  if (DAT_005ec158 != (int *)0x0) {
    FUN_00410b34();
    _memset(&local_80,0,0x7c);
    local_80 = 0x7c;
    local_7c = DAT_005e9048;
    local_78 = DAT_005e904c;
    local_74 = DAT_005e9050;
    local_70 = DAT_005e9054;
    iVar1 = (**(code **)(*DAT_005ec158 + 0x38))(DAT_005ec158,&local_80,5000,FUN_00410a33,0,1);
    if ((iVar1 == 0) || (iVar1 == -0x7788ff24)) {
      return 1;
    }
  }
  return 0;
}

