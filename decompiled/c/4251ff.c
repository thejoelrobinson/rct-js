
void FUN_004251ff(void)

{
  byte *pbVar1;
  byte bVar2;
  ushort in_AX;
  ushort in_CX;
  byte bVar3;
  ushort uVar4;
  byte *pbVar5;
  byte *unaff_EDI;
  byte *pbVar6;
  
  if ((in_AX < 0x1000) && (in_CX < 0x1000)) {
    uVar4 = in_CX << 7 | in_CX >> 9 | in_AX;
    pbVar5 = (byte *)(&DAT_00971ef4)[(ushort)(uVar4 >> 5 | uVar4 << 0xb)];
    bVar3 = *pbVar5;
    while ((bVar3 & 0x3c) != 0) {
      pbVar5 = pbVar5 + 8;
      bVar3 = *pbVar5;
    }
    bVar3 = pbVar5[7] & 0xf0;
    if ((pbVar5[7] & 0x20) == 0) {
      uVar4 = in_CX << 7 | in_CX >> 9 | in_AX;
      unaff_EDI = (byte *)(&DAT_00971ef4)[(ushort)(uVar4 >> 5 | uVar4 << 0xb)];
      do {
        if (((*unaff_EDI & 0x3c) == 0x10) && (unaff_EDI[4] == 2)) goto LAB_00425371;
        pbVar6 = unaff_EDI + 8;
        pbVar1 = unaff_EDI + 1;
        unaff_EDI = pbVar6;
      } while ((*pbVar1 & 0x80) == 0);
      if ((ushort)(in_AX - 0x20) < 0x1000) {
        uVar4 = in_CX << 7 | in_CX >> 9 | in_AX - 0x20;
        unaff_EDI = (byte *)(&DAT_00971ef4)[(ushort)(uVar4 >> 5 | uVar4 << 0xb)];
        bVar2 = *unaff_EDI;
        while ((bVar2 & 0x3c) != 0) {
          unaff_EDI = unaff_EDI + 8;
          bVar2 = *unaff_EDI;
        }
        if ((unaff_EDI[7] & 0x20) != 0) {
          bVar3 = bVar3 | 8;
        }
      }
      uVar4 = in_CX - 0x20;
      if (uVar4 < 0x1000) {
        uVar4 = uVar4 * 0x80 | uVar4 >> 9 | in_AX;
        unaff_EDI = (byte *)(&DAT_00971ef4)[(ushort)(uVar4 >> 5 | uVar4 << 0xb)];
        bVar2 = *unaff_EDI;
        while ((bVar2 & 0x3c) != 0) {
          unaff_EDI = unaff_EDI + 8;
          bVar2 = *unaff_EDI;
        }
        if ((unaff_EDI[7] & 0x20) != 0) {
          bVar3 = bVar3 | 4;
        }
      }
      if ((ushort)(in_AX + 0x20) < 0x1000) {
        uVar4 = in_CX << 7 | in_CX >> 9 | in_AX + 0x20;
        unaff_EDI = (byte *)(&DAT_00971ef4)[(ushort)(uVar4 >> 5 | uVar4 << 0xb)];
        bVar2 = *unaff_EDI;
        while ((bVar2 & 0x3c) != 0) {
          unaff_EDI = unaff_EDI + 8;
          bVar2 = *unaff_EDI;
        }
        if ((unaff_EDI[7] & 0x20) != 0) {
          bVar3 = bVar3 | 2;
        }
      }
      uVar4 = in_CX + 0x20;
      if (uVar4 < 0x1000) {
        uVar4 = uVar4 * 0x80 | uVar4 >> 9 | in_AX;
        unaff_EDI = (byte *)(&DAT_00971ef4)[(ushort)(uVar4 >> 5 | uVar4 << 0xb)];
        bVar2 = *unaff_EDI;
        while ((bVar2 & 0x3c) != 0) {
          unaff_EDI = unaff_EDI + 8;
          bVar2 = *unaff_EDI;
        }
        if ((unaff_EDI[7] & 0x20) != 0) {
          bVar3 = bVar3 | 1;
        }
      }
    }
LAB_00425371:
    if (bVar3 != pbVar5[7]) {
      FUN_005e56d3(pbVar5,unaff_EDI);
    }
    pbVar5[7] = bVar3;
  }
  return;
}

