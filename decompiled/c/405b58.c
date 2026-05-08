
HWND FUN_00405b58(void)

{
  int iVar1;
  int iVar2;
  int iVar3;
  HWND pHVar4;
  
  iVar1 = GetSystemMetrics(0x20);
  iVar2 = GetSystemMetrics(0x21);
  iVar3 = GetSystemMetrics(4);
  pHVar4 = CreateWindowExA(0,s_RollerCoaster_Tycoon_005e9030,&DAT_005f1ba0,0x10cf0000,DAT_005f1384,
                           DAT_005f1388,DAT_005f12ac + iVar1 * 2,DAT_005f129c + iVar2 * 2 + iVar3,
                           (HWND)0x0,(HMENU)0x0,DAT_005f1398,(LPVOID)0x0);
  return pHVar4;
}

