
undefined8 FUN_0042e18b(void)

{
  ushort uVar1;
  uint in_EAX;
  uint in_ECX;
  undefined4 in_EDX;
  undefined4 uVar2;
  undefined4 extraout_EDX;
  uint uVar3;
  
  uVar1 = (&DAT_00991f8e)[(ushort)((ushort)((in_EAX & 0xfe0) << 2) | (ushort)(in_ECX >> 5) & 0x7ff)]
  ;
  uVar2 = in_EDX;
  do {
    while( true ) {
      if (uVar1 == 0xffff) {
        return CONCAT44(in_EDX,in_EAX);
      }
      uVar3 = (uint)uVar1;
      if ((&DAT_00743b9c)[uVar3 * 0x100] == '\b') break;
LAB_0042e1df:
      uVar1 = (&DAT_00743b96)[uVar3 * 0x80];
    }
    uVar1 = (&DAT_00743ba6)[uVar3 * 0x80] - (short)uVar2;
    if ((short)uVar1 < 0) {
      uVar1 = -uVar1;
    }
    if (0x20 < uVar1) goto LAB_0042e1df;
    uVar1 = (&DAT_00743b96)[uVar3 * 0x80];
    FUN_005e5496();
    FUN_00444d1f();
    uVar2 = extraout_EDX;
  } while( true );
}

