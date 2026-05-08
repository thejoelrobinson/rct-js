
void FUN_00403516(void)

{
  if (DAT_005e91dc != 0) {
    KillTimer(DAT_005e916c,1000);
    FlashWindow(DAT_005e916c,0);
    DAT_005e91dc = 0;
  }
  return;
}

