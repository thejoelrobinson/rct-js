
void FUN_00426b08(void)

{
  uint uVar1;
  
  uVar1 = 0;
  do {
    (&DAT_0087cc8a)[uVar1] = 0xff;
    (&DAT_0087ccaa)[uVar1] = 0xff;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 0x20);
  uVar1 = 0;
  do {
    (&DAT_0087d104)[uVar1] = 0x80000000;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 0x80);
  uVar1 = 0;
  do {
    (&DAT_0087d314)[uVar1] = 0x80000000;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 0x80);
  uVar1 = 0;
  do {
    (&DAT_0087d518)[uVar1] = 0x80000000;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 0x80);
  uVar1 = 0;
  do {
    (&DAT_0087d738)[uVar1 * 2] = 0;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 4);
  return;
}

