
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0043de68(void)

{
  byte *pbVar1;
  ushort uVar2;
  short sVar3;
  uint in_EAX;
  undefined4 uVar4;
  ushort uVar5;
  short sVar6;
  int iVar7;
  int extraout_ECX;
  byte bVar8;
  ushort uVar9;
  uint uVar10;
  uint uVar11;
  uint uVar12;
  undefined1 *puVar13;
  int unaff_ESI;
  byte *pbVar14;
  bool bVar15;
  
  if (((((*(char *)(unaff_ESI + 0x2b) == '\b') || (*(char *)(unaff_ESI + 0x2b) == '\x05')) &&
       ((*(ushort *)(unaff_ESI + 200) & 1) == 0)) && (*(short *)(unaff_ESI + 0xe) != -0x8000)) &&
     (((uVar10 = (uint)*(byte *)(unaff_ESI + 0xc5), *(byte *)(unaff_ESI + 0xc5) == 0xff ||
       (uVar10 = (uint)(byte)(&DAT_00887420)[uVar10 * 0x260],
       (*(uint *)(&DAT_005f5b78 + uVar10 * 8) & 0x3800000) == 0)) &&
      ((in_EAX == 0x2000000 || ((*(ushort *)(unaff_ESI + 0xca) & 0xa3e0) == 0)))))) {
    _DAT_00629288 = 0;
    _DAT_0062928c = 0;
    _DAT_00629290 = 0;
    _DAT_00629294 = 0;
    _DAT_00629298 = 0;
    _DAT_0062929c = 0;
    _DAT_006292a0 = 0;
    _DAT_006292a4 = 0;
    _DAT_006292a8 = in_EAX;
    if ((*(ushort *)(unaff_ESI + 0xca) & 2) == 0) {
      uVar5 = (*(ushort *)(unaff_ESI + 0x10) & 0xffe0) - 0x140;
      uVar10 = 0;
      uVar9 = (*(ushort *)(unaff_ESI + 0xe) & 0xffe0) - 0x140;
      do {
        do {
          uVar2 = uVar9;
          uVar11 = uVar10;
          if ((uVar2 < 0xfff) && (uVar5 < 0xfff)) {
            pbVar14 = (byte *)(&DAT_00971ef4)
                              [(ushort)((ushort)(uVar5 << 7 | uVar5 >> 9 | uVar2) >> 5 |
                                       (uVar5 >> 9) << 0xb)];
            do {
              if ((*pbVar14 & 0x3c) == 8) {
                uVar10 = (uint)pbVar14[7];
                if ((_DAT_006292a8 &
                    *(uint *)(&DAT_005f5b78 + (uint)(byte)(&DAT_00887420)[uVar10 * 0x260] * 8)) != 0
                   ) {
                  (&DAT_00629288)[((int)(uVar10 & 0x1f) >> 3) + (uint)(pbVar14[7] >> 5) * 4] =
                       (&DAT_00629288)[((int)(uVar10 & 0x1f) >> 3) + (uint)(pbVar14[7] >> 5) * 4] |
                       '\x01' << (uVar10 & 7);
                }
              }
              pbVar1 = pbVar14 + 1;
              pbVar14 = pbVar14 + 8;
            } while ((*pbVar1 & 0x80) == 0);
          }
          bVar8 = (char)uVar11 + 1;
          uVar10 = CONCAT31((int3)(uVar11 >> 8),bVar8);
          uVar9 = uVar2 + 0x20;
        } while (bVar8 < 0x15);
        uVar5 = uVar5 + 0x20;
        bVar8 = (char)(uVar11 >> 8) + 1;
        uVar10 = (uint)bVar8 << 8;
        uVar9 = uVar2 - 0x280;
      } while (bVar8 < 0x15);
    }
    else {
      uVar11 = 0;
      pbVar14 = &DAT_00887420;
      do {
        if ((*pbVar14 != 0xff) &&
           ((_DAT_006292a8 & *(uint *)(&DAT_005f5b78 + (uint)*pbVar14 * 8)) != 0)) {
          (&DAT_00629288)[((int)(uVar11 & 0x1f) >> 3) + (uVar11 >> 5) * 4] =
               (&DAT_00629288)[((int)(uVar11 & 0x1f) >> 3) + (uVar11 >> 5) * 4] |
               '\x01' << (uVar11 & 7);
        }
        uVar11 = uVar11 + 1;
        pbVar14 = pbVar14 + 0x260;
      } while (uVar11 < 0xff);
    }
    puVar13 = &DAT_006292ac;
    uVar12 = 0;
    uVar11 = 0;
    iVar7 = 0;
    do {
      if (((byte)(&DAT_00629288)[((int)uVar11 >> 3) + iVar7 * 4] >> (uVar11 & 7) & 1) != 0) {
        bVar15 = false;
        uVar11 = FUN_0043e304(puVar13,uVar10);
        iVar7 = extraout_ECX;
        if (bVar15) {
          *puVar13 = (char)uVar12;
          puVar13 = puVar13 + 1;
        }
      }
      uVar12 = uVar12 + 1;
      uVar11 = uVar11 + 1;
      if (0x1f < uVar11) {
        uVar11 = 0;
        iVar7 = iVar7 + 1;
      }
    } while (uVar12 < 0xff);
    puVar13 = puVar13 + -0x6292ac;
    if (puVar13 != (undefined1 *)0x0) {
      pbVar14 = &DAT_006292ac;
      uVar9 = 0xffff;
      do {
        sVar3 = ((&DAT_0088744a)[(uint)*pbVar14 * 0x130] & 0xff) * 0x20 -
                *(short *)(unaff_ESI + 0xe);
        if (sVar3 < 0) {
          sVar3 = -sVar3;
        }
        sVar6 = ((ushort)(&DAT_0088744a)[(uint)*pbVar14 * 0x130] >> 8) * 0x20 -
                *(short *)(unaff_ESI + 0x10);
        if (sVar6 < 0) {
          sVar6 = -sVar6;
        }
        if ((ushort)(sVar3 + sVar6) < uVar9) {
          uVar11 = (uint)*pbVar14;
          uVar9 = sVar3 + sVar6;
        }
        pbVar14 = pbVar14 + 1;
        puVar13 = puVar13 + -1;
      } while (puVar13 != (undefined1 *)0x0);
      *(char *)(unaff_ESI + 0xc5) = (char)uVar11;
      *(undefined1 *)(unaff_ESI + 0xc6) = 200;
      uVar4 = FUN_00441891();
      FUN_005e5301(pbVar14,uVar4);
      *(undefined1 *)(unaff_ESI + 0xf4) = 0;
    }
  }
  return;
}

