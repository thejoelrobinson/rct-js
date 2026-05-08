
void FUN_004272de(void)

{
  undefined2 *puVar1;
  undefined4 *unaff_ESI;
  bool bVar2;
  
  bVar2 = true;
  FUN_005e5fcb();
  if (bVar2) {
    FUN_0042756b();
    unaff_ESI[0x57] = 0xffffffff;
  }
  if ((((DAT_00991f30 >> 3 & 1) != 0) && (*(char *)(unaff_ESI + 0x5d) == DAT_00991f5a)) &&
     (*(short *)(unaff_ESI + 0xc) == DAT_00991f58)) {
    FUN_005e687d();
  }
  LOCK();
  puVar1 = (undefined2 *)unaff_ESI[2];
  unaff_ESI[2] = 0;
  UNLOCK();
  if (puVar1 != (undefined2 *)0x0) {
    *puVar1 = 0;
  }
  *(undefined2 *)(unaff_ESI + 0x59) = 1;
  FUN_005e43de();
  unaff_ESI[7] = PTR_DAT_005f5088;
  unaff_ESI[3] = DAT_005f50dc;
  unaff_ESI[6] = DAT_005f50f8;
  *unaff_ESI = PTR_DAT_005f50a4;
  unaff_ESI[1] = PTR_LAB_005f50c0;
  unaff_ESI[5] = 0;
  FUN_005e412c();
  return;
}

