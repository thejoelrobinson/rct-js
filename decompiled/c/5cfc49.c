
undefined6 FUN_005cfc49(void)

{
  byte *pbVar1;
  ushort uVar2;
  short sVar3;
  undefined4 in_EAX;
  ushort in_CX;
  ushort uVar4;
  short in_DX;
  uint unaff_EBX;
  uint uVar5;
  byte *pbVar6;
  int iVar7;
  
  DAT_00652471 = (byte)unaff_EBX;
  uVar5 = unaff_EBX ^ 2;
  if ((uVar5 & 4) == 0) {
    in_EAX = CONCAT22((short)((uint)in_EAX >> 0x10),(short)in_EAX + (&DAT_00652478)[uVar5 * 2]);
    in_CX = in_CX + (&DAT_0065247a)[uVar5 * 2];
  }
  uVar2 = (ushort)in_EAX;
  uVar4 = in_CX << 7 | in_CX >> 9 | uVar2;
  pbVar6 = (byte *)(&DAT_00971ef4)[(ushort)(uVar4 >> 5 | uVar4 << 0xb)];
  do {
    if ((((*pbVar6 & 0x3c) == 8) && (pbVar6[7] == DAT_00652470)) &&
       ((&PTR_DAT_00652498)[pbVar6[4]][(*(ushort *)(pbVar6 + 5) & 0xf) * 10 + 10] == -1)) {
      iVar7 = (uint)pbVar6[4] * 10;
      uVar4 = CONCAT11((&DAT_00653ef8)[iVar7],(&DAT_00653ef8)[iVar7]) & 0x4ff;
      uVar5 = CONCAT11((char)(uVar4 >> 8),(char)uVar4 + *pbVar6) & 0xffffff03;
      if (((byte)((byte)uVar5 | (byte)(uVar5 >> 8)) == (byte)unaff_EBX) &&
         ((ushort)((ushort)pbVar6[2] * 4 +
                  (*(short *)(&DAT_00653efb + iVar7) -
                  *(short *)((&PTR_DAT_00652498)[pbVar6[4]] + (pbVar6[5] & 0xf) * 10 + 5))) == in_DX
         )) {
        switch(*pbVar6 & 3) {
        case 0:
          sVar3 = uVar2 - *(short *)(&DAT_00653efd + (uint)pbVar6[4] * 10);
          break;
        case 1:
          sVar3 = uVar2 - *(short *)(&DAT_00653eff + (uint)pbVar6[4] * 10);
          break;
        case 2:
          sVar3 = uVar2 + *(short *)(&DAT_00653efd + (uint)pbVar6[4] * 10);
          break;
        case 3:
          sVar3 = uVar2 + *(short *)(&DAT_00653eff + (uint)pbVar6[4] * 10);
        }
        return CONCAT24((ushort)pbVar6[2] * 4 +
                        (*(short *)((&PTR_DAT_00652498)[pbVar6[4]] + 5) -
                        *(short *)((&PTR_DAT_00652498)[pbVar6[4]] +
                                  (*(ushort *)(pbVar6 + 5) & 0xf) * 10 + 5)),CONCAT22(sVar3,uVar2));
      }
    }
    pbVar1 = pbVar6 + 1;
    pbVar6 = pbVar6 + 8;
    if ((*pbVar1 & 0x80) != 0) {
      return CONCAT24(in_DX,in_EAX);
    }
  } while( true );
}

