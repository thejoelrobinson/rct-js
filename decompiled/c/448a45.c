
void FUN_00448a45(void)

{
  byte *pbVar1;
  uint uVar2;
  char cVar3;
  ushort in_AX;
  ushort in_CX;
  byte in_DL;
  char in_DH;
  byte bVar4;
  byte bVar5;
  uint unaff_EBX;
  ushort uVar6;
  byte *unaff_ESI;
  
  DAT_00630bc8 = (byte *)0xffffffff;
  DAT_00630bd0 = (byte *)0xffffffff;
  bVar4 = unaff_ESI[2];
  DAT_00630bd8 = in_DH;
LAB_00448a65:
  bVar5 = (byte)unaff_EBX;
  if ((((*unaff_ESI & 0x3c) == 4) &&
      (DAT_00630bc8 = unaff_ESI, DAT_00630bcc = in_AX, DAT_00630bce = in_CX,
      DAT_00630bd4 = unaff_EBX, (unaff_ESI[4] & 4) != 0)) && ((unaff_ESI[4] & 3) == bVar5)) {
    bVar4 = bVar4 + 4;
  }
  in_AX = in_AX + (&DAT_00652478)[unaff_EBX * 2];
  in_CX = in_CX + (&DAT_0065247a)[unaff_EBX * 2];
  uVar6 = in_CX * 0x80 | in_CX >> 9 | in_AX;
  unaff_ESI = (byte *)(&DAT_00971ef4)[(ushort)(uVar6 >> 5 | uVar6 << 0xb)];
  do {
    if ((unaff_ESI != DAT_00630bd0) && ((*unaff_ESI & 0x3c) == 4)) {
      if (bVar4 == unaff_ESI[2]) {
        if (((unaff_ESI[4] & 4) == 0) || ((unaff_ESI[4] & 3) == bVar5)) goto LAB_00448b0e;
        goto LAB_00448b71;
      }
      if ((byte)(bVar4 - 4) == unaff_ESI[2]) break;
    }
    pbVar1 = unaff_ESI + 1;
    unaff_ESI = unaff_ESI + 8;
    if ((*pbVar1 & 0x80) != 0) goto LAB_00448b71;
  } while( true );
  if (((unaff_ESI[4] & 4) == 0) || ((unaff_ESI[4] & 3 ^ 2) != bVar5)) goto LAB_00448b71;
  bVar4 = bVar4 - 4;
LAB_00448b0e:
  if (unaff_ESI[4] >> 4 != 0) goto LAB_00448b71;
  unaff_ESI[4] = unaff_ESI[4] & 0xf7;
  uVar6 = (ushort)unaff_EBX;
  if ((unaff_ESI[((int)(short)(uVar6 ^ 2) >> 3) + 6] >> ((uVar6 ^ 2) & 7) & 1) == 0)
  goto LAB_00448b71;
  unaff_ESI[7] = in_DL;
  cVar3 = DAT_00630bd8;
  unaff_ESI[5] = unaff_ESI[5] & 0x8f;
  unaff_ESI[5] = unaff_ESI[5] | cVar3 << 4;
  if (DAT_00630bd0 == (byte *)0xffffffff) {
    DAT_00630bd0 = unaff_ESI;
  }
  if ((((unaff_ESI[((int)(short)uVar6 >> 3) + 6] >> (uVar6 & 7) & 1) == 0) &&
      (unaff_EBX = CONCAT31((int3)(unaff_EBX >> 8),bVar5 + 1) & 0xffffff03,
      (unaff_ESI[((int)(short)(ushort)unaff_EBX >> 3) + 6] >> ((ushort)unaff_EBX & 7) & 1) == 0)) &&
     (unaff_EBX = unaff_EBX ^ 2,
     (unaff_ESI[((int)(short)(ushort)unaff_EBX >> 3) + 6] >> ((ushort)unaff_EBX & 7) & 1) == 0)) {
LAB_00448b71:
    uVar2 = DAT_00630bd4;
    pbVar1 = DAT_00630bc8;
    if (((in_DL != 0xff) && (DAT_00630bc8 != (byte *)0xffffffff)) && ((DAT_00630bc8[4] & 0xf0) == 0)
       ) {
      DAT_00630bc8[4] = DAT_00630bc8[4] | 8;
      *pbVar1 = *pbVar1 & 0x3f;
      *pbVar1 = *pbVar1 | (char)uVar2 << 6;
      FUN_004364c2();
    }
    return;
  }
  goto LAB_00448a65;
}

