
void FUN_004151d0(void)

{
  if ((DAT_005efeb4 == 1) || ((DAT_005efeb4 == 0 && (DAT_005ec264 == 1)))) {
    FUN_00415210(0xfc);
    if (DAT_005f0240 != (code *)0x0) {
      (*DAT_005f0240)();
    }
    FUN_00415210(0xff);
  }
  return;
}

