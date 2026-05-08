
/* WARNING: Removing unreachable block (ram,0x00402e76) */

bool FUN_00402e3d(void)

{
  int iVar1;
  _SYSTEM_INFO local_2c;
  uint local_8;
  
  local_8 = 0;
  GetSystemInfo(&local_2c);
  if ((local_2c.dwProcessorType != 0x182) && (local_2c.dwProcessorType != 0x1e6)) {
    iVar1 = cpuid_Version_info(1);
    local_8 = *(uint *)(iVar1 + 8);
  }
  return (local_8 & 0x800000) != 0;
}

