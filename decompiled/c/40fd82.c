
HDC FUN_0040fd82(int param_1)

{
  COLORREF CVar1;
  int iVar2;
  HPALETTE pHVar3;
  HGDIOBJ pvVar4;
  HDC local_8;
  
  if (*(int *)(param_1 + 0x90) == 0) {
    local_8 = CreateCompatibleDC((HDC)0x0);
  }
  else {
    local_8 = GetDC(DAT_005e916c);
  }
  if (local_8 != (HDC)0x0) {
    CVar1 = GetTextColor(local_8);
    *(COLORREF *)(param_1 + 0x98) = CVar1;
    CVar1 = GetBkColor(local_8);
    *(COLORREF *)(param_1 + 0x9c) = CVar1;
    iVar2 = GetBkMode(local_8);
    *(int *)(param_1 + 0xa4) = iVar2;
    *(undefined4 *)(param_1 + 0xa0) = 0;
    *(undefined2 *)(param_1 + 0xc) = 1;
    if (*(int *)(param_1 + 0x90) == 0) {
      pvVar4 = SelectObject(local_8,*(HGDIOBJ *)(param_1 + 0x8c));
      *(HGDIOBJ *)(param_1 + 0x94) = pvVar4;
      SetDIBColorTable(local_8,0,0x100,(RGBQUAD *)&DAT_005ef6a8);
    }
    else {
      pHVar3 = SelectPalette(local_8,DAT_005ec0d8,0);
      *(HPALETTE *)(param_1 + 0x94) = pHVar3;
      RealizePalette(local_8);
    }
  }
  return local_8;
}

