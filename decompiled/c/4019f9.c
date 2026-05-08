
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_004019f9(void)

{
  int iVar1;
  int local_c8;
  int local_c4;
  int local_c0;
  int local_bc;
  char *local_b8;
  int local_b4;
  undefined1 local_b0 [168];
  int local_8;
  
  local_b8 = &DAT_005f2420;
  (*DAT_005ebe58)(local_b0);
  for (local_b4 = 0; local_b4 < DAT_005f1b34; local_b4 = local_b4 + 8) {
    local_8 = 0;
    while (iVar1 = local_8, local_8 < 0x500) {
      if (*local_b8 == '\0') {
        local_b8 = local_b8 + 1;
        local_8 = local_8 + 0x40;
      }
      else {
        local_c8 = local_8;
        local_c4 = local_b4;
        local_bc = local_b4 + 8;
        for (; (local_8 < 0x500 && (*local_b8 != '\0')); local_b8 = local_b8 + 1) {
          *local_b8 = '\0';
          local_8 = local_8 + 0x40;
        }
        local_c0 = local_8;
        (*DAT_005ebe9c)(DAT_005e9100,&local_c8,local_b0,iVar1,local_b4);
        _DAT_005f2404 = _DAT_005f2404 + 1;
      }
    }
  }
  _DAT_005f1fe0 = 5;
  return 1;
}

