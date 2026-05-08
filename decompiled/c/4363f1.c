
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined8 FUN_004363f1(void)

{
  short sVar1;
  undefined4 in_EAX;
  short extraout_CX;
  undefined4 in_EDX;
  
  if ((_DAT_0099a020 & 1) != 0) {
    do {
      do {
        sVar1 = FUN_005e5562();
      } while ((short)(extraout_CX + 0x20) <= DAT_0099a028);
    } while ((short)(sVar1 + 0x20) <= DAT_0099a024);
  }
  return CONCAT44(in_EDX,in_EAX);
}

