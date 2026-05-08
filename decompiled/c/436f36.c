
undefined8 FUN_00436f36(void)

{
  byte *pbVar1;
  byte bVar2;
  undefined4 in_EAX;
  ushort in_CX;
  uint in_EDX;
  byte bVar3;
  int iVar4;
  
  if (((ushort)in_EAX & 0x1f) < 0x10) {
    bVar3 = 4;
    if (0xf < (in_CX & 0x1f)) {
      bVar3 = 8;
    }
  }
  else {
    bVar3 = 1;
    if ((in_CX & 0x1f) < 0x10) {
      bVar3 = 2;
    }
  }
  bVar2 = (byte)(in_EDX >> 2);
  iVar4 = (&DAT_00971ef4)
          [(ushort)((ushort)((in_CX & 0xffe0) << 7 | in_CX >> 9 | (ushort)in_EAX & 0xffe0) >> 5 |
                   (in_CX >> 9) << 0xb)];
  while (((bVar2 < *(byte *)(iVar4 + 2) || (*(byte *)(iVar4 + 3) <= bVar2)) ||
         ((*(byte *)(iVar4 + 1) & bVar3) == 0))) {
    pbVar1 = (byte *)(iVar4 + 1);
    iVar4 = iVar4 + 8;
    if ((*pbVar1 & 0x80) != 0) {
      return CONCAT44(in_EDX,in_EAX);
    }
  }
  return CONCAT44(in_EDX,in_EAX);
}

