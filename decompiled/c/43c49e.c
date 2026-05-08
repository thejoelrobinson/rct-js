
uint FUN_0043c49e(void)

{
  undefined2 *puVar1;
  undefined2 *puVar2;
  byte bVar3;
  short sVar4;
  byte *pbVar5;
  ushort uVar6;
  ushort uVar7;
  undefined2 extraout_var;
  ushort uVar9;
  uint uVar10;
  undefined2 extraout_var_00;
  ushort uVar11;
  uint uVar12;
  int iVar13;
  uint uVar14;
  uint uVar15;
  int unaff_ESI;
  int iVar16;
  uint uVar8;
  
  DAT_006293d8 = *(undefined1 *)(unaff_ESI + 0x70);
  if (*(char *)(unaff_ESI + 0x71) == -2) {
    *(undefined1 *)(unaff_ESI + 0x71) = 0xff;
  }
  uVar6 = *(short *)(unaff_ESI + 0xe) - *(short *)(unaff_ESI + 0x32);
  uVar12 = (uint)uVar6;
  uVar11 = uVar6;
  if ((short)uVar6 < 0) {
    uVar11 = -uVar6;
  }
  uVar7 = *(short *)(unaff_ESI + 0x10) - *(short *)(unaff_ESI + 0x34);
  uVar8 = (uint)uVar7;
  uVar9 = uVar7;
  if ((short)uVar7 < 0) {
    uVar9 = -uVar7;
  }
  uVar15 = (uint)(ushort)(uVar11 + uVar9);
  if (*(byte *)(unaff_ESI + 0x71) < 0xfe) {
    uVar10 = (uint)*(byte *)(unaff_ESI + 0x6e);
    iVar13 = *(int *)((&PTR_DAT_0062d640)[(uint)*(byte *)(unaff_ESI + 0x2d) * 2] + uVar10 * 8 + 4);
    *(char *)(unaff_ESI + 0x72) = *(char *)(unaff_ESI + 0x72) + '\x01';
    bVar3 = *(byte *)(*(byte *)(unaff_ESI + 0x72) + 1 + iVar13);
    uVar14 = (uint)bVar3;
    if (bVar3 == 0xff) {
      *(undefined1 *)(unaff_ESI + 0x70) = 0;
      *(undefined1 *)(unaff_ESI + 0x71) = 0xff;
      FUN_0043c60b();
    }
    else {
      *(byte *)(unaff_ESI + 0x70) = bVar3;
      if ((*(char *)(unaff_ESI + 0x71) == '\b') && (*(char *)(unaff_ESI + 0x72) == '\x0f')) {
        *(byte *)(unaff_ESI + 0x3e) = *(byte *)(unaff_ESI + 0x3e) >> 1;
        *(byte *)(unaff_ESI + 0x3d) = *(byte *)(unaff_ESI + 0x3d) >> 1;
        pbVar5 = (byte *)(unaff_ESI + 0x3c);
        bVar3 = *pbVar5;
        *pbVar5 = *pbVar5 - 0x1e;
        if (bVar3 < 0x1e) {
          *(undefined1 *)(unaff_ESI + 0x3c) = 0;
        }
        *(byte *)(unaff_ESI + 0x45) = *(byte *)(unaff_ESI + 0x45) | 4;
        FUN_0042e062(iVar13);
        iVar16 = unaff_ESI;
        uVar12 = FUN_005df40c(iVar13,unaff_ESI,uVar15,&stack0x00000000,uVar14,uVar10,uVar8,uVar12);
        puVar1 = (undefined2 *)(unaff_ESI + 0xe);
        puVar2 = (undefined2 *)(unaff_ESI + 0x10);
        unaff_ESI = iVar16;
        FUN_00452fce(CONCAT22(extraout_var_00,*puVar2),CONCAT22(extraout_var,*puVar1),uVar14,
                     (uVar12 & 3) + 0x18);
      }
    }
    FUN_005e53ca();
    return (uint)*(ushort *)(unaff_ESI + 0xe);
  }
  if ((ushort)(uVar11 + uVar9) <= (ushort)*(byte *)(unaff_ESI + 0x36)) {
    return uVar12;
  }
  if (uVar11 < uVar9) {
    uVar12 = 8;
    if (-1 < (short)uVar7) {
      uVar12 = 0x18;
    }
  }
  else {
    uVar12 = 0x10;
    if (-1 < (short)uVar6) {
      uVar12 = 0;
    }
  }
  *(char *)(unaff_ESI + 0x1e) = (char)uVar12;
  sVar4 = *(short *)((int)&DAT_00629264 + (uVar12 >> 1));
  iVar13 = *(byte *)(unaff_ESI + 0xe0) + 1;
  pbVar5 = *(byte **)((&PTR_DAT_0062d640)[(uint)*(byte *)(unaff_ESI + 0x2d) * 2] +
                     (uint)*(byte *)(unaff_ESI + 0x6e) * 8 + 4);
  if (*pbVar5 <= (byte)iVar13) {
    iVar13 = 0;
  }
  *(char *)(unaff_ESI + 0xe0) = (char)iVar13;
  *(byte *)(unaff_ESI + 0x70) = pbVar5[iVar13 + 1];
  return (uint)(ushort)(*(short *)(unaff_ESI + 0xe) + sVar4);
}

