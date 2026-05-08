
void FUN_005e0c5a(void)

{
  ushort *puVar1;
  ushort uVar2;
  int unaff_ESI;
  undefined1 in_CF;
  
  DAT_0099fde0 = DAT_0099fde0 + -1;
  if ((DAT_0099fde0 == '\0') && (FUN_005e68e2(), !(bool)in_CF)) {
    puVar1 = (ushort *)(*(int *)(unaff_ESI + 8) + 0x12);
    uVar2 = *puVar1;
    *puVar1 = *puVar1 & 0xff7f;
    if ((uVar2 >> 7 & 1) != 0) {
      FUN_005e43de();
    }
  }
  return;
}

