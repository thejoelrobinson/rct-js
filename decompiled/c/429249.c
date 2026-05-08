
void FUN_00429249(void)

{
  byte bVar1;
  short sVar2;
  ushort uVar3;
  ushort uVar4;
  byte *pbVar5;
  
  sVar2 = 0;
  uVar3 = 0;
  do {
    uVar4 = 0;
    do {
      pbVar5 = (byte *)(&DAT_00971ef4)
                       [(ushort)((ushort)(uVar4 << 7 | uVar4 >> 9 | uVar3) >> 5 |
                                (uVar4 >> 9) << 0xb)];
      bVar1 = *pbVar5;
      while ((bVar1 & 0x3c) != 0) {
        pbVar5 = pbVar5 + 8;
        bVar1 = *pbVar5;
      }
      if ((pbVar5[7] & 0x30) != 0) {
        sVar2 = sVar2 + 1;
      }
      uVar4 = uVar4 + 0x20;
    } while (uVar4 < 0x1000);
    uVar3 = uVar3 + 0x20;
  } while (uVar3 < 0x1000);
  if (sVar2 != DAT_0087d0c2) {
    DAT_0087d0c2 = sVar2;
    FUN_005e5301();
  }
  return;
}

