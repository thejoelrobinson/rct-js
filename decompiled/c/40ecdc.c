
bool FUN_0040ecdc(int param_1,int *param_2,int param_3,int param_4,int param_5)

{
  HDC hdc;
  HPALETTE hPal;
  bool bVar1;
  
  if ((*(int *)(param_1 + 0x90) == 0) && (*(int *)(param_3 + 0x90) != 0)) {
    hdc = GetDC(DAT_005e916c);
    bVar1 = hdc != (HDC)0x0;
    if (bVar1) {
      hPal = SelectPalette(hdc,DAT_005ec07c,0);
      FUN_0040ec7b(param_1,0,0x100,&DAT_005eee98);
      RealizePalette(hdc);
      StretchDIBits(hdc,param_4,param_5,param_2[2] - *param_2,param_2[3] - param_2[1],*param_2,
                    (int)*(short *)(param_1 + 8) - param_2[3],param_2[2] - *param_2,
                    param_2[3] - param_2[1],*(void **)(param_1 + 0x84),
                    *(BITMAPINFO **)(param_1 + 0x88),0,0xcc0020);
      SelectPalette(hdc,hPal,1);
      ReleaseDC(DAT_005e916c,hdc);
    }
  }
  else {
    bVar1 = false;
  }
  return bVar1;
}

