
void FUN_0043018c(void)

{
  int iVar1;
  uint *puVar2;
  
  puVar2 = (uint *)&DAT_0099c16c;
  iVar1 = 0xe84;
  do {
    *puVar2 = *puVar2 + 0x39393939 >> 5 | (*puVar2 + 0x39393939) * 0x8000000;
    puVar2 = puVar2 + 1;
    iVar1 = iVar1 + -1;
  } while (iVar1 != 0);
  return;
}

