
LPVOID FUN_004080e0(LPCSTR param_1,int param_2,DWORD param_3)

{
  HANDLE hFile;
  HANDLE hFileMappingObject;
  undefined4 local_20;
  undefined4 local_1c;
  undefined4 local_10;
  undefined4 local_c;
  undefined4 local_8;
  
  local_20 = (LPVOID)0x0;
  if (param_2 == 0) {
    local_10 = 0x80000000;
    local_8 = 2;
    local_1c = 4;
    local_c = 3;
  }
  else if (param_2 == 1) {
    local_10 = 0xc0000000;
    local_8 = 4;
    local_1c = 2;
    local_c = 4;
  }
  hFile = CreateFileA(param_1,local_10,0,(LPSECURITY_ATTRIBUTES)0x0,local_c,0x80,(HANDLE)0x0);
  if (hFile != (HANDLE)0xffffffff) {
    hFileMappingObject =
         CreateFileMappingA(hFile,(LPSECURITY_ATTRIBUTES)0x0,local_8,0,param_3,(LPCSTR)0x0);
    CloseHandle(hFile);
    if (hFileMappingObject != (HANDLE)0x0) {
      local_20 = MapViewOfFile(hFileMappingObject,local_1c,0,0,param_3);
      CloseHandle(hFileMappingObject);
    }
  }
  return local_20;
}

