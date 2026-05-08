
void FUN_0043c60b(void)

{
  byte bVar1;
  undefined *puVar2;
  uint uVar3;
  int unaff_ESI;
  
  if (*(byte *)(unaff_ESI + 0x71) < 0xfe) {
    bVar1 = (&DAT_0062d304)[*(byte *)(unaff_ESI + 0x71)];
  }
  else {
    bVar1 = (&DAT_0062d301)[*(byte *)(unaff_ESI + 0x6d)];
  }
  uVar3 = (uint)bVar1;
  if (bVar1 != *(byte *)(unaff_ESI + 0x6e)) {
    FUN_005e53ca();
    *(byte *)(unaff_ESI + 0x6e) = bVar1;
    puVar2 = (&PTR_DAT_0062d644)[(uint)*(byte *)(unaff_ESI + 0x2d) * 2];
    *(undefined *)(unaff_ESI + 0x14) = puVar2[uVar3 * 4];
    *(undefined *)(unaff_ESI + 9) = puVar2[uVar3 * 4 + 1];
    *(undefined *)(unaff_ESI + 0x15) = puVar2[uVar3 * 4 + 2];
    FUN_005e53ca();
  }
  return;
}

