
SIZE_T FUN_004049b2(void)

{
  _MEMORYSTATUS local_24;
  
  GlobalMemoryStatus(&local_24);
  return local_24.dwAvailPageFile;
}

