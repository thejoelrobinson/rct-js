
void FUN_005df40c(void)

{
  uint uVar1;
  
  uVar1 = DAT_006e3b88;
  DAT_006e3b88 = DAT_006e3b88 +
                 ((DAT_006e3b8c ^ 0x1234567f) >> 7 | (DAT_006e3b8c ^ 0x1234567f) << 0x19);
  DAT_006e3b8c = uVar1 >> 3 | uVar1 << 0x1d;
  return;
}

