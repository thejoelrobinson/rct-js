
void FUN_0041107f(void)

{
  if (DAT_005ec14c != 0) {
    while (DAT_005ec14c != 0) {
      DAT_005ec150 = *(int *)(DAT_005ec14c + 0x4c);
      FUN_00413470(DAT_005ec14c);
      DAT_005ec14c = DAT_005ec150;
    }
    DAT_005ec154 = 0;
    DAT_005ec150 = 0;
    DAT_005ec14c = 0;
    DAT_005ec148 = 0;
  }
  return;
}

