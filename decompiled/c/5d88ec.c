
undefined4 FUN_005d88ec(void)

{
  byte *pbVar1;
  byte bVar2;
  undefined4 in_EAX;
  undefined4 in_EDX;
  undefined4 unaff_EBX;
  int iVar3;
  undefined1 *unaff_ESI;
  undefined4 unaff_EDI;
  uint uVar4;
  int iVar5;
  undefined8 uVar6;
  
  uVar6 = CONCAT44(in_EDX,in_EAX);
  iVar3 = 0;
  do {
    if ((((*(ushort *)(unaff_ESI + 0x48) & 0x100) == 0) || (unaff_ESI[0xb5] == '\0')) ||
       ((uVar4 = (uint)(byte)unaff_ESI[0x30], iVar5 = uVar4 * 0x260,
        (&DAT_0088755c)[iVar5] != '\x02' && ((&DAT_0088755c)[iVar5] != '\x04')))) {
      pbVar1 = unaff_ESI + 0xb5;
      bVar2 = *pbVar1;
      *pbVar1 = *pbVar1 - 0x14;
      if (0x13 < bVar2) goto LAB_005d8994;
      unaff_ESI[0xb5] = 0;
    }
    else {
      if (((&DAT_00887422)[uVar4 * 0x130] & 0x80) == 0) {
        (&DAT_00887422)[uVar4 * 0x130] = (&DAT_00887422)[uVar4 * 0x130] | 0x80;
        FUN_004518fc((int)((ulonglong)uVar6 >> 0x20),unaff_EDI,unaff_EBX);
        (&DAT_0088751d)[iVar5] = (&DAT_0088751d)[iVar5] | 0x1c;
        (&DAT_0088755d)[iVar5] = 1;
        (&DAT_00887560)[iVar5] =
             (&DAT_00743bdf)
             [(uint)*(ushort *)(&DAT_0088747e + (uint)(byte)(&DAT_00887561)[iVar5] * 2 + iVar5) *
              0x100];
        (&DAT_00887563)[iVar5] = (&DAT_0088755c)[iVar5];
      }
LAB_005d8994:
      uVar6 = FUN_005e53ca();
      iVar3 = iVar3 + 1;
    }
    if (*(short *)(unaff_ESI + 0x3e) == -1) {
      if (iVar3 == 0) {
        return (int)uVar6;
      }
      return (int)uVar6;
    }
    unaff_ESI = &DAT_00743b94 + (uint)*(ushort *)(unaff_ESI + 0x3e) * 0x100;
  } while( true );
}

