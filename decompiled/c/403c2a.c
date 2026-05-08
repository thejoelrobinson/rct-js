
bool FUN_00403c2a(void)

{
  BOOL BVar1;
  tagMSG local_24;
  int local_8;
  
  local_8 = 0;
  do {
    BVar1 = PeekMessageA(&local_24,(HWND)0x0,0,0,1);
    if (BVar1 == 0) {
LAB_00403caf:
      FUN_004070e3();
      return local_8 == 0;
    }
    if (local_24.message == 0x12) {
      local_8 = 1;
      goto LAB_00403caf;
    }
    BVar1 = IsWindow(DAT_005e91e0);
    if ((BVar1 == 0) || (BVar1 = IsDialogMessageA(DAT_005e91e0,&local_24), BVar1 == 0)) {
      TranslateMessage(&local_24);
      DispatchMessageA(&local_24);
    }
  } while( true );
}

