
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00414d60(void)

{
  int iVar1;
  undefined4 *puVar2;
  
  puVar2 = &DAT_005f0020;
  for (iVar1 = 0x40; iVar1 != 0; iVar1 = iVar1 + -1) {
    *puVar2 = 0;
    puVar2 = puVar2 + 1;
  }
  *(undefined1 *)puVar2 = 0;
  DAT_005f0228 = 0;
  _DAT_005f3f64 = 0;
  DAT_005f022c = 0;
  _DAT_005f0230 = 0;
  _DAT_005f0234 = 0;
  _DAT_005f0238 = 0;
  return;
}

