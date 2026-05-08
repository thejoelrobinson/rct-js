
undefined8 FUN_00450124(void)

{
  undefined4 in_EAX;
  undefined4 in_EDX;
  uint extraout_EDX;
  int iVar1;
  uint uVar2;
  
  FUN_00450b21();
  uVar2 = extraout_EDX & 0xff;
  (&DAT_00887510)[uVar2 * 0x130] = 0xffff;
  (&DAT_00887422)[uVar2 * 0x130] = (&DAT_00887422)[uVar2 * 0x130] & 0xfff9;
  if (((&DAT_00887422)[uVar2 * 0x130] & 1) != 0) {
    for (iVar1 = 0; (byte)iVar1 < (byte)(&DAT_00887498)[uVar2 * 0x260]; iVar1 = iVar1 + 1) {
      if (*(ushort *)(&DAT_0088747e + iVar1 * 2 + uVar2 * 0x260) != 0xffff) {
        *(ushort *)
         (&DAT_00743bdc + (uint)*(ushort *)(&DAT_0088747e + iVar1 * 2 + uVar2 * 0x260) * 0x100) =
             *(ushort *)
              (&DAT_00743bdc + (uint)*(ushort *)(&DAT_0088747e + iVar1 * 2 + uVar2 * 0x260) * 0x100)
             & 0xffdf;
      }
    }
  }
  FUN_005e5301();
  return CONCAT44(in_EDX,in_EAX);
}

