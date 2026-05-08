
void FUN_00427247(void)

{
  uint unaff_EBX;
  
  if ((unaff_EBX & 1) != 0) {
    DAT_0099c169 = DAT_0099c169 ^ 1;
    FUN_005e5301();
    if ((DAT_0099c169 & 1) == 0) {
      FUN_004528c4();
    }
    else {
      FUN_004528a0();
    }
  }
  return;
}

