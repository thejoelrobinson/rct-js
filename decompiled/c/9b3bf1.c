
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_009b3bf1(void)

{
  uint unaff_EBX;
  byte *unaff_ESI;
  
  if ((unaff_EBX & 0x20000000) == 0) {
    if ((unaff_EBX & 0x40000000) != 0) {
      return;
    }
    if ((_DAT_009a201c & 1) == 0) {
      return;
    }
    if (*unaff_ESI != 0) {
      DAT_0099c164 = 1;
    }
  }
  else {
    if ((_DAT_009a201c & 1) == 0) {
      return;
    }
    if (*(char *)((uint)*unaff_ESI + DAT_009a200c) != '\0') {
      DAT_0099c164 = 1;
      return;
    }
  }
  return;
}

