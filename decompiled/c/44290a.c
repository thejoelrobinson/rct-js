
void FUN_0044290a(void)

{
  char *pcVar1;
  ushort uVar2;
  int iVar3;
  
  for (uVar2 = DAT_0087c398; uVar2 != 0xffff; uVar2 = (&DAT_00743b98)[(uint)uVar2 * 0x80]) {
    iVar3 = (uint)uVar2 * 0x100;
    if ((((&DAT_00743bc2)[iVar3] == '\0') && ((&DAT_00743bbe)[iVar3] == '\0')) &&
       ((&DAT_00743bbf)[iVar3] == '\x06')) {
      pcVar1 = &DAT_00743c89 + iVar3;
      *pcVar1 = *pcVar1 + '\x01';
      if (*pcVar1 == '\0') {
        (&DAT_00743c89)[iVar3] = (&DAT_00743c89)[iVar3] + -1;
      }
    }
  }
  return;
}

