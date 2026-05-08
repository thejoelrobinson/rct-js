
DWORD FUN_00404972(void)

{
  _MEMORYSTATUS local_24;
  
  GlobalMemoryStatus(&local_24);
  return local_24.dwMemoryLoad;
}

