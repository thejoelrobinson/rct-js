
bool FUN_0041168c(void)

{
  MCIERROR MVar1;
  
  MVar1 = mciSendStringA(s_play_MUSIC_from_0_005ec208,(LPSTR)0x0,0,DAT_005e916c);
  DAT_005ec1c8 = (uint)(MVar1 == 0);
  return MVar1 == 0;
}

