
void FUN_005e3b2b(void)

{
  byte bVar1;
  ushort in_CX;
  short in_DX;
  undefined *puVar2;
  
  puVar2 = &DAT_009a013c;
  bVar1 = (byte)in_CX & 0x7f;
  if ((in_CX >> 7 & 1) == 0) {
    for (; (puVar2 < DAT_009a1164 &&
           ((bVar1 != puVar2[0x174] || (in_DX != *(short *)(puVar2 + 0x30)))));
        puVar2 = puVar2 + 0x178) {
    }
  }
  else {
    for (; (puVar2 < DAT_009a1164 && (bVar1 != puVar2[0x174])); puVar2 = puVar2 + 0x178) {
    }
  }
  return;
}

