
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_005e39c6(void)

{
  uint uVar1;
  
  uVar1 = DAT_009a1164;
  if (DAT_0099c169 != '\0') {
    _DAT_009a1618 = _DAT_009a1618 + 1;
  }
  while (0x9a013b < uVar1 - 0x178) {
    FUN_005e40c4();
    FUN_005e39ff();
    (**(code **)(uVar1 - 0x174))();
    uVar1 = uVar1 - 0x178;
  }
  return;
}

