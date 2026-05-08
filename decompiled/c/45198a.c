
void FUN_0045198a(void)

{
  ushort uVar1;
  uint in_EDX;
  int iVar2;
  
  iVar2 = (in_EDX & 0xff) * 0x260;
  (&DAT_00887422)[(in_EDX & 0xff) * 0x130] = (&DAT_00887422)[(in_EDX & 0xff) * 0x130] & 0xfeff;
  uVar1 = FUN_005df40c();
  *(ushort *)(&DAT_00887566 + iVar2) =
       *(short *)(&DAT_00887566 + iVar2) +
       (uVar1 & 0xff) *
       (ushort)((byte)(100U - (char)((ushort)*(undefined2 *)(&DAT_00887566 + iVar2) >> 8)) >> 2);
  (&DAT_0088756b)[iVar2] = 0;
  (&DAT_0088751d)[iVar2] = (&DAT_0088751d)[iVar2] | 0x1c;
  return;
}

