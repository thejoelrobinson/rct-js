
SIZE_T FUN_00404992(void)

{
  _MEMORYSTATUS local_24;
  
  GlobalMemoryStatus(&local_24);
  return local_24.dwAvailPhys;
}

