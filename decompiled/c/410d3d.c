
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_00410d3d(int param_1)

{
  int iVar1;
  DWORD DVar2;
  DWORD DVar3;
  undefined4 uVar4;
  undefined4 local_80;
  undefined4 local_7c;
  undefined4 local_78;
  undefined4 local_74;
  undefined4 local_70;
  undefined4 local_6c;
  undefined4 local_60;
  undefined1 local_5c [88];
  
  if ((DAT_005ec158 == (int *)0x0) || (DAT_005ec160 != 0)) {
    uVar4 = 0;
  }
  else {
    _memset(&local_80,0,0x7c);
    local_80 = 0x7c;
    local_7c = DAT_005e9048;
    local_78 = DAT_005e904c;
    local_74 = DAT_005e9050;
    local_70 = DAT_005e9054;
    local_6c = *(undefined4 *)(param_1 + 0x104);
    local_60 = 1;
    iVar1 = (**(code **)(*DAT_005ec158 + 0x50))(DAT_005ec158,&local_80);
    if (iVar1 == 0) {
      DAT_005f0320 = local_6c;
      DAT_005ec160 = 1;
      _DAT_005ec164 = 0;
      FUN_00413170(&DAT_005f0300,local_5c);
      DVar2 = GetTickCount();
      do {
        DVar3 = GetTickCount();
      } while (DVar3 < DVar2 + 300);
      FUN_004110f6(0);
      uVar4 = 1;
    }
    else {
      uVar4 = 0;
    }
  }
  return uVar4;
}

