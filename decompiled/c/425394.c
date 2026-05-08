
void FUN_00425394(void)

{
  ushort *puVar1;
  ushort uVar2;
  int unaff_ESI;
  bool bVar3;
  
  bVar3 = false;
  if ((DAT_005f494a == '\0') && (FUN_005e68e2(), !bVar3)) {
    puVar1 = (ushort *)(*(int *)(unaff_ESI + 8) + 0x12);
    uVar2 = *puVar1;
    *puVar1 = *puVar1 | 0x200;
    if ((uVar2 >> 9 & 1) == 0) {
      FUN_005e43de();
    }
  }
  DAT_005f494a = DAT_005f494a + '\x01';
  return;
}

