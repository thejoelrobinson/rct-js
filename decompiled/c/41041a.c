
undefined4 FUN_0041041a(int param_1,int param_2)

{
  undefined4 uVar1;
  
  if (DAT_005ec0e4 == (HDC)0x0) {
    if ((*(int *)(param_1 + 0x90) == 0) && (*(int *)(param_2 + 0x90) != 0)) {
      DAT_005ec0e4 = GetDC(DAT_005e916c);
      if (DAT_005ec0e4 == (HDC)0x0) {
        uVar1 = 0;
      }
      else {
        DAT_005ec0e8 = CreateCompatibleDC(DAT_005ec0e4);
        if (DAT_005ec0e8 == (HDC)0x0) {
          ReleaseDC(DAT_005e916c,DAT_005ec0e4);
          uVar1 = 0;
        }
        else {
          DAT_005f0324 = SelectObject(DAT_005ec0e8,*(HGDIOBJ *)(param_1 + 0x8c));
          DAT_005f0328 = SelectPalette(DAT_005ec0e4,DAT_005ec0d8,0);
          SetDIBColorTable(DAT_005ec0e8,0,0x100,(RGBQUAD *)&DAT_005ef6a8);
          RealizePalette(DAT_005ec0e4);
          uVar1 = 1;
        }
      }
    }
    else {
      uVar1 = 0;
    }
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}

