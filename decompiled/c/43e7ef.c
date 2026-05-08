
undefined8 FUN_0043e7ef(void)

{
  undefined4 in_EAX;
  undefined4 in_EDX;
  ushort uVar1;
  int iVar2;
  
  for (uVar1 = DAT_0087c398; uVar1 != 0xffff; uVar1 = (&DAT_00743b98)[(uint)uVar1 * 0x80]) {
    iVar2 = (uint)uVar1 * 0x100;
    if (((&DAT_00743bbf)[iVar2] == '\x06') && ((char)in_EDX == (&DAT_00743bfc)[iVar2])) {
      FUN_0043e792();
      FUN_0044142c();
      (&DAT_00743bbf)[iVar2] = 0;
      FUN_00441452();
    }
  }
  return CONCAT44(in_EDX,in_EAX);
}

