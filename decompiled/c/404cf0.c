
BOOL FUN_00404cf0(HICON param_1,char *param_2)

{
  _NOTIFYICONDATAA local_5c;
  
  local_5c.cbSize = 0x58;
  local_5c.hWnd = DAT_005e916c;
  local_5c.uID = 1;
  local_5c.uFlags = 3;
  local_5c.uCallbackMessage = 0x400;
  local_5c.hIcon = param_1;
  if (param_2 != (char *)0x0) {
    _strncpy(local_5c.szTip,param_2,0x3f);
    local_5c.szTip[0x3f] = '\0';
    local_5c.uFlags = local_5c.uFlags | 4;
  }
  DAT_005e93fc = Shell_NotifyIconA(0,&local_5c);
  return DAT_005e93fc;
}

