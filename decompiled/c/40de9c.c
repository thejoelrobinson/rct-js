
int FUN_0040de9c(uint param_1)

{
  int iVar1;
  
  if (DAT_005ec050 == (uint *)0x0) {
    iVar1 = 0;
  }
  else if (param_1 < *DAT_005ec050) {
    iVar1 = (int)DAT_005ec050 + DAT_005ec050[param_1 + 1];
  }
  else {
    iVar1 = 0;
  }
  return iVar1;
}

