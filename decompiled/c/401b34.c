
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_00401b34(void)

{
  int iVar1;
  int local_cc;
  int local_c8;
  int local_c4;
  int local_c0;
  int local_bc;
  undefined1 *local_b8;
  int local_b4;
  undefined1 local_b0 [168];
  int local_8;
  
  local_b8 = &DAT_005f2420;
  (*DAT_005ebe58)(local_b0);
  local_8 = 0;
  do {
    if (DAT_005f15c4 <= local_8) {
      _DAT_005f1fe0 = 6;
      return 1;
    }
    local_cc = 0;
    local_b4 = 0;
    while (iVar1 = local_b4, local_b4 < DAT_005f1b34) {
      if (local_b8[local_cc] == '\0') {
        local_cc = local_cc + 0x14;
        local_b4 = local_b4 + 8;
      }
      else {
        local_c8 = local_8;
        local_c4 = local_b4;
        local_c0 = local_8 + 0x40;
        do {
          local_b8[local_cc] = 0;
          local_cc = local_cc + 0x14;
          local_bc = local_b4 + 8;
          local_b4 = local_bc;
          if (DAT_005f1b34 <= local_bc) break;
        } while (local_b8[local_cc] != '\0');
        (*DAT_005ebe9c)(DAT_005e9100,&local_c8,local_b0,local_8,iVar1);
        _DAT_005f2404 = _DAT_005f2404 + 1;
      }
    }
    local_b8 = local_b8 + 1;
    local_8 = local_8 + 0x40;
  } while( true );
}

