
bool FUN_00410618(int *param_1,int param_2,int param_3)

{
  bool bVar1;
  
  bVar1 = DAT_005ec0e4 != (HDC)0x0;
  if (bVar1) {
    BitBlt(DAT_005ec0e4,param_2,param_3,param_1[2] - *param_1,param_1[3] - param_1[1],DAT_005ec0e8,
           *param_1,param_1[1],0xcc0020);
  }
  return bVar1;
}

