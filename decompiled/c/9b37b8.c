
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_009b37b8(void)

{
  uint unaff_EBX;
  byte *unaff_ESI;
  
  if ((unaff_EBX & 0x20000000) == 0) {
    if ((unaff_EBX & 0x40000000) == 0) {
      if ((_DAT_009a201c & 1) != 0) {
        if (*unaff_ESI == 0) {
          return;
        }
        DAT_0099c164 = 1;
        return;
      }
      DAT_0099c164 = 1;
    }
    return;
  }
  if ((_DAT_009a201c & 1) == 0) {
    return;
  }
  if (*(char *)((uint)*unaff_ESI + DAT_009a200c) == '\0') {
    return;
  }
  DAT_0099c164 = 1;
  return;
}

