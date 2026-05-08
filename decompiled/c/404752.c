
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00404752(void)

{
  BOOL BVar1;
  uint uVar2;
  _MEMORYSTATUS local_e4;
  _union_530 local_c4 [5];
  undefined4 local_b0;
  undefined2 local_a4;
  undefined2 local_a2;
  _OSVERSIONINFOA local_a0;
  DWORD local_c;
  HDC local_8;
  
  local_a0.dwOSVersionInfoSize = 0x94;
  BVar1 = GetVersionExA(&local_a0);
  if (BVar1 == 0) {
    DAT_005f14e0 = 0xffffffff;
    DAT_005f14e4 = 0;
    _DAT_005f14e8 = 0;
    _DAT_005f14ec = 0;
  }
  else {
    DAT_005f14e0 = local_a0.dwPlatformId;
    DAT_005f14e4 = local_a0.dwMajorVersion;
    _DAT_005f14e8 = local_a0.dwMinorVersion;
    _DAT_005f14ec = local_a0.dwBuildNumber;
  }
  GetSystemInfo((LPSYSTEM_INFO)&local_c4[0].s);
  _DAT_005f14f0 = local_c4[0].s.wProcessorArchitecture;
  _DAT_005f14f2 = local_a4;
  _DAT_005f14f4 = local_a2;
  _DAT_005f14f8 = local_b0;
  GlobalMemoryStatus(&local_e4);
  DAT_005f14fc = local_e4.dwTotalPhys;
  _DAT_005f1500 = local_e4.dwTotalPageFile;
  _DAT_005f1504 = local_e4.dwTotalVirtual;
  local_c = 0x50;
  GetUserNameA(&DAT_005f1508,&local_c);
  local_c = 0x50;
  GetComputerNameA(&DAT_005f1558,&local_c);
  DAT_005f15a8 = GetSystemMetrics(0);
  DAT_005f15ac = GetSystemMetrics(1);
  local_8 = GetDC((HWND)0x0);
  if (local_8 == (HDC)0x0) {
    DAT_005f15b0 = 0;
    _DAT_005f15b4 = 0;
  }
  else {
    DAT_005f15b0 = GetDeviceCaps(local_8,0xc);
    uVar2 = GetDeviceCaps(local_8,0x26);
    _DAT_005f15b4 = (uint)((uVar2 & 0x100) != 0);
    ReleaseDC((HWND)0x0,local_8);
  }
  _DAT_005f15bc = (uint)(7 < DAT_005f15b0);
  if ((DAT_005f14e4 < 4) || (DAT_005f15b0 < 4)) {
    _DAT_005f15b8 = 0;
  }
  else {
    _DAT_005f15b8 = 1;
  }
  _DAT_005f15c0 = FUN_00402e3d();
  return;
}

