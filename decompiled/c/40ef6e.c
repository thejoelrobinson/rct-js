
void FUN_0040ef6e(void)

{
  if (DAT_005ec080 != (HDC)0x0) {
    SelectPalette(DAT_005ec080,DAT_005ef298,1);
    ReleaseDC(DAT_005e916c,DAT_005ec080);
    DAT_005ec080 = (HDC)0x0;
    DAT_005ec084 = 0;
    DAT_005ec088 = 0;
  }
  return;
}

