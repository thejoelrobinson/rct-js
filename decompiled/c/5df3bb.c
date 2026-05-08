
void FUN_005df3bb(void)

{
  uint3 uVar1;
  int iVar2;
  undefined *puVar3;
  
  FUN_005df208();
  DAT_006e2b76 = 0x351194e3;
  puVar3 = &DAT_0066deea;
  iVar2 = 0x1e51;
  do {
    uVar1 = (uint3)(DAT_006e2b76 >> 8);
    DAT_006e2b76 = CONCAT31(uVar1,(byte)DAT_006e2b76 ^ puVar3[-0x23f40a]) << 0xd |
                   (uint)(uVar1 >> 0xb);
    puVar3 = puVar3 + 1;
    iVar2 = iVar2 + -1;
  } while (iVar2 != 0);
  puVar3 = &DAT_0066fd3e;
  iVar2 = 0xbdc;
  do {
    uVar1 = (uint3)(DAT_006e2b76 >> 8);
    DAT_006e2b76 = CONCAT31(uVar1,(byte)DAT_006e2b76 ^ puVar3[-0x23f40a]) << 0xd |
                   (uint)(uVar1 >> 0xb);
    puVar3 = puVar3 + 1;
    iVar2 = iVar2 + -1;
  } while (iVar2 != 0);
  DAT_0099c16a = 0;
  return;
}

