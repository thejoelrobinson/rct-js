
void FUN_004359d5(void)

{
  short sVar1;
  byte *extraout_EDX;
  char unaff_BL;
  
  FUN_00431510();
  if ((unaff_BL == '\x03') && ((*extraout_EDX & 0x3c) == 0x10)) {
    if (((&DAT_005f4970)[(uint)extraout_EDX[4] * 0x10 + (extraout_EDX[5] & 0xf)] & 0xf) != 0) {
      sVar1 = 0;
      if (*(ushort *)(&DAT_005f4970 + (uint)extraout_EDX[4] * 0x10 + (extraout_EDX[5] & 0xf)) != 0)
      {
        for (; (*(ushort *)(&DAT_005f4970 + (uint)extraout_EDX[4] * 0x10 + (extraout_EDX[5] & 0xf))
                >> sVar1 & 1) == 0; sVar1 = sVar1 + 1) {
        }
      }
      return;
    }
  }
  FUN_00435005();
  return;
}

