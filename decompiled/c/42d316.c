
int FUN_0042d316(void)

{
  int iVar1;
  short in_CX;
  short in_DX;
  byte *pbVar2;
  
  pbVar2 = &DAT_008d8a3c;
  iVar1 = 0;
  while( true ) {
    if (*pbVar2 == 0) {
      return -1;
    }
    if (in_DX < 0x2a) break;
    pbVar2 = pbVar2 + 0x10c;
    iVar1 = iVar1 + 1;
    in_DX = in_DX + -0x2a;
    if (&DAT_008dbe94 <= pbVar2) {
      return -1;
    }
  }
  if ((((pbVar2[1] & 1) == 0) && (0xd < in_DX)) && (in_DX < 0x26)) {
    if ((in_CX < 0x148) || (0x15f < in_CX)) {
      if ((0x15f < in_CX) && ((in_CX < 0x178 && (((&DAT_005f5540)[*pbVar2] & 1) != 0)))) {
        return iVar1;
      }
    }
    else if (((&DAT_005f5540)[*pbVar2] & 2) != 0) {
      return iVar1;
    }
  }
  return iVar1;
}

