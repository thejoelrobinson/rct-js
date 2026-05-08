
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00452835(void)

{
  uint uVar1;
  
  if (DAT_006323f4 != -1) {
    FUN_00453f0a();
    FUN_00454300();
    FUN_0045432a();
    uVar1 = _DAT_006323f8 & 1;
    _DAT_006323f8 = _DAT_006323f8 & 0xfffffffe;
    if (uVar1 != 0) {
      FUN_00453ed8();
      FUN_0040d3a0();
    }
    FUN_0040776d();
    FUN_00407696();
    DAT_006323f4 = -1;
  }
  return;
}

