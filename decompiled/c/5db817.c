
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_005db817(void)

{
  byte bVar1;
  ushort uVar2;
  undefined2 uVar3;
  int iVar4;
  int iVar5;
  undefined2 extraout_CX;
  int extraout_ECX;
  int extraout_ECX_00;
  byte extraout_DL;
  byte extraout_DL_00;
  uint uVar6;
  uint uVar7;
  int unaff_ESI;
  bool bVar8;
  
  DAT_0065dc40 = 0;
  DAT_0065dc30 = *(int *)(unaff_ESI + 0x2c) + *(int *)(unaff_ESI + 0x28);
  uVar6 = (uint)*(byte *)(unaff_ESI + 0x30);
  uVar7 = uVar6 * 0x260;
  if ((((&DAT_00887422)[uVar6 * 0x130] & 0xc0) != 0) && ((&DAT_0088755c)[uVar7] == '\0')) {
    DAT_0065dc30 = 0;
  }
  *(int *)(unaff_ESI + 0x28) = DAT_0065dc30;
  DAT_0065dc34 = (DAT_0065dc30 >> 10) * 0x2a;
  DAT_0065dc38 = 1;
  *(undefined4 *)(unaff_ESI + 0x2c) = 0;
  if ((((&DAT_00887422)[uVar6 * 0x130] & 0xc0) == 0) || ((&DAT_0088755c)[uVar7] != '\0')) {
    if (((DAT_0088741c & 1) == 0) || (*(char *)(unaff_ESI + 0x34) == '\0')) {
      uVar2 = FUN_005df40c();
      if (0xb21 < uVar2) goto LAB_005db8c7;
      *(char *)(unaff_ESI + 0x1e) = *(char *)(unaff_ESI + 0x1e) + '\x02';
      if ((*(byte *)(unaff_ESI + 0x35) & 0x40) != 0) {
        *(char *)(unaff_ESI + 0x1e) = *(char *)(unaff_ESI + 0x1e) + -4;
      }
    }
    else if (*(char *)(unaff_ESI + 0x34) < '\0') {
      *(char *)(unaff_ESI + 0x34) = *(char *)(unaff_ESI + 0x34) + '\x01';
      *(char *)(unaff_ESI + 0x1e) = *(char *)(unaff_ESI + 0x1e) + -2;
    }
    else {
      *(char *)(unaff_ESI + 0x34) = *(char *)(unaff_ESI + 0x34) + -1;
      *(char *)(unaff_ESI + 0x1e) = *(char *)(unaff_ESI + 0x1e) + '\x02';
    }
    *(byte *)(unaff_ESI + 0x1e) = *(byte *)(unaff_ESI + 0x1e) & 0x1e;
    FUN_005e53ca();
  }
LAB_005db8c7:
  if (*(char *)(unaff_ESI + 0xc4) != '\0') {
    bVar1 = *(byte *)(unaff_ESI + 0xc4);
    *(undefined1 *)(unaff_ESI + 0xc4) = 0;
    uVar6 = bVar1 & 0x1e;
    bVar8 = CARRY2(*(short *)(unaff_ESI + 0x10) + *(short *)(&DAT_0065e6be + uVar6 * 8),
                   *(ushort *)(&DAT_0065e6c6 + uVar6 * 8));
    FUN_005dcfee();
    if (!bVar8) {
      FUN_005e53ca();
      FUN_00444927();
      FUN_005e53ca();
    }
  }
  iVar4 = DAT_0065dc34 + *(int *)(unaff_ESI + 0x24);
  *(int *)(unaff_ESI + 0x24) = iVar4;
  if (0x3689 < iVar4) {
    *(ushort *)(unaff_ESI + 0xb8) = *(ushort *)(unaff_ESI + 0xb8) & 0xfffd;
    _DAT_0065dc48 = *(undefined4 *)(unaff_ESI + 0xe);
    DAT_0065dc4c = *(undefined2 *)(unaff_ESI + 0x12);
    FUN_005e53ca();
    while( true ) {
      *(char *)(unaff_ESI + 0x35) = *(char *)(unaff_ESI + 0x35) + '\x01';
      uVar6 = (ushort)((ushort)*(byte *)(unaff_ESI + 0x1e) | *(byte *)(unaff_ESI + 0x35) & 1) & 0x1f
      ;
      bVar8 = CARRY2(DAT_0065dc4a,*(ushort *)(&DAT_0065e6be + uVar6 * 8));
      uVar3 = FUN_005dcfee();
      if (bVar8) break;
      *(int *)(unaff_ESI + 0x24) = *(int *)(unaff_ESI + 0x24) - *(int *)(&DAT_0065e6c0 + uVar6 * 8);
      _DAT_0065dc48 = CONCAT22(extraout_CX,uVar3);
      if (*(int *)(unaff_ESI + 0x24) < 0x368a) goto LAB_005dba3d;
      DAT_0065dc38 = DAT_0065dc38 + 1;
    }
    *(undefined4 *)(unaff_ESI + 0x24) = 0;
    *(undefined4 *)(unaff_ESI + 0x28) = 0;
    if ((short)uVar7 == -1) {
      *(undefined1 *)(unaff_ESI + 0x34) = 6;
      uVar6 = FUN_005df40c();
      if ((uVar6 & 0x20000000) != 0) {
        *(undefined1 *)(unaff_ESI + 0x34) = 0xfa;
      }
      if (0x1ffff < extraout_ECX_00) {
        *(byte *)(unaff_ESI + 0xc4) = extraout_DL_00 ^ 0x10;
      }
    }
    else {
      *(undefined1 *)(unaff_ESI + 0x34) = 1;
      uVar6 = FUN_005df40c();
      if ((uVar6 & 0x400000) != 0) {
        *(undefined1 *)(unaff_ESI + 0x34) = 0xff;
      }
      if (0x1ffff < extraout_ECX) {
        (&DAT_00743c58)[(uVar7 & 0xffff) * 0x100] = extraout_DL;
        *(byte *)(unaff_ESI + 0xc4) = extraout_DL ^ 0x10;
      }
    }
LAB_005dba3d:
    FUN_00444927();
    FUN_005e53ca();
  }
  iVar4 = *(int *)(unaff_ESI + 0x28) >> 8;
  iVar4 = iVar4 * iVar4;
  if (*(int *)(unaff_ESI + 0x28) < 0) {
    iVar4 = -iVar4;
  }
  iVar4 = -(((*(int *)(unaff_ESI + 0x28) >> 1) + (iVar4 >> 5)) /
           (int)(uint)*(ushort *)(unaff_ESI + 0x46));
  if ((*(ushort *)(&DAT_005f7104 + (uint)*(byte *)(unaff_ESI + 0x31) * 8) & 8) != 0) {
    uVar6 = (uint)*(byte *)(unaff_ESI + 0xc2);
    iVar5 = uVar6 * 0x4000;
    if ((*(ushort *)(unaff_ESI + 0x48) & 8) != 0) {
      iVar5 = uVar6 * -0x4000;
    }
    iVar4 = iVar4 + (int)((iVar5 - *(int *)(unaff_ESI + 0x28)) *
                         (uint)*(byte *)(unaff_ESI + 0xc3) * 2) /
                    (int)(uVar6 * *(ushort *)(unaff_ESI + 0x46) >> 2);
  }
  *(int *)(unaff_ESI + 0x2c) = iVar4;
  return DAT_0065dc40;
}

