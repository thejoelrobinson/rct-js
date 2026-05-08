
DWORD FUN_00408276(HANDLE param_1,LPVOID param_2,DWORD param_3)

{
  BOOL BVar1;
  DWORD lDistanceToMove;
  DWORD DVar2;
  DWORD local_8;
  
  if (param_3 == 0xffffffff) {
    lDistanceToMove = SetFilePointer(param_1,0,(PLONG)0x0,1);
    DVar2 = SetFilePointer(param_1,0,(PLONG)0x0,2);
    SetFilePointer(param_1,lDistanceToMove,(PLONG)0x0,0);
    BVar1 = ReadFile(param_1,param_2,DVar2 - lDistanceToMove,&local_8,(LPOVERLAPPED)0x0);
    if (BVar1 == 0) {
      local_8 = 0xffffffff;
    }
  }
  else {
    BVar1 = ReadFile(param_1,param_2,param_3,&local_8,(LPOVERLAPPED)0x0);
    if (BVar1 == 0) {
      local_8 = 0xffffffff;
    }
  }
  return local_8;
}

