
bool FUN_004109c9(undefined4 param_1,undefined4 *param_2)

{
  int iVar1;
  bool bVar2;
  
  _memset(param_2,0,0x28);
  *param_2 = 0x28;
  if (DAT_005ec158 == (int *)0x0) {
    bVar2 = false;
  }
  else {
    iVar1 = (**(code **)(*DAT_005ec158 + 0x3c))(DAT_005ec158,param_2);
    bVar2 = iVar1 == 0;
  }
  return bVar2;
}

