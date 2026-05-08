
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_005e5ff1(void)

{
  uint uVar1;
  
  _DAT_009a1618 = _DAT_009a1618 + 1;
  DAT_00991f54 = DAT_00991f54 + DAT_00999f98;
  uVar1 = DAT_009a1164;
  while (0x9a013b < uVar1 - 0x178) {
    (**(code **)(uVar1 - 0x174))();
    uVar1 = uVar1 - 0x178;
  }
  FUN_005e69bd();
  return;
}

