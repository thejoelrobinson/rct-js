
void FUN_005d1dd4(void)

{
  undefined1 uVar1;
  undefined2 uVar2;
  undefined2 extraout_CX;
  undefined2 extraout_CX_00;
  undefined2 extraout_DX;
  undefined2 extraout_DX_00;
  byte *unaff_ESI;
  byte *unaff_EDI;
  bool bVar3;
  
  if (DAT_00652288 == '\x03') {
    FUN_005d21fa();
    uVar1 = DAT_00652291;
    bVar3 = false;
    FUN_005cfe66();
    if (bVar3) {
      DAT_00652288 = 0;
      FUN_005d13e2();
      return;
    }
    uVar2 = FUN_005cfac7();
    DAT_0065228c = extraout_CX_00;
    DAT_0065228e = extraout_DX_00;
    if (bVar3) {
      DAT_00652288 = 1;
      DAT_00652290 = uVar1;
      DAT_00652291 = unaff_EDI[4];
      DAT_00652292 = 0;
      DAT_00652293 = 0;
      DAT_0065228a = uVar2;
      FUN_005d22f8();
      FUN_005d13e2();
      return;
    }
LAB_005d1e67:
    DAT_00652290 = *unaff_EDI & 3;
    DAT_00652291 = unaff_EDI[4];
    DAT_00652292 = 0;
    DAT_00652293 = 0;
    DAT_0065228a = uVar2;
    FUN_005d13e2();
    return;
  }
  if (DAT_00652288 == '\x02') {
    FUN_005d21fa();
    DAT_00652470 = DAT_00652289;
    bVar3 = false;
    uVar2 = FUN_005cfac0();
    if (!bVar3) {
      DAT_00652288 = '\x03';
      DAT_0065228c = extraout_CX;
      DAT_0065228e = extraout_DX;
      unaff_EDI = unaff_ESI;
      goto LAB_005d1e67;
    }
  }
  return;
}

