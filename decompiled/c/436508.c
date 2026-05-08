
void FUN_00436508(void)

{
  uint uVar1;
  int iVar2;
  undefined2 *puVar3;
  undefined2 *puVar4;
  undefined2 *puVar5;
  bool bVar6;
  
  uVar1 = (uint)DAT_008ae938;
  bVar6 = false;
  if (uVar1 != 0) {
    puVar3 = &DAT_008ad1c8;
    while( true ) {
      while ((*(code *)(&PTR_LAB_00628ab0)[*(byte *)((int)puVar3 + 1)])(), !bVar6) {
        bVar6 = (undefined2 *)0xfffffff9 < puVar3;
        puVar3 = puVar3 + 3;
        uVar1 = uVar1 - 1;
        if (uVar1 == 0) {
          return;
        }
      }
      DAT_008ae938 = DAT_008ae938 - 1;
      uVar1 = uVar1 - 1;
      if (uVar1 == 0) break;
      iVar2 = (int)((longlong)(int)uVar1 * 3);
      bVar6 = (longlong)iVar2 != (longlong)(int)uVar1 * 3;
      puVar4 = puVar3 + 3;
      puVar5 = puVar3;
      for (; iVar2 != 0; iVar2 = iVar2 + -1) {
        *puVar5 = *puVar4;
        puVar4 = puVar4 + 1;
        puVar5 = puVar5 + 1;
      }
    }
  }
  return;
}

