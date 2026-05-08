
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0042ca0e(void)

{
  ushort uVar1;
  undefined4 uVar2;
  short sVar3;
  uint unaff_EBX;
  
  FUN_004046fc();
  if (DAT_005f1394 == DAT_0099a504) {
    if ((DAT_005f1ca4 == DAT_0099a502) || ((short)(DAT_005f1ca4 + -1) == DAT_0099a502))
    goto LAB_0042ca6f;
  }
  else {
    sVar3 = DAT_005f1394 + -1;
    if (sVar3 == 0) {
      sVar3 = 0xc;
    }
    if ((sVar3 == DAT_0099a504) && (DAT_005f1ca4 == 1)) goto LAB_0042ca6f;
  }
  DAT_0087c3b4 = DAT_0087c3b4 + -10000;
  if (-1 < DAT_0087c3b4) {
    DAT_0087c3b4 = -DAT_0087c3b4;
  }
LAB_0042ca6f:
  DAT_0099a502 = DAT_005f1ca4;
  DAT_0099a504 = DAT_005f1394;
  if (DAT_008d7eb8 != '\0') {
    uVar2 = FUN_005e5301();
    DAT_008d7ebe = DAT_008d7ebe + 1;
    if ((DAT_008d7ebe == 1) && ((_DAT_0099a500 & 1) == 0)) {
      FUN_00452fce(unaff_EBX & 0xffff0000,uVar2);
    }
    uVar1 = 0x180;
    if ((((DAT_008d7fc4 != '\0') && (uVar1 = 0x140, DAT_008d80d0 != '\0')) && (DAT_008d81dc != '\0')
        ) && ((uVar1 = 0x120, DAT_008d82e8 != '\0' && (DAT_008d83f4 != '\0')))) {
      uVar1 = 0x100;
    }
    if (DAT_008d7ebe < uVar1) {
      return;
    }
    FUN_0042cb29();
  }
  return;
}

