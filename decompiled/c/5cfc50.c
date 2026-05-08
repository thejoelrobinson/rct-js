
undefined6 FUN_005cfc50(void)

{
  byte *pbVar1;
  undefined *puVar2;
  ushort uVar3;
  undefined4 in_EAX;
  undefined2 uVar5;
  undefined4 uVar4;
  short in_CX;
  ushort uVar6;
  short sVar7;
  byte bVar8;
  uint uVar9;
  byte *unaff_ESI;
  byte *pbVar10;
  int iVar11;
  
  DAT_00652470 = unaff_ESI[7];
  uVar9 = *(ushort *)(unaff_ESI + 5) & 0xf;
  puVar2 = (&PTR_DAT_00652498)[unaff_ESI[4]];
  iVar11 = (uint)unaff_ESI[4] * 10;
  sVar7 = (short)in_EAX;
  uVar5 = (undefined2)((uint)in_EAX >> 0x10);
  switch(*unaff_ESI & 3) {
  case 0:
    uVar4 = CONCAT22(uVar5,sVar7 - *(short *)(puVar2 + uVar9 * 10 + 1));
    uVar6 = in_CX - *(short *)(puVar2 + uVar9 * 10 + 3);
    break;
  case 1:
    uVar4 = CONCAT22(uVar5,sVar7 - *(short *)(puVar2 + uVar9 * 10 + 3));
    uVar6 = in_CX + *(short *)(puVar2 + uVar9 * 10 + 1);
    break;
  case 2:
    uVar4 = CONCAT22(uVar5,sVar7 + *(short *)(puVar2 + uVar9 * 10 + 1));
    uVar6 = in_CX + *(short *)(puVar2 + uVar9 * 10 + 3);
    break;
  case 3:
    uVar4 = CONCAT22(uVar5,sVar7 + *(short *)(puVar2 + uVar9 * 10 + 3));
    uVar6 = in_CX - *(short *)(puVar2 + uVar9 * 10 + 1);
  }
  sVar7 = ((ushort)unaff_ESI[2] * 4 - *(short *)(puVar2 + uVar9 * 10 + 5)) +
          *(short *)(&DAT_00653ef9 + iVar11);
  uVar3 = CONCAT11((&DAT_00653ef7)[iVar11],(&DAT_00653ef7)[iVar11]) & 0x4ff;
  uVar9 = CONCAT11((char)(uVar3 >> 8),(char)uVar3 + *unaff_ESI) & 0xffffff03;
  DAT_00652471 = (byte)uVar9 | (byte)(uVar9 >> 8);
  bVar8 = DAT_00652471 ^ 2;
  if ((bVar8 & 4) == 0) {
    uVar4 = CONCAT22((short)((uint)uVar4 >> 0x10),(short)uVar4 + (&DAT_00652478)[(uint)bVar8 * 2]);
    uVar6 = uVar6 + (&DAT_0065247a)[(uint)bVar8 * 2];
  }
  uVar3 = (ushort)uVar4;
  uVar6 = uVar6 << 7 | uVar6 >> 9 | uVar3;
  pbVar10 = (byte *)(&DAT_00971ef4)[(ushort)(uVar6 >> 5 | uVar6 << 0xb)];
  do {
    if ((((*pbVar10 & 0x3c) == 8) && (pbVar10[7] == unaff_ESI[7])) &&
       ((&PTR_DAT_00652498)[pbVar10[4]][(*(ushort *)(pbVar10 + 5) & 0xf) * 10 + 10] == -1)) {
      iVar11 = (uint)pbVar10[4] * 10;
      uVar6 = CONCAT11((&DAT_00653ef8)[iVar11],(&DAT_00653ef8)[iVar11]) & 0x4ff;
      uVar9 = CONCAT11((char)(uVar6 >> 8),(char)uVar6 + *pbVar10) & 0xffffff03;
      if (((byte)((byte)uVar9 | (byte)(uVar9 >> 8)) == DAT_00652471) &&
         ((ushort)((ushort)pbVar10[2] * 4 +
                  (*(short *)(&DAT_00653efb + iVar11) -
                  *(short *)((&PTR_DAT_00652498)[pbVar10[4]] + (pbVar10[5] & 0xf) * 10 + 5))) ==
          sVar7)) {
        switch(*pbVar10 & 3) {
        case 0:
          sVar7 = uVar3 - *(short *)(&DAT_00653efd + (uint)pbVar10[4] * 10);
          break;
        case 1:
          sVar7 = uVar3 - *(short *)(&DAT_00653eff + (uint)pbVar10[4] * 10);
          break;
        case 2:
          sVar7 = uVar3 + *(short *)(&DAT_00653efd + (uint)pbVar10[4] * 10);
          break;
        case 3:
          sVar7 = uVar3 + *(short *)(&DAT_00653eff + (uint)pbVar10[4] * 10);
        }
        return CONCAT24((ushort)pbVar10[2] * 4 +
                        (*(short *)((&PTR_DAT_00652498)[pbVar10[4]] + 5) -
                        *(short *)((&PTR_DAT_00652498)[pbVar10[4]] +
                                  (*(ushort *)(pbVar10 + 5) & 0xf) * 10 + 5)),CONCAT22(sVar7,uVar3))
        ;
      }
    }
    pbVar1 = pbVar10 + 1;
    pbVar10 = pbVar10 + 8;
    if ((*pbVar1 & 0x80) != 0) {
      return CONCAT24(sVar7,uVar4);
    }
  } while( true );
}

