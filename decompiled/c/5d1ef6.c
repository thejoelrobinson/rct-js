
void FUN_005d1ef6(void)

{
  undefined1 uVar1;
  undefined4 extraout_ECX;
  undefined4 extraout_ECX_00;
  undefined4 uVar2;
  int unaff_ESI;
  int unaff_EDI;
  undefined1 uVar3;
  bool bVar4;
  undefined6 uVar5;
  
  if (DAT_00652288 == '\x03') {
    FUN_005d21fa();
    uVar1 = DAT_00652291;
    uVar3 = DAT_00652290;
    bVar4 = false;
    FUN_005cfe66();
    if (bVar4) {
      DAT_00652288 = 0;
      FUN_005d13e2();
      return;
    }
    uVar5 = FUN_005cfc50();
    DAT_0065228e = (undefined2)((uint6)uVar5 >> 0x20);
    uVar2 = extraout_ECX_00;
    DAT_00652290 = uVar3;
    if (bVar4) {
      DAT_00652288 = 2;
      DAT_0065228a = (undefined2)uVar5;
      DAT_0065228c = (undefined2)extraout_ECX_00;
      DAT_00652290 = uVar1;
      DAT_00652291 = *(undefined1 *)(unaff_EDI + 4);
      DAT_00652292 = 0;
      DAT_00652293 = 0;
      FUN_005d22f8();
      FUN_005d13e2();
      return;
    }
LAB_005d1f86:
    DAT_0065228e = (undefined2)((uint6)uVar5 >> 0x20);
    DAT_0065228a = (undefined2)((uint6)uVar5 >> 0x10);
    DAT_0065228c = (undefined2)((uint)uVar2 >> 0x10);
    DAT_00652291 = *(undefined1 *)(unaff_EDI + 4);
    DAT_00652292 = 0;
    DAT_00652293 = 0;
    FUN_005d13e2();
    return;
  }
  uVar3 = DAT_00652288 == '\0';
  if (DAT_00652288 == '\x01') {
    FUN_005d21fa();
    DAT_00652470 = DAT_00652289;
    uVar5 = FUN_005cfc49();
    if (!(bool)uVar3) {
      DAT_00652288 = '\x03';
      uVar2 = extraout_ECX;
      unaff_EDI = unaff_ESI;
      DAT_00652290 = 0;
      goto LAB_005d1f86;
    }
  }
  return;
}

