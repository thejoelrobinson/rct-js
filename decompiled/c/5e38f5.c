
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

uint FUN_005e38f5(void)

{
  ushort uVar1;
  uint in_EAX;
  short extraout_CX;
  uint unaff_EBX;
  
  uVar1 = _DAT_0099a4fc >> 1;
  _DAT_0099a4fc = _DAT_0099a4fc & 0xfffd;
  if ((uVar1 & 1) != 0) {
    unaff_EBX = CONCAT31((int3)(unaff_EBX >> 8),1);
    in_EAX = FUN_00426f56();
  }
  if (DAT_00971ef0 != '\0') {
    FUN_005e39c6();
    FUN_005e1f70();
    while( true ) {
      in_EAX = FUN_005e1fdd();
      if (extraout_CX == 0) break;
      if ((((_DAT_0099a500 & 1) == 0) || (DAT_00628cb9 == '\0')) || (extraout_CX != 1)) {
        FUN_005e2225();
      }
      else {
        DAT_00628cb9 = -2;
      }
    }
    if ((DAT_00991f30 >> 5 & 1) != 0) {
      FUN_005e2225(unaff_EBX);
      return in_EAX;
    }
    if (in_EAX != 0x80000000) {
      if ((int)in_EAX < 0) {
        in_EAX = 0;
      }
      if (DAT_00971ed6 <= (ushort)in_EAX) {
        in_EAX = (uint)(ushort)(DAT_00971ed6 - 1);
      }
      if ((int)unaff_EBX < 0) {
        unaff_EBX = 0;
      }
      if (DAT_00971ed8 <= (ushort)unaff_EBX) {
        unaff_EBX = (uint)(ushort)(DAT_00971ed8 - 1);
      }
      FUN_005e2225(unaff_EBX,in_EAX);
      FUN_005e6078(unaff_EBX,in_EAX);
      in_EAX = FUN_005e6044();
    }
  }
  return in_EAX;
}

