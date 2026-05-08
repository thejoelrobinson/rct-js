
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined8 FUN_00453ed8(void)

{
  undefined4 in_EAX;
  undefined4 in_EDX;
  char *pcVar1;
  uint uVar2;
  
  if ((_DAT_006323f8 & 1) != 0) {
    pcVar1 = &DAT_006325f0;
    uVar2 = 0;
    do {
      if (*pcVar1 != -1) {
        FUN_0040d575(uVar2);
        *pcVar1 = -1;
      }
      pcVar1 = pcVar1 + 8;
      uVar2 = uVar2 + 1;
    } while (uVar2 < 2);
  }
  return CONCAT44(in_EDX,in_EAX);
}

