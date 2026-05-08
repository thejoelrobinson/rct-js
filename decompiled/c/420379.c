
void FUN_00420379(void)

{
  int in_ECX;
  int iVar1;
  int iVar2;
  byte *unaff_EDI;
  
  iVar2 = (uint)*unaff_EDI * 0x12;
  iVar1 = in_ECX + (uint)*(ushort *)(&DAT_005f679c + iVar2) +
          (uint)*(ushort *)(&DAT_005f679e + iVar2) * (uint)(unaff_EDI[0xc5] >> 6) +
          (((uint)(*(int *)(unaff_EDI + 0x94) + *(int *)(unaff_EDI + 0x98) +
                   *(int *)(unaff_EDI + 0x9c) + *(int *)(unaff_EDI + 0xa0)) >> 0x10) *
           (uint)*(ushort *)(&DAT_005f67a0 + iVar2) >> 10);
  if ((*(ushort *)(unaff_EDI + 2) & 0x20) != 0) {
    iVar1 = iVar1 + (uint)*(ushort *)(&DAT_005f67a2 + iVar2);
  }
  *(short *)(unaff_EDI + 0x132) =
       (short)((iVar1 + (uint)*(ushort *)(&DAT_005f67a4 + iVar2) * (uint)DAT_008ae984 +
                (uint)*(ushort *)(&DAT_005f67a6 + iVar2) * (uint)DAT_008ae982 +
                (uint)*(ushort *)(&DAT_005f67a8 + iVar2) * (uint)unaff_EDI[0x78] +
                (uint)*(ushort *)(&DAT_005f67aa + iVar2) * (uint)unaff_EDI[0x79] +
               (uint)*(ushort *)(&DAT_005f67ac + iVar2) * (uint)unaff_EDI[0x77]) * 10 >> 4);
  unaff_EDI[0xfd] = unaff_EDI[0xfd] | 2;
  return;
}

