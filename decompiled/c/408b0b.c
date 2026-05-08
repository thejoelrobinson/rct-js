
void FUN_00408b0b(void)

{
  if (DAT_005ebf2c != (HMODULE)0x0) {
    FreeLibrary(DAT_005ebf2c);
    DAT_005ebf2c = (HMODULE)0x0;
    DAT_005f0d60 = 0;
    DAT_005f0958 = 0;
    DAT_005f0eec = 0;
    if (DAT_005ebf30 != (int *)0x0) {
      (**(code **)(*DAT_005ebf30 + 8))(DAT_005ebf30);
      DAT_005ebf30 = (int *)0x0;
    }
  }
  return;
}

