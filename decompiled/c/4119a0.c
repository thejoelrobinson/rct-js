
undefined4 FUN_004119a0(undefined4 param_1,LPCSTR param_2)

{
  HMODULE hInst;
  undefined4 uVar1;
  LPCSTR name;
  UINT type;
  int cx;
  int cy;
  UINT fuLoad;
  undefined4 local_c;
  
  fuLoad = 0x2000;
  cy = 0;
  cx = 0;
  type = 0;
  name = param_2;
  hInst = GetModuleHandleA((LPCSTR)0x0);
  local_c = LoadImageA(hInst,name,type,cx,cy,fuLoad);
  if (local_c == (HANDLE)0x0) {
    local_c = LoadImageA((HINSTANCE)0x0,param_2,0,0,0,0x2010);
  }
  if (local_c == (HGDIOBJ)0x0) {
    uVar1 = 0x80004005;
  }
  else {
    uVar1 = FUN_00411a34(param_1,local_c,0,0,0,0);
    DeleteObject(local_c);
  }
  return uVar1;
}

