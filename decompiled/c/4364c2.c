
void FUN_004364c2(void)

{
  short in_AX;
  short in_CX;
  short in_DX;
  uint uVar1;
  short *psVar2;
  
  uVar1 = (uint)DAT_008ae938;
  psVar2 = &DAT_008ad1c8;
  if (uVar1 != 0) {
    if (999 < uVar1) {
      return;
    }
    do {
      if (((in_AX == psVar2[1]) && (in_CX == psVar2[2])) && (in_DX == *psVar2)) {
        return;
      }
      psVar2 = psVar2 + 3;
      uVar1 = uVar1 - 1;
    } while (uVar1 != 0);
  }
  DAT_008ae938 = DAT_008ae938 + 1;
  psVar2[1] = in_AX;
  psVar2[2] = in_CX;
  *psVar2 = in_DX;
  return;
}

