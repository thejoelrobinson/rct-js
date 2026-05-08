
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_005df7a1(void)

{
  char cVar1;
  undefined1 uVar2;
  short sVar3;
  undefined4 *puVar4;
  uint uVar5;
  int unaff_ESI;
  bool bVar6;
  
  if ((DAT_0099c168 != '\0') && (DAT_0099c168 = DAT_0099c168 + -1, DAT_0099c168 == '\0')) {
    FUN_009bbfb3();
    DAT_00971e86._2_2_ = FUN_009bbb9b();
    DAT_00971e86._0_2_ = 0x38f;
    FUN_00427108();
    FUN_009bc184();
  }
  if (((DAT_0099c16b == '\0') && (DAT_005f8da0 != '\0')) && (DAT_005f8d5b != '\0')) {
    bVar6 = false;
    if (((DAT_005f1a10 == 0) && (FUN_005e68e2(), !bVar6)) &&
       (((*(ushort *)(unaff_ESI + 0x32) >> 2 & 1) == 0 &&
        (((_DAT_0099a500 & 1) == 0 && (*(int *)(unaff_ESI + 8) != 0)))))) {
      *(short *)(unaff_ESI + 0x170) =
           *(short *)(unaff_ESI + 0x170) - (8 << (*(byte *)(*(int *)(unaff_ESI + 8) + 0x10) & 0x1f))
      ;
      DAT_00991f30 = DAT_00991f30 | 0x80;
    }
    bVar6 = DAT_00971eda - 1 < DAT_005f1a10;
    if ((((DAT_00971eda - 1 == DAT_005f1a10) && (FUN_005e68e2(), !bVar6)) &&
        ((*(ushort *)(unaff_ESI + 0x32) >> 2 & 1) == 0)) &&
       (((_DAT_0099a500 & 1) == 0 && (*(int *)(unaff_ESI + 8) != 0)))) {
      *(short *)(unaff_ESI + 0x170) =
           *(short *)(unaff_ESI + 0x170) + (8 << (*(byte *)(*(int *)(unaff_ESI + 8) + 0x10) & 0x1f))
      ;
      DAT_00991f30 = DAT_00991f30 | 0x80;
    }
    bVar6 = false;
    if (((DAT_005f1a14 == 0) && (FUN_005e68e2(), !bVar6)) &&
       (((*(ushort *)(unaff_ESI + 0x32) >> 2 & 1) == 0 &&
        (((_DAT_0099a500 & 1) == 0 && (*(int *)(unaff_ESI + 8) != 0)))))) {
      *(short *)(unaff_ESI + 0x172) =
           *(short *)(unaff_ESI + 0x172) - (8 << (*(byte *)(*(int *)(unaff_ESI + 8) + 0x10) & 0x1f))
      ;
      DAT_00991f30 = DAT_00991f30 | 0x80;
    }
    bVar6 = DAT_00971edc - 1 < DAT_005f1a14;
    if ((((DAT_00971edc - 1 == DAT_005f1a14) && (FUN_005e68e2(), !bVar6)) &&
        ((*(ushort *)(unaff_ESI + 0x32) >> 2 & 1) == 0)) &&
       (((_DAT_0099a500 & 1) == 0 && (*(int *)(unaff_ESI + 8) != 0)))) {
      *(short *)(unaff_ESI + 0x172) =
           *(short *)(unaff_ESI + 0x172) + (8 << (*(byte *)(*(int *)(unaff_ESI + 8) + 0x10) & 0x1f))
      ;
      DAT_00991f30 = DAT_00991f30 | 0x80;
    }
  }
  DAT_0099c16a = 0;
  if (DAT_005ebee8 == 1) {
    DAT_0099c16a = (DAT_005f11b6 & 0x80) != 0 || (DAT_005f11aa & 0x80) != 0;
    if ((DAT_005f119d & 0x80) != 0) {
      DAT_0099c16a = DAT_0099c16a | 2;
    }
    if ((DAT_005f121d & 0x80) != 0) {
      DAT_0099c16a = DAT_0099c16a | 2;
    }
    if (DAT_0099c16b == '\0') {
      bVar6 = false;
      if ((((DAT_005f124b & 0x80) != 0) && (FUN_005e68e2(), !bVar6)) &&
         (((*(ushort *)(unaff_ESI + 0x32) >> 2 & 1) == 0 &&
          (((_DAT_0099a500 & 1) == 0 && (*(int *)(unaff_ESI + 8) != 0)))))) {
        *(short *)(unaff_ESI + 0x170) =
             *(short *)(unaff_ESI + 0x170) -
             (8 << (*(byte *)(*(int *)(unaff_ESI + 8) + 0x10) & 0x1f));
        DAT_00991f30 = DAT_00991f30 | 0x80;
      }
      bVar6 = false;
      if (((((DAT_005f124d & 0x80) != 0) && (FUN_005e68e2(), !bVar6)) &&
          ((*(ushort *)(unaff_ESI + 0x32) >> 2 & 1) == 0)) &&
         (((_DAT_0099a500 & 1) == 0 && (*(int *)(unaff_ESI + 8) != 0)))) {
        *(short *)(unaff_ESI + 0x170) =
             *(short *)(unaff_ESI + 0x170) +
             (8 << (*(byte *)(*(int *)(unaff_ESI + 8) + 0x10) & 0x1f));
        DAT_00991f30 = DAT_00991f30 | 0x80;
      }
      bVar6 = false;
      if ((((DAT_005f1248 & 0x80) != 0) && (FUN_005e68e2(), !bVar6)) &&
         (((*(ushort *)(unaff_ESI + 0x32) >> 2 & 1) == 0 &&
          (((_DAT_0099a500 & 1) == 0 && (*(int *)(unaff_ESI + 8) != 0)))))) {
        *(short *)(unaff_ESI + 0x172) =
             *(short *)(unaff_ESI + 0x172) -
             (8 << (*(byte *)(*(int *)(unaff_ESI + 8) + 0x10) & 0x1f));
        DAT_00991f30 = DAT_00991f30 | 0x80;
      }
      bVar6 = false;
      if (((((DAT_005f1250 & 0x80) != 0) && (FUN_005e68e2(), !bVar6)) &&
          ((*(ushort *)(unaff_ESI + 0x32) >> 2 & 1) == 0)) &&
         (((_DAT_0099a500 & 1) == 0 && (*(int *)(unaff_ESI + 8) != 0)))) {
        *(short *)(unaff_ESI + 0x172) =
             *(short *)(unaff_ESI + 0x172) +
             (8 << (*(byte *)(*(int *)(unaff_ESI + 8) + 0x10) & 0x1f));
        DAT_00991f30 = DAT_00991f30 | 0x80;
      }
    }
  }
  do {
    while( true ) {
      while( true ) {
        while( true ) {
          do {
            puVar4 = (undefined4 *)FUN_004035c1();
            if (puVar4 == (undefined4 *)0x0) {
              return;
            }
          } while (((0xfe < (ushort)*puVar4) || (cVar1 = (char)*puVar4, cVar1 == '\x10')) ||
                  (cVar1 == '\x11'));
          bVar6 = true;
          uVar2 = FUN_005e3b2b();
          if (bVar6) break;
          sVar3 = CONCAT11(DAT_0099c16a,uVar2);
          uVar5 = 0;
          do {
            if (sVar3 == (&DAT_005f8d62)[uVar5]) {
              (&DAT_005f8d62)[uVar5] = 0xffff;
            }
            uVar5 = uVar5 + 1;
          } while (uVar5 < 0x1f);
          (&DAT_005f8d62)[DAT_006e2b75] = sVar3;
          FUN_005e5b80();
          FUN_005e5301();
          FUN_0042f3a2();
        }
        if (DAT_0099c16b != '\x01') break;
        FUN_0042d56c();
      }
      if ((_DAT_0099a500 & 1) == 0) break;
      if (DAT_00628cb9 != '\0') {
        DAT_00628cb9 = -2;
      }
    }
    uVar5 = 0;
    do {
      if (CONCAT11(DAT_0099c16a,uVar2) == (&DAT_005f8d62)[uVar5]) {
        (*(code *)(&PTR_FUN_005dfb64)[uVar5])();
        break;
      }
      uVar5 = uVar5 + 1;
    } while (uVar5 < 0x1f);
  } while( true );
}

