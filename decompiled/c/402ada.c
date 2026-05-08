
int FUN_00402ada(void)

{
  HANDLE pvVar1;
  DWORD dwPriorityClass;
  int nPriority;
  
  if (DAT_005e912c != 0) {
    if (DAT_005e9128 == 0) {
      DAT_005e915c = 1;
      pvVar1 = GetCurrentProcess();
      DAT_005f2408 = GetPriorityClass(pvVar1);
      pvVar1 = GetCurrentThread();
      DAT_005f1fe8 = GetThreadPriority(pvVar1);
      dwPriorityClass = 0x100;
      pvVar1 = GetCurrentProcess();
      SetPriorityClass(pvVar1,dwPriorityClass);
      nPriority = 0xf;
      pvVar1 = GetCurrentThread();
      SetThreadPriority(pvVar1,nPriority);
      DAT_005e9128 = 1;
    }
    else {
      DAT_005e915c = DAT_005e915c + 1;
    }
  }
  return DAT_005e915c;
}

