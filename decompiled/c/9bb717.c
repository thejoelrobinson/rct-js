
void FUN_009bb717(void)

{
  uint uVar1;
  undefined2 *puVar2;
  undefined2 *puVar3;
  
  puVar3 = (undefined2 *)(&DAT_005f2000 + (uint)DAT_008dff1c * 4);
  uVar1 = (uint)DAT_008dff18;
  puVar2 = DAT_008dff14;
  do {
    *puVar3 = *puVar2;
    *(undefined1 *)(puVar3 + 1) = *(undefined1 *)(puVar2 + 1);
    puVar2 = (undefined2 *)((int)puVar2 + 3);
    puVar3 = puVar3 + 2;
    uVar1 = uVar1 - 1;
  } while (uVar1 != 0);
  FUN_00405cc0(&DAT_005f2000,10,0xec);
  return;
}

