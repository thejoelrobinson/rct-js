
bool FUN_00411789(void)

{
  int iVar1;
  undefined4 *puVar2;
  CHAR local_104;
  undefined4 local_103;
  
  local_104 = DAT_005ec240;
  puVar2 = &local_103;
  for (iVar1 = 0x3f; iVar1 != 0; iVar1 = iVar1 + -1) {
    *puVar2 = 0;
    puVar2 = puVar2 + 1;
  }
  *(undefined2 *)puVar2 = 0;
  *(undefined1 *)((int)puVar2 + 2) = 0;
  mciSendStringA(s_status_MUSIC_mode_005ec244,&local_104,0x100,DAT_005e916c);
  iVar1 = _strcmp(&local_104,s_playing_005ec258);
  DAT_005ec1c8 = (uint)(iVar1 == 0);
  return iVar1 == 0;
}

