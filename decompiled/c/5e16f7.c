
void FUN_005e16f7(void)

{
  int iVar1;
  short sVar2;
  short sVar3;
  int unaff_ESI;
  char cVar4;
  
  (**(code **)(unaff_ESI + 4))();
  iVar1 = *(int *)(unaff_ESI + 8);
  if (iVar1 != 0) {
    if (*(short *)(unaff_ESI + 0x16e) == -1) {
      sVar3 = (*(ushort *)(iVar1 + 0xe) >> 1) + *(short *)(unaff_ESI + 0x172);
      sVar2 = FUN_00434a94();
      cVar4 = (short)(sVar2 + 0x100) < 0;
      if ((bool)cVar4) {
        sVar2 = -0x100;
      }
      if ((short)(sVar3 + 0x100) < 0) {
        sVar3 = -0x100;
        cVar4 = cVar4 + '\x01';
      }
      if (0x10fe < sVar2) {
        cVar4 = cVar4 + '\x01';
      }
      if (0x10fe < sVar3) {
        cVar4 = cVar4 + '\x01';
      }
      if (cVar4 != '\0') {
        FUN_00423677();
                    /* WARNING: Could not recover jumptable at 0x005e17ae. Too many branches */
                    /* WARNING: Treating indirect jump as call */
        (*(code *)(&PTR_LAB_005e17b8)[DAT_00991f88])();
        return;
      }
      if ((*(ushort *)(unaff_ESI + 0x32) & 8) != 0) {
        sVar2 = *(short *)(unaff_ESI + 0x170) - *(short *)(iVar1 + 8);
        if (sVar2 < 0) {
          sVar2 = -sVar2;
        }
        sVar3 = *(short *)(unaff_ESI + 0x172) - *(short *)(iVar1 + 10);
        if (sVar3 < 0) {
          sVar3 = -sVar3;
        }
        if ((ushort)(sVar2 + 7U | sVar3 + 7U) >> 3 == 0) {
          *(ushort *)(unaff_ESI + 0x32) = *(ushort *)(unaff_ESI + 0x32) & 0xfff7;
        }
      }
    }
    else {
      FUN_005e4355();
    }
    FUN_005e19eb();
  }
  return;
}

