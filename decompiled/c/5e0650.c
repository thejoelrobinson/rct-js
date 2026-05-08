
undefined8 FUN_005e0650(void)

{
  byte *pbVar1;
  undefined4 in_EAX;
  ushort in_CX;
  undefined4 in_EDX;
  short sVar2;
  short sVar3;
  ushort uVar4;
  byte *pbVar5;
  
  uVar4 = in_CX << 7 | in_CX >> 9 | (ushort)in_EAX;
  pbVar5 = (byte *)(&DAT_00971ef4)[(ushort)(uVar4 >> 5 | uVar4 << 0xb)];
  do {
    if ((*pbVar5 & 0x3c) == 0x14) {
      sVar2 = (ushort)pbVar5[2] * 4;
      if (sVar2 <= (short)in_EDX) {
        sVar3 = sVar2 + 0x20;
        if (((pbVar5[4] & 0xf) != 0) && (sVar3 = sVar2 + 0x30, (pbVar5[4] & 0x10) != 0)) {
          sVar3 = sVar2 + 0x40;
        }
        if ((short)in_EDX < sVar3) {
          FUN_005e59ec(pbVar5);
          FUN_00436795();
        }
      }
      break;
    }
    pbVar1 = pbVar5 + 1;
    pbVar5 = pbVar5 + 8;
  } while ((*pbVar1 & 0x80) == 0);
  return CONCAT44(in_EDX,in_EAX);
}

