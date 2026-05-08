
void FUN_00424db7(void)

{
  ushort *puVar1;
  ushort uVar2;
  int unaff_ESI;
  bool bVar3;
  
  bVar3 = false;
  if ((DAT_005f4948 == '\0') && (FUN_005e68e2(), !bVar3)) {
    puVar1 = (ushort *)(*(int *)(unaff_ESI + 8) + 0x12);
    uVar2 = *puVar1;
    *puVar1 = *puVar1 | 0x100;
    if ((uVar2 >> 8 & 1) == 0) {
      FUN_005e43de();
    }
  }
  DAT_005f4948 = DAT_005f4948 + '\x01';
  return;
}

