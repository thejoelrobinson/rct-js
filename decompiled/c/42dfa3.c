
undefined8 FUN_0042dfa3(void)

{
  undefined4 in_EAX;
  undefined4 in_EDX;
  undefined1 *unaff_ESI;
  undefined1 in_ZF;
  
  FUN_00444bd4();
  if (!(bool)in_ZF) {
    unaff_ESI[0x14] = 0x21;
    unaff_ESI[9] = 0x33;
    unaff_ESI[0x15] = 0x10;
    *unaff_ESI = 2;
    FUN_00444927();
    unaff_ESI[1] = 4;
    *(undefined2 *)(unaff_ESI + 0x26) = 0;
  }
  return CONCAT44(in_EDX,in_EAX);
}

