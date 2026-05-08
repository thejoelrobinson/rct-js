
uint FUN_0043e304(void)

{
  ushort uVar1;
  uint in_EAX;
  uint uVar2;
  undefined4 uVar3;
  ushort uVar4;
  uint uVar5;
  byte in_DL;
  byte extraout_DL;
  byte extraout_DL_00;
  byte extraout_DL_01;
  char extraout_DL_02;
  byte extraout_DL_03;
  byte extraout_DL_04;
  byte extraout_DL_05;
  byte extraout_DL_06;
  byte extraout_DL_07;
  byte in_DH;
  uint unaff_EBX;
  undefined2 uVar6;
  ushort unaff_BP;
  int unaff_ESI;
  uint uVar7;
  int iVar8;
  
  uVar7 = (uint)in_DL;
  iVar8 = uVar7 * 0x260;
  uVar2 = in_EAX;
  if ((((&DAT_00887441)[iVar8] != '\x01') || (((&DAT_00887422)[uVar7 * 0x130] & 0x80) != 0)) ||
     ((*(ushort *)(unaff_ESI + 200) & 1) != 0)) goto LAB_0043e76b;
  unaff_EBX = (uint)(byte)(&DAT_00887420)[iVar8];
  if ((*(uint *)(&DAT_005f5b78 + unaff_EBX * 8) & 0x20000) == 0) {
    unaff_EBX = (uint)in_DH;
    if ((unaff_BP & 2) == 0) {
      if ((&DAT_0088747a)[iVar8 + unaff_EBX] != -1) {
        if ((unaff_BP & 1) == 0) {
          if (*(short *)(&DAT_00887472 + unaff_EBX * 2 + iVar8) != -1) goto LAB_0043e743;
        }
        else {
          uVar1 = *(ushort *)(&DAT_00887472 + unaff_EBX * 2 + iVar8);
          uVar2 = (uint)uVar1;
          if (uVar1 != 0xffff) {
            uVar7 = (uint)uVar1;
            uVar1 = (&DAT_00743ba6)[uVar7 * 0x80] - *(short *)(unaff_ESI + 0x12);
            if ((short)uVar1 < 0) {
              uVar1 = -uVar1;
            }
            uVar2 = (uint)uVar1;
            if (uVar1 < 7) {
              uVar1 = (&DAT_00743ba2)[uVar7 * 0x80] - *(short *)(unaff_ESI + 0xe);
              if ((short)uVar1 < 0) {
                uVar1 = -uVar1;
              }
              uVar4 = (&DAT_00743ba4)[uVar7 * 0x80] - *(short *)(unaff_ESI + 0x10);
              if ((short)uVar4 < 0) {
                uVar4 = -uVar4;
              }
              if (uVar1 < uVar4) {
                uVar1 = uVar4;
              }
              uVar2 = (uint)uVar1;
              if ((uVar1 < 0xe) &&
                 ((10 < *(ushort *)(&DAT_00743c0e + uVar7 * 0x100) || (uVar1 < 8))))
              goto LAB_0043e743;
            }
          }
        }
        goto LAB_0043e3f1;
      }
LAB_0043e743:
      (&DAT_00887422)[(uint)in_DL * 0x130] = (&DAT_00887422)[(uint)in_DL * 0x130] | 0x200;
    }
    else {
LAB_0043e3f1:
      if (in_DL == *(byte *)(unaff_ESI + 0xad)) goto LAB_0043e76b;
      uVar7 = (uint)in_DL;
      iVar8 = uVar7 * 0x260;
      uVar2 = (uint)(short)(&DAT_00887508)[uVar7 * 0x130];
      if ((uVar2 != 0) &&
         ((((*(ushort *)(unaff_ESI + 0xca) >> 0xe & 1) == 0 ||
           (*(char *)(unaff_ESI + 0xf0) != '\x01')) || (in_DL != *(byte *)(unaff_ESI + 0xf1))))) {
        if (*(int *)(unaff_ESI + 0xa0) < 1) {
LAB_0043e71f:
          if ((unaff_BP & 4) == 0) {
            uVar2 = FUN_00440fe3();
            in_DL = extraout_DL_06;
          }
          goto LAB_0043e755;
        }
        if (*(int *)(unaff_ESI + 0xa0) < (int)uVar2) goto LAB_0043e731;
      }
      if (((&DAT_0088757e)[iVar8] == '\0') || (0xe0 < *(byte *)(unaff_ESI + 0x3a))) {
        if (in_DL == *(byte *)(unaff_ESI + 0xc5)) {
          if (((&DAT_00887510)[uVar7 * 0x130] == -1) ||
             ((short)(&DAT_00887512)[uVar7 * 0x130] < 0x3e9)) {
LAB_0043e52c:
            uVar1 = (&DAT_00887516)[uVar7 * 0x130];
            if ((uVar1 == 0xffff) ||
               ((((*(ushort *)(unaff_ESI + 0xca) >> 0xe & 1) != 0 &&
                 (*(char *)(unaff_ESI + 0xf0) == '\x01')) && (in_DL == *(byte *)(unaff_ESI + 0xf1)))
               )) {
LAB_0043e598:
              if ((unaff_BP & 4) == 0) {
                uVar3 = FUN_004413fa();
                in_DL = extraout_DL_00;
                if (extraout_DL_00 == *(byte *)(unaff_ESI + 0xc5)) {
                  *(undefined1 *)(unaff_ESI + 0xc5) = 0xff;
                  FUN_005e5301(CONCAT31((int3)(unaff_EBX >> 8),1),uVar3);
                  in_DL = extraout_DL_01;
                }
              }
              (&DAT_00887422)[(uint)in_DL * 0x130] = (&DAT_00887422)[(uint)in_DL * 0x130] & 0xfdff;
              return in_EAX;
            }
            if ((*(ushort *)(unaff_ESI + 200) & 0x20) != 0) {
              uVar1 = uVar1 >> 2;
            }
            uVar2 = CONCAT22((short)(uVar2 >> 0x10),uVar1);
            uVar6 = (undefined2)(unaff_EBX >> 0x10);
            unaff_EBX = CONCAT22(uVar6,uVar1 << 1);
            if ((ushort)(&DAT_00887508)[uVar7 * 0x130] <= (ushort)(uVar1 << 1)) {
              unaff_EBX = CONCAT22(uVar6,uVar1 >> 1);
              if (((ushort)(&DAT_00887508)[uVar7 * 0x130] <= uVar1 >> 1) && ((unaff_BP & 4) == 0)) {
                FUN_00440fe3(uVar2);
                in_DL = extraout_DL;
              }
              goto LAB_0043e598;
            }
            if ((unaff_BP & 4) == 0) {
              FUN_00440fe3();
              if (0x3b < *(byte *)(unaff_ESI + 0x3b)) {
                *(byte *)(unaff_ESI + 0x3b) = *(byte *)(unaff_ESI + 0x3b) - 0x10;
              }
              unaff_EBX = unaff_EBX & 0xffffff00;
              uVar2 = FUN_004413fa();
              in_DL = extraout_DL_03;
            }
            goto LAB_0043e755;
          }
        }
        else {
          if ((&DAT_00887510)[uVar7 * 0x130] == -1) goto LAB_0043e52c;
          if (DAT_008d7eb6 == '\0') {
            uVar5 = (uint)*(byte *)(unaff_ESI + 0x3a);
            uVar2 = (uint)(*(byte *)(unaff_ESI + 0x43) >> 4) * 100;
            if (1000 < uVar2) {
              uVar2 = 1000;
            }
            unaff_EBX = (*(byte *)(unaff_ESI + 0x43) & 0xf) * 100 - uVar5;
            uVar2 = uVar2 + uVar5;
            if (((short)unaff_EBX <= (short)(&DAT_00887512)[uVar7 * 0x130]) &&
               ((short)(&DAT_00887512)[uVar7 * 0x130] <= (short)uVar2)) {
              uVar2 = *(byte *)(unaff_ESI + 0x44) & 3;
              unaff_EBX = *(ushort *)(&DAT_0062d620 + uVar2 * 4) - uVar5;
              uVar2 = *(ushort *)(&DAT_0062d622 + uVar2 * 4) + uVar5;
              if (*(short *)(&DAT_00887514 + iVar8) <= (short)uVar2) {
                if ((0x8b < *(ushort *)(&DAT_00887514 + iVar8)) &&
                   (0xa0 < *(byte *)(unaff_ESI + 0x3c))) goto LAB_0043e76b;
                goto LAB_0043e52c;
              }
            }
          }
          else {
            uVar2 = CONCAT31((int3)(char)((ushort)(&DAT_00887508)[uVar7 * 0x130] >> 8),
                             (byte)(&DAT_008874e4)[iVar8] >> 5);
            if (3 < (byte)(&DAT_008874e4)[iVar8] >> 5) goto LAB_0043e52c;
          }
        }
      }
      if ((unaff_BP & 4) == 0) {
        FUN_00440fe3();
        if (0x3f < *(byte *)(unaff_ESI + 0x3b)) {
          *(byte *)(unaff_ESI + 0x3b) = *(byte *)(unaff_ESI + 0x3b) - 8;
        }
        unaff_EBX = unaff_EBX & 0xffffff00;
        uVar2 = FUN_004413fa();
        in_DL = extraout_DL_05;
      }
    }
  }
  else {
    if (in_DL == *(byte *)(unaff_ESI + 0xad)) goto LAB_0043e76b;
    if ((&DAT_005f5e88)[unaff_EBX * 4] == -1) {
      if (*(byte *)(unaff_ESI + 0x40) < 0x46) goto LAB_0043e76b;
      uVar1 = (&DAT_00887508)[uVar7 * 0x130] * 0x28;
      uVar2 = (uint)uVar1;
      if (((char)(uVar1 >> 8) == '\0') && ((byte)uVar1 <= *(byte *)(unaff_ESI + 0x40)))
      goto LAB_0043e61a;
      if ((unaff_BP & 4) == 0) {
        FUN_00440fe3();
        if (0x3b < *(byte *)(unaff_ESI + 0x3b)) {
          *(byte *)(unaff_ESI + 0x3b) = *(byte *)(unaff_ESI + 0x3b) - 0x10;
        }
        unaff_EBX = 0;
        uVar2 = FUN_004413fa();
        in_DL = extraout_DL_04;
      }
      goto LAB_0043e755;
    }
LAB_0043e61a:
    uVar2 = (uint)(short)(&DAT_00887508)[uVar7 * 0x130];
    if (uVar2 == 0) {
LAB_0043e63e:
      if (((unaff_BP & 4) == 0) &&
         (uVar3 = FUN_004413fa(), extraout_DL_02 == *(char *)(unaff_ESI + 0xc5))) {
        *(undefined1 *)(unaff_ESI + 0xc5) = 0xff;
        FUN_005e5301(1,uVar3);
      }
      return in_EAX;
    }
    if (*(int *)(unaff_ESI + 0xa0) < 1) goto LAB_0043e71f;
    if ((int)uVar2 <= *(int *)(unaff_ESI + 0xa0)) goto LAB_0043e63e;
LAB_0043e731:
    if ((unaff_BP & 4) == 0) {
      uVar2 = FUN_00440fe3();
      in_DL = extraout_DL_07;
    }
  }
LAB_0043e755:
  if ((unaff_BP & 4) == 0) {
    *(byte *)(unaff_ESI + 0xad) = in_DL;
    *(undefined2 *)(unaff_ESI + 0xae) = 0;
  }
LAB_0043e76b:
  if (in_DL == *(byte *)(unaff_ESI + 0xc5)) {
    *(undefined1 *)(unaff_ESI + 0xc5) = 0xff;
    FUN_005e5301(unaff_EBX,uVar2);
  }
  return in_EAX;
}

