
undefined8 FUN_0044f92c(void)

{
  byte *pbVar1;
  ushort uVar2;
  uint in_EAX;
  uint uVar3;
  ushort uVar4;
  uint in_ECX;
  uint in_EDX;
  uint uVar5;
  short *psVar6;
  ushort *puVar7;
  char *unaff_ESI;
  char *pcVar8;
  byte *pbVar9;
  char *pcVar10;
  bool bVar11;
  char *pcVar12;
  char *pcVar13;
  uint extraout_ECX;
  
  pcVar10 = (char *)((in_EDX & 0xff) * 0x260);
  uVar3 = in_EAX;
  if (pcVar10[0x887420] == '\b') {
    bVar11 = false;
    pcVar8 = unaff_ESI;
    pcVar13 = pcVar10;
    do {
      uVar4 = (ushort)in_ECX;
      uVar2 = (ushort)uVar3;
      pcVar12 = pcVar8;
      FUN_005cfc50();
      if (bVar11) break;
      uVar3 = FUN_005cfe66(pcVar8[4]);
      uVar4 = (ushort)extraout_ECX;
      uVar2 = (ushort)uVar3;
      bVar11 = pcVar10 < unaff_ESI;
      pcVar8 = pcVar10;
      pcVar12 = pcVar10;
      in_ECX = extraout_ECX;
    } while ((int)pcVar10 - (int)unaff_ESI != 0);
    pcVar10 = pcVar13;
    unaff_ESI = pcVar12;
    in_ECX = (uint)(uVar4 >> 5);
    uVar2 = CONCAT11((char)(uVar4 >> 5),(char)(uVar2 >> 5));
    uVar3 = (uint)uVar2;
    *(ushort *)(pcVar10 + 0x8874a2) = uVar2;
    pcVar10[0x8874a1] = (&DAT_00653ef7)[(uint)(byte)unaff_ESI[4] * 10] + *unaff_ESI & 3;
  }
  if (pcVar10[0x887420] == '\x14') {
    uVar5 = 0;
    psVar6 = &DAT_006522f6;
    do {
      if (*(short *)(pcVar10 + (int)(&DAT_00887462 + uVar5)) != -1) {
        *psVar6 = *(short *)(pcVar10 + (int)(&DAT_00887462 + uVar5));
        psVar6 = psVar6 + 1;
      }
      if (*(short *)(pcVar10 + (int)(&DAT_0088746a + uVar5)) != -1) {
        *psVar6 = *(short *)(pcVar10 + (int)(&DAT_0088746a + uVar5));
        psVar6 = psVar6 + 1;
      }
      uVar5 = uVar5 + 1;
    } while (uVar5 < 4);
    *psVar6 = -1;
    pcVar8 = pcVar10;
    for (puVar7 = &DAT_006522f6; uVar2 = *puVar7, uVar2 != 0xffff; puVar7 = puVar7 + 1) {
      pbVar9 = (byte *)(&DAT_00971ef4)
                       [(ushort)((ushort)((uVar2 >> 8) << 0xc | (uVar2 & 0xff) << 5) >> 5 |
                                ((ushort)((uVar2 >> 8) << 5) >> 9) << 0xb)];
      do {
        if ((((*pbVar9 & 0x3c) == 0x10) && (pbVar9[4] < 2)) && (pbVar9[2] == pcVar10[0x887452])) {
          FUN_0042688b(unaff_ESI,pcVar8,in_ECX,uVar3);
        }
        pbVar1 = pbVar9 + 1;
        pbVar9 = pbVar9 + 8;
      } while ((*pbVar1 & 0x80) == 0);
    }
  }
  return CONCAT44(in_EDX,in_EAX);
}

