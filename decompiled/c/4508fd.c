
void FUN_004508fd(void)

{
  byte *pbVar1;
  byte bVar2;
  ushort uVar3;
  int unaff_EBX;
  byte *pbVar4;
  int unaff_ESI;
  
  uVar3 = DAT_008ae93e + (&DAT_0065247a)[unaff_EBX * 2];
  if (((ushort)(DAT_008ae93c + (&DAT_00652478)[unaff_EBX * 2]) < 0x1000) && (uVar3 < 0x1000)) {
    uVar3 = uVar3 * 0x80 | uVar3 >> 9 | DAT_008ae93c + (&DAT_00652478)[unaff_EBX * 2];
    pbVar4 = (byte *)(&DAT_00971ef4)[(ushort)(uVar3 >> 5 | uVar3 << 0xb)];
    do {
      bVar2 = *pbVar4 & 0x3c;
      if (bVar2 == 0) {
        if ((DAT_008ae94b <= *(byte *)(unaff_ESI + 2)) && (*(byte *)(unaff_ESI + 3) <= pbVar4[2])) {
          DAT_008ae980 = DAT_008ae980 + 1;
        }
      }
      else if (bVar2 == 4) {
        bVar2 = *(byte *)(unaff_ESI + 2) - pbVar4[2];
        if (*(byte *)(unaff_ESI + 2) < pbVar4[2]) {
          bVar2 = -bVar2;
        }
        if (bVar2 < 5) {
          DAT_008ae97c = DAT_008ae97c + 1;
        }
      }
      else if (bVar2 == 8) {
        bVar2 = *(byte *)(unaff_ESI + 2) - pbVar4[2];
        if (*(byte *)(unaff_ESI + 2) < pbVar4[2]) {
          bVar2 = -bVar2;
        }
        if ((bVar2 < 5) && (*(byte *)(unaff_ESI + 7) != pbVar4[7])) {
          DAT_008ae97e = DAT_008ae97e + 1;
        }
      }
      else if (((bVar2 == 0xc) || (bVar2 == 0x18)) && (pbVar4[2] < *(byte *)(unaff_ESI + 3))) {
        if (pbVar4[3] < *(byte *)(unaff_ESI + 2)) {
          DAT_008ae96e = DAT_008ae96e + 1;
        }
        else {
          DAT_008ae96c = DAT_008ae96c + 1;
        }
      }
      pbVar1 = pbVar4 + 1;
      pbVar4 = pbVar4 + 8;
    } while ((*pbVar1 & 0x80) == 0);
  }
  return;
}

