
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined8 FUN_0043642b(void)

{
  undefined4 in_EAX;
  undefined4 in_EDX;
  int iVar1;
  
  if ((_DAT_0099a020 & 2) != 0) {
    for (iVar1 = 0; *(short *)(&DAT_0099a02c + iVar1) != -1; iVar1 = iVar1 + 1) {
      FUN_005e5562();
    }
  }
  return CONCAT44(in_EDX,in_EAX);
}

