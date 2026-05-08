
bool FUN_004116dc(void)

{
  MCIERROR MVar1;
  
  MVar1 = mciSendStringA(s_stop_MUSIC_005ec21c,(LPSTR)0x0,0,(HWND)0x0);
  return MVar1 == 0;
}

