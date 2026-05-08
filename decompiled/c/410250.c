
bool FUN_00410250(int param_1,int *param_2,int param_3,int param_4,int param_5)

{
  HDC hdc;
  HDC hdc_00;
  HGDIOBJ h;
  HPALETTE hPal;
  bool bVar1;
  
  bVar1 = false;
  if ((*(int *)(param_1 + 0x90) == 0) && (*(int *)(param_3 + 0x90) != 0)) {
    hdc = GetDC(DAT_005e916c);
    if (hdc != (HDC)0x0) {
      hdc_00 = CreateCompatibleDC(hdc);
      bVar1 = hdc_00 != (HDC)0x0;
      if (bVar1) {
        h = SelectObject(hdc_00,*(HGDIOBJ *)(param_1 + 0x8c));
        hPal = SelectPalette(hdc,DAT_005ec0d8,0);
        SetDIBColorTable(hdc_00,0,0x100,(RGBQUAD *)&DAT_005ef6a8);
        RealizePalette(hdc);
        BitBlt(hdc,param_4,param_5,param_2[2] - *param_2,param_2[3] - param_2[1],hdc_00,*param_2,
               param_2[1],0xcc0020);
        SelectPalette(hdc,hPal,1);
        SelectObject(hdc_00,h);
        DeleteDC(hdc_00);
      }
      ReleaseDC(DAT_005e916c,hdc);
    }
  }
  else {
    bVar1 = false;
  }
  return bVar1;
}

