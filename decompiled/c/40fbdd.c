
void FUN_0040fbdd(int param_1,UINT param_2,UINT param_3)

{
  HDC hdc;
  HPALETTE hPal;
  UINT local_10;
  
  if ((DAT_005ec0d8 != (HPALETTE)0x0) && ((int)param_2 < 0x100)) {
    if ((int)param_2 < (int)DAT_005ec0dc) {
      param_2 = DAT_005ec0dc;
    }
    if ((int)(DAT_005ec0e0 + DAT_005ec0dc) < (int)(param_3 + param_2)) {
      param_3 = DAT_005ec0e0 - param_2;
    }
    for (local_10 = param_2; (int)local_10 < (int)(param_3 + param_2); local_10 = local_10 + 1) {
      (&DAT_005ef6aa)[local_10 * 4] = *(undefined1 *)(param_1 + 2 + local_10 * 4);
      (&DAT_005efaac)[local_10 * 4] = (&DAT_005ef6aa)[local_10 * 4];
      (&DAT_005ef6a9)[local_10 * 4] = *(undefined1 *)(param_1 + 1 + local_10 * 4);
      (&DAT_005efaad)[local_10 * 4] = (&DAT_005ef6a9)[local_10 * 4];
      (&DAT_005ef6a8)[local_10 * 4] = *(undefined1 *)(param_1 + local_10 * 4);
      (&DAT_005efaae)[local_10 * 4] = (&DAT_005ef6a8)[local_10 * 4];
    }
    hdc = GetDC(DAT_005e916c);
    hPal = SelectPalette(hdc,DAT_005ec0d8,0);
    AnimatePalette(DAT_005ec0d8,param_2,param_3,(PALETTEENTRY *)(&DAT_005efaac + param_2 * 4));
    SelectPalette(hdc,hPal,1);
    ReleaseDC(DAT_005e916c,hdc);
  }
  return;
}

