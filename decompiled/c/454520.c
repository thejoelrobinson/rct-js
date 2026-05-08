
void FUN_00454520(void)

{
  uint uVar1;
  
  uVar1 = 0;
  do {
    (&DAT_008d7e2a)[uVar1] = 0;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 0x74);
  do {
    (&DAT_008d7e2a)[uVar1] = 1;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 0x78);
  FUN_004575af();
  return;
}

