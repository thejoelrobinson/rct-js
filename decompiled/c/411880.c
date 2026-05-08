
undefined4 FUN_00411880(int *param_1,LPCSTR param_2,int param_3,int param_4)

{
  HMODULE hInst;
  int iVar1;
  LPCSTR name;
  UINT type;
  int cy;
  UINT fuLoad;
  undefined4 local_90;
  HANDLE local_8c;
  undefined1 local_88 [4];
  undefined4 local_84;
  undefined4 local_80;
  undefined4 local_70;
  undefined4 local_6c;
  undefined4 local_68;
  undefined4 local_64;
  undefined4 local_8;
  
  fuLoad = 0x2000;
  type = 0;
  name = param_2;
  iVar1 = param_3;
  cy = param_4;
  hInst = GetModuleHandleA((LPCSTR)0x0);
  local_8c = LoadImageA(hInst,name,type,iVar1,cy,fuLoad);
  if (local_8c == (HANDLE)0x0) {
    local_8c = LoadImageA((HINSTANCE)0x0,param_2,0,param_3,param_4,0x2010);
  }
  if (local_8c == (HANDLE)0x0) {
    local_90 = 0;
  }
  else {
    GetObjectA(local_8c,0x18,local_88);
    _memset(&local_70,0,0x6c);
    local_70 = 0x6c;
    local_6c = 7;
    local_8 = 0x40;
    local_64 = local_84;
    local_68 = local_80;
    iVar1 = (**(code **)(*param_1 + 0x18))(param_1,&local_70,&local_90,0);
    if (iVar1 == 0) {
      FUN_00411a34(local_90,local_8c,0,0,0,0);
      DeleteObject(local_8c);
    }
    else {
      local_90 = 0;
    }
  }
  return local_90;
}

