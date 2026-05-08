
undefined8 FUN_0044149a(void)

{
  ushort uVar1;
  uint in_EAX;
  uint in_ECX;
  undefined4 in_EDX;
  uint uVar2;
  int iVar3;
  
  uVar1 = (&DAT_00991f8e)[(ushort)((ushort)((in_EAX & 0xfe0) << 2) | (ushort)(in_ECX >> 5) & 0x7ff)]
  ;
  while (uVar1 != 0xffff) {
    uVar2 = (uint)uVar1;
    iVar3 = uVar2 * 0x100;
    if ((((&DAT_00743b9c)[iVar3] == '\x04') && ((&DAT_00743bbf)[iVar3] == '\b')) &&
       ((short)in_EDX == (&DAT_00743ba6)[uVar2 * 0x80])) {
      FUN_0044142c();
      (&DAT_00743bbf)[iVar3] = 5;
      FUN_00441452();
      uVar1 = (&DAT_00743ba4)[uVar2 * 0x80];
      *(ushort *)(&DAT_00743bc6 + iVar3) = ((&DAT_00743ba2)[uVar2 * 0x80] & 0xffe0) + 0x10;
      *(ushort *)(&DAT_00743bc8 + iVar3) = (uVar1 & 0xffe0) + 0x10;
      (&DAT_00743bca)[iVar3] = 5;
      FUN_0043c60b();
    }
    uVar1 = (&DAT_00743b96)[uVar2 * 0x80];
  }
  return CONCAT44(in_EDX,in_EAX);
}

