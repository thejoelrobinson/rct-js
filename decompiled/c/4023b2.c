
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */
/* WARNING: Restarted to delay deadcode elimination for space: stack */

undefined4 FUN_004023b2(void)

{
  int iVar1;
  undefined4 uVar2;
  undefined4 *puVar3;
  undefined4 *puVar4;
  int iVar5;
  int local_fc;
  undefined1 *local_cc;
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
        for (local_8 = 0; local_8 < DAT_005f15c4; local_8 = local_8 + 0x40) {
          local_fc = 0;
          local_c0 = 0;
          while (iVar1 = local_c0, local_c0 < DAT_005f1b34) {
            if (local_cc[local_fc] == '\0') {
              local_fc = local_fc + 0x14;
              local_c0 = local_c0 + 8;
            }
            else {
              do {
                local_cc[local_fc] = 0;
                local_fc = local_fc + 0x14;
                local_c0 = local_c0 + 8;
                if (DAT_005f1b34 <= local_c0) break;
              } while (local_cc[local_fc] != '\0');
              local_14 = local_c0 - iVar1;
              puVar3 = (undefined4 *)(DAT_005f1ff4 * iVar1 + local_8 + DAT_005f1fec);
              puVar4 = (undefined4 *)(local_ac * iVar1 + local_8 + local_bc);
              local_10 = DAT_005f1ff4 + -0x40;
              iVar1 = 0x10;
              iVar5 = local_14;
              do {
                for (; iVar1 != 0; iVar1 = iVar1 + -1) {
                  *puVar4 = *puVar3;
                  puVar3 = puVar3 + 1;
                  puVar4 = puVar4 + 1;
                }
                puVar4 = (undefined4 *)((int)puVar4 + local_ac + -0x40);
                puVar3 = (undefined4 *)((int)puVar3 + local_10);
                iVar5 = iVar5 + -1;
                iVar1 = 0x10;
              } while (iVar5 != 0);
              _DAT_005f2404 = _DAT_005f2404 + 1;
            }
          }
          local_cc = local_cc + 1;
        }
        FUN_00402aa4();
        (*DAT_005ebe60)(&local_bc);
        _DAT_005f1fe0 = 3;
        uVar2 = 1;
      }
    }
  }
  return uVar2;
}

