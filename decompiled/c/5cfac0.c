
undefined6 FUN_005cfac0(void)

{
  byte *pbVar1;
  undefined4 in_EAX;
  ushort in_CX;
  ushort uVar2;
  short in_DX;
  uint unaff_EBX;
  uint uVar3;
  byte *pbVar4;
  int iVar5;
  
  DAT_00652471 = (byte)unaff_EBX;
  if ((unaff_EBX & 4) == 0) {
    in_EAX = CONCAT22((short)((uint)in_EAX >> 0x10),(short)in_EAX + (&DAT_00652478)[unaff_EBX * 2]);
    in_CX = in_CX + (&DAT_0065247a)[unaff_EBX * 2];
  }
  uVar2 = in_CX << 7 | in_CX >> 9 | (ushort)in_EAX;
  pbVar4 = (byte *)(&DAT_00971ef4)[(ushort)(uVar2 >> 5 | uVar2 << 0xb)];
  do {
    if ((((*pbVar4 & 0x3c) == 8) && (pbVar4[7] == DAT_00652470)) && ((pbVar4[5] & 0xf) == 0)) {
      iVar5 = (uint)pbVar4[4] * 10;
      uVar2 = CONCAT11((&DAT_00653ef7)[iVar5],(&DAT_00653ef7)[iVar5]) & 0x4ff;
      uVar3 = CONCAT11((char)(uVar2 >> 8),(char)uVar2 + *pbVar4) & 0xffffff03;
      if (((byte)((byte)uVar3 | (byte)(uVar3 >> 8)) == (byte)unaff_EBX) &&
         ((ushort)((ushort)pbVar4[2] * 4 +
                  (*(short *)(&DAT_00653ef9 + iVar5) -
                  *(short *)((&PTR_DAT_00652498)[pbVar4[4]] + 5))) == in_DX)) {
        return CONCAT24((ushort)pbVar4[2] << 2,in_EAX);
      }
    }
    pbVar1 = pbVar4 + 1;
    pbVar4 = pbVar4 + 8;
    if ((*pbVar1 & 0x80) != 0) {
      return CONCAT24(in_DX,in_EAX);
    }
  } while( true );
}

