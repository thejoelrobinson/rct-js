
DWORD FUN_00408342(HANDLE param_1,LPCVOID param_2,DWORD param_3)

{
  BOOL BVar1;
  DWORD local_8;
  
  BVar1 = WriteFile(param_1,param_2,param_3,&local_8,(LPOVERLAPPED)0x0);
  if (BVar1 == 0) {
    local_8 = 0xffffffff;
  }
  return local_8;
}

