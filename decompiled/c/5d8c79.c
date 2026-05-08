
void FUN_005d8c79(void)

{
  uint *puVar1;
  byte bVar2;
  short sVar3;
  uint uVar4;
  int iVar5;
  ushort uVar6;
  short extraout_DX;
  short sVar7;
  byte *pbVar8;
  byte bVar9;
  char cVar10;
  ushort uVar11;
  ushort *puVar12;
  int unaff_ESI;
  int unaff_EDI;
  
  if (*(char *)(unaff_ESI + 0x50) == '\a') {
    *(ushort *)((int)&DAT_00887422 + unaff_EDI) = *(ushort *)((int)&DAT_00887422 + unaff_EDI) | 2;
    *(ushort *)((int)&DAT_00887422 + unaff_EDI) = *(ushort *)((int)&DAT_00887422 + unaff_EDI) | 8;
    *(ushort *)((int)&DAT_00887422 + unaff_EDI) =
         *(ushort *)((int)&DAT_00887422 + unaff_EDI) & 0xfffb;
    *(ushort *)(unaff_ESI + 0x48) = *(ushort *)(unaff_ESI + 0x48) & 0xffdf;
    FUN_005e5301();
    return;
  }
  bVar9 = (&DAT_008874b1)[unaff_EDI] + 1;
  if (0x1f < bVar9) {
    bVar9 = 0;
  }
  (&DAT_008874b1)[unaff_EDI] = bVar9;
  uVar4 = *(uint *)(unaff_ESI + 0x28);
  if ((int)uVar4 < 0) {
    uVar4 = -uVar4;
  }
  if (*(uint *)(&DAT_008874a8 + unaff_EDI) < uVar4) {
    *(uint *)(&DAT_008874a8 + unaff_EDI) = uVar4;
  }
  bVar2 = (&DAT_008874b0)[unaff_EDI];
  if ((bVar9 == 0) && (0x8000 < uVar4)) {
    *(uint *)(&DAT_008874ac + unaff_EDI) = *(int *)(&DAT_008874ac + unaff_EDI) + uVar4;
    *(short *)(&DAT_008874c4 + (uint)bVar2 * 2 + unaff_EDI) =
         *(short *)(&DAT_008874c4 + (uint)bVar2 * 2 + unaff_EDI) + 1;
  }
  iVar5 = (*(int *)(unaff_ESI + 0x2c) + *(int *)(unaff_ESI + 0x28) >> 10) * 0x2a;
  if ((-1 < iVar5) && (*(char *)(unaff_ESI + 0xce) == '\0')) {
    *(int *)(&DAT_008874b4 + (uint)bVar2 * 4 + unaff_EDI) =
         *(int *)(&DAT_008874b4 + (uint)bVar2 * 4 + unaff_EDI) + iVar5;
  }
  if ((*(uint *)(&DAT_005f5b78 +
                (uint)(byte)(&DAT_00887420)[(uint)*(byte *)(unaff_ESI + 0x30) * 0x260] * 8) & 0x80)
      != 0) {
    sVar3 = FUN_005d9220();
    sVar3 = (short)(sVar3 + *(short *)(&DAT_008874d2 + unaff_EDI)) >> 1;
    sVar7 = (short)(extraout_DX + *(short *)(&DAT_008874d4 + unaff_EDI)) >> 1;
    *(short *)(&DAT_008874d2 + unaff_EDI) = sVar3;
    *(short *)(&DAT_008874d4 + unaff_EDI) = sVar7;
    if (*(short *)(&DAT_008874cc + unaff_EDI) < sVar3) {
      *(short *)(&DAT_008874cc + unaff_EDI) = sVar3;
    }
    if (sVar3 < *(short *)(&DAT_008874ce + unaff_EDI)) {
      *(short *)(&DAT_008874ce + unaff_EDI) = sVar3;
    }
    if (sVar7 < 0) {
      sVar7 = -sVar7;
    }
    if (*(short *)(&DAT_008874d0 + unaff_EDI) < sVar7) {
      *(short *)(&DAT_008874d0 + unaff_EDI) = sVar7;
    }
  }
  sVar3 = CONCAT11((char)(*(ushort *)(unaff_ESI + 0x3a) >> 5),
                   (char)(*(ushort *)(unaff_ESI + 0x38) >> 5));
  uVar6 = *(ushort *)(unaff_ESI + 0x3c) >> 2;
  uVar4 = (uint)uVar6;
  cVar10 = (char)uVar6;
  if ((cVar10 == (&DAT_008874ef)[unaff_EDI]) && (sVar3 == *(short *)(&DAT_008874dc + unaff_EDI)))
  goto LAB_005d90f1;
  *(short *)(&DAT_008874dc + unaff_EDI) = sVar3;
  (&DAT_008874ef)[unaff_EDI] = cVar10;
  uVar6 = *(ushort *)(unaff_ESI + 0x36) >> 2;
  if ((*(ushort *)(unaff_ESI + 0x48) & 1) == 0) {
    *(uint *)(&DAT_008874d8 + unaff_EDI) = *(uint *)(&DAT_008874d8 + unaff_EDI) & 0xffffffbf;
  }
  else {
    puVar1 = (uint *)(&DAT_008874d8 + unaff_EDI);
    uVar4 = *puVar1;
    *puVar1 = *puVar1 | 0x40;
    if ((uVar4 >> 6 & 1) == 0) {
      pbVar8 = &DAT_008874e5 + unaff_EDI;
      bVar9 = *pbVar8;
      *pbVar8 = *pbVar8 + 0x40;
      if (0xbf < bVar9) {
        (&DAT_008874e5)[unaff_EDI] = (&DAT_008874e5)[unaff_EDI] + -0x40;
      }
    }
  }
  if (uVar6 == 0x71) {
    (&DAT_008874a5)[unaff_EDI] = (&DAT_008874a5)[unaff_EDI] | 0x20;
  }
  if (uVar6 == 0x70) {
    (&DAT_008874a5)[unaff_EDI] = (&DAT_008874a5)[unaff_EDI] | 0x40;
  }
  if (uVar6 == 0x78) {
    (&DAT_008874a5)[unaff_EDI] = (&DAT_008874a5)[unaff_EDI] | 0x80;
  }
  if ((uVar6 == 0x75) && (0xaffff < *(int *)(unaff_ESI + 0x28))) {
    (&DAT_008874a5)[unaff_EDI] = (&DAT_008874a5)[unaff_EDI] | 0x20;
  }
  uVar6 = *(ushort *)(&DAT_00652309 + (uint)uVar6 * 2);
  uVar4 = *(uint *)(&DAT_008874d8 + unaff_EDI);
  if ((uVar4 & 2) == 0) {
    if ((uVar4 & 4) == 0) {
      if ((uVar6 & 2) != 0) {
        *(uint *)(&DAT_008874d8 + unaff_EDI) = *(uint *)(&DAT_008874d8 + unaff_EDI) | 2;
        *(ushort *)(&DAT_008874de + unaff_EDI) = *(ushort *)(&DAT_008874de + unaff_EDI) & 0x7ff;
        if ((uVar6 & 8) != 0) {
          *(uint *)(&DAT_008874d8 + unaff_EDI) = *(uint *)(&DAT_008874d8 + unaff_EDI) | 8;
        }
        if ((uVar6 & 0x10) != 0) {
          *(uint *)(&DAT_008874d8 + unaff_EDI) = *(uint *)(&DAT_008874d8 + unaff_EDI) | 0x10;
        }
      }
      if ((uVar6 & 4) != 0) {
        *(uint *)(&DAT_008874d8 + unaff_EDI) = *(uint *)(&DAT_008874d8 + unaff_EDI) | 4;
        *(ushort *)(&DAT_008874de + unaff_EDI) = *(ushort *)(&DAT_008874de + unaff_EDI) & 0x7ff;
        if ((uVar6 & 8) != 0) {
          *(uint *)(&DAT_008874d8 + unaff_EDI) = *(uint *)(&DAT_008874d8 + unaff_EDI) | 8;
        }
        if ((uVar6 & 0x10) != 0) {
          *(uint *)(&DAT_008874d8 + unaff_EDI) = *(uint *)(&DAT_008874d8 + unaff_EDI) | 0x10;
        }
      }
    }
    else {
      if ((uVar6 & 4) == 0) goto LAB_005d8e62;
      *(short *)(&DAT_008874de + unaff_EDI) = *(short *)(&DAT_008874de + unaff_EDI) + 0x800;
    }
  }
  else if ((uVar6 & 2) == 0) {
LAB_005d8e62:
    *(uint *)(&DAT_008874d8 + unaff_EDI) = *(uint *)(&DAT_008874d8 + unaff_EDI) & 0xfffffff9;
    *(uint *)(&DAT_008874d8 + unaff_EDI) = *(uint *)(&DAT_008874d8 + unaff_EDI) & 0xffffffe7;
    puVar12 = (ushort *)(&DAT_008874e0 + unaff_EDI);
    if (((uVar4 & 8) == 0) && (puVar12 = (ushort *)(&DAT_008874e2 + unaff_EDI), (uVar4 & 0x10) == 0)
       ) {
      puVar12 = (ushort *)(&DAT_008874de + unaff_EDI);
    }
    uVar11 = *(ushort *)(&DAT_008874de + unaff_EDI) >> 0xb;
    if (uVar11 == 0) {
      uVar11 = *puVar12 & 0x1f;
      if (uVar11 != 0x1f) {
        uVar11 = uVar11 + 1;
      }
      *puVar12 = *puVar12 & 0xffe0;
      *puVar12 = *puVar12 | uVar11;
    }
    else if (uVar11 == 1) {
      uVar11 = *puVar12 & 0xe0;
      if (uVar11 != 0xe0) {
        uVar11 = uVar11 + 0x20;
      }
      *puVar12 = *puVar12 & 0xff1f;
      *puVar12 = *puVar12 | uVar11;
    }
    else if ((uVar11 == 2) || ((uVar4 & 0x10) == 0)) {
      uVar11 = *puVar12 & 0x700;
      if (uVar11 != 0x700) {
        uVar11 = uVar11 + 0x100;
      }
      *puVar12 = *puVar12 & 0xf8ff;
      *puVar12 = *puVar12 | uVar11;
    }
    else {
      uVar11 = *puVar12 & 0xf800;
      if (uVar11 != 0xf800) {
        uVar11 = uVar11 + 0x800;
      }
      *puVar12 = *puVar12 & 0x7ff;
      *puVar12 = *puVar12 | uVar11;
    }
  }
  else {
    *(short *)(&DAT_008874de + unaff_EDI) = *(short *)(&DAT_008874de + unaff_EDI) + 0x800;
  }
  if ((uVar4 & 0x20) == 0) {
    if (((uVar6 & 0x20) != 0) && (-1 < *(int *)(unaff_ESI + 0x28))) {
      *(uint *)(&DAT_008874d8 + unaff_EDI) = *(uint *)(&DAT_008874d8 + unaff_EDI) & 0xffffff7f;
      *(uint *)(&DAT_008874d8 + unaff_EDI) = *(uint *)(&DAT_008874d8 + unaff_EDI) | 0x20;
      bVar9 = (&DAT_008874e5)[unaff_EDI] & 0x3f;
      if (bVar9 != 0x3f) {
        bVar9 = bVar9 + 1;
      }
      (&DAT_008874e5)[unaff_EDI] = (&DAT_008874e5)[unaff_EDI] & 0xc0;
      (&DAT_008874e5)[unaff_EDI] = (&DAT_008874e5)[unaff_EDI] | bVar9;
      (&DAT_008874e6)[unaff_EDI] = (char)(*(ushort *)(unaff_ESI + 0x12) >> 2);
      uVar4 = uVar4 & 0xffffff7f;
    }
  }
  else if ((*(int *)(unaff_ESI + 0x28) < 0) || ((uVar6 & 0x20) == 0)) {
    *(uint *)(&DAT_008874d8 + unaff_EDI) = *(uint *)(&DAT_008874d8 + unaff_EDI) & 0xffffffdf;
    bVar9 = (byte)(*(ushort *)(unaff_ESI + 0x12) >> 2);
    cVar10 = bVar9 - (&DAT_008874e6)[unaff_EDI];
    if ((bVar9 < (byte)(&DAT_008874e6)[unaff_EDI] || cVar10 == '\0') &&
       (bVar9 = -cVar10, (byte)(&DAT_008874e7)[unaff_EDI] < bVar9)) {
      (&DAT_008874e7)[unaff_EDI] = bVar9;
    }
  }
  if ((uVar4 & 0x80) == 0) {
    if (((uVar6 & 0x40) != 0) && (*(int *)(unaff_ESI + 0x28) < 1)) {
      *(uint *)(&DAT_008874d8 + unaff_EDI) = *(uint *)(&DAT_008874d8 + unaff_EDI) & 0xffffffdf;
      *(uint *)(&DAT_008874d8 + unaff_EDI) = *(uint *)(&DAT_008874d8 + unaff_EDI) | 0x80;
      bVar9 = (&DAT_008874e5)[unaff_EDI] & 0x3f;
      if (bVar9 != 0x3f) {
        bVar9 = bVar9 + 1;
      }
      (&DAT_008874e5)[unaff_EDI] = (&DAT_008874e5)[unaff_EDI] & 0xc0;
      (&DAT_008874e5)[unaff_EDI] = (&DAT_008874e5)[unaff_EDI] | bVar9;
      (&DAT_008874e6)[unaff_EDI] = (char)(*(ushort *)(unaff_ESI + 0x12) >> 2);
    }
  }
  else if ((0 < *(int *)(unaff_ESI + 0x28)) || ((uVar6 & 0x40) == 0)) {
    *(uint *)(&DAT_008874d8 + unaff_EDI) = *(uint *)(&DAT_008874d8 + unaff_EDI) & 0xffffff7f;
    bVar9 = (byte)(*(ushort *)(unaff_ESI + 0x12) >> 2);
    cVar10 = bVar9 - (&DAT_008874e6)[unaff_EDI];
    if ((bVar9 < (byte)(&DAT_008874e6)[unaff_EDI] || cVar10 == '\0') &&
       (bVar9 = -cVar10, (byte)(&DAT_008874e7)[unaff_EDI] < bVar9)) {
      (&DAT_008874e7)[unaff_EDI] = bVar9;
    }
  }
  if ((uVar6 & 0x80) != 0) {
    bVar9 = (&DAT_008874e4)[unaff_EDI] & 0x1f;
    if (bVar9 != 0x1f) {
      bVar9 = bVar9 + 1;
    }
    (&DAT_008874e4)[unaff_EDI] = (&DAT_008874e4)[unaff_EDI] & 0xe0;
    (&DAT_008874e4)[unaff_EDI] = (&DAT_008874e4)[unaff_EDI] | bVar9;
  }
  if ((uVar6 & 0x800) != 0) {
    bVar9 = (&DAT_008874a5)[unaff_EDI] & 0x1f;
    if (bVar9 != 0x1f) {
      bVar9 = bVar9 + 1;
    }
    (&DAT_008874a5)[unaff_EDI] = (&DAT_008874a5)[unaff_EDI] & 0xe0;
    (&DAT_008874a5)[unaff_EDI] = (&DAT_008874a5)[unaff_EDI] | bVar9;
  }
LAB_005d90f1:
  if (*(ushort *)(unaff_ESI + 0xe) != 0x8000) {
    uVar6 = *(ushort *)(unaff_ESI + 0x10) >> 9;
    pbVar8 = (byte *)(&DAT_00971ef4)
                     [(ushort)((ushort)((*(ushort *)(unaff_ESI + 0x10) & 0xffe0) << 7 | uVar6 |
                                       *(ushort *)(unaff_ESI + 0xe) & 0xffe0) >> 5 | uVar6 << 0xb)];
    bVar9 = *pbVar8;
    while ((bVar9 & 0x3c) != 0) {
      pbVar8 = pbVar8 + 8;
      bVar9 = *pbVar8;
    }
    if (*(ushort *)(unaff_ESI + 0x12) < (ushort)((ushort)pbVar8[2] * 4)) {
      if ((uVar4 & 1) == 0) {
        *(uint *)(&DAT_008874d8 + unaff_EDI) = *(uint *)(&DAT_008874d8 + unaff_EDI) | 1;
        bVar9 = (&DAT_008874ee)[unaff_EDI] & 0x1f;
        if (bVar9 != 0x1f) {
          bVar9 = bVar9 + 1;
        }
        (&DAT_008874ee)[unaff_EDI] = (&DAT_008874ee)[unaff_EDI] & 0xe0;
        (&DAT_008874ee)[unaff_EDI] = (&DAT_008874ee)[unaff_EDI] | bVar9;
        if (*(char *)(unaff_ESI + 0x1f) != '\0') {
          (&DAT_008874ee)[unaff_EDI] = (&DAT_008874ee)[unaff_EDI] | 0x20;
        }
        if (*(char *)(unaff_ESI + 0x20) != '\0') {
          (&DAT_008874ee)[unaff_EDI] = (&DAT_008874ee)[unaff_EDI] | 0x40;
        }
      }
      iVar5 = (*(int *)(unaff_ESI + 0x2c) + *(int *)(unaff_ESI + 0x28) >> 10) * 0x2a;
      if (iVar5 < 0) {
        return;
      }
      *(int *)(&DAT_008874e8 + unaff_EDI) = *(int *)(&DAT_008874e8 + unaff_EDI) + iVar5;
      return;
    }
  }
  *(uint *)(&DAT_008874d8 + unaff_EDI) = *(uint *)(&DAT_008874d8 + unaff_EDI) & 0xfffffffe;
  return;
}

