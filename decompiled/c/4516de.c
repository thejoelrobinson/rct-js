
void FUN_004516de(void)

{
  uint uVar1;
  byte bVar2;
  char cVar3;
  byte extraout_CL;
  uint uVar4;
  uint uVar5;
  byte *unaff_ESI;
  bool bVar6;
  
  DAT_00631c72 = 3;
  if (DAT_008d7eb6 != '\0') {
    DAT_00631c72 = 0x1e;
  }
  uVar5 = (uint)*unaff_ESI;
  uVar4 = *(uint *)(&DAT_005f5658 + uVar5 * 4);
  if (((uVar5 == 8) && (unaff_ESI[1] != 0xf)) && (unaff_ESI[1] != 9)) {
    uVar4 = 0;
  }
  cVar3 = '\0';
  while( true ) {
    uVar1 = 0;
    if (uVar4 != 0) {
      for (; (uVar4 >> uVar1 & 1) == 0; uVar1 = uVar1 + 1) {
      }
    }
    if (uVar4 == 0) break;
    uVar4 = uVar4 & ~(1 << (uVar1 & 0x1f));
    cVar3 = cVar3 + (&DAT_00631c6c)[uVar1];
  }
  if (cVar3 != '\0') {
    bVar2 = FUN_005df40c();
    bVar2 = (byte)((ushort)((ushort)bVar2 * (ushort)extraout_CL) >> 8);
    uVar4 = *(uint *)(&DAT_005f5658 + uVar5 * 4);
    do {
      uVar5 = 0;
      if (uVar4 != 0) {
        for (; (uVar4 >> uVar5 & 1) == 0; uVar5 = uVar5 + 1) {
        }
      }
      uVar4 = uVar4 & ~(1 << (uVar5 & 0x1f));
      bVar6 = (byte)(&DAT_00631c6c)[uVar5] <= bVar2;
      bVar2 = bVar2 - (&DAT_00631c6c)[uVar5];
    } while (bVar6);
    return;
  }
  return;
}

