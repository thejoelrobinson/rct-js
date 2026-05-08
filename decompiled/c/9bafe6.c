
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_009bafe6(void)

{
  undefined2 uVar1;
  byte bVar2;
  byte bVar3;
  ushort in_AX;
  byte bVar6;
  ushort uVar4;
  uint uVar5;
  short in_CX;
  char cVar7;
  short in_DX;
  short sVar8;
  int unaff_EBP;
  byte *unaff_ESI;
  int unaff_EDI;
  
  DAT_009aa060 = unaff_EBP;
  DAT_009aa064 = in_CX;
  DAT_009aa066 = in_DX;
  if ((char)in_AX == -2) goto LAB_009bb0c3;
  if (((((short)(*(short *)(unaff_EDI + 4) + *(short *)(unaff_EDI + 8)) <= in_CX) ||
       ((short)(in_CX + 0x500) <= *(short *)(unaff_EDI + 4))) ||
      ((short)(*(short *)(unaff_EDI + 6) + *(short *)(unaff_EDI + 10)) <= (short)(in_DX + -0x14)))
     || ((short)(in_DX + 0x3c) <= *(short *)(unaff_EDI + 6))) {
    return;
  }
  if ((char)in_AX == -1) goto LAB_009bb0c3;
  _DAT_00971ef2 = 0;
  uVar5 = (uint)(in_AX & 0xffdf);
  if ((in_AX >> 5 & 1) != 0) {
    _DAT_00971ef2 = 2;
  }
  if ((in_AX & 0x40) == 0) goto LAB_009bb08b;
  _DAT_00971ef2 = _DAT_00971ef2 | 1;
  _DAT_0099ac89 =
       (uint)CONCAT11(*(undefined1 *)((int)&DAT_0099ac8f + (uVar5 & 0x1f) * 8 + 2),
                      *(undefined1 *)(&DAT_0099ac8f + (uVar5 & 0x1f) * 2));
  do {
    DAT_009a200c = &DAT_0099ac88;
LAB_009bb0c3:
    do {
      if ((short)(in_DX + 0x27) <= *(short *)(unaff_EDI + 6)) goto LAB_009bb33c;
      sVar8 = in_DX;
      if ((short)(*(short *)(unaff_EDI + 6) + *(short *)(unaff_EDI + 10)) <= (short)(in_DX + -0x14))
      goto LAB_009bb33c;
LAB_009bb0ec:
      bVar2 = *unaff_ESI;
      unaff_ESI = unaff_ESI + 1;
      in_DX = sVar8;
      while( true ) {
        if (bVar2 == 0) {
          return;
        }
        if ((bVar2 < 0x9c) && (0x8d < bVar2)) break;
        bVar3 = bVar2 - 0x20;
        sVar8 = in_DX;
        if (bVar2 < 0x20) {
          if (bVar3 == 0xe5) {
            in_CX = DAT_009aa064;
            sVar8 = in_DX + 10;
            if ((0xe0 < DAT_00971e84) && (sVar8 = in_DX + 6, DAT_00971e84 != 0x1c0)) {
              sVar8 = in_DX + 0x12;
            }
            goto LAB_009bb0ec;
          }
          if (bVar3 == 0xe6) {
            in_CX = DAT_009aa064;
            sVar8 = in_DX + 5;
            if ((0xe0 < DAT_00971e84) && (sVar8 = in_DX + 3, DAT_00971e84 != 0x1c0)) {
              sVar8 = in_DX + 9;
            }
            goto LAB_009bb0ec;
          }
          bVar2 = (byte)DAT_009aa064;
          cVar7 = (char)((ushort)DAT_009aa064 >> 8);
          if (bVar3 == 0xe1) {
            bVar3 = *unaff_ESI;
            unaff_ESI = unaff_ESI + 1;
            in_CX = CONCAT11(cVar7 + CARRY1(bVar2,bVar3),bVar2 + bVar3);
            goto LAB_009bb0ec;
          }
          if (bVar3 == 0xf1) {
            uVar1 = *(undefined2 *)unaff_ESI;
            unaff_ESI = unaff_ESI + 2;
            bVar3 = (byte)uVar1;
            bVar6 = (byte)((ushort)uVar1 >> 8);
            in_CX = CONCAT11(cVar7 + CARRY1(bVar2,bVar3),bVar2 + bVar3);
            sVar8 = CONCAT11((char)((ushort)DAT_009aa066 >> 8) + CARRY1((byte)DAT_009aa066,bVar6),
                             (byte)DAT_009aa066 + bVar6);
            goto LAB_009bb0ec;
          }
          if (bVar3 == 0xe7) {
            DAT_00971e84 = 0x1c0;
            goto LAB_009bb0ec;
          }
          if (bVar3 == 0xe8) {
            DAT_00971e84 = 0x2a0;
            goto LAB_009bb0ec;
          }
          if (bVar3 == 0xe9) {
            DAT_00971e84 = 0xe0;
            goto LAB_009bb0ec;
          }
          if (bVar3 == 0xea) {
            DAT_00971e84 = 0;
            goto LAB_009bb0ec;
          }
          if (bVar3 == 0xeb) {
            _DAT_00971ef2 = _DAT_00971ef2 | 2;
            goto LAB_009bb0ec;
          }
          if (bVar3 == 0xec) {
            _DAT_00971ef2 = _DAT_00971ef2 & 0xfffd;
            goto LAB_009bb0ec;
          }
          if (bVar3 != 0xe2) goto LAB_009bb0ec;
          bVar2 = *unaff_ESI;
          unaff_ESI = unaff_ESI + 1;
          if ((_DAT_00971ef2 & 1) == 0) {
            uVar4 = CONCAT11(1,*(byte *)((&DAT_008dc0b4)
                                         [*(int *)(&DAT_009aa06c + (uint)bVar2 * 4) * 4] + 0xf9));
            if ((_DAT_00971ef2 & 2) == 0) {
              uVar4 = (ushort)*(byte *)((&DAT_008dc0b4)
                                        [*(int *)(&DAT_009aa06c + (uint)bVar2 * 4) * 4] + 0xf9);
            }
            _DAT_0099ac89 = CONCAT22((undefined2)DAT_0099ac8b,uVar4);
            DAT_009a200c = &DAT_0099ac88;
          }
          goto LAB_009bb0c3;
        }
        if (in_CX < (short)(*(short *)(unaff_EDI + 4) + *(short *)(unaff_EDI + 8)))
        goto code_r0x009bb11c;
LAB_009bb33c:
        while( true ) {
          bVar2 = *unaff_ESI;
          unaff_ESI = unaff_ESI + 1;
          if (bVar2 < 0x20) break;
          if ((bVar2 < 0x9c) && (0x8d < bVar2)) goto LAB_009bb273;
        }
      }
LAB_009bb273:
      uVar5 = (uint)(byte)(bVar2 + 0x72);
LAB_009bb08b:
    } while ((_DAT_00971ef2 & 1) != 0);
    _DAT_0099ac89 = *(uint *)(DAT_0093a464 + (uVar5 & 0xff) * 4);
    if ((_DAT_00971ef2 & 2) == 0) {
      _DAT_0099ac89 = CONCAT22((short)(_DAT_0099ac89 >> 0x10),(ushort)(byte)_DAT_0099ac89);
    }
  } while( true );
code_r0x009bb11c:
  bVar2 = (byte)in_CX;
  cVar7 = (char)((ushort)in_CX >> 8);
  if ((short)(in_CX + 0x1a) < *(short *)(unaff_EDI + 4)) {
    DAT_009aa060 = DAT_009aa060 + 1;
    in_CX = CONCAT11(cVar7 + CARRY1(bVar2,(&DAT_0099a508)[(ushort)(bVar3 + DAT_00971e84)]),
                     bVar2 + (&DAT_0099a508)[(ushort)(bVar3 + DAT_00971e84)]);
  }
  else {
    uVar1 = *(undefined2 *)(&DAT_0099a508 + (ushort)(bVar3 + DAT_00971e84));
    DAT_009a2000 = 0x20000000;
    FUN_009b4457();
    DAT_009aa060 = DAT_009aa060 + 1;
    in_CX = CONCAT11(cVar7 + CARRY1(bVar2,(byte)uVar1),bVar2 + (byte)uVar1);
  }
  goto LAB_009bb0ec;
}

