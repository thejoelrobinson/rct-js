
void FUN_005e40c4(void)

{
  int iVar1;
  short extraout_CX;
  short extraout_DX;
  int iVar2;
  short sVar3;
  int unaff_ESI;
  char *pcVar4;
  
  iVar1 = 0;
  iVar2 = 0;
  for (pcVar4 = *(char **)(unaff_ESI + 0x1c); *pcVar4 != '\x15'; pcVar4 = pcVar4 + 0x10) {
    if (*pcVar4 == '\x11') {
      (**(code **)(unaff_ESI + 4))(pcVar4,iVar2,iVar1);
      sVar3 = 0;
      if (((*(uint *)(pcVar4 + 10) & 1) != 0) &&
         (extraout_CX != *(short *)(iVar2 + 0x38 + unaff_ESI))) {
        sVar3 = 1;
        *(short *)(iVar2 + 0x38 + unaff_ESI) = extraout_CX;
      }
      if (((*(uint *)(pcVar4 + 10) & 2) != 0) &&
         (extraout_DX != *(short *)(iVar2 + 0x40 + unaff_ESI))) {
        sVar3 = sVar3 + 1;
        *(short *)(iVar2 + 0x40 + unaff_ESI) = extraout_DX;
      }
      if (sVar3 != 0) {
        FUN_005e4198();
        iVar1 = FUN_005e43de();
      }
      iVar1 = iVar1 + 1;
      iVar2 = iVar2 + 0x12;
    }
  }
  return;
}

