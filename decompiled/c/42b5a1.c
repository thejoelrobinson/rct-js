
void FUN_0042b5a1(void)

{
  ushort *puVar1;
  ushort uVar2;
  int iVar3;
  ushort in_AX;
  int unaff_ESI;
  bool bVar4;
  
  if (in_AX == 0xffff) {
    return;
  }
  bVar4 = false;
  if (in_AX == 0) {
    FUN_005e68e2();
    if (!bVar4) {
      puVar1 = (ushort *)(*(int *)(unaff_ESI + 8) + 0x12);
      *puVar1 = *puVar1 ^ 1;
      FUN_005e43de();
    }
    return;
  }
  bVar4 = in_AX < 8;
  if (in_AX == 8) {
    FUN_005e68e2();
    if (!bVar4) {
      iVar3 = *(int *)(unaff_ESI + 8);
      FUN_005e43de();
      DAT_005f8d5c = 0;
      puVar1 = (ushort *)(iVar3 + 0x12);
      uVar2 = *puVar1;
      *puVar1 = *puVar1 ^ 0x100;
      if ((uVar2 >> 8 & 1) == 0) {
        DAT_005f8d5c = 1;
      }
      FUN_0042f3a2();
    }
    return;
  }
  bVar4 = in_AX < 3;
  if (in_AX == 3) {
    FUN_005e68e2();
    if (!bVar4) {
      puVar1 = (ushort *)(*(int *)(unaff_ESI + 8) + 0x12);
      *puVar1 = *puVar1 ^ 2;
      FUN_005e43de();
    }
    return;
  }
  bVar4 = in_AX < 4;
  if (in_AX == 4) {
    FUN_005e68e2();
    if (!bVar4) {
      puVar1 = (ushort *)(*(int *)(unaff_ESI + 8) + 0x12);
      *puVar1 = *puVar1 ^ 4;
      FUN_005e43de();
    }
    return;
  }
  bVar4 = in_AX < 5;
  if (in_AX == 5) {
    FUN_005e68e2();
    if (!bVar4) {
      puVar1 = (ushort *)(*(int *)(unaff_ESI + 8) + 0x12);
      *puVar1 = *puVar1 ^ 8;
      FUN_005e43de();
    }
    return;
  }
  bVar4 = in_AX < 6;
  if (in_AX == 6) {
    FUN_005e68e2();
    if (!bVar4) {
      puVar1 = (ushort *)(*(int *)(unaff_ESI + 8) + 0x12);
      *puVar1 = *puVar1 ^ 0x1000;
      FUN_005e43de();
    }
    return;
  }
  bVar4 = in_AX < 9;
  if (in_AX != 9) {
    bVar4 = in_AX < 10;
    if (in_AX == 10) {
      FUN_005e68e2();
      if (!bVar4) {
        puVar1 = (ushort *)(*(int *)(unaff_ESI + 8) + 0x12);
        *puVar1 = *puVar1 ^ 0x20;
        FUN_005e43de();
      }
      return;
    }
    bVar4 = in_AX < 0xb;
    if (in_AX != 0xb) {
      bVar4 = in_AX == 0;
      if (in_AX != 1) {
        return;
      }
      FUN_005e68e2();
      if (!bVar4) {
        puVar1 = (ushort *)(*(int *)(unaff_ESI + 8) + 0x12);
        *puVar1 = *puVar1 ^ 0x80;
        FUN_005e43de();
      }
      return;
    }
    FUN_005e68e2();
    if (!bVar4) {
      puVar1 = (ushort *)(*(int *)(unaff_ESI + 8) + 0x12);
      *puVar1 = *puVar1 ^ 0x40;
      FUN_005e43de();
    }
    return;
  }
  FUN_005e68e2();
  if (!bVar4) {
    puVar1 = (ushort *)(*(int *)(unaff_ESI + 8) + 0x12);
    *puVar1 = *puVar1 ^ 0x10;
    FUN_005e43de();
  }
  return;
}

