
void FUN_004340f5(void)

{
  int iVar1;
  short sVar2;
  undefined2 uVar3;
  short extraout_CX;
  int unaff_ESI;
  
  iVar1 = *(int *)(unaff_ESI + 8);
  if (iVar1 != 0) {
    sVar2 = FUN_0043424f();
    if (sVar2 == -0x8000) {
      sVar2 = (*(short *)(iVar1 + 0xe) >> 1) + *(short *)(iVar1 + 10);
      FUN_00434a94();
    }
    else {
      FUN_00423677();
      sVar2 = extraout_CX;
    }
    DAT_00991f88 = DAT_00991f88 + 1;
    DAT_00991f88 = DAT_00991f88 & 3;
    uVar3 = FUN_005e4355();
    *(undefined2 *)(unaff_ESI + 0x170) = uVar3;
    *(short *)(unaff_ESI + 0x172) = sVar2;
    *(undefined2 *)(iVar1 + 8) = uVar3;
    *(short *)(iVar1 + 10) = sVar2;
    FUN_005e43de();
    FUN_00434231();
    FUN_004448fb();
  }
  return;
}

