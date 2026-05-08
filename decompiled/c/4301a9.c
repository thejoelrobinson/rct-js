
void FUN_004301a9(void)

{
  int iVar1;
  uint *puVar2;
  
  puVar2 = (uint *)&DAT_0099c16c;
  iVar1 = 0xe84;
  do {
    *puVar2 = (*puVar2 << 5 | *puVar2 >> 0x1b) + 0xc6c6c6c7;
    puVar2 = puVar2 + 1;
    iVar1 = iVar1 + -1;
  } while (iVar1 != 0);
  return;
}

