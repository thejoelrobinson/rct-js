
void FUN_0040ab58(void)

{
  undefined4 *puVar1;
  int iVar2;
  undefined4 local_74;
  undefined4 local_70;
  byte local_c;
  undefined4 *local_8;
  
  local_8 = DAT_005ebf48;
  _memset(&local_74,0,0x6c);
  local_74 = 0x6c;
  local_70 = 1;
  iVar2 = (**(code **)(*DAT_005ebf34 + 0x58))(DAT_005ebf34,&local_74);
  if ((iVar2 == 0) && ((local_c & 0x10) != 0)) {
    (**(code **)(*DAT_005ebf30 + 0x28))(DAT_005ebf30);
  }
  while (local_8 != (undefined4 *)0x0) {
    puVar1 = (undefined4 *)local_8[2];
    FUN_00413470(*local_8);
    (**(code **)(*(int *)local_8[1] + 8))(local_8[1]);
    FUN_00413470(local_8);
    local_8 = puVar1;
  }
  DAT_005ebf48 = (undefined4 *)0x0;
  if (DAT_005ebf44 != (int *)0x0) {
    (**(code **)(*DAT_005ebf44 + 8))(DAT_005ebf44);
    DAT_005ebf44 = (int *)0x0;
  }
  if (DAT_005ebf38 != 0) {
    FUN_00413470(DAT_005ebf38);
    DAT_005ebf38 = 0;
  }
  if (DAT_005ebf34 != (int *)0x0) {
    (**(code **)(*DAT_005ebf34 + 8))(DAT_005ebf34);
    DAT_005ebf34 = (int *)0x0;
  }
  if (DAT_005ebf3c != (int *)0x0) {
    (**(code **)(*DAT_005ebf3c + 8))(DAT_005ebf3c);
    DAT_005ebf3c = (int *)0x0;
  }
  (**(code **)(*DAT_005ebf30 + 0x4c))(DAT_005ebf30);
  (**(code **)(*DAT_005ebf30 + 0x50))(DAT_005ebf30,DAT_005e916c,8);
  if (DAT_005e916c != (HWND)0x0) {
    DestroyWindow(DAT_005e916c);
    DAT_005e916c = (HWND)0x0;
  }
  return;
}

