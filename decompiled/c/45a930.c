
void FUN_0045a930(void)

{
  uint in_EAX;
  
  if ((0x7fff < (ushort)in_EAX) && ((ushort)in_EAX < 0x9000)) {
    (&DAT_0087f41c)[(in_EAX & 0x3ff) * 0x20] = 0;
  }
  return;
}

