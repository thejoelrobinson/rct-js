
ushort FUN_005e1bfd(void)

{
  ushort uVar1;
  ushort uVar2;
  ushort uVar3;
  ushort uVar4;
  ushort uVar5;
  ushort in_DX;
  ushort unaff_BP;
  ushort *unaff_ESI;
  uint unaff_EDI;
  ushort uVar6;
  
  while( true ) {
    if (DAT_009a1164 <= unaff_EDI) {
      uVar5 = in_DX;
      if ((short)in_DX < 0) {
        uVar5 = -in_DX;
      }
      if (uVar5 < *unaff_ESI) {
        uVar5 = unaff_BP;
        if ((short)unaff_BP < 0) {
          uVar5 = -unaff_BP;
        }
        if (uVar5 < unaff_ESI[1]) {
          FUN_009bb374();
          uVar5 = unaff_ESI[2];
          if (in_DX != 0) {
            if ((short)in_DX < 0) {
              FUN_005e12eb(unaff_ESI,in_DX);
            }
            else {
              FUN_005e12eb(unaff_ESI);
              uVar5 = uVar5 + in_DX;
            }
          }
          if (unaff_BP != 0) {
            if (-1 < (short)unaff_BP) {
              uVar5 = FUN_005e12eb();
              return uVar5;
            }
            uVar5 = FUN_005e12eb();
            return uVar5;
          }
          return uVar5;
        }
      }
      uVar5 = FUN_005e12eb();
      return uVar5;
    }
    if ((((unaff_ESI != *(ushort **)(unaff_EDI + 8)) &&
         (*(short *)(unaff_EDI + 0x20) < (short)(unaff_ESI[2] + *unaff_ESI))) &&
        ((short)unaff_ESI[2] < (short)(*(short *)(unaff_EDI + 0x20) + *(short *)(unaff_EDI + 0x24)))
        ) && ((*(short *)(unaff_EDI + 0x22) < (short)(unaff_ESI[3] + unaff_ESI[1]) &&
              ((short)unaff_ESI[3] <
               (short)(*(short *)(unaff_EDI + 0x22) + *(short *)(unaff_EDI + 0x26)))))) break;
    unaff_EDI = unaff_EDI + 0x178;
  }
  if ((short)unaff_ESI[2] < *(short *)(unaff_EDI + 0x20)) {
    uVar5 = unaff_ESI[6];
    uVar1 = unaff_ESI[2];
    uVar2 = *unaff_ESI;
    uVar6 = unaff_ESI[4];
    uVar3 = *(short *)(unaff_EDI + 0x20) - unaff_ESI[2];
    *unaff_ESI = uVar3;
    unaff_ESI[6] = uVar3 << ((byte)unaff_ESI[8] & 0x1f);
    FUN_005e1bfd();
    uVar3 = *unaff_ESI;
    uVar4 = uVar2 - uVar3;
    *unaff_ESI = uVar4;
    unaff_ESI[2] = unaff_ESI[2] + uVar3;
    unaff_ESI[6] = uVar4 << ((byte)unaff_ESI[8] & 0x1f);
    unaff_ESI[4] = unaff_ESI[4] + (uVar3 << ((byte)unaff_ESI[8] & 0x1f));
    uVar3 = FUN_005e1bfd();
    unaff_ESI[4] = uVar6;
    *unaff_ESI = uVar2;
    unaff_ESI[2] = uVar1;
    unaff_ESI[6] = uVar5;
    return uVar3;
  }
  if ((short)(*(short *)(unaff_EDI + 0x20) + *(short *)(unaff_EDI + 0x24)) <
      (short)(unaff_ESI[2] + *unaff_ESI)) {
    uVar5 = unaff_ESI[6];
    uVar1 = unaff_ESI[2];
    uVar2 = *unaff_ESI;
    uVar6 = unaff_ESI[4];
    uVar3 = (*(short *)(unaff_EDI + 0x20) + *(short *)(unaff_EDI + 0x24)) - unaff_ESI[2];
    *unaff_ESI = uVar3;
    unaff_ESI[6] = uVar3 << ((byte)unaff_ESI[8] & 0x1f);
    FUN_005e1bfd();
    uVar3 = *unaff_ESI;
    uVar4 = uVar2 - uVar3;
    *unaff_ESI = uVar4;
    unaff_ESI[2] = unaff_ESI[2] + uVar3;
    unaff_ESI[6] = uVar4 << ((byte)unaff_ESI[8] & 0x1f);
    unaff_ESI[4] = unaff_ESI[4] + (uVar3 << ((byte)unaff_ESI[8] & 0x1f));
    uVar3 = FUN_005e1bfd();
    unaff_ESI[4] = uVar6;
    *unaff_ESI = uVar2;
    unaff_ESI[2] = uVar1;
    unaff_ESI[6] = uVar5;
    return uVar3;
  }
  if ((short)unaff_ESI[3] < *(short *)(unaff_EDI + 0x22)) {
    uVar5 = unaff_ESI[7];
    uVar1 = unaff_ESI[3];
    uVar2 = unaff_ESI[1];
    uVar6 = unaff_ESI[5];
    uVar3 = *(short *)(unaff_EDI + 0x22) - unaff_ESI[3];
    unaff_ESI[1] = uVar3;
    unaff_ESI[7] = uVar3 << ((byte)unaff_ESI[8] & 0x1f);
    FUN_005e1bfd();
    uVar3 = unaff_ESI[1];
    uVar4 = uVar2 - uVar3;
    unaff_ESI[1] = uVar4;
    unaff_ESI[3] = unaff_ESI[3] + uVar3;
    unaff_ESI[7] = uVar4 << ((byte)unaff_ESI[8] & 0x1f);
    unaff_ESI[5] = unaff_ESI[5] + (uVar3 << ((byte)unaff_ESI[8] & 0x1f));
    uVar3 = FUN_005e1bfd();
    unaff_ESI[5] = uVar6;
    unaff_ESI[1] = uVar2;
    unaff_ESI[3] = uVar1;
    unaff_ESI[7] = uVar5;
    return uVar3;
  }
  uVar5 = unaff_ESI[3] + unaff_ESI[1];
  if ((short)(*(short *)(unaff_EDI + 0x22) + *(short *)(unaff_EDI + 0x26)) < (short)uVar5) {
    uVar1 = unaff_ESI[7];
    uVar2 = unaff_ESI[3];
    uVar6 = unaff_ESI[1];
    uVar3 = unaff_ESI[5];
    uVar5 = (*(short *)(unaff_EDI + 0x22) + *(short *)(unaff_EDI + 0x26)) - unaff_ESI[3];
    unaff_ESI[1] = uVar5;
    unaff_ESI[7] = uVar5 << ((byte)unaff_ESI[8] & 0x1f);
    FUN_005e1bfd();
    uVar5 = unaff_ESI[1];
    uVar4 = uVar6 - uVar5;
    unaff_ESI[1] = uVar4;
    unaff_ESI[3] = unaff_ESI[3] + uVar5;
    unaff_ESI[7] = uVar4 << ((byte)unaff_ESI[8] & 0x1f);
    unaff_ESI[5] = unaff_ESI[5] + (uVar5 << ((byte)unaff_ESI[8] & 0x1f));
    uVar5 = FUN_005e1bfd();
    unaff_ESI[5] = uVar3;
    unaff_ESI[1] = uVar6;
    unaff_ESI[3] = uVar2;
    unaff_ESI[7] = uVar1;
  }
  return uVar5;
}

