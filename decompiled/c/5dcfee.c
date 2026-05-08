
undefined8 FUN_005dcfee(void)

{
  short sVar1;
  uint in_EAX;
  ushort in_CX;
  ushort uVar2;
  undefined4 in_EDX;
  ushort uVar3;
  uint uVar4;
  short sVar5;
  int *piVar6;
  char *unaff_ESI;
  uint uVar7;
  int iVar8;
  
  uVar4 = (uint)(*(ushort *)(unaff_ESI + 0x36) >> 2);
  sVar1 = (short)in_EAX;
  sVar5 = (short)((uint)*(ushort *)(unaff_ESI + 0x44) * 0x1e >> 9);
  if (((((short)(sVar1 - sVar5) <
         (short)((ushort)(byte)(&DAT_006567f4)[uVar4 * 4] + *(short *)(unaff_ESI + 0x38))) ||
       ((short)(in_CX - sVar5) <
        (short)((ushort)(byte)(&DAT_006567f5)[uVar4 * 4] + *(short *)(unaff_ESI + 0x3a)))) ||
      ((short)((ushort)(byte)(&DAT_006567f6)[uVar4 * 4] + *(short *)(unaff_ESI + 0x38)) <
       (short)(sVar1 + sVar5))) ||
     ((short)((ushort)(byte)(&DAT_006567f7)[uVar4 * 4] + *(short *)(unaff_ESI + 0x3a)) <
      (short)(in_CX + sVar5))) {
    return CONCAT44(in_EDX,in_EAX);
  }
  uVar4 = (uint)(ushort)((ushort)((in_EAX & 0xfe0) << 2) | in_CX >> 5 & 0x7f);
  piVar6 = &DAT_0065e7bc;
  do {
    uVar3 = (&DAT_00991f8e)[uVar4 & 0x3fff];
    while (uVar3 != 0xffff) {
      uVar7 = (uint)uVar3;
      iVar8 = uVar7 * 0x100;
      if (((&DAT_00743b94 + iVar8 != unaff_ESI) && ((&DAT_00743b94)[iVar8] == '\0')) &&
         (unaff_ESI[0x30] == (&DAT_00743bc4)[iVar8])) {
        uVar3 = sVar1 - (&DAT_00743ba2)[uVar7 * 0x80];
        if (!SBORROW2(sVar1,(&DAT_00743ba2)[uVar7 * 0x80])) {
          if ((short)uVar3 < 0) {
            uVar3 = -uVar3;
          }
          uVar2 = in_CX - (&DAT_00743ba4)[uVar7 * 0x80];
          if (!SBORROW2(in_CX,(&DAT_00743ba4)[uVar7 * 0x80])) {
            if ((short)uVar2 < 0) {
              uVar2 = -uVar2;
            }
            if (uVar3 <= uVar2) {
              uVar3 = uVar2;
            }
            if (uVar3 < (ushort)((uint)((ushort)(*(short *)(unaff_ESI + 0x44) +
                                                *(short *)(&DAT_00743bd8 + iVar8)) >> 1) * 0x1e >> 8
                                )) {
              return CONCAT44(in_EDX,in_EAX);
            }
          }
        }
      }
      uVar3 = (&DAT_00743b96)[uVar7 * 0x80];
    }
    uVar4 = (uVar4 & 0x3fff) + *piVar6;
    piVar6 = piVar6 + 1;
    if (&DAT_0065e7dc < piVar6) {
      return CONCAT44(in_EDX,in_EAX);
    }
  } while( true );
}

