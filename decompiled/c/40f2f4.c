
void FUN_0040f2f4(int param_1,int param_2,LOGPALETTE *param_3)

{
  HDC hdc;
  UINT UVar1;
  int iVar2;
  int local_8;
  
  hdc = GetDC((HWND)0x0);
  UVar1 = GetSystemPaletteUse(hdc);
  if (UVar1 == 2) {
    for (local_8 = 0; local_8 < param_2; local_8 = local_8 + 1) {
      param_3->palPalEntry[local_8].peRed = *(BYTE *)(param_1 + 2 + local_8 * 4);
      param_3->palPalEntry[local_8].peGreen = *(BYTE *)(param_1 + 1 + local_8 * 4);
      param_3->palPalEntry[local_8].peBlue = *(BYTE *)(param_1 + local_8 * 4);
      param_3->palPalEntry[local_8].peFlags = '\x01';
    }
    for (; local_8 < 0x100; local_8 = local_8 + 1) {
      param_3->palPalEntry[local_8].peFlags = '\x01';
    }
    *(undefined1 *)&param_3[0x80].palVersion = 0xff;
    *(undefined1 *)((int)&param_3[0x80].palVersion + 1) = 0xff;
    *(undefined1 *)&param_3[0x80].palNumEntries = 0xff;
    *(undefined1 *)((int)&param_3[0x80].palNumEntries + 1) = 0;
    param_3->palPalEntry[0].peRed = '\0';
    param_3->palPalEntry[0].peGreen = '\0';
    param_3->palPalEntry[0].peBlue = '\0';
    param_3->palPalEntry[0].peFlags = '\0';
    DAT_005ec0dc = 1;
    DAT_005ec0e0 = 0xfe;
  }
  else {
    iVar2 = GetDeviceCaps(hdc,0x18);
    if (iVar2 < 1) {
      for (local_8 = 0; local_8 < param_2; local_8 = local_8 + 1) {
        param_3->palPalEntry[local_8].peRed = *(BYTE *)(param_1 + 2 + local_8 * 4);
        param_3->palPalEntry[local_8].peGreen = *(BYTE *)(param_1 + 1 + local_8 * 4);
        param_3->palPalEntry[local_8].peBlue = *(BYTE *)(param_1 + local_8 * 4);
        param_3->palPalEntry[local_8].peFlags = '\x01';
      }
      DAT_005ec0dc = 0;
      DAT_005ec0e0 = 0x100;
    }
    else {
      UVar1 = iVar2 >> 1;
      DAT_005ec0dc = UVar1;
      DAT_005ec0e0 = param_2 - iVar2;
      GetSystemPaletteEntries(hdc,0,UVar1,param_3->palPalEntry);
      for (local_8 = 0; local_8 < (int)UVar1; local_8 = local_8 + 1) {
        *(BYTE *)(param_1 + 2 + local_8 * 4) = param_3->palPalEntry[local_8].peRed;
        *(BYTE *)(param_1 + 1 + local_8 * 4) = param_3->palPalEntry[local_8].peGreen;
        *(BYTE *)(param_1 + local_8 * 4) = param_3->palPalEntry[local_8].peBlue;
        param_3->palPalEntry[local_8].peFlags = '\0';
      }
      for (; local_8 < (int)((param_2 - iVar2) + UVar1); local_8 = local_8 + 1) {
        param_3->palPalEntry[local_8].peRed = *(BYTE *)(param_1 + 2 + local_8 * 4);
        param_3->palPalEntry[local_8].peGreen = *(BYTE *)(param_1 + 1 + local_8 * 4);
        param_3->palPalEntry[local_8].peBlue = *(BYTE *)(param_1 + local_8 * 4);
        param_3->palPalEntry[local_8].peFlags = '\x01';
      }
      for (; local_8 < (int)(0x100 - UVar1); local_8 = local_8 + 1) {
        param_3->palPalEntry[local_8].peFlags = '\x01';
      }
      GetSystemPaletteEntries
                (hdc,0x100 - UVar1,UVar1,(LPPALETTEENTRY)((int)param_3 + (0x100 - UVar1) * 4 + 4));
      for (local_8 = 0x100 - UVar1; local_8 < 0x100; local_8 = local_8 + 1) {
        *(BYTE *)(param_1 + 2 + local_8 * 4) = param_3->palPalEntry[local_8].peRed;
        *(BYTE *)(param_1 + 1 + local_8 * 4) = param_3->palPalEntry[local_8].peGreen;
        *(BYTE *)(param_1 + local_8 * 4) = param_3->palPalEntry[local_8].peBlue;
        param_3->palPalEntry[local_8].peFlags = '\0';
      }
    }
  }
  ReleaseDC((HWND)0x0,hdc);
  param_3->palNumEntries = 0x100;
  param_3->palVersion = 0x300;
  CreatePalette(param_3);
  return;
}

