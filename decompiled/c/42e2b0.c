
short FUN_0042e2b0(void)

{
  byte *pbVar1;
  short sVar2;
  ushort uVar3;
  ushort uVar4;
  undefined4 uVar5;
  uint uVar6;
  uint uVar7;
  uint unaff_EBP;
  uint uVar8;
  undefined4 uVar9;
  int unaff_ESI;
  undefined1 *puVar10;
  undefined8 uVar11;
  
  uVar6 = (uint)(*(byte *)(unaff_ESI + 0x1e) >> 3);
  sVar2 = *(short *)(unaff_ESI + 0xe) + (&DAT_00652478)[uVar6 * 2];
  uVar4 = *(ushort *)(unaff_ESI + 0x12) >> 2;
  uVar8 = unaff_EBP & 0xffff0000;
  uVar7 = 0;
  do {
    uVar3 = *(short *)(unaff_ESI + 0x10) + (&DAT_0065247a)[uVar6 * 2] + (&DAT_005f8076)[uVar7 * 2];
    uVar3 = uVar3 * 0x80 | uVar3 >> 9 | sVar2 + (&DAT_005f8074)[uVar7 * 2];
    puVar10 = (undefined1 *)(&DAT_00971ef4)[(ushort)(uVar3 >> 5 | uVar3 << 0xb)];
    do {
      uVar4 = CONCAT11(*puVar10,(char)uVar4) & 0x3cff;
      if ((((char)(uVar4 >> 8) == '\x04') && ((char)uVar4 == puVar10[2])) &&
         (uVar4 = CONCAT11(puVar10[5],(char)uVar4) & 0xfff, (char)(uVar4 >> 8) == '\x05')) {
        uVar8 = CONCAT22((short)(uVar8 >> 0x10),(ushort)uVar8 | 1 << ((ushort)uVar7 & 0xf));
        break;
      }
      pbVar1 = puVar10 + 1;
      puVar10 = puVar10 + 8;
    } while ((*pbVar1 & 0x80) == 0);
    uVar7 = uVar7 + 1;
  } while (uVar7 < 8);
  uVar4 = (ushort)uVar8;
  if (uVar4 == 0) {
    return sVar2;
  }
  uVar11 = FUN_005df40c();
  uVar5 = (undefined4)((ulonglong)uVar11 >> 0x20);
  if ((*(byte *)(unaff_ESI + 0x2f) & 8) != 0) {
    return sVar2;
  }
  if ((*(byte *)(unaff_ESI + 0x2f) & 2) == 0) {
    if ((*(byte *)(unaff_ESI + 0x2f) & 0x10) == 0) {
      if ((*(byte *)(unaff_ESI + 0x2f) & 4) != 0) {
LAB_0042e38c:
        if (2 < *(ushort *)(unaff_ESI + 0x46)) {
          return sVar2;
        }
        uVar3 = (*(byte *)(unaff_ESI + 0x1e) >> 3 ^ 2) * 2;
        uVar9 = CONCAT22((short)(uVar8 >> 0x10),
                         uVar4 & ~(1 << (uVar3 & 0xf)) & ~(1 << (uVar3 + 1 & 0xf)));
        uVar6 = 0;
        do {
          if (((ushort)uVar9 >> ((ushort)uVar6 & 0xf) & 1) != 0) {
            sVar2 = FUN_0042e276(uVar9,uVar5);
          }
          if (((ushort)uVar9 >> ((ushort)uVar6 + 1 & 0xf) & 1) != 0) {
            sVar2 = FUN_0042e276(uVar9,uVar5);
          }
          uVar6 = uVar6 + 2;
        } while (uVar6 < 8);
        return sVar2;
      }
      if ((ushort)uVar11 < 0x2000) {
        return sVar2;
      }
      for (uVar6 = (uint)uVar11 & 7; (uVar4 >> (short)uVar6 & 1) == 0;
          uVar6 = (uint)((short)uVar6 + 1U & 7)) {
      }
    }
    else {
      *(short *)(unaff_ESI + 0x46) = *(short *)(unaff_ESI + 0x46) + 1;
      if (7 < *(ushort *)(unaff_ESI + 0x46)) {
        return sVar2;
      }
      uVar3 = (ushort)(byte)(*(byte *)(unaff_ESI + 0x1e) >> 3 ^ 2) * 2;
      if (((uVar4 >> (uVar3 & 0xf) & 1) == 0) && ((uVar4 >> (uVar3 + 1 & 0xf) & 1) == 0)) {
        return sVar2;
      }
    }
  }
  else {
    uVar3 = (ushort)(*(byte *)(unaff_ESI + 0x1e) >> 3) * 2;
    if (((uVar4 >> (uVar3 & 0xf) & 1) == 0) && ((uVar4 >> (uVar3 + 1 & 0xf) & 1) == 0)) {
      if ((ushort)uVar11 < 0x3333) {
        return sVar2;
      }
      if ((*(byte *)(unaff_ESI + 0x2f) & 4) != 0) goto LAB_0042e38c;
      for (uVar6 = (uint)uVar11 & 7; (uVar4 >> (short)uVar6 & 1) == 0;
          uVar6 = (uint)((short)uVar6 + 1U & 7)) {
      }
    }
  }
  sVar2 = FUN_0042e276();
  return sVar2;
}

