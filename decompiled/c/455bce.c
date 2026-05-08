
void FUN_00455bce(void)

{
  undefined4 *unaff_ESI;
  undefined1 in_ZF;
  
  FUN_005e5fcb();
  if ((bool)in_ZF) {
    FUN_00455c5b();
    unaff_ESI[0x57] = 0xffffffff;
  }
  *(undefined2 *)(unaff_ESI + 0x59) = 0;
  FUN_005e43de();
  unaff_ESI[7] = PTR_DAT_00632d8c;
  unaff_ESI[3] = DAT_00632db0;
  unaff_ESI[6] = DAT_00632dbc;
  *unaff_ESI = PTR_DAT_00632d98;
  unaff_ESI[1] = PTR_thunk_FUN_0045534a_00632da4;
  unaff_ESI[5] = 0;
  FUN_00455a66();
  FUN_005e412c();
  FUN_00455ade();
  if ((&DAT_00743bbf)[(uint)*(ushort *)(unaff_ESI + 0xc) * 0x100] == '\t') {
    (*(code *)unaff_ESI[1])();
  }
  return;
}

