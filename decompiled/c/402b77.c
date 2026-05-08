
int FUN_00402b77(void)

{
  HANDLE pvVar1;
  DWORD dwPriorityClass;
  int nPriority;
  
  if ((DAT_005e9128 != 0) && (DAT_005e915c = DAT_005e915c + -1, DAT_005e915c == 0)) {
    dwPriorityClass = DAT_005f2408;
    pvVar1 = GetCurrentProcess();
    SetPriorityClass(pvVar1,dwPriorityClass);
    nPriority = DAT_005f1fe8;
    pvVar1 = GetCurrentThread();
    SetThreadPriority(pvVar1,nPriority);
    DAT_005e9128 = 0;
  }
  return DAT_005e915c;
}

