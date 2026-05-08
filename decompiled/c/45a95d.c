
void FUN_0045a95d(void)

{
  ushort uVar1;
  short *psVar2;
  undefined1 uVar3;
  short in_AX;
  byte bVar4;
  short in_CX;
  int iVar5;
  uint uVar6;
  uint uVar7;
  byte *pbVar8;
  short unaff_BP;
  ushort *puVar9;
  byte *pbVar10;
  short *psVar11;
  undefined1 *puVar12;
  bool bVar13;
  
  if (*(short *)(DAT_00981ef8 + 0xe) != 0) {
    return;
  }
  DAT_0064baf8 = DAT_0064baf8 + 1;
  uVar7 = 0;
  psVar11 = &DAT_006439d8;
  uVar6 = 0xffffffff;
  do {
    if (*(uint *)(psVar11 + 7) <= uVar6) {
      uVar6 = *(uint *)(psVar11 + 7);
      DAT_0064bafc = uVar7;
      DAT_0064bb00 = psVar11;
    }
    psVar2 = DAT_0064bb00;
    if ((((in_AX == *psVar11) && (DAT_00971e86 == *(int *)(psVar11 + 1))) &&
        (DAT_00971e8a == *(int *)(psVar11 + 3))) &&
       ((in_CX == psVar11[5] && (unaff_BP == psVar11[6])))) {
      *(int *)(psVar11 + 7) = DAT_0064baf8;
      return;
    }
    uVar7 = uVar7 + 1;
    psVar11 = psVar11 + 0x409;
  } while (uVar7 < 0x10);
  *DAT_0064bb00 = in_AX;
  *(int *)(psVar2 + 1) = DAT_00971e86;
  *(int *)(psVar2 + 3) = DAT_00971e8a;
  psVar2[5] = in_CX;
  psVar2[6] = unaff_BP;
  *(int *)(psVar2 + 7) = DAT_0064baf8;
  psVar11 = psVar2 + 9;
  for (iVar5 = 0x200; iVar5 != 0; iVar5 = iVar5 + -1) {
    psVar11[0] = 0;
    psVar11[1] = 0;
    psVar11 = psVar11 + 2;
  }
  FUN_00458bcf();
  psVar11 = DAT_0064bb00;
  uVar6 = (uint)(ushort)DAT_0064bb00[5];
  puVar9 = (ushort *)(&PTR_DAT_0064bb08)[(ushort)DAT_0064bb00[6]];
  pbVar10 = &DAT_0099a888;
LAB_0045aa35:
  do {
    do {
      while( true ) {
        while( true ) {
          bVar4 = *pbVar10;
          pbVar10 = pbVar10 + 1;
          if (bVar4 != 0) break;
          pbVar10 = &DAT_0099a888;
        }
        if ((0x9b < bVar4) || (bVar4 < 0x8e)) break;
        DAT_0064bb04 = *(undefined1 *)(DAT_0093a464 + (uint)(byte)(bVar4 + 0x72) * 4);
      }
    } while (bVar4 < 0x20);
    uVar7 = (uint)(byte)(&DAT_0099a6c8)[(byte)(bVar4 - 0x20)];
    pbVar8 = &DAT_006432d8 + (uint)(byte)(bVar4 - 0x20) * 8;
    do {
      while (uVar3 = DAT_0064bb04, uVar6 != 0) {
        uVar6 = uVar6 - 1;
        pbVar8 = pbVar8 + 1;
        uVar7 = uVar7 - 1;
        if (uVar7 == 0) goto LAB_0045aa35;
      }
      uVar1 = *puVar9;
      if (uVar1 == 0xffff) {
        return;
      }
      if (-2 < (short)uVar1) {
        puVar12 = (undefined1 *)((int)psVar11 + uVar1 + 0x12);
        bVar4 = *pbVar8;
        do {
          bVar13 = (bool)(bVar4 & 1);
          bVar4 = bVar4 >> 1;
          if (bVar13) {
            *puVar12 = uVar3;
          }
          puVar12 = puVar12 + 0x40;
        } while (bVar4 != 0);
      }
      pbVar8 = pbVar8 + 1;
      puVar9 = puVar9 + 1;
      uVar7 = uVar7 - 1;
    } while (uVar7 != 0);
  } while( true );
}

