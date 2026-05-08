
void FUN_0040e63e(int param_1,HDC param_2)

{
  if (*(short *)(param_1 + 0xc) != 0) {
    *(undefined2 *)(param_1 + 0xc) = 0;
    SetTextColor(param_2,*(COLORREF *)(param_1 + 0x98));
    SetBkColor(param_2,*(COLORREF *)(param_1 + 0x9c));
    SetBkMode(param_2,*(int *)(param_1 + 0xa4));
    if (*(int *)(param_1 + 0x90) == 0) {
      SelectObject(param_2,*(HGDIOBJ *)(param_1 + 0x94));
      if (*(int *)(param_1 + 0xa0) != 0) {
        SelectObject(param_2,*(HGDIOBJ *)(param_1 + 0xa0));
      }
      DeleteDC(param_2);
    }
    else {
      SelectPalette(param_2,*(HPALETTE *)(param_1 + 0x94),1);
      ReleaseDC(DAT_005e916c,param_2);
    }
  }
  return;
}

