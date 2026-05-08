
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0045069f(void)

{
  byte *pbVar1;
  byte bVar2;
  char cVar3;
  ushort uVar4;
  byte *pbVar5;
  int unaff_ESI;
  
  _DAT_008ae94c = _DAT_008ae94c + 1;
  uVar4 = DAT_008ae93e << 7 | DAT_008ae93e >> 9 | DAT_008ae93c;
  pbVar5 = (byte *)(&DAT_00971ef4)[(ushort)(uVar4 >> 5 | uVar4 << 0xb)];
  do {
    bVar2 = *pbVar5 & 0x3c;
    if (bVar2 == 0) {
      DAT_008ae94b = pbVar5[2];
      if ((ushort)((ushort)DAT_008ae94b * 4) == DAT_008ae940) {
        DAT_008ae956 = DAT_008ae956 + 1;
      }
      if (((pbVar5[5] & 0x1f) != 0) && (uVar4 = (pbVar5[5] & 0x1f) * 0x10, uVar4 <= DAT_008ae940)) {
        DAT_008ae94e = DAT_008ae94e + 1;
        if (uVar4 == DAT_008ae940) {
          DAT_008ae950 = DAT_008ae950 + 1;
        }
        if ((ushort)(uVar4 + 0x10) == DAT_008ae940) {
          DAT_008ae952 = DAT_008ae952 + 1;
        }
        if ((ushort)(uVar4 + 0x80) <= DAT_008ae940) {
          DAT_008ae954 = DAT_008ae954 + 1;
        }
      }
    }
    else if (bVar2 == 4) {
      if ((pbVar5[4] & 0xf0) == 0) {
        if (pbVar5[3] <= *(byte *)(unaff_ESI + 2)) {
          DAT_008ae958 = DAT_008ae958 + 1;
        }
        if (pbVar5[3] == *(byte *)(unaff_ESI + 2)) {
          DAT_008ae95a = DAT_008ae95a + 1;
        }
        if (*(byte *)(unaff_ESI + 3) == pbVar5[2]) {
          DAT_008ae95c = DAT_008ae95c + 1;
        }
      }
      else {
        if (pbVar5[3] == *(byte *)(unaff_ESI + 2)) {
          DAT_008ae95e = DAT_008ae95e + 1;
        }
        if (*(byte *)(unaff_ESI + 3) == pbVar5[2]) {
          _DAT_008ae960 = _DAT_008ae960 + 1;
        }
      }
    }
    else if (bVar2 == 8) {
      if ((((pbVar5[4] == 0x28) || (pbVar5[4] == 0x29)) &&
          (((pbVar5[5] & 0xf) == 3 || ((pbVar5[5] & 0xf) == 6)))) &&
         ((byte)(pbVar5[2] - *(char *)(unaff_ESI + 3)) < 0x15)) {
        DAT_008ae97a = DAT_008ae97a + 1;
      }
      if (*(byte *)(unaff_ESI + 7) == pbVar5[7]) {
        bVar2 = pbVar5[4];
        cVar3 = '\x01';
        if (((bVar2 != 1) && (bVar2 != 3)) && (bVar2 != 2)) {
          cVar3 = -1;
        }
        bVar2 = pbVar5[3];
        if ((bVar2 == *(byte *)(unaff_ESI + 2)) &&
           (DAT_008ae962 = DAT_008ae962 + 1, cVar3 == '\x01')) {
          DAT_008ae970 = DAT_008ae970 + 1;
        }
        if ((((byte)(bVar2 + 4) <= *(byte *)(unaff_ESI + 2)) &&
            (*(byte *)(unaff_ESI + 2) <= (byte)(bVar2 + 0x14))) &&
           (DAT_008ae964 = DAT_008ae964 + 1, cVar3 == '\x01')) {
          DAT_008ae972 = DAT_008ae972 + 1;
        }
        bVar2 = *(byte *)(unaff_ESI + 3);
        if ((bVar2 == pbVar5[2]) && (DAT_008ae962 = DAT_008ae962 + 1, cVar3 == '\x01')) {
          DAT_008ae970 = DAT_008ae970 + 1;
        }
        if ((((byte)(bVar2 + 4) <= pbVar5[2]) && (pbVar5[2] <= (byte)(bVar2 + 0x14))) &&
           (DAT_008ae964 = DAT_008ae964 + 1, cVar3 == '\x01')) {
          DAT_008ae972 = DAT_008ae972 + 1;
        }
      }
      else {
        DAT_008ae966 = DAT_008ae966 + 1;
        bVar2 = pbVar5[3];
        if (bVar2 == *(byte *)(unaff_ESI + 2)) {
          DAT_008ae968 = DAT_008ae968 + 1;
        }
        if (((byte)(bVar2 + 4) <= *(byte *)(unaff_ESI + 2)) &&
           (*(byte *)(unaff_ESI + 2) <= (byte)(bVar2 + 0x14))) {
          DAT_008ae96a = DAT_008ae96a + 1;
        }
        bVar2 = *(byte *)(unaff_ESI + 3);
        if (bVar2 == pbVar5[2]) {
          DAT_008ae968 = DAT_008ae968 + 1;
        }
        if (((byte)(bVar2 + 4) <= pbVar5[2]) && (pbVar5[2] <= (byte)(bVar2 + 0x14))) {
          DAT_008ae96a = DAT_008ae96a + 1;
        }
      }
    }
    pbVar1 = pbVar5 + 1;
    pbVar5 = pbVar5 + 8;
  } while ((*pbVar1 & 0x80) == 0);
  FUN_004508fd();
  FUN_004508fd();
  FUN_004509d3();
  return;
}

