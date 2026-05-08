
undefined4 FUN_0042547b(void)

{
  byte bVar1;
  undefined4 in_EAX;
  ushort in_CX;
  uint in_EDX;
  ushort uVar2;
  byte *pbVar3;
  
  if (((ushort)in_EAX < 0x1000) && (in_CX < 0x1000)) {
    uVar2 = in_CX << 7 | in_CX >> 9 | (ushort)in_EAX;
    pbVar3 = (byte *)(&DAT_00971ef4)[(ushort)(uVar2 >> 5 | uVar2 << 0xb)];
    bVar1 = *pbVar3;
    while ((bVar1 & 0x3c) != 0) {
      pbVar3 = pbVar3 + 8;
      bVar1 = *pbVar3;
    }
    if (((pbVar3[7] & 0x20) != 0) ||
       (((pbVar3[7] & 0x10) != 0 &&
        ((bVar1 = (byte)(in_EDX >> 2), bVar1 < pbVar3[2] || (pbVar3[2] < (byte)(bVar1 - 4))))))) {
      return in_EAX;
    }
  }
  DAT_00991efc = 0x6a9;
  return in_EAX;
}

