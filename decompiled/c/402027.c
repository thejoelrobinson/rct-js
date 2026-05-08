
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_00402027(void)

{
  int iVar1;
  undefined4 uVar2;
  uint uVar3;
  uint uVar4;
  undefined4 *puVar5;
  undefined4 *local_b8;
  ushort local_b2;
  ushort local_b0;
  int local_a8;
  undefined4 *local_10;
  ushort local_c;
  int local_8;
  
  iVar1 = (*DAT_005ebe58)(&local_b8);
  if (iVar1 == 0) {
    uVar2 = 0;
  }
  else {
    iVar1 = (*DAT_005ebe5c)(&local_b8);
    if (iVar1 == 0) {
      uVar2 = 0;
    }
    else {
      iVar1 = FUN_00402a00();
      if (iVar1 == 0) {
        (*DAT_005ebe60)(&local_b8);
        uVar2 = 0;
      }
      else {
        local_10 = local_b8;
        local_c = local_b0;
        local_8 = DAT_005f1ff4 - (short)local_b2;
        uVar4 = (uint)local_b0;
        uVar3 = (uint)(local_b2 >> 2);
        puVar5 = DAT_005f1fec;
        do {
          for (; uVar3 != 0; uVar3 = uVar3 - 1) {
            *local_b8 = *puVar5;
            puVar5 = puVar5 + 1;
            local_b8 = local_b8 + 1;
          }
          local_b8 = (undefined4 *)((int)local_b8 + (local_a8 - (short)local_b2));
          puVar5 = (undefined4 *)((int)puVar5 + local_8);
          uVar4 = uVar4 - 1;
          uVar3 = (uint)(local_b2 >> 2);
        } while (uVar4 != 0);
        FUN_00402aa4();
        (*DAT_005ebe60)(&local_b8);
        _DAT_005f1fe0 = 1;
        uVar2 = 1;
      }
    }
  }
  return uVar2;
}

