
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */
/* WARNING: Restarted to delay deadcode elimination for space: stack */

undefined4 FUN_00402144(void)

{
  int iVar1;
  undefined4 uVar2;
  uint uVar3;
  undefined4 *puVar4;
  undefined4 *puVar5;
  uint uVar6;
  char *local_cc;
  int local_c0;
  int local_bc;
  undefined2 local_b6;
  int local_ac;
  int local_14;
  int local_10;
  undefined2 local_c;
  int local_8;
  
  local_cc = &DAT_005f2420;
  iVar1 = (*DAT_005ebe58)(&local_bc);
  if (iVar1 == 0) {
    uVar2 = 0;
  }
  else {
    iVar1 = (*DAT_005ebe5c)(&local_bc);
    if (iVar1 == 0) {
      uVar2 = 0;
    }
    else {
      iVar1 = FUN_00402a00();
      if (iVar1 == 0) {
        (*DAT_005ebe60)(&local_bc);
        uVar2 = 0;
      }
      else {
        local_c = local_b6;
        for (local_c0 = 0; local_c0 < DAT_005f1b34; local_c0 = local_c0 + 8) {
          local_8 = 0;
          while (iVar1 = local_8, local_8 < 0x500) {
            if (*local_cc == '\0') {
              local_cc = local_cc + 1;
              local_8 = local_8 + 0x40;
            }
            else {
              local_14 = 8;
              for (; (local_8 < 0x500 && (*local_cc != '\0')); local_cc = local_cc + 1) {
                *local_cc = '\0';
                local_8 = local_8 + 0x40;
              }
              uVar3 = local_8 - iVar1;
              puVar4 = (undefined4 *)(local_c0 * DAT_005f1ff4 + iVar1 + DAT_005f1fec);
              puVar5 = (undefined4 *)(local_ac * local_c0 + iVar1 + local_bc);
              local_10 = DAT_005f1ff4 - uVar3;
              uVar6 = uVar3 >> 2;
              iVar1 = local_14;
              do {
                for (; uVar6 != 0; uVar6 = uVar6 - 1) {
                  *puVar5 = *puVar4;
                  puVar4 = puVar4 + 1;
                  puVar5 = puVar5 + 1;
                }
                puVar5 = (undefined4 *)((int)puVar5 + (local_ac - uVar3));
                puVar4 = (undefined4 *)((int)puVar4 + local_10);
                iVar1 = iVar1 + -1;
                uVar6 = uVar3 >> 2;
              } while (iVar1 != 0);
              _DAT_005f2404 = _DAT_005f2404 + 1;
            }
          }
        }
        FUN_00402aa4();
        (*DAT_005ebe60)(&local_bc);
        _DAT_005f1fe0 = 2;
        uVar2 = 1;
      }
    }
  }
  return uVar2;
}

