
bool FUN_0041058e(int *param_1,int *param_2)

{
  bool bVar1;
  
  bVar1 = DAT_005ec0e4 != (HDC)0x0;
  if (bVar1) {
    BitBlt(DAT_005ec0e4,*param_2,param_2[1],param_2[2] - *param_2,param_2[3] - param_2[1],
           DAT_005ec0e8,*param_1,param_1[1],0xcc0020);
  }
  return bVar1;
}

