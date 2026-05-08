
void FUN_005ded48(void)

{
  ushort uVar1;
  ushort extraout_CX;
  ushort uVar2;
  short *psVar3;
  short sVar4;
  int unaff_ESI;
  
  (**(code **)(unaff_ESI + 4))();
  sVar4 = 0;
  for (psVar3 = (short *)(&PTR_DAT_006e2788)[DAT_006e1eaa]; *psVar3 != -1; psVar3 = psVar3 + 1) {
    if (*psVar3 == (&DAT_006e1eab)[DAT_006e1eaa]) goto LAB_005ded7f;
    sVar4 = sVar4 + 1;
  }
  sVar4 = 0;
LAB_005ded7f:
  uVar1 = (DAT_006e1e44 - DAT_006e1e42) - 1;
  uVar2 = extraout_CX - uVar1;
  if (extraout_CX < uVar1) {
    uVar2 = 0;
  }
  uVar1 = sVar4 * 0x42;
  if (uVar2 < (ushort)(sVar4 * 0x42)) {
    uVar1 = uVar2;
  }
  *(ushort *)(unaff_ESI + 0x36) = uVar1;
  FUN_005e4198();
  return;
}

