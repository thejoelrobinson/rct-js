
/* WARNING: Switch with 1 destination removed at 0x00451a36 : 256 cases all go to same destination
    */
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_004519c9(void)

{
  char *pcVar1;
  char cVar2;
  uint in_EDX;
  uint uVar3;
  int iVar4;
  
  uVar3 = in_EDX & 0xff;
  iVar4 = uVar3 * 0x260;
  if (((&DAT_00887422)[uVar3 * 0x130] & 0x80) != 0) {
    pcVar1 = &DAT_0088757d + iVar4;
    *pcVar1 = *pcVar1 + '\x01';
    if (*pcVar1 == '\0') {
      (&DAT_0088757d)[iVar4] = (&DAT_0088757d)[iVar4] + -0x10;
    }
    if (((((&DAT_0088757d)[iVar4] & 0xf) == 0) && ((&DAT_0088755d)[iVar4] != '\x03')) &&
       ((&DAT_0088755d)[iVar4] != '\x04')) {
      DAT_00971e86._0_2_ = (&DAT_00887442)[uVar3 * 0x130];
      unique0x00017200 = (&DAT_00887444)[uVar3 * 0x98];
      FUN_0042c711();
    }
  }
  cVar2 = (&DAT_0088755c)[iVar4];
  if (((cVar2 == '\0') || (cVar2 == '\a')) || (cVar2 == '\x06')) {
    (&DAT_00887422)[uVar3 * 0x130] = (&DAT_00887422)[uVar3 * 0x130] | 0x80;
    (&DAT_0088751d)[iVar4] = (&DAT_0088751d)[iVar4] | 0x1c;
    (&DAT_0088755d)[iVar4] = 1;
    (&DAT_00887563)[iVar4] = cVar2;
    FUN_004518fc();
  }
  return;
}

