
void FUN_004572b0(void)

{
  ushort in_AX;
  ushort uVar1;
  ushort extraout_CX;
  ushort extraout_CX_00;
  bool bVar2;
  
  DAT_00632f08 = 0;
  bVar2 = in_AX < 0x20;
  FUN_00457259();
  if (!bVar2) {
    DAT_00632f08 = DAT_00632f08 | 1;
  }
  bVar2 = 0xffdf < extraout_CX;
  uVar1 = FUN_00457259();
  if (!bVar2) {
    DAT_00632f08 = DAT_00632f08 | 2;
  }
  bVar2 = 0xffdf < uVar1;
  FUN_00457259();
  if (!bVar2) {
    DAT_00632f08 = DAT_00632f08 | 4;
  }
  bVar2 = extraout_CX_00 < 0x20;
  FUN_00457259();
  if (!bVar2) {
    DAT_00632f08 = DAT_00632f08 | 8;
  }
  if (DAT_00632f08 == 0) {
    DAT_00632f08 = 0xf;
  }
  return;
}

