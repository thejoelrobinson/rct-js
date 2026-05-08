
void FUN_004253e3(void)

{
  ushort *puVar1;
  ushort uVar2;
  int unaff_ESI;
  bool bVar3;
  
  bVar3 = false;
  if ((DAT_005f494b == '\0') && (FUN_005e68e2(), !bVar3)) {
    puVar1 = (ushort *)(*(int *)(unaff_ESI + 8) + 0x12);
    uVar2 = *puVar1;
    *puVar1 = *puVar1 | 0x400;
    if ((uVar2 >> 10 & 1) == 0) {
      FUN_005e43de();
    }
  }
  DAT_005f494b = DAT_005f494b + '\x01';
  return;
}

