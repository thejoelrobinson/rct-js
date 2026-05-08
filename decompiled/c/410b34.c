
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00410b34(void)

{
  if (DAT_005ec138 != 0) {
    while (DAT_005ec138 != 0) {
      DAT_005ec13c = *(int *)(DAT_005ec138 + 0x108);
      FUN_00413470(DAT_005ec138);
      DAT_005ec138 = DAT_005ec13c;
    }
    DAT_005ec140 = 0;
    DAT_005ec13c = 0;
    DAT_005ec138 = 0;
    _DAT_005ec134 = 0;
  }
  return;
}

