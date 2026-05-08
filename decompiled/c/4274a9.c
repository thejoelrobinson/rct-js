
void FUN_004274a9(void)

{
  undefined2 *puVar1;
  ushort uVar2;
  undefined4 *unaff_ESI;
  bool bVar3;
  
  bVar3 = true;
  FUN_005e5fcb();
  if (bVar3) {
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
  *(undefined2 *)(unaff_ESI + 0x59) = 5;
  FUN_005e43de();
  unaff_ESI[7] = PTR_DAT_005f5098;
  unaff_ESI[3] = DAT_005f50ec;
  unaff_ESI[6] = DAT_005f5108;
  *unaff_ESI = PTR_LAB_005f50b4;
  unaff_ESI[1] = PTR_LAB_005f50d0;
  unaff_ESI[5] = 0;
  FUN_005e412c();
  uVar2 = DAT_00971edc >> 1;
  *(ushort *)(unaff_ESI + 8) = (DAT_00971eda >> 1) - 0x73;
  *(ushort *)((int)unaff_ESI + 0x22) = uVar2 - 0x5b;
  FUN_005e43de();
  return;
}

