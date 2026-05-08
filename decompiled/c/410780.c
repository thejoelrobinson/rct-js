
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00410780(void)

{
  if (DAT_005ec158 != (int *)0x0) {
    if (DAT_005ec15c != 0) {
      DAT_005ec15c = 0;
      (**(code **)(*DAT_005ec158 + 0x20))(DAT_005ec158,DAT_005ec170);
    }
    if (DAT_005ec160 != 0) {
      (**(code **)(*DAT_005ec158 + 0x10))(DAT_005ec158);
      DAT_005ec160 = 0;
      _DAT_005ec164 = 0;
    }
    (**(code **)(*DAT_005ec158 + 8))(DAT_005ec158);
    DAT_005ec158 = (int *)0x0;
  }
  return;
}

