
uint FUN_00456603(void)

{
  byte bVar1;
  uint uVar2;
  ushort uVar3;
  ushort uVar4;
  int unaff_ESI;
  byte *pbVar5;
  
  if (((*(byte *)(unaff_ESI + 0xc6) & 8) != 0) && (0xb < *(byte *)(unaff_ESI + 0xe2))) {
    if ((*(byte *)(unaff_ESI + 0x29) & 0x18) == 0) {
      uVar3 = *(ushort *)(unaff_ESI + 0x26) << 7 | *(ushort *)(unaff_ESI + 0x26) >> 9 |
              *(ushort *)(unaff_ESI + 0x24);
      pbVar5 = (byte *)(&DAT_00971ef4)[(ushort)(uVar3 >> 5 | uVar3 << 0xb)];
      bVar1 = *pbVar5;
      while ((bVar1 & 0x3c) != 0) {
        pbVar5 = pbVar5 + 8;
        bVar1 = *pbVar5;
      }
      if (*(byte *)(unaff_ESI + 0x28) != pbVar5[2]) {
        return 0xffffffff;
      }
      if ((*(byte *)(unaff_ESI + 0x29) & 4) == 0) {
        if ((pbVar5[4] & 0x1f) != 0) {
          return 0xffffffff;
        }
      }
      else if ((pbVar5[4] & 0x1f) != (&DAT_00630b41)[*(byte *)(unaff_ESI + 0x29) & 3]) {
        return 0xffffffff;
      }
    }
    uVar2 = FUN_005df40c();
    uVar2 = uVar2 & 3;
    if (((byte)DAT_00632f08 >> uVar2 & 1) != 0) {
      uVar4 = *(short *)(unaff_ESI + 0x24) + (&DAT_00652478)[uVar2 * 2];
      uVar3 = *(short *)(unaff_ESI + 0x26) + (&DAT_0065247a)[uVar2 * 2];
      if ((uVar4 < 0x1000) && (uVar3 < 0x1000)) {
        uVar4 = uVar3 * 0x80 | uVar3 >> 9 | uVar4;
        pbVar5 = (byte *)(&DAT_00971ef4)[(ushort)(uVar4 >> 5 | uVar4 << 0xb)];
        bVar1 = *pbVar5;
        while ((bVar1 & 0x3c) != 0) {
          pbVar5 = pbVar5 + 8;
          bVar1 = *pbVar5;
        }
        if ((pbVar5[5] & 0xe0) == 0) {
          uVar3 = (ushort)pbVar5[2] - (ushort)*(byte *)(unaff_ESI + 0x28);
          if ((short)uVar3 < 0) {
            uVar3 = -uVar3;
          }
          if ((uVar3 < 5) && ((pbVar5[6] & 6) != 0)) {
            return uVar2;
          }
        }
      }
    }
    uVar2 = uVar2 + 1 & 3;
    if (((byte)DAT_00632f08 >> uVar2 & 1) != 0) {
      uVar4 = *(short *)(unaff_ESI + 0x24) + (&DAT_00652478)[uVar2 * 2];
      uVar3 = *(short *)(unaff_ESI + 0x26) + (&DAT_0065247a)[uVar2 * 2];
      if ((uVar4 < 0x1000) && (uVar3 < 0x1000)) {
        uVar4 = uVar3 * 0x80 | uVar3 >> 9 | uVar4;
        pbVar5 = (byte *)(&DAT_00971ef4)[(ushort)(uVar4 >> 5 | uVar4 << 0xb)];
        bVar1 = *pbVar5;
        while ((bVar1 & 0x3c) != 0) {
          pbVar5 = pbVar5 + 8;
          bVar1 = *pbVar5;
        }
        if ((pbVar5[5] & 0xe0) == 0) {
          uVar3 = (ushort)pbVar5[2] - (ushort)*(byte *)(unaff_ESI + 0x28);
          if ((short)uVar3 < 0) {
            uVar3 = -uVar3;
          }
          if ((uVar3 < 5) && ((pbVar5[6] & 6) != 0)) {
            return uVar2;
          }
        }
      }
    }
    uVar2 = uVar2 + 1 & 3;
    if (((byte)DAT_00632f08 >> uVar2 & 1) != 0) {
      uVar4 = *(short *)(unaff_ESI + 0x24) + (&DAT_00652478)[uVar2 * 2];
      uVar3 = *(short *)(unaff_ESI + 0x26) + (&DAT_0065247a)[uVar2 * 2];
      if ((uVar4 < 0x1000) && (uVar3 < 0x1000)) {
        uVar4 = uVar3 * 0x80 | uVar3 >> 9 | uVar4;
        pbVar5 = (byte *)(&DAT_00971ef4)[(ushort)(uVar4 >> 5 | uVar4 << 0xb)];
        bVar1 = *pbVar5;
        while ((bVar1 & 0x3c) != 0) {
          pbVar5 = pbVar5 + 8;
          bVar1 = *pbVar5;
        }
        if ((pbVar5[5] & 0xe0) == 0) {
          uVar3 = (ushort)pbVar5[2] - (ushort)*(byte *)(unaff_ESI + 0x28);
          if ((short)uVar3 < 0) {
            uVar3 = -uVar3;
          }
          if ((uVar3 < 5) && ((pbVar5[6] & 6) != 0)) {
            return uVar2;
          }
        }
      }
    }
    uVar2 = uVar2 + 1 & 3;
    if (((byte)DAT_00632f08 >> uVar2 & 1) != 0) {
      uVar4 = *(short *)(unaff_ESI + 0x24) + (&DAT_00652478)[uVar2 * 2];
      uVar3 = *(short *)(unaff_ESI + 0x26) + (&DAT_0065247a)[uVar2 * 2];
      if ((uVar4 < 0x1000) && (uVar3 < 0x1000)) {
        uVar4 = uVar3 * 0x80 | uVar3 >> 9 | uVar4;
        pbVar5 = (byte *)(&DAT_00971ef4)[(ushort)(uVar4 >> 5 | uVar4 << 0xb)];
        bVar1 = *pbVar5;
        while ((bVar1 & 0x3c) != 0) {
          pbVar5 = pbVar5 + 8;
          bVar1 = *pbVar5;
        }
        if ((pbVar5[5] & 0xe0) == 0) {
          uVar3 = (ushort)pbVar5[2] - (ushort)*(byte *)(unaff_ESI + 0x28);
          if ((short)uVar3 < 0) {
            uVar3 = -uVar3;
          }
          if ((uVar3 < 5) && ((pbVar5[6] & 6) != 0)) {
            return uVar2;
          }
        }
      }
    }
  }
  return 0xffffffff;
}

