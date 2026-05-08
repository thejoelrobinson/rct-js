
BOOL FUN_00404d67(HICON param_1,char *param_2)

{
  BOOL BVar1;
  _NOTIFYICONDATAA local_5c;
  
  if (DAT_005e93fc == 0) {
    BVar1 = 0;
  }
  else {
    local_5c.cbSize = 0x58;
    local_5c.hWnd = DAT_005e916c;
    local_5c.uID = 1;
    local_5c.uFlags = 2;
    local_5c.hIcon = param_1;
    if (param_2 != (char *)0x0) {
      _strncpy(local_5c.szTip,param_2,0x3f);
      local_5c.szTip[0x3f] = '\0';
      local_5c.uFlags = local_5c.uFlags | 4;
    }
    BVar1 = Shell_NotifyIconA(1,&local_5c);
    DAT_005e93fc = BVar1;
  }
  return BVar1;
}

