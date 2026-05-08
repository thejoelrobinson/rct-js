
void FUN_005e5b80(void)

{
  ushort in_CX;
  ushort uVar1;
  ushort extraout_CX;
  short in_DX;
  undefined *puVar2;
  
  puVar2 = &DAT_009a013c;
  uVar1 = in_CX & 0xff7f;
  if ((in_CX >> 7 & 1) == 0) {
    for (; puVar2 < DAT_009a1164; puVar2 = puVar2 + 0x178) {
      if (((char)uVar1 == puVar2[0x174]) && (in_DX == *(short *)(puVar2 + 0x30))) {
        FUN_005e5bd8();
        return;
      }
    }
  }
  else {
    while (puVar2 < DAT_009a1164) {
      if ((char)uVar1 == puVar2[0x174]) {
        FUN_005e5bd8();
        puVar2 = &DAT_009a013c;
        uVar1 = extraout_CX;
      }
      else {
        puVar2 = puVar2 + 0x178;
      }
    }
  }
  return;
}

