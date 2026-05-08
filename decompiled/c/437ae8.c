
undefined8 FUN_00437ae8(void)

{
  char cVar1;
  undefined4 in_EAX;
  ushort in_CX;
  undefined4 in_EDX;
  char cVar2;
  byte bVar3;
  ushort uVar4;
  uint uVar5;
  byte *pbVar6;
  
  if (((ushort)in_EAX < 0x1000) && (in_CX < 0x1000)) {
    pbVar6 = (byte *)(&DAT_00971ef4)
                     [(ushort)((ushort)((in_CX & 0xfe0) << 7 | (ushort)in_EAX & 0xfe0) >> 5 |
                              ((in_CX & 0xfe0) >> 9) << 0xb)];
    bVar3 = *pbVar6;
    while ((bVar3 & 0x3c) != 0) {
      pbVar6 = pbVar6 + 8;
      bVar3 = *pbVar6;
    }
    uVar4 = CONCAT11(pbVar6[4],pbVar6[2]) & 0x1fff;
    if ((pbVar6[4] & 1) != 0) {
      cVar2 = (char)uVar4;
      cVar1 = (char)(uVar4 >> 8);
      uVar4 = CONCAT11(cVar1,cVar2 + '\x04');
      if (cVar1 == '\x1b') {
        uVar4 = (ushort)(byte)(cVar2 + 8);
      }
    }
    bVar3 = (byte)uVar4 - (byte)in_EDX;
    if (bVar3 != 0) {
      if ((byte)uVar4 < (byte)in_EDX) {
        bVar3 = -bVar3;
      }
      if (DAT_00628ae7 < bVar3) {
        uVar5 = (uint)DAT_00628ae6;
        FUN_00426f56();
        if (uVar5 != 0x80000000) {
          DAT_00628ae2 = DAT_00628ae2 + uVar5;
        }
      }
    }
  }
  return CONCAT44(in_EDX,in_EAX);
}

