
/* WARNING: Removing unreachable block (ram,0x0043934d) */
/* WARNING: Removing unreachable block (ram,0x0043931e) */
/* WARNING: Removing unreachable block (ram,0x00439324) */
/* WARNING: Removing unreachable block (ram,0x00439328) */
/* WARNING: Removing unreachable block (ram,0x00439338) */
/* WARNING: Removing unreachable block (ram,0x00439348) */
/* WARNING: Removing unreachable block (ram,0x00439358) */
/* WARNING: Removing unreachable block (ram,0x0043933d) */
/* WARNING: Removing unreachable block (ram,0x0043932d) */

byte FUN_00439288(void)

{
  byte *pbVar1;
  char *pcVar2;
  byte bVar3;
  byte in_AL;
  byte bVar4;
  byte bVar5;
  ushort uVar6;
  undefined4 uVar7;
  uint in_EDX;
  uint extraout_EDX;
  uint extraout_EDX_00;
  uint uVar8;
  char cVar9;
  uint uVar10;
  int iVar11;
  int unaff_ESI;
  undefined1 *puVar12;
  bool bVar13;
  byte in_stack_00000020;
  
  if (*(char *)(unaff_ESI + 0x2e) == '\x01') {
    if (*(char *)(unaff_ESI + 0x2f) == '\x02') {
      in_AL = 0x14;
      if (*(char *)(unaff_ESI + 0x2b) != '\n') {
        in_AL = 3;
      }
      if (in_AL != *(byte *)(unaff_ESI + 0x2d)) {
        *(byte *)(unaff_ESI + 0x2d) = in_AL;
        *(undefined1 *)(unaff_ESI + 0x70) = 0;
        *(undefined1 *)(unaff_ESI + 0xe0) = 0;
        if (*(byte *)(unaff_ESI + 0x71) < 0xfe) {
          *(undefined1 *)(unaff_ESI + 0x71) = 0xff;
        }
        *(ushort *)(unaff_ESI + 200) = *(ushort *)(unaff_ESI + 200) & 0xfffd;
        if (((&DAT_0062d564)[in_AL] & 1) != 0) {
          *(ushort *)(unaff_ESI + 200) = *(ushort *)(unaff_ESI + 200) | 2;
        }
        *(undefined1 *)(unaff_ESI + 0x6e) = 0xff;
        in_AL = FUN_0043c60b();
      }
    }
    return in_AL;
  }
  if ((in_EDX & 0x1ff) != (DAT_0088741c & 0x1ff)) goto LAB_004396f1;
  if (DAT_006e2b76 != -0x75416211) {
    return in_stack_00000020;
  }
  if (*(char *)(unaff_ESI + 0xf3) != '\0') {
    *(char *)(unaff_ESI + 0xf3) = *(char *)(unaff_ESI + 0xf3) + -1;
  }
  if ((((*(char *)(unaff_ESI + 0x2b) == '\b') || (*(char *)(unaff_ESI + 0x2b) == '\x05')) &&
      (*(char *)(unaff_ESI + 0xf2) = *(char *)(unaff_ESI + 0xf2) + '\x01',
      0x11 < *(byte *)(unaff_ESI + 0xf2))) &&
     (*(undefined1 *)(unaff_ESI + 0xf2) = 0, *(short *)(unaff_ESI + 0xe) != -0x8000)) {
    FUN_00442290();
  }
  uVar10 = 0;
  FUN_004420e0();
  if ((*(char *)(unaff_ESI + 0x2b) == '\x03') || (*(char *)(unaff_ESI + 0x2b) == '\a')) {
    pcVar2 = (char *)(unaff_ESI + 0xe2);
    *pcVar2 = *pcVar2 + '\x01';
    if (*pcVar2 == '\0') {
      *(char *)(unaff_ESI + 0xe2) = *(char *)(unaff_ESI + 0xe2) + -1;
    }
    if ((*(ushort *)(unaff_ESI + 200) & 0x100) != 0) {
      FUN_00440fe3();
    }
    if (0xe < *(byte *)(unaff_ESI + 0xe2)) {
      pbVar1 = (byte *)(unaff_ESI + 0x3b);
      bVar4 = *pbVar1;
      *pbVar1 = *pbVar1 - 5;
      if (bVar4 < 5) {
        *(undefined1 *)(unaff_ESI + 0x3b) = 0;
      }
      if (0x15 < *(byte *)(unaff_ESI + 0xe2)) {
        uVar10 = (uint)(byte)(&DAT_00887420)[(uint)*(byte *)(unaff_ESI + 0x68) * 0x260];
        FUN_00440fe3();
      }
    }
  }
  if ((((*(char *)(unaff_ESI + 0x2a) == '\0') && (*(char *)(unaff_ESI + 0x2b) == '\x05')) &&
      ((*(char *)(unaff_ESI + 0x2f) == '\0' &&
       ((((*(ushort *)(unaff_ESI + 200) & 1) == 0 && (*(char *)(unaff_ESI + 0xc5) == -1)) &&
        (4 < (uint)(DAT_006e3b84 - *(int *)(unaff_ESI + 0xa8)) >> 0xb)))))) &&
     (FUN_0043e0dd(), *(char *)(unaff_ESI + 0xc5) == -1)) {
    pbVar1 = (byte *)(unaff_ESI + 0x3b);
    bVar4 = *pbVar1;
    *pbVar1 = *pbVar1 + 0x80;
    if (bVar4 < 0x80) {
      *(undefined1 *)(unaff_ESI + 0x3b) = 0;
    }
LAB_004395c4:
    *(undefined1 *)(unaff_ESI + 0xc5) = 0xff;
    if ((*(ushort *)(unaff_ESI + 200) & 1) == 0) {
      *(undefined1 *)(unaff_ESI + 0xc6) = 0xfe;
      *(ushort *)(unaff_ESI + 200) = *(ushort *)(unaff_ESI + 200) | 1;
LAB_004395f0:
      uVar7 = FUN_00440fe3();
      FUN_005e5301(uVar10,uVar7);
      *(undefined1 *)(unaff_ESI + 0xf4) = 0;
    }
    else if (0x3b < *(byte *)(unaff_ESI + 0xc6)) goto LAB_004395f0;
LAB_00439611:
    if (2 < *(byte *)(unaff_ESI + 0x3e)) {
      *(char *)(unaff_ESI + 0x3e) = *(char *)(unaff_ESI + 0x3e) + -2;
      pbVar1 = (byte *)(unaff_ESI + 0x39);
      bVar4 = *pbVar1;
      *pbVar1 = *pbVar1 + 2;
      if (0xfd < bVar4) {
        *(undefined1 *)(unaff_ESI + 0x39) = 0xff;
      }
      pcVar2 = (char *)(unaff_ESI + 0x40);
      cVar9 = *pcVar2;
      *pcVar2 = *pcVar2 + '\x01';
      if (cVar9 == -1) {
        *(undefined1 *)(unaff_ESI + 0x40) = 0xff;
      }
    }
LAB_0043965b:
    bVar4 = *(byte *)(unaff_ESI + 0x3b);
    uVar10 = (uint)bVar4;
    if (0x7f < bVar4) {
      uVar10 = (uint)(byte)(bVar4 - 2);
    }
  }
  else {
    uVar6 = FUN_005df40c();
    uVar8 = extraout_EDX;
    if (uVar6 < 0x3f1) {
      FUN_0043e0dd();
      uVar8 = extraout_EDX_00;
    }
    uVar10 = DAT_0088741c & 0x3ff;
    if ((uVar8 & 0x3ff) == uVar10) {
      if (*(char *)(unaff_ESI + 0x2a) == '\0') {
        if ((*(char *)(unaff_ESI + 0x2b) == '\x05') || (*(char *)(unaff_ESI + 0x2b) == '\b')) {
          puVar12 = &DAT_0062927c;
          if ((*(ushort *)(unaff_ESI + 200) & 1) == 0) {
            if ((*(byte *)(unaff_ESI + 0x38) < 0x47) && (*(byte *)(unaff_ESI + 0x3a) < 0x80)) {
              DAT_0062927c = 0x13;
              puVar12 = &DAT_0062927d;
            }
            if ((*(byte *)(unaff_ESI + 0x3e) < 0xb) &&
               ((*(ushort *)(unaff_ESI + 0xca) & 0xa3e0) == 0)) {
              *puVar12 = 0x14;
              puVar12 = puVar12 + 1;
            }
            if ((*(byte *)(unaff_ESI + 0x3f) < 0x1a) &&
               ((*(ushort *)(unaff_ESI + 0xca) & 0xa3e0) == 0)) {
              *puVar12 = 0x15;
              puVar12 = puVar12 + 1;
            }
            if (0x9f < *(byte *)(unaff_ESI + 0x40)) {
              *puVar12 = 0x16;
              puVar12 = puVar12 + 1;
            }
          }
          else {
            DAT_0062927c = 9;
            puVar12 = &DAT_0062927d;
          }
          if (puVar12 + -0x62927c != (undefined1 *)0x0) {
            bVar4 = FUN_005df40c();
            uVar10 = (uint)CONCAT11(0xff,(&DAT_0062927c)
                                         [(ushort)((ushort)bVar4 *
                                                  (ushort)(byte)(puVar12 + -0x62927c)) >> 8]);
            FUN_00440fe3();
            cVar9 = (char)uVar10;
            if (((cVar9 == '\x14') || (cVar9 == '\x15')) || (cVar9 == '\x16')) {
              FUN_0043de68();
            }
          }
        }
      }
    }
    else if (0x8b < *(byte *)(unaff_ESI + 0x3c)) {
      FUN_00440fe3();
    }
    cVar9 = *(char *)(unaff_ESI + 0x2b);
    if (((cVar9 == '\x05') || (cVar9 == '\r')) || (cVar9 == '\x0e')) {
LAB_00439576:
      if (0x20 < *(byte *)(unaff_ESI + 0x39)) {
        *(char *)(unaff_ESI + 0x39) = *(char *)(unaff_ESI + 0x39) + -2;
      }
      if (('\x14' < DAT_008d7eb0) && (4 < *(byte *)(unaff_ESI + 0x3f))) {
        *(char *)(unaff_ESI + 0x3f) = *(char *)(unaff_ESI + 0x3f) + -1;
      }
      if ((*(char *)(unaff_ESI + 0x2a) != '\0') ||
         (((*(ushort *)(unaff_ESI + 200) & 1) == 0 &&
          ((((0x36 < *(byte *)(unaff_ESI + 0x38) && (0x2c < *(byte *)(unaff_ESI + 0x3a))) &&
            (0x31 < *(uint *)(unaff_ESI + 0xa0))) || (uVar6 = FUN_005df40c(), 0xccc < uVar6))))))
      goto LAB_00439611;
      goto LAB_004395c4;
    }
    if (cVar9 != '\b') {
      if (cVar9 == '\x06') {
        if (1999 < *(ushort *)(unaff_ESI + 0x7a)) {
          pbVar1 = (byte *)(unaff_ESI + 0x3b);
          bVar4 = *pbVar1;
          *pbVar1 = *pbVar1 - 4;
          if (bVar4 < 4) {
            *(undefined1 *)(unaff_ESI + 0x3b) = 0;
          }
        }
        goto LAB_00439611;
      }
      if (cVar9 == '\a') {
        if ((*(char *)(unaff_ESI + 0x2c) == '\x11') || (*(char *)(unaff_ESI + 0x2c) == '\x0f'))
        goto LAB_00439576;
      }
      goto LAB_0043965b;
    }
    if (*(byte *)(unaff_ESI + 0x39) < 0x88) {
      *(char *)(unaff_ESI + 0x39) = *(char *)(unaff_ESI + 0x39) + '\x05';
    }
    if (4 < *(byte *)(unaff_ESI + 0x3f)) {
      *(char *)(unaff_ESI + 0x3f) = *(char *)(unaff_ESI + 0x3f) + -4;
      pbVar1 = (byte *)(unaff_ESI + 0x40);
      bVar4 = *pbVar1;
      *pbVar1 = *pbVar1 + 3;
      if (0xfc < bVar4) {
        *(undefined1 *)(unaff_ESI + 0x40) = 0xff;
      }
    }
    if (0x31 < *(byte *)(unaff_ESI + 0x3d)) {
      *(char *)(unaff_ESI + 0x3d) = *(char *)(unaff_ESI + 0x3d) + -6;
      goto LAB_00439611;
    }
  }
  *(char *)(unaff_ESI + 0x3b) = (char)uVar10 + '\x01';
  cVar9 = *(byte *)(unaff_ESI + 0x3d) - 2;
  if (*(byte *)(unaff_ESI + 0x3d) < 2) {
    cVar9 = '\0';
  }
  *(char *)(unaff_ESI + 0x3d) = cVar9;
  if (*(byte *)(unaff_ESI + 0x38) < 0x33) {
    pbVar1 = (byte *)(unaff_ESI + 0x3b);
    bVar4 = *pbVar1;
    *pbVar1 = *pbVar1 - 2;
    if (bVar4 < 2) {
      *(undefined1 *)(unaff_ESI + 0x3b) = 0;
    }
  }
  if (*(byte *)(unaff_ESI + 0x3e) < 0xb) {
    pcVar2 = (char *)(unaff_ESI + 0x3b);
    cVar9 = *pcVar2;
    *pcVar2 = *pcVar2 + -1;
    if (cVar9 == '\0') {
      *(undefined1 *)(unaff_ESI + 0x3b) = 0;
    }
  }
  if (*(byte *)(unaff_ESI + 0x3f) < 0xb) {
    pcVar2 = (char *)(unaff_ESI + 0x3b);
    cVar9 = *pcVar2;
    *pcVar2 = *pcVar2 + -1;
    if (cVar9 == '\0') {
      *(undefined1 *)(unaff_ESI + 0x3b) = 0;
    }
  }
  if (0xc2 < *(byte *)(unaff_ESI + 0x40)) {
    pcVar2 = (char *)(unaff_ESI + 0x3b);
    cVar9 = *pcVar2;
    *pcVar2 = *pcVar2 + -1;
    if (cVar9 == '\0') {
      *(undefined1 *)(unaff_ESI + 0x3b) = 0;
    }
  }
  if (((*(char *)(unaff_ESI + 0x2b) == '\x05') && (0x7f < *(byte *)(unaff_ESI + 0x3d))) &&
     ((bVar4 = FUN_005df40c(), bVar4 <= (byte)(*(char *)(unaff_ESI + 0x3c) + 0x80U) >> 1 &&
      (0xfd < *(byte *)(unaff_ESI + 0x71))))) {
    *(undefined1 *)(unaff_ESI + 0x71) = 8;
    *(undefined1 *)(unaff_ESI + 0x72) = 0;
    *(undefined1 *)(unaff_ESI + 0x70) = 0;
    FUN_0043c60b();
    FUN_005e53ca();
  }
LAB_004396f1:
  if ((*(char *)(unaff_ESI + 0x42) != '\0') && (*(char *)(unaff_ESI + 0x2b) != '\x03')) {
    pbVar1 = (byte *)(unaff_ESI + 0x42);
    bVar4 = *pbVar1;
    *pbVar1 = *pbVar1 - 3;
    if (bVar4 < 3) {
      *(undefined1 *)(unaff_ESI + 0x42) = 0;
    }
    iVar11 = 0x3e;
    if ((*(ushort *)(unaff_ESI + 0xca) & 0xa3c0) == 0) {
      iVar11 = 0x3f;
    }
    pbVar1 = (byte *)(iVar11 + unaff_ESI);
    bVar4 = *pbVar1;
    *pbVar1 = *pbVar1 + 7;
    if (0xf8 < bVar4) {
      *(undefined1 *)(iVar11 + unaff_ESI) = 0xff;
    }
    if (iVar11 == 0x3e) {
      pbVar1 = (byte *)(unaff_ESI + 0x3f);
      bVar4 = *pbVar1;
      *pbVar1 = *pbVar1 - 3;
      if (bVar4 < 3) {
        *(undefined1 *)(unaff_ESI + 0x3f) = 0;
      }
      pbVar1 = (byte *)(unaff_ESI + 0x40);
      bVar4 = *pbVar1;
      *pbVar1 = *pbVar1 + 2;
      if (0xfd < bVar4) {
        *(undefined1 *)(unaff_ESI + 0x40) = 0xff;
      }
    }
    if (*(char *)(unaff_ESI + 0x42) == '\0') {
      iVar11 = 0;
      bVar13 = (*(ushort *)(unaff_ESI + 0xca) & 0xa3e0) != 0;
      if (bVar13) {
        for (; ((*(ushort *)(unaff_ESI + 0xca) & 0xa3e0) >> iVar11 & 1) == 0; iVar11 = iVar11 + 1) {
        }
      }
      if (bVar13) {
        pbVar1 = (byte *)(unaff_ESI + 0xca + ((int)(short)(ushort)iVar11 >> 3));
        *pbVar1 = *pbVar1 & ~('\x01' << ((ushort)iVar11 & 7));
        bVar4 = (&DAT_0062d610)[iVar11];
        if (bVar4 != 0xff) {
          pbVar1 = (byte *)(unaff_ESI + 0xca + ((int)(short)(ushort)bVar4 >> 3));
          *pbVar1 = *pbVar1 | '\x01' << (bVar4 & 7);
        }
        *(byte *)(unaff_ESI + 0x45) = *(byte *)(unaff_ESI + 0x45) | 8;
        FUN_004420e0();
      }
    }
  }
  bVar4 = *(byte *)(unaff_ESI + 0x38);
  bVar3 = *(byte *)(unaff_ESI + 0x39);
  if (bVar4 < bVar3) {
    bVar5 = bVar4 + 4;
    if (0xfb < bVar4) {
      bVar5 = 0xff;
    }
    if (bVar3 < bVar5) {
      bVar5 = bVar3;
    }
  }
  else {
    bVar5 = bVar4 - 2;
    if ((byte)(bVar4 - 2) < bVar3) {
      bVar5 = bVar3;
    }
  }
  if (bVar5 < 0x20) {
    bVar5 = 0x20;
  }
  if (0x80 < bVar5) {
    bVar5 = 0x80;
  }
  if (bVar5 != bVar4) {
    *(byte *)(unaff_ESI + 0x38) = bVar5;
    *(byte *)(unaff_ESI + 0x45) = *(byte *)(unaff_ESI + 0x45) | 4;
  }
  bVar4 = *(byte *)(unaff_ESI + 0x3a);
  bVar3 = *(byte *)(unaff_ESI + 0x3b);
  if (bVar4 < bVar3) {
    bVar5 = bVar4 + 4;
    if (0xfb < bVar4) {
      bVar5 = 0xff;
    }
    if (bVar3 < bVar5) {
      bVar5 = bVar3;
    }
  }
  else {
    bVar5 = bVar4 - 4;
    if (bVar4 < 4) {
      bVar5 = 0;
    }
    if (bVar5 < bVar3) {
      bVar5 = bVar3;
    }
  }
  if (bVar5 != bVar4) {
    *(byte *)(unaff_ESI + 0x3a) = bVar5;
    *(byte *)(unaff_ESI + 0x45) = *(byte *)(unaff_ESI + 0x45) | 2;
  }
  bVar4 = *(byte *)(unaff_ESI + 0x3c);
  bVar3 = *(byte *)(unaff_ESI + 0x3d);
  if (bVar4 < bVar3) {
    bVar5 = bVar4 + 4;
    if (0xfb < bVar4) {
      bVar5 = 0xff;
    }
    if (bVar3 < bVar5) {
      bVar5 = bVar3;
    }
  }
  else {
    bVar5 = bVar4 - 4;
    if (bVar4 < 4) {
      bVar5 = 0;
    }
    if (bVar5 < bVar3) {
      bVar5 = bVar3;
    }
  }
  if (bVar5 != bVar4) {
    *(byte *)(unaff_ESI + 0x3c) = bVar5;
    *(byte *)(unaff_ESI + 0x45) = *(byte *)(unaff_ESI + 0x45) | 2;
  }
  return bVar5;
}

