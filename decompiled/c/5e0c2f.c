
void FUN_005e0c2f(void)

{
  ushort *puVar1;
  ushort uVar2;
  int unaff_ESI;
  bool bVar3;
  
  bVar3 = false;
  if ((DAT_0099fde0 == '\0') && (FUN_005e68e2(), !bVar3)) {
    puVar1 = (ushort *)(*(int *)(unaff_ESI + 8) + 0x12);
    uVar2 = *puVar1;
    *puVar1 = *puVar1 | 0x80;
    if ((uVar2 >> 7 & 1) == 0) {
      FUN_005e43de();
    }
  }
  DAT_0099fde0 = DAT_0099fde0 + '\x01';
  return;
}

