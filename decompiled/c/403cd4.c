
bool FUN_00403cd4(void)

{
  BOOL BVar1;
  tagMSG local_24;
  int local_8;
  
  local_8 = 0;
  BVar1 = PeekMessageA(&local_24,(HWND)0x0,0,0,1);
  if (BVar1 != 0) {
    if (local_24.message == 0x12) {
      local_8 = 1;
    }
    else {
      BVar1 = IsWindow(DAT_005e91e0);
      if ((BVar1 == 0) || (BVar1 = IsDialogMessageA(DAT_005e91e0,&local_24), BVar1 == 0)) {
        TranslateMessage(&local_24);
        DispatchMessageA(&local_24);
      }
    }
  }
  FUN_004070e3();
  return local_8 == 0;
}

