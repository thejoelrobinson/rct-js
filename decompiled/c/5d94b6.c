
void FUN_005d94b6(void)

{
  byte bVar1;
  char cVar2;
  char cVar3;
  ushort uVar4;
  byte bVar8;
  undefined2 uVar5;
  undefined2 extraout_var;
  undefined4 uVar6;
  int iVar7;
  byte bVar9;
  char cVar11;
  byte extraout_CH;
  uint uVar10;
  char extraout_DL;
  char extraout_DL_00;
  char extraout_DH;
  byte unaff_BL;
  uint uVar12;
  undefined1 *unaff_ESI;
  undefined1 *puVar13;
  
  bVar9 = unaff_ESI[0x30];
  if ((*(ushort *)(unaff_ESI + 0x48) & 0x20) != 0) {
    FUN_005d8c79();
  }
  DAT_0065e6b7 = -1;
  if (((&DAT_00887422)[(uint)bVar9 * 0x130] & 0xc0) != 0) {
    DAT_0065e6b7 = (&DAT_0088755c)[(uint)bVar9 * 0x260];
    if ((((*(ushort *)(&DAT_005f7104 + (uint)(byte)unaff_ESI[0x31] * 8) & 8) != 0) &&
        (DAT_0065e6b7 == '\0')) &&
       (((*(ushort *)(&DAT_005f7104 + (uint)(byte)unaff_ESI[0x31] * 8) & 0x2000) == 0 ||
        ((unaff_ESI[0x1f] == '\x02' && (*(int *)(unaff_ESI + 0x28) < 0x20001)))))) {
      *(ushort *)(unaff_ESI + 0x48) = *(ushort *)(unaff_ESI + 0x48) | 0x80;
    }
  }
  (*(code *)(&PTR_LAB_005d97b4)[(byte)unaff_ESI[0x50]])();
  uVar6 = CONCAT22(extraout_var,*(ushort *)(unaff_ESI + 0xb8));
  uVar12 = (uint)(byte)unaff_ESI[0x31];
  cVar3 = -1;
  uVar10 = *(uint *)(unaff_ESI + 0x28);
  if ((int)uVar10 < 0) {
    uVar10 = -uVar10;
  }
  if (0xffff < uVar10) {
    cVar3 = (&DAT_005f72ec)[uVar12 * 4];
    bVar9 = (byte)(uVar10 - 0x10000 >> 0xf);
    unaff_BL = bVar9 - 0x30;
    if (0x2f < bVar9) {
      unaff_BL = 0xff;
    }
  }
  if ((&DAT_005f72ee)[uVar12 * 4] == '\x03') {
    cVar11 = unaff_ESI[0xcc];
    if ((DAT_0088741c & 0x7f) == 0) {
      if ((*(int *)(unaff_ESI + 0x28) < 0x40000) || (unaff_ESI[0xcc] != -1)) goto LAB_005d96ef;
      uVar4 = FUN_005df40c(uVar6);
      cVar3 = extraout_DL;
      cVar11 = extraout_DH;
      if (uVar4 < 0x5556) {
        cVar11 = '\x12';
        goto LAB_005d969b;
      }
    }
    goto LAB_005d96a2;
  }
  if ((*(ushort *)(&DAT_005f7104 + uVar12 * 8) & 0x10) != 0) {
    cVar11 = '\0';
    puVar13 = unaff_ESI;
    while( true ) {
      cVar11 = cVar11 + puVar13[0xb3];
      if (*(ushort *)(puVar13 + 0x3e) == 0xffff) break;
      puVar13 = &DAT_00743b94 + (uint)*(ushort *)(puVar13 + 0x3e) * 0x100;
    }
    if (cVar11 != '\0') {
      if (*(int *)(unaff_ESI + 0x28) < 0) {
        if (*(int *)(unaff_ESI + 0x28) < -0x2bfff) {
          uVar4 = *(ushort *)(unaff_ESI + 10);
          do {
            bVar9 = (&DAT_00743bb3)[(uint)uVar4 * 0x100];
            if ((bVar9 != 0) && ((bVar9 < 5 || ((8 < bVar9 && (bVar9 < 0x10)))))) goto LAB_005d963a;
            uVar4 = *(ushort *)(&DAT_00743bd2 + (uint)uVar4 * 0x100);
          } while (uVar4 != 0xffff);
        }
      }
      else if (0x2bfff < *(int *)(unaff_ESI + 0x28)) {
        uVar4 = *(ushort *)(unaff_ESI + 10);
        do {
          bVar9 = (&DAT_00743bb3)[(uint)uVar4 * 0x100];
          if ((4 < bVar9) && ((bVar9 < 9 || ((0x10 < bVar9 && (bVar9 < 0x18)))))) goto LAB_005d963a;
          uVar4 = *(ushort *)(&DAT_00743bd2 + (uint)uVar4 * 0x100);
        } while (uVar4 != 0xffff);
      }
    }
  }
LAB_005d96ef:
  unaff_ESI[0xcc] = 0xff;
  cVar11 = (&DAT_005f72ed)[uVar12 * 4];
  bVar9 = 0xf3;
  if ((*(ushort *)(unaff_ESI + 0xb8) & 2) == 0) {
    cVar11 = -1;
    bVar9 = 0xf3;
  }
LAB_005d9707:
  cVar2 = (char)*(undefined2 *)(unaff_ESI + 0xbb);
  if (cVar2 == -1) {
LAB_005d972f:
    uVar5 = CONCAT11(unaff_BL >> 2,cVar3);
    if (unaff_BL == 0xff) {
      uVar5 = CONCAT11(0xff,cVar3);
    }
  }
  else {
    bVar8 = (byte)((ushort)*(undefined2 *)(unaff_ESI + 0xbb) >> 8);
    if (cVar2 == cVar3) {
      bVar1 = bVar8 + 0xf;
      if (0xf0 < bVar8) {
        bVar1 = unaff_BL;
      }
      uVar5 = CONCAT11(bVar1,cVar2);
      if (unaff_BL < bVar1) {
        uVar5 = CONCAT11(unaff_BL,cVar2);
      }
    }
    else {
      uVar5 = CONCAT11(bVar8 - 9,cVar2);
      if ((bVar8 < 9) || ((byte)(bVar8 - 9) < 0x50)) goto LAB_005d972f;
    }
  }
  *(undefined2 *)(unaff_ESI + 0xbb) = uVar5;
  cVar3 = (char)*(undefined2 *)(unaff_ESI + 0xbd);
  if (cVar3 != -1) {
    bVar8 = (byte)((ushort)*(undefined2 *)(unaff_ESI + 0xbd) >> 8);
    if (cVar3 == cVar11) {
      bVar1 = bVar8 + 0xf;
      if (0xf0 < bVar8) {
        bVar1 = bVar9;
      }
      uVar5 = CONCAT11(bVar1,cVar3);
      if (bVar9 < bVar1) {
        uVar5 = CONCAT11(bVar9,cVar3);
      }
      goto LAB_005d977a;
    }
    uVar5 = CONCAT11(bVar8 - 9,cVar3);
    if ((8 < bVar8) && (0x4f < (byte)(bVar8 - 9))) goto LAB_005d977a;
  }
  uVar5 = CONCAT11(bVar9 >> 2,cVar11);
  if (bVar9 == 0xff) {
    uVar5 = CONCAT11(0xff,cVar11);
  }
LAB_005d977a:
  *(undefined2 *)(unaff_ESI + 0xbd) = uVar5;
  iVar7 = (*(int *)(unaff_ESI + 0x28) >> 0xe) *
          (int)*(short *)(&DAT_0065e674 + (uint)(byte)unaff_ESI[0x1e] * 2) >> 0xe;
  if ((short)iVar7 < -0x7f) {
    iVar7 = 0xff81;
  }
  if (0x7f < (short)iVar7) {
    iVar7 = 0x7f;
  }
  unaff_ESI[0xbf] = (char)iVar7;
  return;
LAB_005d963a:
  cVar11 = unaff_ESI[0xcc];
  if (cVar11 == -1) {
    uVar4 = FUN_005df40c(uVar6);
    cVar3 = extraout_DL_00;
    if (extraout_CH < ((byte)(uVar4 >> 8) & 0xf)) {
LAB_005d9668:
      cVar11 = -2;
    }
    else {
      cVar11 = (&DAT_005f72ee)[uVar12 * 4];
      if (cVar11 == '\0') {
        cVar11 = (&DAT_0065e9d8)[(ushort)((uVar4 & 0xff) * 4) >> 8];
      }
      else if (cVar11 == '\x01') {
        cVar11 = (&DAT_0065e9e1)[(ushort)((uVar4 & 0xff) * 5) >> 8];
      }
      else {
        if (cVar11 != '\x02') goto LAB_005d9668;
        cVar11 = (&DAT_0065e9dc)[(ushort)((uVar4 & 0xff) * 5) >> 8];
      }
    }
LAB_005d969b:
    unaff_ESI[0xcc] = cVar11;
  }
LAB_005d96a2:
  if (cVar11 == -2) {
    cVar11 = -1;
  }
  bVar9 = 0xff;
  goto LAB_005d9707;
}

