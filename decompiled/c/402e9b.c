
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_00402e9b(undefined4 param_1,undefined4 param_2,undefined4 param_3)

{
  MMRESULT MVar1;
  int iVar2;
  int local_24;
  void *local_14;
  undefined1 *puStack_10;
  undefined *puStack_c;
  undefined4 local_8;
  
  local_8 = 0xffffffff;
  puStack_c = &DAT_005e7370;
  puStack_10 = &LAB_00413268;
  local_14 = ExceptionList;
  DAT_005e9190 = param_3;
  DAT_005f1398 = param_1;
  ExceptionList = &local_14;
  DAT_005e91c8 = LoadCursorA((HINSTANCE)0x0,(LPCSTR)0x7f00);
  for (local_24 = 0; local_24 < 0x20; local_24 = local_24 + 1) {
    (&DAT_005f1b60)[local_24] = 0;
  }
  DAT_005f1fdc = 0;
  DAT_005f1b30 = 0;
  DAT_005f13a0 = 0;
  _DAT_005f1b80 = 0;
  DAT_005f1b20 = 0;
  _DAT_005f14c4 = 0;
  DAT_005e9194 = 0;
  DAT_005e9198 = 0;
  FUN_00413170(&DAT_005f17e0,s_GSK_Error_Trapper_005ebbcc);
  FUN_00413170(&DAT_005f1ba0,s_RollerCoaster_Tycoon_005e9030);
  SetErrorMode(0);
  local_8 = 0;
  MVar1 = timeBeginPeriod(1);
  FUN_00404752();
  FUN_00404b0e();
  iVar2 = FUN_00405f2c();
  if (iVar2 != 0) {
    FUN_00406d10();
    FUN_0040d9a0();
    FUN_0040df00();
    FUN_00401000();
    FUN_0040df1a();
    FUN_0040d9b0();
    FUN_00406ee7();
    if (DAT_005e91ec != (HGDIOBJ)0x0) {
      DeleteObject(DAT_005e91ec);
      DAT_005e91ec = (HGDIOBJ)0x0;
    }
    FUN_004061f5();
    if (MVar1 == 0) {
      timeEndPeriod(1);
    }
    if (DAT_005e9194 != 0) {
      FUN_00402ce0();
    }
  }
  ExceptionList = local_14;
  return 0;
}

