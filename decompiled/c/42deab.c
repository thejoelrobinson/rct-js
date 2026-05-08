
undefined8 FUN_0042deab(void)

{
  ushort uVar1;
  undefined4 in_EAX;
  uint uVar2;
  undefined4 in_EDX;
  undefined2 unaff_BX;
  undefined1 *unaff_ESI;
  undefined1 in_ZF;
  
  FUN_00444bd4();
  if (!(bool)in_ZF) {
    *(undefined2 *)(unaff_ESI + 0x2c) = unaff_BX;
    unaff_ESI[0x14] = 8;
    unaff_ESI[9] = 8;
    unaff_ESI[0x15] = 8;
    *unaff_ESI = 2;
    FUN_00444927();
    unaff_ESI[1] = 2;
    uVar2 = FUN_005df40c();
    uVar1 = (ushort)uVar2;
    *(ushort *)(unaff_ESI + 0x26) = (uVar1 & 0xff) * 0xc;
    *(ushort *)(unaff_ESI + 0x24) = (uVar1 & 0x7f) + 0x8c;
    *(ushort *)(unaff_ESI + 0x2e) = (ushort)(((ushort)(uVar2 >> 0x17) & 0xff) * 5) >> 8;
    *(int *)(unaff_ESI + 0x38) = (int)(short)uVar1 << 2;
    *(int *)(unaff_ESI + 0x3c) = ((int)uVar2 >> 0x10) << 2;
    *(uint *)(unaff_ESI + 0x40) = (uVar2 >> 8 & 0xffff) * 4 + 0x10000;
    *(undefined2 *)(unaff_ESI + 0x30) = 0;
    *(undefined2 *)(unaff_ESI + 0x32) = 0;
    *(undefined2 *)(unaff_ESI + 0x34) = 0;
  }
  return CONCAT44(in_EDX,in_EAX);
}

