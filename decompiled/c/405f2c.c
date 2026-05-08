
bool FUN_00405f2c(void)

{
  ATOM AVar1;
  WNDCLASSA local_30;
  HICON local_8;
  
  local_8 = LoadIconA(DAT_005f1398,s_GSKApplicationIcon_005ebebc);
  if (local_8 == (HICON)0x0) {
    local_8 = LoadIconA((HINSTANCE)0x0,(LPCSTR)0x7f00);
  }
  local_30.style = 0;
  local_30.lpfnWndProc = FUN_00403d79;
  local_30.cbWndExtra = 0;
  local_30.cbClsExtra = 0;
  local_30.hInstance = DAT_005f1398;
  local_30.hCursor = LoadCursorA((HINSTANCE)0x0,(LPCSTR)0x7f00);
  local_30.hIcon = local_8;
  local_30.lpszMenuName = s_RollerCoaster_Tycoon_005e9030;
  local_30.hbrBackground = GetStockObject(4);
  local_30.lpszClassName = s_RollerCoaster_Tycoon_005e9030;
  AVar1 = RegisterClassA(&local_30);
  return AVar1 != 0;
}

