
undefined8 FUN_0042e1eb(void)

{
  uint in_EAX;
  undefined4 in_ECX;
  undefined4 extraout_ECX;
  undefined4 in_EDX;
  ushort uVar1;
  uint uVar2;
  undefined8 uVar3;
  
  uVar3 = CONCAT44(in_EDX,in_EAX);
  uVar1 = (&DAT_00991f8e)[(ushort)((ushort)((in_EAX & 0xfe0) << 2) | (ushort)in_ECX >> 5)];
  do {
    while( true ) {
      if (uVar1 == 0xffff) {
        return CONCAT44(in_EDX,in_EAX);
      }
      uVar2 = (uint)uVar1;
      if ((&DAT_00743b9c)[uVar2 * 0x100] == '\b') break;
LAB_0042e26a:
      uVar1 = (&DAT_00743b96)[uVar2 * 0x80];
    }
    uVar1 = (&DAT_00743ba6)[uVar2 * 0x80] - (short)((ulonglong)uVar3 >> 0x20);
    if ((short)uVar1 < 0) {
      uVar1 = -uVar1;
    }
    if (0x10 < uVar1) goto LAB_0042e26a;
    uVar1 = (&DAT_00743ba2)[uVar2 * 0x80] - (short)uVar3;
    if ((short)uVar1 < 0) {
      uVar1 = -uVar1;
    }
    if (8 < uVar1) goto LAB_0042e26a;
    uVar1 = (&DAT_00743ba4)[uVar2 * 0x80] - (short)in_ECX;
    if ((short)uVar1 < 0) {
      uVar1 = -uVar1;
    }
    if (8 < uVar1) goto LAB_0042e26a;
    uVar1 = (&DAT_00743b96)[uVar2 * 0x80];
    FUN_005e5496();
    uVar3 = FUN_00444d1f();
    in_ECX = extraout_ECX;
  } while( true );
}

