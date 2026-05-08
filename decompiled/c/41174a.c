
bool FUN_0041174a(void)

{
  MCIERROR MVar1;
  
  MVar1 = mciSendStringA(s_close_all_005ec234,(LPSTR)0x0,0,(HWND)0x0);
  if (MVar1 == 0) {
    DAT_005ec1c8 = 0;
  }
  return MVar1 == 0;
}

