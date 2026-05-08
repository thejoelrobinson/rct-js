
undefined8 FUN_005d33da(void)

{
  undefined4 uVar1;
  undefined4 uVar2;
  undefined4 in_EDX;
  byte bVar3;
  undefined1 *unaff_ESI;
  undefined1 in_CF;
  bool bVar4;
  undefined1 in_ZF;
  undefined1 *puStack_18;
  undefined4 uStack_4;
  
  uStack_4 = in_EDX;
  uVar1 = FUN_005e3b2b();
  puStack_18 = (undefined1 *)&uStack_4;
  if (((!(bool)in_ZF) && (in_CF = 0, DAT_00652288 != '\0')) &&
     (in_CF = DAT_00652289 < (byte)unaff_ESI[7], DAT_00652289 == unaff_ESI[7])) {
    FUN_005d21fa();
  }
  while( true ) {
    puStack_18 = unaff_ESI;
    uVar2 = FUN_005cfc50();
    if ((bool)in_CF) break;
    in_CF = (undefined1 *)0xfffffff3 < &puStack_18;
    uVar1 = uVar2;
  }
  bVar3 = 0;
  do {
    if (((&DAT_006559d8)[(uint)(byte)puStack_18[4] * 0x10] & 0x10) == 0) {
      if (bVar3 != 0) {
        if (bVar3 < 2) goto LAB_005d3452;
        bVar3 = 0;
      }
    }
    else {
      bVar3 = bVar3 + 1;
    }
    bVar4 = false;
    uVar1 = FUN_005cfac7();
  } while (!bVar4);
  if ((bVar3 == 0) || (1 < bVar3)) {
    return CONCAT44(uStack_4,uVar1);
  }
LAB_005d3452:
  return CONCAT44(uStack_4,uVar1);
}

