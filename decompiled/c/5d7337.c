
undefined8 FUN_005d7337(void)

{
  byte bVar1;
  undefined4 in_EAX;
  ushort uVar2;
  undefined4 in_EDX;
  ushort unaff_BX;
  ushort uVar3;
  byte *pbVar4;
  
  uVar3 = unaff_BX << 7 | unaff_BX >> 9 | (ushort)in_EAX;
  pbVar4 = (byte *)(&DAT_00971ef4)[(ushort)(uVar3 >> 5 | uVar3 << 0xb)];
  bVar1 = *pbVar4;
  while ((bVar1 & 0x3c) != 0) {
    pbVar4 = pbVar4 + 8;
    bVar1 = *pbVar4;
  }
  uVar2 = (ushort)pbVar4[2] * 4;
  uVar3 = uVar2;
  if (((pbVar4[4] & 0xf) != 0) && (uVar3 = uVar2 + 0x10, (pbVar4[4] & 0x10) != 0)) {
    uVar3 = uVar2 + 0x20;
  }
  if ((pbVar4[5] & 0x1f) != 0) {
    uVar2 = (pbVar4[5] & 0x1f) << 4;
    pbVar4 = (byte *)(uint)uVar2;
    if (uVar3 < uVar2) {
      uVar3 = uVar2;
    }
  }
  FUN_005d6a1d();
  return CONCAT44(CONCAT22((short)((uint)in_EDX >> 0x10),
                           uVar3 + (short)CONCAT31((int3)((uint)pbVar4 >> 8),3)),in_EAX);
}

