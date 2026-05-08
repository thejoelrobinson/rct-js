
bool FUN_0040efca(int *param_1,int *param_2)

{
  bool bVar1;
  
  bVar1 = DAT_005ec080 != (HDC)0x0;
  if (bVar1) {
    StretchDIBits(DAT_005ec080,*param_2,param_2[1],param_2[2] - *param_2,param_2[3] - param_2[1],
                  *param_1,DAT_005ec08c - param_1[3],param_1[2] - *param_1,param_1[3] - param_1[1],
                  DAT_005ec088,DAT_005ec084,0,0xcc0020);
  }
  return bVar1;
}

