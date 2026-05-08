
void FUN_00439219(void)

{
  byte *pbVar1;
  ushort uVar2;
  byte bVar3;
  int unaff_ESI;
  byte *pbVar4;
  
  *(char *)(unaff_ESI + 0xc4) = *(char *)(unaff_ESI + 0xc4) + '\x01';
  if (((byte)*(undefined2 *)(unaff_ESI + 10) & 0xf) != (*(byte *)(unaff_ESI + 0xc4) & 0xf)) {
    return;
  }
  uVar2 = *(ushort *)(unaff_ESI + 0x26) << 7 | *(ushort *)(unaff_ESI + 0x26) >> 9 |
          *(ushort *)(unaff_ESI + 0x24);
  bVar3 = 0;
  pbVar4 = (byte *)(&DAT_00971ef4)[(ushort)(uVar2 >> 5 | uVar2 << 0xb)];
  if ((*(byte *)(unaff_ESI + 0x29) & 0x18) == 0) {
    bVar3 = 4;
  }
  while (((*pbVar4 & 0x3c) != bVar3 || (*(byte *)(unaff_ESI + 0x28) != pbVar4[2]))) {
    pbVar1 = pbVar4 + 1;
    pbVar4 = pbVar4 + 8;
    if ((*pbVar1 & 0x80) != 0) {
      FUN_0044142c();
      *(undefined1 *)(unaff_ESI + 0x2b) = 0;
      FUN_00441452();
      return;
    }
  }
  return;
}

