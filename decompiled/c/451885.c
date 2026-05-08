
void FUN_00451885(void)

{
  ushort uVar1;
  ushort in_AX;
  int iVar2;
  uint in_EDX;
  uint uVar3;
  int iVar4;
  
  uVar3 = in_EDX & 0xff;
  iVar4 = uVar3 * 0x260;
  (&DAT_00887422)[uVar3 * 0x130] = (&DAT_00887422)[uVar3 * 0x130] & 0xfe3f;
  (&DAT_0088751d)[iVar4] = (&DAT_0088751d)[iVar4] | 0x1c;
  if (((&DAT_00887422)[uVar3 * 0x130] & 1) != 0) {
    iVar2 = 0;
    do {
      uVar1 = *(ushort *)(&DAT_0088747e + iVar2 * 2 + iVar4);
      do {
        *(ushort *)(&DAT_00743bdc + (uint)uVar1 * 0x100) =
             *(ushort *)(&DAT_00743bdc + (uint)uVar1 * 0x100) & 0xfc7f;
        uVar1 = *(ushort *)(&DAT_00743bd2 + (uint)uVar1 * 0x100);
      } while (uVar1 != 0xffff);
      iVar2 = iVar2 + 1;
    } while ((byte)iVar2 < (byte)(&DAT_00887498)[iVar4]);
  }
  *(ushort *)(&DAT_00887566 + iVar4) =
       *(short *)(&DAT_00887566 + iVar4) +
       (in_AX & 0xff) *
       (ushort)((byte)(100U - (char)((ushort)*(undefined2 *)(&DAT_00887566 + iVar4) >> 8)) >> 1);
  return;
}

