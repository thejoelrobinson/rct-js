
void FUN_0043f325(void)

{
  byte in_AL;
  undefined4 in_EDX;
  int unaff_EBP;
  undefined4 extraout_var;
  uint uVar1;
  
  uVar1 = (uint)((ushort)((ushort)in_AL * (CONCAT11(0x76,in_AL) >> 8)) >> 8);
  FUN_005e0e07();
  if ((((-1 < unaff_EBP) || (DAT_0099c169 != '\0')) || ((DAT_0088741c & 8) == 0)) &&
     (2 < (ushort)uVar1)) {
    FUN_005e0e07(in_EDX,extraout_var,uVar1);
  }
  return;
}

