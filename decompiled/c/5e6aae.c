
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_005e6aae(void)

{
  short in_AX;
  short in_CX;
  short in_DX;
  short unaff_BX;
  ushort uVar1;
  short sVar2;
  int *unaff_EDI;
  
  _DAT_009a012c = *unaff_EDI;
  _DAT_009a013a = 0;
  DAT_009a0138 = (short)unaff_EDI[3];
  DAT_009a0130 = (short)unaff_EDI[1];
  DAT_009a0132 = *(short *)((int)unaff_EDI + 6);
  DAT_009a0134 = (short)unaff_EDI[2];
  DAT_009a0136 = *(short *)((int)unaff_EDI + 10);
  if (DAT_009a0130 < in_AX) {
    uVar1 = in_AX - DAT_009a0130;
    DAT_009a0134 = DAT_009a0134 - uVar1;
    DAT_009a0138 = DAT_009a0138 + uVar1;
    _DAT_009a012c = _DAT_009a012c + (uint)uVar1;
    DAT_009a0130 = in_AX;
  }
  sVar2 = (DAT_009a0130 + DAT_009a0134) - (unaff_BX + in_AX);
  if (sVar2 != 0 && (short)(unaff_BX + in_AX) <= (short)(DAT_009a0130 + DAT_009a0134)) {
    DAT_009a0134 = DAT_009a0134 - sVar2;
    DAT_009a0138 = DAT_009a0138 + sVar2;
  }
  if (DAT_009a0132 < in_CX) {
    DAT_009a0136 = DAT_009a0136 - (in_CX - DAT_009a0132);
    _DAT_009a012c =
         _DAT_009a012c +
         (uint)(ushort)(DAT_009a0138 + DAT_009a0134) * (uint)(ushort)(in_CX - DAT_009a0132);
    DAT_009a0132 = in_CX;
  }
  sVar2 = (DAT_009a0132 + DAT_009a0136) - (in_DX + in_CX);
  if (sVar2 != 0 && (short)(in_DX + in_CX) <= (short)(DAT_009a0132 + DAT_009a0136)) {
    DAT_009a0136 = DAT_009a0136 - sVar2;
  }
  if ((0 < DAT_009a0134) && (0 < DAT_009a0136)) {
    DAT_009a0130 = DAT_009a0130 - in_AX;
    DAT_009a0132 = DAT_009a0132 - in_CX;
    return;
  }
  return;
}

