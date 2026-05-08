
void FUN_00423677(void)

{
  byte bVar1;
  ushort in_AX;
  ushort in_CX;
  byte *pbVar2;
  
  if ((in_AX < 0x1000) && (in_CX < 0x1000)) {
    pbVar2 = (byte *)(&DAT_00971ef4)
                     [(ushort)((ushort)((in_CX & 0xffe0) << 7 | in_CX >> 9 | in_AX & 0xffe0) >> 5 |
                              (in_CX >> 9) << 0xb)];
    bVar1 = *pbVar2;
    while ((bVar1 & 0x3c) != 0) {
      pbVar2 = pbVar2 + 8;
      bVar1 = *pbVar2;
    }
    (*(code *)(&PTR_LAB_004236e0)[pbVar2[4] & 0xf])();
    return;
  }
  return;
}

