
undefined8 FUN_00431636(void)

{
  undefined4 in_EAX;
  undefined4 in_EDX;
  short unaff_BX;
  short unaff_BP;
  short *unaff_ESI;
  short sVar1;
  
  if ((((unaff_ESI[2] < (short)in_EDX) && (unaff_ESI[3] < unaff_BP)) &&
      ((short)in_EAX < (short)(unaff_ESI[2] + *unaff_ESI))) &&
     (sVar1 = unaff_ESI[3] + unaff_ESI[1], unaff_BX < sVar1)) {
    if (unaff_BX < unaff_ESI[3]) {
      unaff_BX = unaff_ESI[3];
    }
    if (sVar1 < unaff_BP) {
      unaff_BP = sVar1;
    }
    if (0x180 < (ushort)(((unaff_BP - unaff_ESI[3] << (*(byte *)(unaff_ESI + 8) & 0x1f)) +
                         unaff_ESI[5]) -
                        ((unaff_BX - unaff_ESI[3] << (*(byte *)(unaff_ESI + 8) & 0x1f)) +
                        unaff_ESI[5]))) {
      FUN_004316f3();
    }
    FUN_004316f3();
    return CONCAT44(in_EDX,in_EAX);
  }
  return CONCAT44(in_EDX,in_EAX);
}

