
void FUN_0042540e(void)

{
  ushort *puVar1;
  ushort uVar2;
  int unaff_ESI;
  undefined1 in_CF;
  
  DAT_005f494b = DAT_005f494b + -1;
  if ((DAT_005f494b == '\0') && (FUN_005e68e2(), !(bool)in_CF)) {
    puVar1 = (ushort *)(*(int *)(unaff_ESI + 8) + 0x12);
    uVar2 = *puVar1;
    *puVar1 = *puVar1 & 0xfbff;
    if ((uVar2 >> 10 & 1) != 0) {
      FUN_005e43de();
    }
  }
  return;
}

