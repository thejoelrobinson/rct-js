
ushort FUN_005e1b3e(void)

{
  ushort uVar1;
  ushort uVar2;
  ushort uVar3;
  ushort uVar4;
  ushort uVar5;
  short sVar6;
  undefined4 in_EDX;
  ushort unaff_BP;
  short sVar7;
  ushort *unaff_ESI;
  uint unaff_EDI;
  uint uVar8;
  ushort uVar9;
  
  for (uVar8 = unaff_EDI; uVar8 < DAT_009a1164; uVar8 = uVar8 + 0x178) {
    if (((((*(ushort *)(uVar8 + 0x32) & 0x10) != 0) && (unaff_ESI != *(ushort **)(uVar8 + 8))) &&
        (*(short *)(uVar8 + 0x20) < (short)(unaff_ESI[2] + *unaff_ESI))) &&
       ((((short)unaff_ESI[2] < (short)(*(short *)(uVar8 + 0x20) + *(short *)(uVar8 + 0x24)) &&
         (*(short *)(uVar8 + 0x22) < (short)(unaff_ESI[3] + unaff_ESI[1]))) &&
        ((short)unaff_ESI[3] < (short)(*(short *)(uVar8 + 0x22) + *(short *)(uVar8 + 0x26)))))) {
      uVar4 = *(ushort *)(uVar8 + 0x20);
      uVar5 = *(ushort *)(uVar8 + 0x22);
      sVar6 = *(short *)(uVar8 + 0x24) + uVar4;
      sVar7 = *(short *)(uVar8 + 0x26) + uVar5;
      uVar1 = unaff_ESI[2];
      if ((short)uVar4 < (short)uVar1) {
        uVar4 = uVar1;
      }
      if ((short)(uVar1 + *unaff_ESI) < sVar6) {
        sVar6 = uVar1 + *unaff_ESI;
      }
      uVar1 = unaff_ESI[3];
      if ((short)uVar5 < (short)uVar1) {
        uVar5 = uVar1;
      }
      if ((short)(uVar1 + unaff_ESI[1]) < sVar7) {
        sVar7 = uVar1 + unaff_ESI[1];
      }
      if (((short)uVar4 < sVar6) && ((short)uVar5 < sVar7)) {
        FUN_005e12eb();
      }
    }
  }
  while( true ) {
    uVar4 = (ushort)in_EDX;
    if (DAT_009a1164 <= unaff_EDI) {
      uVar5 = uVar4;
      if ((short)uVar4 < 0) {
        uVar5 = -uVar4;
      }
      if (uVar5 < *unaff_ESI) {
        uVar5 = unaff_BP;
        if ((short)unaff_BP < 0) {
          uVar5 = -unaff_BP;
        }
        if (uVar5 < unaff_ESI[1]) {
          FUN_009bb374();
          uVar5 = unaff_ESI[2];
          if (uVar4 != 0) {
            if ((short)uVar4 < 0) {
              FUN_005e12eb(unaff_ESI,uVar4);
            }
            else {
              FUN_005e12eb(unaff_ESI);
              uVar5 = uVar5 + uVar4;
            }
          }
          if (unaff_BP == 0) {
            return uVar5;
          }
          if ((short)unaff_BP < 0) {
            uVar4 = FUN_005e12eb();
            return uVar4;
          }
          uVar4 = FUN_005e12eb();
          return uVar4;
        }
      }
      uVar4 = FUN_005e12eb();
      return uVar4;
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
    uVar9 = unaff_ESI[4];
    uVar3 = *(short *)(unaff_EDI + 0x20) - unaff_ESI[2];
    *unaff_ESI = uVar3;
    unaff_ESI[6] = uVar3 << ((byte)unaff_ESI[8] & 0x1f);
    FUN_005e1bfd(unaff_ESI,unaff_EDI,CONCAT22(uVar4,unaff_BP));
    uVar4 = *unaff_ESI;
    uVar3 = uVar2 - uVar4;
    *unaff_ESI = uVar3;
    unaff_ESI[2] = unaff_ESI[2] + uVar4;
    unaff_ESI[6] = uVar3 << ((byte)unaff_ESI[8] & 0x1f);
    unaff_ESI[4] = unaff_ESI[4] + (uVar4 << ((byte)unaff_ESI[8] & 0x1f));
    uVar4 = FUN_005e1bfd();
    unaff_ESI[4] = uVar9;
    *unaff_ESI = uVar2;
    unaff_ESI[2] = uVar1;
    unaff_ESI[6] = uVar5;
    return uVar4;
  }
  if ((short)(unaff_ESI[2] + *unaff_ESI) <=
      (short)(*(short *)(unaff_EDI + 0x20) + *(short *)(unaff_EDI + 0x24))) {
    if (*(short *)(unaff_EDI + 0x22) <= (short)unaff_ESI[3]) {
      uVar5 = unaff_ESI[3] + unaff_ESI[1];
      if ((short)(*(short *)(unaff_EDI + 0x22) + *(short *)(unaff_EDI + 0x26)) < (short)uVar5) {
        uVar1 = unaff_ESI[7];
        uVar2 = unaff_ESI[3];
        uVar9 = unaff_ESI[1];
        uVar3 = unaff_ESI[5];
        uVar5 = (*(short *)(unaff_EDI + 0x22) + *(short *)(unaff_EDI + 0x26)) - unaff_ESI[3];
        unaff_ESI[1] = uVar5;
        unaff_ESI[7] = uVar5 << ((byte)unaff_ESI[8] & 0x1f);
        FUN_005e1bfd(unaff_ESI,unaff_EDI,CONCAT22(uVar4,unaff_BP));
        uVar4 = unaff_ESI[1];
        uVar5 = uVar9 - uVar4;
        unaff_ESI[1] = uVar5;
        unaff_ESI[3] = unaff_ESI[3] + uVar4;
        unaff_ESI[7] = uVar5 << ((byte)unaff_ESI[8] & 0x1f);
        unaff_ESI[5] = unaff_ESI[5] + (uVar4 << ((byte)unaff_ESI[8] & 0x1f));
        uVar5 = FUN_005e1bfd();
        unaff_ESI[5] = uVar3;
        unaff_ESI[1] = uVar9;
        unaff_ESI[3] = uVar2;
        unaff_ESI[7] = uVar1;
      }
      return uVar5;
    }
    uVar5 = unaff_ESI[7];
    uVar1 = unaff_ESI[3];
    uVar2 = unaff_ESI[1];
    uVar9 = unaff_ESI[5];
    uVar3 = *(short *)(unaff_EDI + 0x22) - unaff_ESI[3];
    unaff_ESI[1] = uVar3;
    unaff_ESI[7] = uVar3 << ((byte)unaff_ESI[8] & 0x1f);
    FUN_005e1bfd(unaff_ESI,unaff_EDI,CONCAT22(uVar4,unaff_BP));
    uVar4 = unaff_ESI[1];
    uVar3 = uVar2 - uVar4;
    unaff_ESI[1] = uVar3;
    unaff_ESI[3] = unaff_ESI[3] + uVar4;
    unaff_ESI[7] = uVar3 << ((byte)unaff_ESI[8] & 0x1f);
    unaff_ESI[5] = unaff_ESI[5] + (uVar4 << ((byte)unaff_ESI[8] & 0x1f));
    uVar4 = FUN_005e1bfd();
    unaff_ESI[5] = uVar9;
    unaff_ESI[1] = uVar2;
    unaff_ESI[3] = uVar1;
    unaff_ESI[7] = uVar5;
    return uVar4;
  }
  uVar5 = unaff_ESI[6];
  uVar1 = unaff_ESI[2];
  uVar2 = *unaff_ESI;
  uVar9 = unaff_ESI[4];
  uVar3 = (*(short *)(unaff_EDI + 0x20) + *(short *)(unaff_EDI + 0x24)) - unaff_ESI[2];
  *unaff_ESI = uVar3;
  unaff_ESI[6] = uVar3 << ((byte)unaff_ESI[8] & 0x1f);
  FUN_005e1bfd(unaff_ESI,unaff_EDI,CONCAT22(uVar4,unaff_BP));
  uVar4 = *unaff_ESI;
  uVar3 = uVar2 - uVar4;
  *unaff_ESI = uVar3;
  unaff_ESI[2] = unaff_ESI[2] + uVar4;
  unaff_ESI[6] = uVar3 << ((byte)unaff_ESI[8] & 0x1f);
  unaff_ESI[4] = unaff_ESI[4] + (uVar4 << ((byte)unaff_ESI[8] & 0x1f));
  uVar4 = FUN_005e1bfd();
  unaff_ESI[4] = uVar9;
  *unaff_ESI = uVar2;
  unaff_ESI[2] = uVar1;
  unaff_ESI[6] = uVar5;
  return uVar4;
}

