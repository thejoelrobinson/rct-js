
void FUN_004571c1(void)

{
  byte *pbVar1;
  byte bVar2;
  ushort uVar3;
  ushort uVar4;
  int unaff_ESI;
  uint uVar5;
  int iVar6;
  
  uVar4 = DAT_0087c398;
  while (uVar4 != 0xffff) {
    uVar5 = (uint)uVar4;
    iVar6 = uVar5 * 0x100;
    if (((&DAT_00743bc2)[iVar6] == '\0') && ((&DAT_00743ba2)[uVar5 * 0x80] != -0x8000)) {
      uVar4 = (&DAT_00743ba6)[uVar5 * 0x80] - *(short *)(unaff_ESI + 0x12);
      if ((short)uVar4 < 0) {
        uVar4 = -uVar4;
      }
      if (uVar4 < 0x31) {
        uVar4 = (&DAT_00743ba2)[uVar5 * 0x80] - *(short *)(unaff_ESI + 0xe);
        if ((short)uVar4 < 0) {
          uVar4 = -uVar4;
        }
        uVar3 = (&DAT_00743ba4)[uVar5 * 0x80] - *(short *)(unaff_ESI + 0x10);
        if ((short)uVar3 < 0) {
          uVar3 = -uVar3;
        }
        if ((uVar4 < 0x61) && (uVar3 < 0x61)) {
          if ((&DAT_00743bbf)[iVar6] == '\x05') {
            pbVar1 = &DAT_00743bcf + iVar6;
            bVar2 = *pbVar1;
            *pbVar1 = *pbVar1 + 4;
            if (0xfb < bVar2) {
              (&DAT_00743bcf)[iVar6] = 0xff;
            }
          }
          else if ((&DAT_00743bbf)[iVar6] == '\x06') {
            *(short *)(&DAT_00743c0e + iVar6) = *(short *)(&DAT_00743c0e + iVar6) + -200;
            pbVar1 = &DAT_00743bcf + iVar6;
            bVar2 = *pbVar1;
            *pbVar1 = *pbVar1 + 3;
            if (0xfc < bVar2) {
              (&DAT_00743bcf)[iVar6] = 0xff;
            }
          }
        }
      }
    }
    uVar4 = (&DAT_00743b98)[uVar5 * 0x80];
  }
  return;
}

