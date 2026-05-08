
undefined4 FUN_005e4198(void)

{
  uint uVar1;
  short sVar2;
  ushort uVar3;
  ushort uVar4;
  undefined4 in_EAX;
  int unaff_EBX;
  short sVar5;
  ushort uVar6;
  int unaff_ESI;
  int unaff_EDI;
  
  if ((*(ushort *)(unaff_EBX + 0x34 + unaff_ESI) & 1) != 0) {
    sVar5 = *(short *)(unaff_EDI + 4) - *(short *)(unaff_EDI + 2);
    uVar6 = sVar5 - 0x15;
    if ((*(ushort *)(unaff_EBX + 0x34 + unaff_ESI) & 0x10) != 0) {
      uVar6 = sVar5 - 0x20;
    }
    uVar1 = (uint)*(ushort *)(unaff_EBX + 0x36 + unaff_ESI) * (uint)uVar6;
    sVar5 = (short)uVar1;
    uVar3 = *(ushort *)(unaff_EBX + 0x38 + unaff_ESI);
    if (uVar3 != 0) {
      sVar5 = (short)(uVar1 / uVar3);
    }
    *(short *)(unaff_EBX + 0x3a + unaff_ESI) = sVar5 + 0xb;
    sVar5 = *(short *)(unaff_EDI + 4) - *(short *)(unaff_EDI + 2);
    sVar2 = sVar5 + -2;
    if ((*(ushort *)(unaff_EBX + 0x34 + unaff_ESI) & 0x10) != 0) {
      sVar2 = sVar5 + -0xd;
    }
    uVar3 = sVar2 + *(short *)(unaff_EBX + 0x36 + unaff_ESI);
    if (*(short *)(unaff_EBX + 0x38 + unaff_ESI) != 0) {
      uVar3 = (ushort)(((uint)uVar3 * (uint)uVar6) / (uint)*(ushort *)(unaff_EBX + 0x38 + unaff_ESI)
                      );
    }
    sVar5 = uVar3 + 0xb;
    if ((short)(uVar6 + 10) < (short)(uVar3 + 0xb)) {
      sVar5 = uVar6 + 10;
    }
    *(short *)(unaff_EBX + 0x3c + unaff_ESI) = sVar5;
  }
  if ((*(ushort *)(unaff_EBX + 0x34 + unaff_ESI) & 0x10) != 0) {
    sVar5 = *(short *)(unaff_EDI + 8) - *(short *)(unaff_EDI + 6);
    uVar6 = sVar5 - 0x15;
    if ((*(ushort *)(unaff_EBX + 0x34 + unaff_ESI) & 1) != 0) {
      uVar6 = sVar5 - 0x20;
    }
    uVar1 = (uint)*(ushort *)(unaff_EBX + 0x3e + unaff_ESI) * (uint)uVar6;
    sVar5 = (short)uVar1;
    uVar3 = *(ushort *)(unaff_EBX + 0x40 + unaff_ESI);
    if (uVar3 != 0) {
      sVar5 = (short)(uVar1 / uVar3);
    }
    *(short *)(unaff_EBX + 0x42 + unaff_ESI) = sVar5 + 0xb;
    sVar5 = *(short *)(unaff_EDI + 8) - *(short *)(unaff_EDI + 6);
    sVar2 = sVar5 + -2;
    if ((*(ushort *)(unaff_EBX + 0x34 + unaff_ESI) & 1) != 0) {
      sVar2 = sVar5 + -0xd;
    }
    uVar3 = sVar2 + *(short *)(unaff_EBX + 0x3e + unaff_ESI);
    if (*(short *)(unaff_EBX + 0x40 + unaff_ESI) != 0) {
      uVar3 = (ushort)(((uint)uVar3 * (uint)uVar6) / (uint)*(ushort *)(unaff_EBX + 0x40 + unaff_ESI)
                      );
    }
    uVar4 = uVar3 + 0xb;
    if ((ushort)(uVar6 + 10) < (ushort)(uVar3 + 0xb)) {
      uVar4 = uVar6 + 10;
    }
    *(ushort *)(unaff_EBX + 0x44 + unaff_ESI) = uVar4;
  }
  return in_EAX;
}

