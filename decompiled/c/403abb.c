
bool FUN_00403abb(void)

{
  bool bVar1;
  
  if (DAT_005e91e0 == (HWND)0x0) {
    bVar1 = false;
  }
  else {
    SendMessageA(DAT_005e91e0,0x111,2,0);
    bVar1 = DAT_005e91e0 == (HWND)0x0;
  }
  return bVar1;
}

