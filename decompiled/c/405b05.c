
HWND FUN_00405b05(void)

{
  int nHeight;
  int nWidth;
  HWND pHVar1;
  HMENU hMenu;
  HINSTANCE hInstance;
  LPVOID lpParam;
  
  lpParam = (LPVOID)0x0;
  hMenu = (HMENU)0x0;
  pHVar1 = (HWND)0x0;
  hInstance = DAT_005f1398;
  nHeight = GetSystemMetrics(1);
  nWidth = GetSystemMetrics(0);
  pHVar1 = CreateWindowExA(8,s_RollerCoaster_Tycoon_005e9030,&DAT_005f1ba0,0x97080000,0,0,nWidth,
                           nHeight,pHVar1,hMenu,hInstance,lpParam);
  return pHVar1;
}

