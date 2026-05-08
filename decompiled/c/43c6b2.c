
undefined8 FUN_0043c6b2(void)

{
  undefined4 in_EAX;
  ushort in_CX;
  undefined4 in_EDX;
  uint uVar1;
  byte bVar2;
  ushort uVar3;
  byte *pbVar4;
  byte *pbVar5;
  
  if (((ushort)in_EAX < 0x1000) && (in_CX < 0x1000)) {
    uVar3 = in_CX << 7 | in_CX >> 9 | (ushort)in_EAX;
    pbVar4 = (byte *)(&DAT_00971ef4)[(ushort)(uVar3 >> 5 | uVar3 << 0xb)];
    bVar2 = *pbVar4;
    while ((bVar2 & 0x3c) != 0) {
      pbVar4 = pbVar4 + 8;
      bVar2 = *pbVar4;
    }
    if ((byte)((pbVar4[5] & 0x1f) << 2) <= pbVar4[2]) {
      bVar2 = pbVar4[2];
      uVar1 = (uint)CONCAT11(bVar2 + 4,bVar2);
      if ((pbVar4[4] & 0x10) != 0) {
        uVar1 = (uint)CONCAT11(bVar2 + 8,bVar2);
      }
      do {
        pbVar5 = pbVar4;
        if ((pbVar5[1] & 0x80) != 0) {
          return CONCAT44(in_EDX,in_EAX);
        }
        pbVar4 = pbVar5 + 8;
      } while ((((pbVar5[0xb] <= (byte)uVar1) || ((byte)(uVar1 >> 8) < pbVar5[10])) ||
               (bVar2 = *pbVar4 & 0x3c, bVar2 == 4)) ||
              ((bVar2 == 0x14 ||
               ((bVar2 == 0xc && (((uint)(&PTR_DAT_006e1ec8)[(uint)pbVar5[0xc] * 2] & 1) == 0))))));
    }
  }
  return CONCAT44(in_EDX,in_EAX);
}

