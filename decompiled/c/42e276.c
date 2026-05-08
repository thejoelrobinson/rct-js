
undefined8 FUN_0042e276(void)

{
  undefined4 in_EAX;
  undefined4 in_EDX;
  undefined2 unaff_BX;
  undefined2 unaff_BP;
  undefined1 *unaff_ESI;
  undefined1 in_ZF;
  
  FUN_00444bd4();
  if (!(bool)in_ZF) {
    *(undefined2 *)(unaff_ESI + 0x46) = unaff_BP;
    *(undefined2 *)(unaff_ESI + 0x2e) = unaff_BX;
    unaff_ESI[0x1e] = (char)unaff_BX << 3;
    unaff_ESI[0x14] = 0x21;
    unaff_ESI[9] = 0x24;
    unaff_ESI[0x15] = 0xc;
    *unaff_ESI = 2;
    FUN_00444927();
    unaff_ESI[1] = 6;
    *(undefined2 *)(unaff_ESI + 0x26) = 0;
  }
  return CONCAT44(in_EDX,in_EAX);
}

