
undefined8 FUN_0042dfd1(void)

{
  undefined4 in_EAX;
  undefined4 in_EDX;
  undefined2 unaff_BX;
  undefined1 *unaff_ESI;
  undefined1 in_ZF;
  
  FUN_00444bd4();
  if (!(bool)in_ZF) {
    unaff_ESI[0x14] = 0xd;
    unaff_ESI[9] = 0x16;
    unaff_ESI[0x15] = 0xb;
    *unaff_ESI = 2;
    FUN_00444927();
    unaff_ESI[1] = 7;
    *(undefined2 *)(unaff_ESI + 0x26) = 0;
    *(undefined2 *)(unaff_ESI + 0x24) = unaff_BX;
  }
  return CONCAT44(in_EDX,in_EAX);
}

