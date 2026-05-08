
void FUN_00450b21(void)

{
  byte bVar1;
  byte in_DL;
  
  LOCK();
  bVar1 = (&DAT_008874a4)[(uint)in_DL * 0x260];
  (&DAT_008874a4)[(uint)in_DL * 0x260] = 0xff;
  UNLOCK();
  if (bVar1 != 0xff) {
    (&DAT_008ae9c4)[(uint)bVar1 * 0x4b0c] = 0xff;
  }
  return;
}

