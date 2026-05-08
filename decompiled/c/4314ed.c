
int FUN_004314ed(void)

{
  int iVar1;
  uint uVar2;
  uint uVar3;
  
  iVar1 = 0;
  uVar2 = DAT_0087c3dc;
  do {
    uVar3 = uVar2 & 1;
    uVar2 = uVar2 >> 1;
    iVar1 = iVar1 + (uint)(uVar3 != 0);
    uVar3 = DAT_0087c3e0;
  } while (uVar2 != 0);
  do {
    uVar2 = uVar3 >> 1;
    iVar1 = iVar1 + (uint)((uVar3 & 1) != 0);
    uVar3 = uVar2;
  } while (uVar2 != 0);
  return iVar1;
}

