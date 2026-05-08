
undefined8 FUN_0043712e(void)

{
  byte *pbVar1;
  byte bVar2;
  undefined4 in_EAX;
  ushort in_CX;
  ushort uVar3;
  undefined4 in_EDX;
  ushort unaff_BX;
  byte *pbVar4;
  
  DAT_00628af6 = 1;
  uVar3 = (ushort)in_EAX;
  if ((((0xfdf < (short)uVar3) || (0xfdf < (short)in_CX)) || ((short)uVar3 < 0x20)) ||
     ((short)in_CX < 0x20)) {
    DAT_00991efc = 0x458;
    return CONCAT44(in_EDX,in_EAX);
  }
  uVar3 = in_CX << 7 | in_CX >> 9 | uVar3;
  pbVar4 = (byte *)(&DAT_00971ef4)[(ushort)(uVar3 >> 5 | uVar3 << 0xb)];
  do {
    bVar2 = *pbVar4 & 0x3c;
    if (((bVar2 != 0) && (bVar2 != 0x3c)) &&
       (((byte)in_EDX < pbVar4[3] &&
        ((pbVar4[2] < (byte)((uint)in_EDX >> 8) && ((pbVar4[1] & 0xf) != 0)))))) {
      if (bVar2 == 0x10) {
LAB_0043724b:
        FUN_0043725f();
        return CONCAT44(in_EDX,in_EAX);
      }
      if (bVar2 == 4) {
        if ((pbVar4[((int)(short)unaff_BX >> 3) + 6] >> (unaff_BX & 7) & 1) != 0) goto LAB_0043724b;
      }
      else if (bVar2 == 0x18) {
        uVar3 = ((byte)-*pbVar4 + unaff_BX & 3) + 8;
        if (((byte)(&PTR_DAT_00631d74)[*(ushort *)(pbVar4 + 4) & 0x3ff]
                   [((int)(short)uVar3 >> 3) + (uint)(*(ushort *)(pbVar4 + 4) >> 10) * 9 + 7] >>
             (uVar3 & 7) & 1) == 0) goto LAB_0043724b;
      }
      else if ((bVar2 == 8) &&
              ((((byte)(&DAT_00654f18)[(uint)pbVar4[4] << 4 | pbVar4[5] & 0xf] >>
                 ((byte)-*pbVar4 + unaff_BX & 3) & 1) == 0 ||
               ((*(uint *)(&DAT_005f5b78 + (uint)(byte)(&DAT_00887420)[(uint)pbVar4[7] * 0x260] * 8)
                & 0x40000) != 0)))) goto LAB_0043724b;
    }
    pbVar1 = pbVar4 + 1;
    pbVar4 = pbVar4 + 8;
    if ((*pbVar1 & 0x80) != 0) {
      return CONCAT44(in_EDX,in_EAX);
    }
  } while( true );
}

