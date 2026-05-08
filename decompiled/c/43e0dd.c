
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0043e0dd(void)

{
  byte *pbVar1;
  ushort uVar2;
  undefined4 uVar3;
  ushort uVar4;
  ushort uVar5;
  int iVar6;
  int extraout_ECX;
  byte bVar7;
  uint in_EDX;
  uint uVar8;
  uint uVar9;
  byte *pbVar10;
  undefined1 *puVar11;
  int unaff_ESI;
  char *pcVar12;
  bool bVar13;
  
  if ((((*(char *)(unaff_ESI + 0x2b) == '\x05') && (*(char *)(unaff_ESI + 0xc5) == -1)) &&
      ((*(ushort *)(unaff_ESI + 200) & 1) == 0)) &&
     (((*(ushort *)(unaff_ESI + 0xca) & 0xa3e0) == 0 && (*(short *)(unaff_ESI + 0xe) != -0x8000))))
  {
    _DAT_00629288 = 0;
    _DAT_0062928c = 0;
    _DAT_00629290 = 0;
    _DAT_00629294 = 0;
    _DAT_00629298 = 0;
    _DAT_0062929c = 0;
    _DAT_006292a0 = 0;
    _DAT_006292a4 = 0;
    if ((*(ushort *)(unaff_ESI + 0xca) & 2) == 0) {
      uVar4 = (*(ushort *)(unaff_ESI + 0x10) & 0xffe0) - 0x140;
      in_EDX = 0;
      uVar5 = (*(ushort *)(unaff_ESI + 0xe) & 0xffe0) - 0x140;
      do {
        do {
          uVar2 = uVar5;
          uVar8 = in_EDX;
          if ((uVar2 < 0xfff) && (uVar4 < 0xfff)) {
            pbVar10 = (byte *)(&DAT_00971ef4)
                              [(ushort)((ushort)(uVar4 << 7 | uVar4 >> 9 | uVar2) >> 5 |
                                       (uVar4 >> 9) << 0xb)];
            do {
              if ((*pbVar10 & 0x3c) == 8) {
                bVar7 = pbVar10[7];
                (&DAT_00629288)[((int)(bVar7 & 0x1f) >> 3) + (uint)(bVar7 >> 5) * 4] =
                     (&DAT_00629288)[((int)(bVar7 & 0x1f) >> 3) + (uint)(bVar7 >> 5) * 4] |
                     '\x01' << (bVar7 & 7);
              }
              pbVar1 = pbVar10 + 1;
              pbVar10 = pbVar10 + 8;
            } while ((*pbVar1 & 0x80) == 0);
          }
          bVar7 = (char)uVar8 + 1;
          in_EDX = CONCAT31((int3)(uVar8 >> 8),bVar7);
          uVar5 = uVar2 + 0x20;
        } while (bVar7 < 0x15);
        uVar4 = uVar4 + 0x20;
        bVar7 = (char)(uVar8 >> 8) + 1;
        in_EDX = (uint)bVar7 << 8;
        uVar5 = uVar2 - 0x280;
      } while (bVar7 < 0x15);
    }
    else {
      uVar8 = 0;
      pcVar12 = &DAT_00887420;
      do {
        if (*pcVar12 != -1) {
          (&DAT_00629288)[((int)(uVar8 & 0x1f) >> 3) + (uVar8 >> 5) * 4] =
               (&DAT_00629288)[((int)(uVar8 & 0x1f) >> 3) + (uVar8 >> 5) * 4] |
               '\x01' << (uVar8 & 7);
        }
        uVar8 = uVar8 + 1;
        pcVar12 = pcVar12 + 0x260;
      } while (uVar8 < 0xff);
    }
    puVar11 = &DAT_006292ac;
    uVar9 = 0;
    uVar8 = 0;
    iVar6 = 0;
    do {
      if ((((((byte)(&DAT_00629288)[((int)uVar8 >> 3) + iVar6 * 4] >> (uVar8 & 7) & 1) != 0) &&
           ((*(byte *)(unaff_ESI + 0x7c + iVar6 * 4 + ((int)uVar8 >> 3)) >> (uVar8 & 7) & 1) == 0))
          && (((&DAT_00887422)[uVar9 * 0x130] & 0x200) == 0)) &&
         ((*(uint *)(&DAT_005f5b78 + (uint)(byte)(&DAT_00887420)[uVar9 * 0x260] * 8) & 0x20000) == 0
         )) {
        bVar13 = false;
        uVar8 = FUN_0043e304();
        iVar6 = extraout_ECX;
        if (bVar13) {
          *puVar11 = (char)uVar9;
          puVar11 = puVar11 + 1;
        }
      }
      uVar9 = uVar9 + 1;
      uVar8 = uVar8 + 1;
      if (0x1f < uVar8) {
        uVar8 = 0;
        iVar6 = iVar6 + 1;
      }
    } while (uVar9 < 0xff);
    puVar11 = puVar11 + -0x6292ac;
    if (puVar11 != (undefined1 *)0x0) {
      pbVar10 = &DAT_006292ac;
      uVar5 = 0;
      do {
        uVar8 = (uint)*pbVar10;
        if (((&DAT_00887510)[uVar8 * 0x130] != -1) &&
           (uVar5 <= (ushort)(&DAT_00887512)[uVar8 * 0x130])) {
          uVar5 = (&DAT_00887512)[uVar8 * 0x130];
          in_EDX = (uint)*pbVar10;
        }
        pbVar10 = pbVar10 + 1;
        puVar11 = puVar11 + -1;
      } while (puVar11 != (undefined1 *)0x0);
      if (uVar5 != 0) {
        *(char *)(unaff_ESI + 0xc5) = (char)in_EDX;
        *(undefined1 *)(unaff_ESI + 0xc6) = 200;
        uVar3 = FUN_00441891();
        FUN_005e5301(pbVar10,uVar3);
        *(undefined1 *)(unaff_ESI + 0xf4) = 0;
      }
    }
  }
  return;
}

