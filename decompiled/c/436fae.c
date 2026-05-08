
undefined8 FUN_00436fae(void)

{
  byte *pbVar1;
  byte bVar2;
  byte bVar3;
  byte bVar4;
  undefined4 in_EAX;
  byte bVar5;
  ushort in_CX;
  ushort uVar6;
  byte bVar7;
  byte bVar8;
  undefined4 in_EDX;
  byte unaff_BL;
  byte bVar9;
  char cVar10;
  byte *pbVar11;
  
  DAT_00628af6 = 1;
  uVar6 = (ushort)in_EAX;
  if ((((0xfdf < (short)uVar6) || (0xfdf < (short)in_CX)) || ((short)uVar6 < 0x20)) ||
     ((short)in_CX < 0x20)) {
    DAT_00991efc = 0x458;
    return CONCAT44(in_EDX,in_EAX);
  }
  uVar6 = in_CX << 7 | in_CX >> 9 | uVar6;
  pbVar11 = (byte *)(&DAT_00971ef4)[(ushort)(uVar6 >> 5 | uVar6 << 0xb)];
  do {
    bVar8 = (byte)in_EDX;
    bVar3 = (byte)((uint)in_EDX >> 8);
    bVar9 = unaff_BL;
    if ((*pbVar11 & 0x3c) == 0) {
      if (((pbVar11[5] & 0x1f) != 0) &&
         (((bVar2 = (pbVar11[5] & 0x1f) << 2, bVar8 < bVar2 && (pbVar11[2] < bVar3)) &&
          (DAT_00628af6 = DAT_00628af6 | 4, bVar2 < bVar3)))) {
        DAT_00991efc = 0x459;
        return CONCAT44(in_EDX,in_EAX);
      }
      if ((unaff_BL & 0xf0) != 0xf0) {
        bVar2 = pbVar11[2];
        if (bVar2 < bVar3) {
          bVar9 = pbVar11[4];
          uVar6 = CONCAT11(bVar9,unaff_BL) & 0x1fff;
          cVar10 = (char)(uVar6 >> 8);
          bVar3 = bVar2;
          if (((bVar9 & 1) != 0) && (bVar3 = bVar2 + 4, cVar10 == '\x1b')) {
            bVar3 = bVar2 + 8;
          }
          bVar4 = bVar2;
          if (((bVar9 & 2) != 0) && (bVar4 = bVar2 + 4, cVar10 == '\x17')) {
            bVar4 = bVar2 + 8;
          }
          bVar5 = bVar2;
          if (((bVar9 & 4) != 0) && (bVar5 = bVar2 + 4, cVar10 == '\x1e')) {
            bVar5 = bVar2 + 8;
          }
          bVar7 = bVar2;
          if (((bVar9 & 8) != 0) && (bVar7 = bVar2 + 4, cVar10 == '\x1d')) {
            bVar7 = bVar2 + 8;
          }
          bVar9 = (byte)uVar6;
          bVar2 = bVar8 + 8;
          if ((((unaff_BL & 1) != 0) &&
              ((((unaff_BL & 0x10) == 0 && (bVar8 < bVar3)) || (bVar2 < bVar3)))) ||
             (((((unaff_BL & 2) != 0 &&
                ((((unaff_BL & 0x20) == 0 && (bVar8 < bVar4)) || (bVar2 < bVar4)))) ||
               (((unaff_BL & 4) != 0 &&
                ((((unaff_BL & 0x40) == 0 && (bVar8 < bVar5)) || (bVar2 < bVar5)))))) ||
              (((unaff_BL & 8) != 0 &&
               ((((unaff_BL & 0x80) == 0 && (bVar8 < bVar7)) || (bVar2 < bVar7))))))))
          goto LAB_0043710e;
        }
        else {
          DAT_00628af6 = DAT_00628af6 & 0xfe | 2;
        }
      }
    }
    else if ((((*pbVar11 & 0x3c) != 0x3c) && (bVar8 < pbVar11[3])) &&
            ((pbVar11[2] < bVar3 &&
             (((pbVar11[1] & 0x10) == 0 && ((pbVar11[1] & unaff_BL & 0xf) != 0)))))) {
LAB_0043710e:
      FUN_0043725f();
      return CONCAT44(in_EDX,in_EAX);
    }
    unaff_BL = bVar9;
    pbVar1 = pbVar11 + 1;
    pbVar11 = pbVar11 + 8;
    if ((*pbVar1 & 0x80) != 0) {
      return CONCAT44(in_EDX,in_EAX);
    }
  } while( true );
}

