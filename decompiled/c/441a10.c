
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

uint FUN_00441a10(void)

{
  byte *pbVar1;
  short sVar2;
  char cVar3;
  byte bVar4;
  byte bVar5;
  undefined2 uVar6;
  ushort uVar7;
  uint in_EAX;
  uint uVar8;
  int in_ECX;
  int extraout_ECX;
  int extraout_ECX_00;
  uint extraout_ECX_01;
  byte extraout_DL;
  byte extraout_DL_00;
  ushort extraout_DX;
  ushort uVar9;
  uint uVar10;
  int unaff_ESI;
  uint uVar11;
  int iVar12;
  
  DAT_006293ca = '\0';
  cVar3 = (char)in_EAX;
  if ((((*(ushort *)(unaff_ESI + 0xca) >> 0xe & 1) != 0) && (*(char *)(unaff_ESI + 0xf0) == '\x03'))
     && (cVar3 == *(char *)(unaff_ESI + 0xf1))) {
    DAT_006293ca = '\x01';
  }
  uVar10 = in_EAX & 0xff;
  uVar9 = (ushort)uVar10;
  if ((*(byte *)(unaff_ESI + 0xca + ((int)(short)uVar9 >> 3)) >> (uVar9 & 7) & 1) != 0) {
    uVar10 = FUN_00440fe3();
    return uVar10;
  }
  if ((0xa3e0U >> (uVar9 & 0xf) & 1) != 0) {
    if ((*(ushort *)(unaff_ESI + 0xca) & 0xa3e0) != 0) {
      uVar9 = *(ushort *)(unaff_ESI + 0xca) & 0xa3e0;
      sVar2 = 0;
      if (uVar9 != 0) {
        for (; (uVar9 >> sVar2 & 1) == 0; sVar2 = sVar2 + 1) {
        }
      }
      uVar10 = FUN_00440fe3();
      return uVar10;
    }
    if (0x90 < *(byte *)(unaff_ESI + 0x3c)) {
      return in_EAX;
    }
  }
  if ((((0x301U >> (uVar9 & 0xf) & 1) == 0) || (DAT_008d7eb6 == '\0')) &&
     (((0x100U >> (uVar9 & 0xf) & 1) == 0 || (0xb < DAT_008d7eb0)))) {
    if (((0xa3c0U >> (uVar9 & 0xf) & 1) != 0) && (0x4b < *(byte *)(unaff_ESI + 0x3e))) {
      uVar10 = FUN_00440fe3();
      return uVar10;
    }
    if (((0x20U >> (uVar9 & 0xf) & 1) != 0) && (0x4b < *(byte *)(unaff_ESI + 0x3f))) {
      uVar10 = FUN_00440fe3();
      return uVar10;
    }
    if (((((cVar3 == '\x04') && (DAT_008d7eb6 != '\0')) ||
         ((cVar3 == '\x02' && (*(char *)(unaff_ESI + 0xc5) == -1)))) ||
        (((0x1bU >> (uVar9 & 0xf) & 1) == 0 || (DAT_006293ca != '\0')))) ||
       ((bVar4 = FUN_005df40c(), (byte)((bVar4 & 0x7f) + 0x73) <= *(byte *)(unaff_ESI + 0x3a) &&
        (in_ECX = extraout_ECX, 2 < *(byte *)(unaff_ESI + 0x2f))))) {
      if (DAT_006293ca == '\0') {
        if (in_ECX != 0) {
          if (*(int *)(unaff_ESI + 0xa0) == 0) {
            uVar10 = FUN_00440fe3();
            return uVar10;
          }
          if (*(int *)(unaff_ESI + 0xa0) < in_ECX) {
            uVar10 = FUN_00440fe3();
            return uVar10;
          }
        }
        uVar7 = *(ushort *)(&DAT_0062d582 + uVar10 * 8);
        if ('\x14' < (char)DAT_008d7eb0) {
          uVar7 = *(ushort *)(&DAT_0062d584 + uVar10 * 8);
        }
        if ((char)DAT_008d7eb0 < '\f') {
          uVar7 = *(ushort *)(&DAT_0062d586 + uVar10 * 8);
        }
        if (uVar7 < (ushort)in_ECX) {
          if (((cVar3 != '\x04') || (DAT_008d7eb6 == '\0')) &&
             (uVar7 = FUN_005df40c(), (uVar7 & 7) < extraout_DX)) {
            uVar10 = FUN_00440fe3();
            return uVar10;
          }
        }
        else {
          bVar5 = FUN_005df40c();
          bVar4 = extraout_DL;
          if ((bVar5 & 7) <= extraout_DL) {
            FUN_00440fe3();
            bVar4 = extraout_DL_00;
          }
          bVar4 = bVar4 * '\x04';
          pbVar1 = (byte *)(unaff_ESI + 0x3b);
          bVar5 = *pbVar1;
          *pbVar1 = *pbVar1 + bVar4;
          if (CARRY1(bVar5,bVar4)) {
            *(undefined1 *)(unaff_ESI + 0x3b) = 0xff;
          }
          pbVar1 = (byte *)(unaff_ESI + 0x3a);
          bVar5 = *pbVar1;
          *pbVar1 = *pbVar1 + bVar4;
          if (CARRY1(bVar5,bVar4)) {
            *(undefined1 *)(unaff_ESI + 0x3a) = 0xff;
          }
        }
      }
      uVar11 = in_EAX >> 8 & 0xff;
      iVar12 = uVar11 * 0x260;
      if (DAT_006293ca == '\0') {
        FUN_004413c5();
      }
      uVar6 = (undefined2)in_EAX;
      pbVar1 = (byte *)(unaff_ESI + 0xca + ((int)(short)uVar9 >> 3));
      *pbVar1 = *pbVar1 | '\x01' << (uVar9 & 7);
      if (uVar9 == 2) {
        uVar6 = FUN_00441891();
      }
      bVar5 = (&DAT_0062d600)[uVar10];
      pbVar1 = (byte *)(unaff_ESI + 0x42);
      bVar4 = *pbVar1;
      *pbVar1 = *pbVar1 + bVar5;
      if (CARRY1(bVar4,bVar5)) {
        *(undefined1 *)(unaff_ESI + 0x42) = 0xff;
      }
      if ((char)uVar6 == '\x03') {
        *(char *)(unaff_ESI + 199) = (char)((ushort)uVar6 >> 8);
      }
      *(byte *)(unaff_ESI + 0x45) = *(byte *)(unaff_ESI + 0x45) | 8;
      uVar7 = FUN_004420e0();
      if ((*(ushort *)(unaff_ESI + 200) & 8) != 0) {
        DAT_00971e86._0_2_ = *(undefined2 *)(unaff_ESI + 0x22);
        unique0x00017200 = *(undefined4 *)(unaff_ESI + 0x9c);
        DAT_00971e8a._2_2_ = (uVar7 & 0xff) + 0x719;
        FUN_0042c711();
      }
      if ((0xa3c0U >> (uVar9 & 0xf) & 1) != 0) {
        *(char *)(unaff_ESI + 0xec) = *(char *)(unaff_ESI + 0xec) + '\x01';
      }
      if ((0x20U >> (uVar9 & 0xf) & 1) != 0) {
        *(char *)(unaff_ESI + 0xed) = *(char *)(unaff_ESI + 0xed) + '\x01';
      }
      if ((0x1fU >> (uVar9 & 0xf) & 1) != 0) {
        *(char *)(unaff_ESI + 0xee) = *(char *)(unaff_ESI + 0xee) + '\x01';
      }
      DAT_006293b0 = 0xea;
      DAT_0099c167 = '\x1c';
      if ((0xa3e0U >> (uVar9 & 0xf) & 1) != 0) {
        DAT_006293b0 = 0xe8;
        DAT_0099c167 = '$';
      }
      uVar10 = (uint)*(ushort *)(&DAT_0062d580 + uVar10 * 8);
      uVar8 = FUN_004429db();
      DAT_0099c167 = DAT_0099c167 + -4;
      if (DAT_006293ca == '\0') {
        uVar8 = FUN_004405f3();
        uVar10 = extraout_ECX_01;
      }
      else {
        *(ushort *)(unaff_ESI + 0xca) = *(ushort *)(unaff_ESI + 0xca) & 0xbfff;
        *(byte *)(unaff_ESI + 0x45) = *(byte *)(unaff_ESI + 0x45) | 8;
      }
      (&DAT_00887524)[uVar11 * 0x98] = (&DAT_00887524)[uVar11 * 0x98] + (extraout_ECX_00 - uVar10);
      (&DAT_0088751d)[iVar12] = (&DAT_0088751d)[iVar12] | 2;
      *(short *)(&DAT_008874f0 + iVar12) = *(short *)(&DAT_008874f0 + iVar12) + 1;
      *(int *)(&DAT_00887520 + iVar12) = *(int *)(&DAT_00887520 + iVar12) + 1;
      (&DAT_0088751d)[iVar12] = (&DAT_0088751d)[iVar12] | 1;
      return uVar8;
    }
  }
  return in_EAX;
}

