
uint FUN_009b308d(void)

{
  uint uVar1;
  uint *puVar2;
  uint *puVar3;
  
  puVar2 = DAT_008dc0b4 + -0x1400;
  puVar3 = DAT_008dc0b4;
  do {
    uVar1 = *puVar3;
    if (DAT_008dc0b4 <= puVar2) {
      uVar1 = uVar1 | *puVar2;
    }
    puVar3 = puVar3 + 0x400;
    puVar2 = puVar2 + 0x400;
  } while (puVar3 < DAT_00971e74);
  return uVar1;
}

