
void FUN_0041051e(void)

{
  if (DAT_005ec0e4 != (HDC)0x0) {
    SelectObject(DAT_005ec0e8,DAT_005f0324);
    SelectPalette(DAT_005ec0e4,DAT_005f0328,1);
    DeleteDC(DAT_005ec0e8);
    ReleaseDC(DAT_005e916c,DAT_005ec0e4);
    DAT_005ec0e8 = (HDC)0x0;
    DAT_005ec0e4 = (HDC)0x0;
  }
  return;
}

