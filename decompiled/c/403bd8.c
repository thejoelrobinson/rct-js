
undefined * FUN_00403bd8(void)

{
  undefined *puVar1;
  
  if (DAT_005e91e8 == DAT_005e91e4) {
    puVar1 = (undefined *)0x0;
  }
  else {
    puVar1 = &DAT_005f1cc0 + DAT_005e91e8 * 0xc;
    DAT_005e91e8 = DAT_005e91e8 + 1;
    DAT_005e91e8 = DAT_005e91e8 & 0x3f;
  }
  return puVar1;
}

