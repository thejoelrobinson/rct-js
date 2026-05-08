
undefined8 FUN_0042ddb9(void)

{
  byte bVar1;
  undefined4 in_EAX;
  ushort in_CX;
  undefined4 in_EDX;
  byte *pbVar2;
  undefined1 *unaff_ESI;
  bool bVar3;
  
  pbVar2 = (byte *)(&DAT_00971ef4)
                   [(ushort)((ushort)((in_CX & 0xffe0) << 7 | in_CX >> 9 | (ushort)in_EAX & 0xffe0)
                             >> 5 | (in_CX >> 9) << 0xb)];
  bVar1 = *pbVar2;
  while ((bVar1 & 0x3c) != 0) {
    pbVar2 = pbVar2 + 8;
    bVar1 = *pbVar2;
  }
  bVar3 = (ushort)in_EDX == (ushort)((ushort)pbVar2[2] * 4);
  if (((ushort)((ushort)pbVar2[2] * 4) < (ushort)in_EDX) && (FUN_00444bd4(), !bVar3)) {
    unaff_ESI[0x14] = 0x14;
    unaff_ESI[9] = 0x12;
    unaff_ESI[0x15] = 0x10;
    *unaff_ESI = 2;
    FUN_00444927();
    unaff_ESI[1] = 0;
    *(undefined2 *)(unaff_ESI + 0x26) = 0x100;
    *(undefined2 *)(unaff_ESI + 0x24) = 0;
  }
  return CONCAT44(in_EDX,in_EAX);
}

