
void FUN_00404de6(void)

{
  _NOTIFYICONDATAA local_5c;
  
  if (DAT_005e93fc != 0) {
    local_5c.cbSize = 0x58;
    local_5c.hWnd = DAT_005e916c;
    local_5c.uID = 1;
    local_5c.uFlags = 0;
    Shell_NotifyIconA(2,&local_5c);
    DAT_005e93fc = 0;
  }
  return;
}

