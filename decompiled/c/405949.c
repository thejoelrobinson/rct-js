
bool FUN_00405949(undefined4 param_1)

{
  HANDLE hObject;
  CHAR local_108 [260];
  
  FUN_00413170(local_108,param_1);
  FUN_00413180(local_108,s__GSKMUTEX_005ebdf4);
  hObject = OpenMutexA(0x1f0001,0,local_108);
  if (hObject == (HANDLE)0x0) {
    CreateMutexA((LPSECURITY_ATTRIBUTES)0x0,0,local_108);
  }
  else {
    CloseHandle(hObject);
  }
  return hObject != (HANDLE)0x0;
}

