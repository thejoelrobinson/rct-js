
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void entry(void)

{
  byte bVar1;
  DWORD DVar2;
  int iVar3;
  uint uVar4;
  HMODULE pHVar5;
  byte *pbVar6;
  undefined4 uVar8;
  _STARTUPINFOA local_60;
  undefined1 *local_1c;
  void *local_14;
  undefined1 *puStack_10;
  undefined *puStack_c;
  undefined4 local_8;
  byte *pbVar7;
  
  local_8 = 0xffffffff;
  puStack_c = &DAT_005e7390;
  puStack_10 = &LAB_00413268;
  local_14 = ExceptionList;
  local_1c = &stack0xffffff88;
  ExceptionList = &local_14;
  DVar2 = GetVersion();
  _DAT_005efed8 = DVar2 >> 8 & 0xff;
  _DAT_005efed4 = DVar2 & 0xff;
  _DAT_005efed0 = _DAT_005efed4 * 0x100 + _DAT_005efed8;
  _DAT_005efecc = DVar2 >> 0x10;
  iVar3 = FUN_00415190();
  if (iVar3 == 0) {
    FUN_00413050(0x1c);
  }
  local_8 = 0;
  FUN_00414f90();
  FUN_00414f80();
  DAT_005f3f70 = (byte *)GetCommandLineA();
  DAT_005efeac = FUN_00414940();
  if ((DAT_005efeac == 0) || (DAT_005f3f70 == (byte *)0x0)) {
    FUN_00414210(0xffffffff);
  }
  FUN_00414690();
  FUN_004145a0();
  FUN_004141e0();
  pbVar6 = DAT_005f3f70;
  if (*DAT_005f3f70 == 0x22) {
    while( true ) {
      pbVar7 = pbVar6;
      pbVar6 = pbVar7 + 1;
      bVar1 = *pbVar6;
      if ((bVar1 == 0x22) || (bVar1 == 0)) break;
      iVar3 = FUN_00414540(bVar1);
      if (iVar3 != 0) {
        pbVar6 = pbVar7 + 2;
      }
    }
    if (*pbVar6 == 0x22) {
      pbVar6 = pbVar7 + 2;
    }
  }
  else {
    for (; 0x20 < *pbVar6; pbVar6 = pbVar6 + 1) {
    }
  }
  for (; (*pbVar6 != 0 && (*pbVar6 < 0x21)); pbVar6 = pbVar6 + 1) {
  }
  local_60.dwFlags = 0;
  GetStartupInfoA(&local_60);
  if ((local_60.dwFlags & 1) == 0) {
    uVar4 = 10;
  }
  else {
    uVar4 = local_60._48_4_ & 0xffff;
  }
  uVar8 = 0;
  pHVar5 = GetModuleHandleA((LPCSTR)0x0);
  uVar8 = FUN_00402e9b(pHVar5,uVar8,pbVar6,uVar4);
  FUN_00414210(uVar8);
  ExceptionList = local_14;
  return;
}

