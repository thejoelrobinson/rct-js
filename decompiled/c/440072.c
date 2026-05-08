
void FUN_00440072(void)

{
  int in_EDX;
  undefined4 *unaff_ESI;
  bool bVar1;
  
  bVar1 = *(char *)(in_EDX + 0x2e) == '\x01';
  if (!bVar1) {
    FUN_005e5fcb();
    if (bVar1) {
      FUN_004400eb();
      unaff_ESI[0x57] = 0xffffffff;
    }
    *(undefined2 *)(unaff_ESI + 0x59) = 0;
    FUN_005e43de();
    unaff_ESI[7] = PTR_DAT_00629138;
    unaff_ESI[3] = DAT_00629180;
    unaff_ESI[6] = DAT_00629198;
    *unaff_ESI = PTR_DAT_00629150;
    unaff_ESI[1] = PTR_LAB_00629168;
    unaff_ESI[5] = 0;
    FUN_0043fe80();
    FUN_005e412c();
    FUN_0043fecb();
    return;
  }
  FUN_005e5fcb();
  if (bVar1) {
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

