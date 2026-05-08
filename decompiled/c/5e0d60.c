
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_005e0d60(void)

{
  int iVar1;
  short sVar2;
  uint uVar3;
  undefined2 *puVar4;
  undefined4 *puVar5;
  
  puVar5 = &DAT_0099ac8b;
  uVar3 = 0x5e3c;
  do {
    iVar1 = (&DAT_008dc0b4)[uVar3 * 4];
    *puVar5 = *(undefined4 *)(iVar1 + 0xf5);
    puVar5[1] = *(undefined4 *)(iVar1 + 0xf9);
    puVar5 = puVar5 + 2;
    uVar3 = uVar3 + 1;
  } while (uVar3 < 0x5e57);
  DAT_009a1164 = &DAT_009a013c;
  _DAT_009a1618 = 0;
  puVar4 = &DAT_009a1168;
  sVar2 = 9;
  do {
    *puVar4 = 0;
    puVar4 = puVar4 + 10;
    sVar2 = sVar2 + -1;
  } while (sVar2 != 0);
  DAT_009a121c = 0;
  DAT_00991f30 = 0;
  DAT_00991f36 = 0;
  DAT_00991f37 = 0xff;
  DAT_00991f64 = 0xffffffff;
  DAT_00991f54 = 0xffff;
  _DAT_0099a020 = 0;
  DAT_0099a4e6 = 0xffff;
  FUN_005e698a();
  return;
}

