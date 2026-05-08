
void FUN_005d22f8(void)

{
  byte *unaff_ESI;
  int iVar1;
  bool bVar2;
  
  DAT_00652260 = 0x80000000;
  bVar2 = DAT_00652288 == '\0';
  if (DAT_00652288 == '\x01') {
    DAT_00652470 = DAT_00652289;
    FUN_005cfc49();
    if ((bVar2) ||
       ((*(uint *)(&DAT_005f5b78 + (uint)(byte)(&DAT_00887420)[(uint)DAT_00652289 * 0x260] * 8) &
        0x8000) != 0)) goto LAB_005d2424;
    iVar1 = (uint)unaff_ESI[4] * 8;
    DAT_00652294 = (&DAT_006545b0)[iVar1];
    DAT_00652299 = (&DAT_006545b4)[iVar1];
    DAT_0065229a = (&DAT_006545b2)[iVar1];
  }
  else {
    if (DAT_00652288 != '\x02') {
      return;
    }
    DAT_00652470 = DAT_00652289;
    bVar2 = false;
    FUN_005cfac0();
    if (bVar2) {
LAB_005d2424:
      if (((*(uint *)(&DAT_005f5b78 + (uint)(byte)(&DAT_00887420)[(uint)DAT_00652289 * 0x260] * 8) &
           0x8000) != 0) && ((&DAT_00887497)[(uint)DAT_00652289 * 0x260] != '\0')) {
        DAT_00652294 = 0xff;
        DAT_00652288 = 0;
        return;
      }
      DAT_00652294 = (&DAT_005f598e)[(uint)(byte)(&DAT_00887420)[(uint)DAT_00652289 * 0x260] * 4] +
                     '\x10';
      DAT_00652295 = 0;
      DAT_00652296 = 0;
      DAT_00652297 = 0;
      DAT_00652298 = 0;
      DAT_0065229a = 0;
      DAT_00652299 = 0;
      return;
    }
    iVar1 = (uint)unaff_ESI[4] * 8;
    DAT_00652294 = (&DAT_006545b1)[iVar1];
    DAT_00652299 = (&DAT_006545b5)[iVar1];
    DAT_0065229a = (&DAT_006545b3)[iVar1];
  }
  DAT_00652297 = 0;
  if (((*unaff_ESI & 0x80) != 0) &&
     ((DAT_00652288 == '\x02' || ((DAT_0065229a != '\x06' && (DAT_0065229a != '\b')))))) {
    DAT_00652297 = 1;
  }
  DAT_00652295 = DAT_0065229a;
  DAT_00652296 = DAT_00652299;
  return;
}

