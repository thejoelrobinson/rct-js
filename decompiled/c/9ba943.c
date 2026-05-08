
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_009ba943(void)

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
  char cVar8;
  short in_DX;
  short sVar9;
  uint *unaff_ESI;
  uint *puVar10;
  int unaff_EDI;
  
  DAT_009aa064 = in_CX;
  DAT_009aa066 = in_DX;
  if ((char)in_AX == -2) goto LAB_009baa14;
  if (((((short)(*(short *)(unaff_EDI + 4) + *(short *)(unaff_EDI + 8)) <= in_CX) ||
       ((short)(in_CX + 0x500) <= *(short *)(unaff_EDI + 4))) ||
      ((short)(*(short *)(unaff_EDI + 6) + *(short *)(unaff_EDI + 10)) <= in_DX)) ||
     ((short)(in_DX + 0x1e0) <= *(short *)(unaff_EDI + 6))) {
    return;
  }
  if ((char)in_AX == -1) goto LAB_009baa14;
  _DAT_00971ef2 = 0;
  uVar5 = (uint)(in_AX & 0xffdf);
  if ((in_AX >> 5 & 1) != 0) {
    _DAT_00971ef2 = 2;
  }
  if ((in_AX & 0x40) == 0) goto LAB_009ba9dc;
  _DAT_00971ef2 = _DAT_00971ef2 | 1;
  _DAT_0099ac89 =
       (uint)CONCAT11(*(undefined1 *)((int)&DAT_0099ac8f + (uVar5 & 0x1f) * 8 + 2),
                      *(undefined1 *)(&DAT_0099ac8f + (uVar5 & 0x1f) * 2));
  do {
    DAT_009a200c = &DAT_0099ac88;
LAB_009baa14:
    do {
      if ((short)(in_DX + 0x13) <= *(short *)(unaff_EDI + 6)) goto LAB_009bacae;
      sVar9 = in_DX;
      puVar10 = unaff_ESI;
      if ((short)(*(short *)(unaff_EDI + 6) + *(short *)(unaff_EDI + 10)) <= in_DX)
      goto LAB_009bacae;
LAB_009baa36:
      bVar2 = (byte)*puVar10;
      in_DX = sVar9;
      puVar10 = (uint *)((int)puVar10 + 1);
      while( true ) {
        if (bVar2 == 0) {
          return;
        }
        unaff_ESI = puVar10;
        if ((bVar2 < 0x9c) && (0x8d < bVar2)) break;
        bVar3 = bVar2 - 0x20;
        bVar6 = (byte)in_CX;
        cVar7 = (char)((ushort)in_CX >> 8);
        sVar9 = in_DX;
        if (bVar2 < 0x20) {
          if (bVar3 == 0xe5) {
            in_CX = DAT_009aa064;
            sVar9 = in_DX + 10;
            if ((0xe0 < DAT_00971e84) && (sVar9 = in_DX + 6, DAT_00971e84 != 0x1c0)) {
              sVar9 = in_DX + 0x12;
            }
            goto LAB_009baa36;
          }
          if (bVar3 == 0xe6) {
            in_CX = DAT_009aa064;
            sVar9 = in_DX + 5;
            if ((0xe0 < DAT_00971e84) && (sVar9 = in_DX + 3, DAT_00971e84 != 0x1c0)) {
              sVar9 = in_DX + 9;
            }
            goto LAB_009baa36;
          }
          bVar2 = (byte)DAT_009aa064;
          cVar8 = (char)((ushort)DAT_009aa064 >> 8);
          if (bVar3 == 0xe1) {
            uVar5 = *puVar10;
            puVar10 = (uint *)((int)puVar10 + 1);
            in_CX = CONCAT11(cVar8 + CARRY1(bVar2,(byte)uVar5),bVar2 + (byte)uVar5);
            goto LAB_009baa36;
          }
          if (bVar3 == 0xf1) {
            uVar5 = *puVar10;
            puVar10 = (uint *)((int)puVar10 + 2);
            bVar3 = (byte)(short)uVar5;
            bVar6 = (byte)((ushort)(short)uVar5 >> 8);
            in_CX = CONCAT11(cVar8 + CARRY1(bVar2,bVar3),bVar2 + bVar3);
            sVar9 = CONCAT11((char)((ushort)DAT_009aa066 >> 8) + CARRY1((byte)DAT_009aa066,bVar6),
                             (byte)DAT_009aa066 + bVar6);
            goto LAB_009baa36;
          }
          if (bVar3 == 0xe7) {
            DAT_00971e84 = 0x1c0;
            goto LAB_009baa36;
          }
          if (bVar3 == 0xe8) {
            DAT_00971e84 = 0x2a0;
            goto LAB_009baa36;
          }
          if (bVar3 == 0xe9) {
            DAT_00971e84 = 0xe0;
            goto LAB_009baa36;
          }
          if (bVar3 == 0xea) {
            DAT_00971e84 = 0;
            goto LAB_009baa36;
          }
          if (bVar3 == 0xeb) {
            _DAT_00971ef2 = _DAT_00971ef2 | 2;
            goto LAB_009baa36;
          }
          if (bVar3 == 0xec) {
            _DAT_00971ef2 = _DAT_00971ef2 & 0xfffd;
            goto LAB_009baa36;
          }
          if (bVar3 == 0xe2) {
            unaff_ESI = (uint *)((int)puVar10 + 1);
            if ((_DAT_00971ef2 & 1) == 0) {
              uVar4 = CONCAT11(1,*(byte *)((&DAT_008dc0b4)
                                           [*(int *)(&DAT_009aa06c + (uint)(byte)*puVar10 * 4) * 4]
                                          + 0xf9));
              if ((_DAT_00971ef2 & 2) == 0) {
                uVar4 = (ushort)*(byte *)((&DAT_008dc0b4)
                                          [*(int *)(&DAT_009aa06c + (uint)(byte)*puVar10 * 4) * 4] +
                                         0xf9);
              }
              _DAT_0099ac89 = CONCAT22((undefined2)DAT_0099ac8b,uVar4);
              DAT_009a200c = &DAT_0099ac88;
            }
            goto LAB_009baa14;
          }
          if (bVar3 != 0xf7) goto LAB_009baa36;
          unaff_ESI = puVar10 + 1;
          if (in_CX < (short)(*(short *)(unaff_EDI + 4) + *(short *)(unaff_EDI + 8))) {
            uVar1 = *(undefined2 *)(&DAT_008dc0b8 + (*puVar10 & 0x1ffff) * 0x10);
            FUN_009b438b();
            in_CX = CONCAT11(cVar7 + CARRY1(bVar6,(byte)uVar1),bVar6 + (byte)uVar1);
            puVar10 = unaff_ESI;
            goto LAB_009baa36;
          }
        }
        else if (in_CX < (short)(*(short *)(unaff_EDI + 4) + *(short *)(unaff_EDI + 8)))
        goto code_r0x009baa5e;
LAB_009bacae:
        while( true ) {
          bVar2 = (byte)*unaff_ESI;
          unaff_ESI = (uint *)((int)unaff_ESI + 1);
          puVar10 = unaff_ESI;
          if (bVar2 < 0x20) break;
          if ((bVar2 < 0x9c) && (0x8d < bVar2)) goto LAB_009babe5;
        }
      }
LAB_009babe5:
      uVar5 = (uint)(byte)(bVar2 + 0x72);
LAB_009ba9dc:
    } while ((_DAT_00971ef2 & 1) != 0);
    _DAT_0099ac89 = *(uint *)(DAT_0093a464 + (uVar5 & 0xff) * 4);
    if ((_DAT_00971ef2 & 2) == 0) {
      _DAT_0099ac89 = CONCAT22((short)(_DAT_0099ac89 >> 0x10),(ushort)(byte)_DAT_0099ac89);
    }
  } while( true );
code_r0x009baa5e:
  if ((short)(in_CX + 0x1a) < *(short *)(unaff_EDI + 4)) {
    in_CX = CONCAT11(cVar7 + CARRY1(bVar6,(&DAT_0099a508)[(ushort)(bVar3 + DAT_00971e84)]),
                     bVar6 + (&DAT_0099a508)[(ushort)(bVar3 + DAT_00971e84)]);
  }
  else {
    uVar1 = *(undefined2 *)(&DAT_0099a508 + (ushort)(bVar3 + DAT_00971e84));
    DAT_009a2000 = 0x20000000;
    FUN_009b4457();
    in_CX = CONCAT11(cVar7 + CARRY1(bVar6,(byte)uVar1),bVar6 + (byte)uVar1);
  }
  goto LAB_009baa36;
}

