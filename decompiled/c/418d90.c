
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00418d90(uint param_1)

{
  uint *puVar1;
  int iVar2;
  
  _DAT_005efec4 = param_1;
  iVar2 = 0;
  puVar1 = &DAT_005eea10;
  do {
    if (param_1 == *puVar1) {
      _DAT_005efec0 = *(undefined4 *)(iVar2 * 8 + 0x5eea14);
      return;
    }
    puVar1 = puVar1 + 2;
    iVar2 = iVar2 + 1;
  } while (puVar1 < &DAT_005eeb78);
  if ((0x12 < param_1) && (param_1 < 0x25)) {
    _DAT_005efec0 = 0xd;
    return;
  }
  if ((param_1 < 0xbc) || (_DAT_005efec0 = 8, 0xca < param_1)) {
    _DAT_005efec0 = 0x16;
  }
  return;
}

