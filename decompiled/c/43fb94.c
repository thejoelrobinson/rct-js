
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

short FUN_0043fb94(void)

{
  short in_AX;
  int unaff_EBX;
  
  if (((&DAT_0062d325)[unaff_EBX * 2] & 1) != 0) {
    return in_AX * 0x260;
  }
  if (((&DAT_0062d325)[unaff_EBX * 2] & 2) != 0) {
    _DAT_0062d2ee = in_AX + 0x6f9;
    return in_AX + 0x6f9;
  }
  if (((&DAT_0062d325)[unaff_EBX * 2] & 4) != 0) {
    _DAT_0062d2ee = in_AX + 0x719;
    return in_AX + 0x719;
  }
  if (((&DAT_0062d325)[unaff_EBX * 2] & 8) == 0) {
    return in_AX;
  }
  _DAT_0062d2ee = in_AX + 0x729;
  return in_AX + 0x729;
}

