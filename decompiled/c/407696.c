
void FUN_00407696(void)

{
  FUN_00407a7d();
  if (DAT_005ec060 != (int *)0x0) {
    (**(code **)(*DAT_005ec060 + 8))(DAT_005ec060);
    DAT_005ec060 = (int *)0x0;
  }
  if (DAT_005ec064 != (int *)0x0) {
    (**(code **)(*DAT_005ec064 + 8))(DAT_005ec064);
    DAT_005ec064 = (int *)0x0;
  }
  if (DAT_005ec05c != (int *)0x0) {
    (**(code **)(*DAT_005ec05c + 8))(DAT_005ec05c);
    DAT_005ec05c = (int *)0x0;
  }
  return;
}

