
void FUN_0043803e(void)

{
  int iVar1;
  undefined4 *puVar2;
  
  iVar1 = 0x4000;
  puVar2 = DAT_00628c44;
  do {
    *puVar2 = 0xa0a0a0a;
    puVar2 = puVar2 + 1;
    iVar1 = iVar1 + -1;
  } while (iVar1 != 0);
  DAT_00628c48 = 0;
  return;
}

