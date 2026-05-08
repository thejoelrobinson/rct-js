
undefined * FUN_004035c1(void)

{
  undefined *puVar1;
  
  if (DAT_005e91d4 == DAT_005e91d0) {
    puVar1 = (undefined *)0x0;
  }
  else {
    puVar1 = &DAT_005f15e0 + DAT_005e91d4 * 8;
    DAT_005e91d4 = DAT_005e91d4 + 1;
    DAT_005e91d4 = DAT_005e91d4 & 0x3f;
  }
  return puVar1;
}

