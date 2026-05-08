
undefined8 FUN_0043725f(void)

{
  byte bVar1;
  undefined4 in_EAX;
  undefined4 in_EDX;
  byte *unaff_ESI;
  
  bVar1 = *unaff_ESI & 0x3c;
  if (bVar1 == 0) {
    DAT_00991efc = 0x3b7;
  }
  else if (bVar1 == 8) {
    DAT_00971e86._0_2_ = (byte)(&DAT_00887420)[(uint)unaff_ESI[7] * 0x260] + 0x101;
    DAT_00991efc = 0x5a4;
  }
  else if (bVar1 == 0xc) {
    DAT_00971e86._0_2_ = *(short *)(&DAT_006e1ecc + (uint)unaff_ESI[4] * 8);
    DAT_00991efc = 0x5a4;
  }
  else if (bVar1 == 4) {
    DAT_00991efc = 0x4db;
  }
  else if (bVar1 == 0x10) {
    bVar1 = unaff_ESI[4];
    if (bVar1 == 0) {
      DAT_00991efc = 0x3b8;
    }
    else if (bVar1 == 1) {
      DAT_00991efc = 0x3b9;
    }
    else if (bVar1 == 2) {
      DAT_00991efc = 0x3ba;
    }
    else {
      DAT_00991efc = 0x38a;
    }
  }
  else if (bVar1 == 0x18) {
    DAT_00971e86._0_2_ = (*(ushort *)(unaff_ESI + 4) & 0x3ff) + 0x7de;
    DAT_00991efc = 0x5a4;
  }
  else {
    DAT_00991efc = 0x38a;
  }
  return CONCAT44(in_EDX,in_EAX);
}

