
bool FUN_004110f6(int param_1)

{
  int iVar1;
  bool bVar2;
  
  if (DAT_005ec158 == (int *)0x0) {
    bVar2 = false;
  }
  else {
    FUN_0041107f();
    if ((DAT_005ec160 == 0) && (param_1 != 0)) {
      iVar1 = (**(code **)(*DAT_005ec158 + 0x34))
                        (DAT_005ec158,*(undefined4 *)(param_1 + 0x104),FUN_00410fc7,0,0x80);
      bVar2 = iVar1 == 0;
    }
    else {
      iVar1 = (**(code **)(*DAT_005ec158 + 0x34))(DAT_005ec158,DAT_005f0320,FUN_00410fc7,0,0);
      bVar2 = iVar1 == 0;
    }
  }
  return bVar2;
}

