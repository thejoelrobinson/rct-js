
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00403b60(void)

{
  tagRECT local_18;
  int local_8;
  
  if ((DAT_005e91c0 != 0) && (DAT_005f1140 == 0)) {
    GetWindowRect(DAT_005e916c,&local_18);
    local_8 = (local_18.bottom - local_18.top >> 1) + local_18.top;
    _DAT_005f14c4 = 0;
    DAT_005f1b20 = 0;
    SetCursorPos((local_18.right - local_18.left >> 1) + local_18.left,local_8);
  }
  return;
}

