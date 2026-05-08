
void FUN_0040ee1c(void)

{
  HDC hdc;
  HPALETTE hPal;
  
  if ((DAT_005ec07c != (HPALETTE)0x0) && (hdc = GetDC(DAT_005e916c), hdc != (HDC)0x0)) {
    hPal = SelectPalette(hdc,DAT_005ec07c,0);
    RealizePalette(hdc);
    SelectPalette(hdc,hPal,1);
    ReleaseDC(DAT_005e916c,hdc);
  }
  return;
}

