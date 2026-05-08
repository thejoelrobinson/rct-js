
undefined4 FUN_00411617(undefined4 param_1)

{
  MCIERROR MVar1;
  undefined4 uVar2;
  CHAR local_208 [516];
  
  MVar1 = mciSendStringA(s_close_all_005ec1d8,(LPSTR)0x0,0,(HWND)0x0);
  if (MVar1 == 0) {
    FUN_00413620(local_208,s_open__s_type_sequencer_alias_MUS_005ec1e4,param_1);
    MVar1 = mciSendStringA(local_208,(LPSTR)0x0,0,(HWND)0x0);
    if (MVar1 == 0) {
      uVar2 = 1;
    }
    else {
      uVar2 = 0;
    }
  }
  else {
    uVar2 = 0;
  }
  return uVar2;
}

