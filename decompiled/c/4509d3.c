
void FUN_004509d3(void)

{
  byte *pbVar1;
  ushort uVar2;
  byte *pbVar3;
  byte *unaff_ESI;
  
  if ((unaff_ESI[4] == 0x28) || (unaff_ESI[4] == 0x29)) {
    uVar2 = DAT_008ae93e << 7 | DAT_008ae93e >> 9 | DAT_008ae93c;
    pbVar3 = (byte *)(&DAT_00971ef4)[(ushort)(uVar2 >> 5 | uVar2 << 0xb)];
    do {
      if ((*pbVar3 & 0x3c) == 4) {
        if ((unaff_ESI[2] <= pbVar3[2]) && ((byte)(pbVar3[2] - unaff_ESI[2]) < 0x21)) {
          DAT_008ae976 = DAT_008ae976 + 1;
        }
      }
      else if (((((*pbVar3 & 0x3c) == 8) && (((*pbVar3 ^ *unaff_ESI) & 1) != 0)) &&
               (unaff_ESI[2] <= pbVar3[2])) && ((byte)(pbVar3[2] - unaff_ESI[2]) < 0x21)) {
        DAT_008ae974 = DAT_008ae974 + 1;
        if ((pbVar3[4] == 0x28) || (pbVar3[4] == 0x29)) {
          DAT_008ae978 = DAT_008ae978 + 1;
        }
      }
      pbVar1 = pbVar3 + 1;
      pbVar3 = pbVar3 + 8;
    } while ((*pbVar1 & 0x80) == 0);
    uVar2 = (DAT_008ae93e + (&DAT_0065247a)[(*unaff_ESI & 3) * 2]) * 0x80 |
            (ushort)(DAT_008ae93e + (&DAT_0065247a)[(*unaff_ESI & 3) * 2]) >> 9 |
            DAT_008ae93c + (&DAT_00652478)[(*unaff_ESI & 3) * 2];
    pbVar3 = (byte *)(&DAT_00971ef4)[(ushort)(uVar2 >> 5 | uVar2 << 0xb)];
    do {
      if ((*pbVar3 & 0x3c) == 4) {
        if ((unaff_ESI[2] <= pbVar3[2]) && ((byte)(pbVar3[2] - unaff_ESI[2]) < 0x21)) {
          DAT_008ae976 = DAT_008ae976 + 1;
        }
      }
      else if (((((*pbVar3 & 0x3c) == 8) && (((*pbVar3 ^ *unaff_ESI) & 1) != 0)) &&
               (unaff_ESI[2] <= pbVar3[2])) && ((byte)(pbVar3[2] - unaff_ESI[2]) < 0x21)) {
        DAT_008ae974 = DAT_008ae974 + 1;
        if ((pbVar3[4] == 0x28) || (pbVar3[4] == 0x29)) {
          DAT_008ae978 = DAT_008ae978 + 1;
        }
      }
      pbVar1 = pbVar3 + 1;
      pbVar3 = pbVar3 + 8;
    } while ((*pbVar1 & 0x80) == 0);
  }
  if (DAT_008ae94a == 'c') {
    DAT_008ae982 = DAT_008ae982 + 1;
  }
  if (DAT_008ae94a == 'd') {
    DAT_008ae984 = DAT_008ae984 + 1;
  }
  return;
}

