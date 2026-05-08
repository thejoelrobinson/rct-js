
ushort FUN_00434f74(void)

{
  ushort uVar1;
  
  uVar1 = FUN_0043424f();
  if (uVar1 != 0x8000) {
    uVar1 = uVar1 & 0xffe0;
  }
  return uVar1;
}

