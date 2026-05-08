
undefined8 FUN_0042de29(void)

{
  undefined4 in_EAX;
  ushort extraout_CX;
  undefined4 in_EDX;
  undefined4 unaff_EBX;
  undefined1 *unaff_ESI;
  undefined1 in_ZF;
  
  FUN_00444bd4();
  if (!(bool)in_ZF) {
    *(undefined4 *)(unaff_ESI + 0x28) = unaff_EBX;
    unaff_ESI[0x14] = 0x40;
    unaff_ESI[9] = 0x14;
    unaff_ESI[0x15] = 0x1e;
    *unaff_ESI = 2;
    FUN_00444927();
    unaff_ESI[1] = 1;
    *(undefined2 *)(unaff_ESI + 0x26) = 0;
    *(undefined2 *)(unaff_ESI + 0x24) = 0;
    DAT_00971e86 = *(int *)(unaff_ESI + 0x28);
    if (DAT_00971e86 < 0) {
      DAT_00971e86 = -DAT_00971e86;
    }
    FUN_00458bcf();
    DAT_00971e84 = 0xe0;
    FUN_00458a7c();
    *(ushort *)(unaff_ESI + 0x44) = -(extraout_CX >> 1);
    *(undefined2 *)(unaff_ESI + 0x46) = 0;
  }
  return CONCAT44(in_EDX,in_EAX);
}

