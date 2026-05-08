
undefined6 FUN_005cfac7(void)

{
  byte *pbVar1;
  undefined *puVar2;
  undefined4 in_EAX;
  undefined2 uVar4;
  undefined4 uVar3;
  short in_CX;
  ushort uVar5;
  short sVar6;
  ushort uVar7;
  byte bVar8;
  uint uVar9;
  byte *unaff_ESI;
  byte *pbVar10;
  int iVar11;
  
  DAT_00652470 = unaff_ESI[7];
  uVar9 = *(ushort *)(unaff_ESI + 5) & 0xf;
  puVar2 = (&PTR_DAT_00652498)[unaff_ESI[4]];
  iVar11 = (uint)unaff_ESI[4] * 10;
  sVar6 = (short)in_EAX;
  uVar4 = (undefined2)((uint)in_EAX >> 0x10);
  switch(*unaff_ESI & 3) {
  case 0:
    uVar3 = CONCAT22(uVar4,(sVar6 + *(short *)(&DAT_00653efd + iVar11)) -
                           *(short *)(puVar2 + uVar9 * 10 + 1));
    uVar5 = (in_CX + *(short *)(&DAT_00653eff + iVar11)) - *(short *)(puVar2 + uVar9 * 10 + 3);
    break;
  case 1:
    uVar3 = CONCAT22(uVar4,(sVar6 + *(short *)(&DAT_00653eff + iVar11)) -
                           *(short *)(puVar2 + uVar9 * 10 + 3));
    uVar5 = (in_CX - *(short *)(&DAT_00653efd + iVar11)) + *(short *)(puVar2 + uVar9 * 10 + 1);
    break;
  case 2:
    uVar3 = CONCAT22(uVar4,(sVar6 - *(short *)(&DAT_00653efd + iVar11)) +
                           *(short *)(puVar2 + uVar9 * 10 + 1));
    uVar5 = (in_CX - *(short *)(&DAT_00653eff + iVar11)) + *(short *)(puVar2 + uVar9 * 10 + 3);
    break;
  case 3:
    uVar3 = CONCAT22(uVar4,(sVar6 - *(short *)(&DAT_00653eff + iVar11)) +
                           *(short *)(puVar2 + uVar9 * 10 + 3));
    uVar5 = (in_CX + *(short *)(&DAT_00653efd + iVar11)) - *(short *)(puVar2 + uVar9 * 10 + 1);
  }
  sVar6 = ((ushort)unaff_ESI[2] * 4 - *(short *)(puVar2 + uVar9 * 10 + 5)) +
          *(short *)(&DAT_00653efb + iVar11);
  uVar7 = CONCAT11((&DAT_00653ef8)[iVar11],(&DAT_00653ef8)[iVar11]) & 0x4ff;
  uVar9 = CONCAT11((char)(uVar7 >> 8),(char)uVar7 + *unaff_ESI) & 0xffffff03;
  bVar8 = (byte)(uVar9 >> 8);
  DAT_00652471 = (byte)uVar9 | bVar8;
  if (bVar8 == 0) {
    uVar3 = CONCAT22((short)((uint)uVar3 >> 0x10),
                     (short)uVar3 + (&DAT_00652478)[(uint)DAT_00652471 * 2]);
    uVar5 = uVar5 + (&DAT_0065247a)[(uint)DAT_00652471 * 2];
  }
  uVar5 = uVar5 << 7 | uVar5 >> 9 | (ushort)uVar3;
  pbVar10 = (byte *)(&DAT_00971ef4)[(ushort)(uVar5 >> 5 | uVar5 << 0xb)];
  do {
    if ((((*pbVar10 & 0x3c) == 8) && (pbVar10[7] == unaff_ESI[7])) && ((pbVar10[5] & 0xf) == 0)) {
      iVar11 = (uint)pbVar10[4] * 10;
      uVar5 = CONCAT11((&DAT_00653ef7)[iVar11],(&DAT_00653ef7)[iVar11]) & 0x4ff;
      uVar9 = CONCAT11((char)(uVar5 >> 8),(char)uVar5 + *pbVar10) & 0xffffff03;
      if (((byte)((byte)uVar9 | (byte)(uVar9 >> 8)) == DAT_00652471) &&
         ((ushort)((ushort)pbVar10[2] * 4 +
                  (*(short *)(&DAT_00653ef9 + iVar11) -
                  *(short *)((&PTR_DAT_00652498)[pbVar10[4]] + 5))) == sVar6)) {
        return CONCAT24((ushort)pbVar10[2] << 2,uVar3);
      }
    }
    pbVar1 = pbVar10 + 1;
    pbVar10 = pbVar10 + 8;
    if ((*pbVar1 & 0x80) != 0) {
      return CONCAT24(sVar6,uVar3);
    }
  } while( true );
}

