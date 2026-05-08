
void FUN_005e3c3c(void)

{
  uint uVar1;
  undefined4 *puVar2;
  short sVar3;
  short sVar4;
  ushort extraout_CX;
  ushort extraout_CX_00;
  short extraout_CX_01;
  ushort extraout_CX_02;
  ushort extraout_CX_03;
  short extraout_CX_04;
  uint in_ECX;
  uint extraout_ECX;
  short extraout_DX;
  short extraout_DX_00;
  short extraout_DX_01;
  short extraout_DX_02;
  short extraout_DX_03;
  short extraout_DX_04;
  short extraout_DX_05;
  short extraout_DX_06;
  short extraout_DX_07;
  short extraout_DX_08;
  short extraout_DX_09;
  short extraout_DX_10;
  short extraout_DX_11;
  short extraout_DX_12;
  short extraout_DX_13;
  short extraout_DX_14;
  undefined4 in_EDX;
  undefined4 uVar5;
  ushort uVar6;
  short sVar7;
  undefined4 unaff_EBX;
  undefined4 uVar8;
  undefined4 unaff_EBP;
  undefined4 *unaff_ESI;
  undefined4 *puVar9;
  undefined *puVar10;
  undefined4 *unaff_EDI;
  bool bVar11;
  undefined8 uVar12;
  
  uVar6 = (ushort)unaff_EBX;
  if ((char)in_ECX < '\0') {
    uVar1 = in_ECX & 0x7f;
    in_ECX = in_ECX & 0xffffff7f;
    bVar11 = uVar1 == 0;
    FUN_005e3b2b();
    unaff_EDI = unaff_ESI;
    if ((((!bVar11) && (*(short *)(unaff_ESI + 8) < (short)(DAT_00971ed6 - 0x14))) &&
        (-0x3c < *(short *)(unaff_ESI + 8))) &&
       (*(ushort *)((int)unaff_ESI + 0x22) < (ushort)(DAT_00971ed8 - 0x14U))) {
      FUN_005e3f31();
      return;
    }
  }
  bVar11 = false;
  sVar3 = FUN_005e3bbf();
  sVar4 = extraout_DX;
  if (bVar11) {
    bVar11 = (ushort)(DAT_00971ed8 - 0x24U) < extraout_CX;
    sVar3 = FUN_005e3bbf();
    sVar4 = extraout_DX_00;
    if (bVar11) {
      bVar11 = DAT_00971ed6 < uVar6;
      sVar3 = FUN_005e3bbf();
      sVar4 = extraout_DX_01;
      if (bVar11) {
        bVar11 = (ushort)(DAT_00971ed8 - 0x24U) < extraout_CX_00;
        sVar3 = FUN_005e3bbf();
        sVar4 = extraout_DX_02;
        if (bVar11) {
          for (unaff_EDI = (undefined4 *)&DAT_009a013c; unaff_EDI < DAT_009a1164;
              unaff_EDI = unaff_EDI + 0x5e) {
            if ((*(ushort *)((int)unaff_EDI + 0x32) & 1) == 0) {
              bVar11 = 0xfffd < (ushort)(*(short *)(unaff_EDI + 8) + *(short *)(unaff_EDI + 9));
              sVar3 = FUN_005e3bbf();
              sVar4 = extraout_DX_03;
              if (!bVar11) goto LAB_005e3efb;
              bVar11 = (ushort)(*(short *)(unaff_EDI + 8) - uVar6) < 2;
              sVar3 = FUN_005e3bbf();
              sVar4 = extraout_DX_04;
              if (!bVar11) goto LAB_005e3efb;
              bVar11 = 0xfffd < (ushort)(*(short *)((int)unaff_EDI + 0x22) +
                                        *(short *)((int)unaff_EDI + 0x26));
              sVar3 = FUN_005e3bbf();
              sVar4 = extraout_DX_05;
              if (!bVar11) goto LAB_005e3efb;
              bVar11 = (ushort)(*(short *)((int)unaff_EDI + 0x22) - extraout_CX_01) < 2;
              sVar3 = FUN_005e3bbf();
              sVar4 = extraout_DX_06;
              if (!bVar11) goto LAB_005e3efb;
              bVar11 = (ushort)(*(short *)((int)unaff_EDI + 0x22) +
                               *(short *)((int)unaff_EDI + 0x26)) < extraout_CX_02;
              sVar3 = FUN_005e3bbf();
              sVar4 = extraout_DX_07;
              if (!bVar11) goto LAB_005e3efb;
              bVar11 = (ushort)(*(short *)((int)unaff_EDI + 0x22) +
                               *(short *)((int)unaff_EDI + 0x26)) < extraout_CX_03;
              sVar3 = FUN_005e3bbf();
              sVar4 = extraout_DX_08;
              if (!bVar11) goto LAB_005e3efb;
              bVar11 = (ushort)(*(short *)(unaff_EDI + 8) + *(short *)(unaff_EDI + 9)) < uVar6;
              sVar3 = FUN_005e3bbf();
              sVar4 = extraout_DX_09;
              if (!bVar11) goto LAB_005e3efb;
              bVar11 = (ushort)(*(short *)(unaff_EDI + 8) + *(short *)(unaff_EDI + 9)) < uVar6;
              sVar3 = FUN_005e3bbf();
              sVar4 = extraout_DX_10;
              if (!bVar11) goto LAB_005e3efb;
            }
          }
          unaff_EDI = (undefined4 *)&DAT_009a013c;
          do {
            if (DAT_009a1164 <= unaff_EDI) {
              sVar4 = 0;
              sVar3 = 0x20;
              do {
                unaff_EDI = (undefined4 *)&DAT_009a013c;
                while( true ) {
                  if (DAT_009a1164 <= unaff_EDI) goto LAB_005e3efb;
                  if ((sVar4 == *(short *)(unaff_EDI + 8)) &&
                     (sVar3 == *(short *)((int)unaff_EDI + 0x22))) break;
                  unaff_EDI = unaff_EDI + 0x5e;
                }
                sVar4 = sVar4 + 5;
                sVar3 = sVar3 + 5;
              } while( true );
            }
            if ((*(ushort *)((int)unaff_EDI + 0x32) & 1) == 0) {
              bVar11 = 0xfffd < (ushort)(*(short *)(unaff_EDI + 8) + *(short *)(unaff_EDI + 9));
              sVar3 = FUN_005e3b77();
              sVar4 = extraout_DX_11;
              if (!bVar11) break;
              bVar11 = (ushort)(*(short *)(unaff_EDI + 8) - uVar6) < 2;
              sVar3 = FUN_005e3b77();
              sVar4 = extraout_DX_12;
              if (!bVar11) break;
              bVar11 = 0xfffd < (ushort)(*(short *)((int)unaff_EDI + 0x22) +
                                        *(short *)((int)unaff_EDI + 0x26));
              sVar3 = FUN_005e3b77();
              sVar4 = extraout_DX_13;
              if (!bVar11) break;
              bVar11 = (ushort)(*(short *)((int)unaff_EDI + 0x22) - extraout_CX_04) < 2;
              sVar3 = FUN_005e3b77();
              sVar4 = extraout_DX_14;
              if (!bVar11) break;
            }
            unaff_EDI = unaff_EDI + 0x5e;
          } while( true );
        }
      }
    }
  }
LAB_005e3efb:
  sVar7 = (short)unaff_EBX + sVar4;
  if (sVar4 < 0) {
    sVar7 = sVar7 - sVar4;
    sVar4 = 0;
  }
  if ((short)DAT_00971ed6 < sVar7) {
    sVar4 = sVar4 - (sVar7 - DAT_00971ed6);
    sVar7 = sVar7 - (sVar7 - DAT_00971ed6);
  }
  uVar12 = CONCAT44(in_EDX,CONCAT22(sVar3,sVar4));
  uVar8 = CONCAT22((short)((uint)unaff_EBX >> 0x10),sVar7 - sVar4);
  while( true ) {
    if (DAT_009a1164 < &DAT_009a1164) break;
    for (puVar10 = &DAT_009a013c; (*(ushort *)(puVar10 + 0x32) & 0x103) != 0;
        puVar10 = puVar10 + 0x178) {
    }
    uVar12 = FUN_005e5bd8();
    in_ECX = extraout_ECX;
  }
  puVar9 = DAT_009a1164;
  puVar2 = DAT_009a1164;
  if ((in_ECX & 0x100) == 0) {
    if ((in_ECX & 0x200) == 0) {
      while ((puVar9 != (undefined4 *)&DAT_009a013c &&
             ((*(ushort *)((int)puVar9 + -0x146) >> 1 & 1) != 0))) {
        puVar9 = puVar9 + -0x5e;
      }
    }
  }
  else {
    for (; (puVar9 != (undefined4 *)&DAT_009a013c &&
           (((*(ushort *)((int)puVar9 + -0x146) >> 1 & 1) != 0 ||
            ((*(ushort *)((int)puVar9 + -0x146) & 1) == 0)))); puVar9 = puVar9 + -0x5e) {
    }
  }
  while (puVar9 != puVar2) {
    *(undefined1 *)((int)puVar2 + 0x177) = *(undefined1 *)((int)puVar2 + -1);
    puVar2 = (undefined4 *)((int)puVar2 + -1);
  }
  *(char *)(puVar9 + 0x5d) = (char)in_ECX;
  *(undefined1 *)((int)puVar9 + 0x175) = 0xff;
  *(undefined2 *)((int)puVar9 + 0x32) = 0;
  *(ushort *)((int)puVar9 + 0x32) = *(ushort *)((int)puVar9 + 0x32) | (ushort)(in_ECX >> 8);
  if ((in_ECX & 0x300) == 0) {
    *(ushort *)((int)puVar9 + 0x32) = *(ushort *)((int)puVar9 + 0x32) | 0x600;
    FUN_00452fce(uVar8,(int)uVar12,unaff_EDI,puVar9,unaff_EBP,&stack0x00000000,uVar8,
                 (int)((ulonglong)uVar12 >> 0x20),in_ECX);
  }
  uVar5 = (undefined4)((ulonglong)uVar12 >> 0x20);
  *(undefined2 *)(puVar9 + 0xc) = 0;
  puVar9[8] = (int)uVar12;
  puVar9[9] = uVar8;
  puVar9[2] = 0;
  puVar9[1] = uVar5;
  *puVar9 = unaff_EBP;
  puVar9[3] = 0;
  puVar9[4] = 0;
  puVar9[5] = 0;
  puVar9[6] = 0;
  *(undefined2 *)((int)puVar9 + 0x15a) = 0;
  *(undefined2 *)(puVar9 + 0x57) = 0;
  *(undefined2 *)((int)puVar9 + 0x15e) = 0;
  *(undefined2 *)(puVar9 + 0x58) = 0;
  *(undefined2 *)((int)puVar9 + 0x162) = 0;
  *(undefined2 *)(puVar9 + 0x59) = 0;
  *(undefined2 *)((int)puVar9 + 0x166) = 0;
  *(undefined2 *)(puVar9 + 0x5a) = 0;
  *(undefined2 *)((int)puVar9 + 0x16a) = 0;
  *(undefined2 *)(puVar9 + 0x5b) = 0;
  (*(code *)*puVar9)(unaff_EDI,puVar9,unaff_EBP,&stack0x00000000,uVar8,uVar5,in_ECX,(int)uVar12);
  DAT_009a1164 = DAT_009a1164 + 0x5e;
  FUN_005e43de();
  return;
}

