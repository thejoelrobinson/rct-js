
void FUN_009bc184(void)

{
  uint uVar1;
  int iVar2;
  ushort uVar3;
  uint *puVar4;
  
  if (DAT_00971ef0 != '\0') {
    if (DAT_00991f64 != -1) {
      FUN_005e117d();
    }
    iVar2 = DAT_0099fb7c;
    puVar4 = &DAT_009aa27c;
    if (DAT_009b227c == 0) {
      return;
    }
    do {
      uVar1 = *puVar4;
      puVar4 = puVar4 + 1;
      *(char *)((uVar1 >> 8) + iVar2) = (char)uVar1;
      uVar3 = (short)DAT_009b227c - 1;
      DAT_009b227c = (uint)uVar3;
    } while (uVar3 != 0);
    DAT_005e9154 = 1;
  }
  DAT_009b227c = 0;
  return;
}

