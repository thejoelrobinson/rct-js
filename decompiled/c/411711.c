
bool FUN_00411711(void)

{
  MCIERROR MVar1;
  
  MVar1 = mciSendStringA(s_play_MUSIC_005ec228,(LPSTR)0x0,0,DAT_005e916c);
  return MVar1 == 0;
}

