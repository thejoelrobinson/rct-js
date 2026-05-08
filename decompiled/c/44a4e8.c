
void FUN_0044a4e8(void)

{
  undefined4 *unaff_ESI;
  undefined1 in_ZF;
  
  FUN_005e5fcb();
  if ((bool)in_ZF) {
    FUN_0044b9db();
    unaff_ESI[0x57] = 0xffffffff;
  }
  *(undefined2 *)(unaff_ESI + 0x59) = 0;
  *(undefined2 *)(unaff_ESI + 9) = 0x100;
  *(undefined2 *)((int)unaff_ESI + 0x26) = 0xc6;
  FUN_005e43de();
  unaff_ESI[7] = PTR_DAT_00631bcc;
  unaff_ESI[3] = PTR_DAT_00631c2c;
  unaff_ESI[6] = DAT_00631c4c;
  *unaff_ESI = PTR_DAT_00631bec;
  unaff_ESI[1] = PTR_LAB_00631c0c;
  unaff_ESI[5] = 0;
  FUN_0044ba3c();
  FUN_005e412c();
  *(undefined2 *)((int)unaff_ESI + 0x15a) = 0;
  FUN_0044c464();
  return;
}

