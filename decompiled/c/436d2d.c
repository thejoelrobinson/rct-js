
void FUN_00436d2d(void)

{
  short sVar1;
  undefined4 uVar2;
  undefined4 uVar3;
  char cVar4;
  ushort uVar5;
  short sVar6;
  byte bVar8;
  int iVar7;
  ushort uVar9;
  byte bVar11;
  int iVar10;
  undefined4 *puVar12;
  int iVar13;
  char cVar14;
  
  puVar12 = (undefined4 *)&DAT_00981efc;
  for (iVar7 = 0x2000; iVar7 != 0; iVar7 = iVar7 + -1) {
    *puVar12 = 0x5050505;
    puVar12 = puVar12 + 1;
  }
  uVar5 = FUN_005df40c();
  uVar3 = DAT_006e3b8c;
  uVar2 = DAT_006e3b88;
  sVar6 = (uVar5 & 0x1ff) + 0x28;
  DAT_00628aea = 0;
  do {
    FUN_00436e2b();
    sVar6 = sVar6 + -1;
  } while (sVar6 != 0);
  iVar10 = 0x101;
  iVar7 = 0x81;
  DAT_006e3b88 = uVar2;
  DAT_006e3b8c = uVar3;
  do {
    do {
      iVar13 = iVar7;
      sVar6 = *(short *)(iVar10 + 0x981dfb);
      sVar1 = *(short *)((int)&DAT_00981ef8 + iVar10 + 3);
      bVar8 = (byte)((ushort)sVar1 >> 8);
      bVar11 = (byte)sVar1;
      if (bVar8 <= (byte)sVar1) {
        bVar11 = bVar8;
      }
      if ((byte)sVar6 <= bVar11) {
        bVar11 = (byte)sVar6;
      }
      bVar8 = (byte)((ushort)sVar6 >> 8);
      if (bVar8 <= bVar11) {
        bVar11 = bVar8;
      }
      uVar5 = sVar1 - CONCAT11(bVar11,bVar11);
      uVar9 = sVar6 - CONCAT11(bVar11,bVar11);
      cVar14 = (char)uVar5 == '\x02';
      if ((bool)cVar14) {
        uVar5 = CONCAT11((char)(uVar5 >> 8),1);
      }
      if ((char)(uVar5 >> 8) == '\x02') {
        uVar5 = CONCAT11(1,(char)uVar5);
        cVar14 = cVar14 + '\x01';
      }
      if ((char)uVar9 == '\x02') {
        uVar9 = CONCAT11((char)(uVar9 >> 8),1);
        cVar14 = cVar14 + '\x01';
      }
      if ((char)(uVar9 >> 8) == '\x02') {
        uVar9 = CONCAT11(1,(char)uVar9);
        cVar14 = cVar14 + '\x01';
      }
      cVar4 = bVar11 * '\x04';
      iVar7 = (&DAT_00971ef4)[iVar13];
      *(char *)(iVar7 + 2) = cVar4;
      if ((((uVar5 & 1) != 0 || (uVar9 & 1) != 0) || (uVar9 & 0x100) != 0) || (uVar5 & 0x100) != 0)
      {
        cVar4 = cVar4 + '\x04';
      }
      if ((cVar14 << 1 & 2U) != 0) {
        cVar4 = cVar4 + '\x04';
      }
      *(char *)(iVar7 + 3) = cVar4;
      *(byte *)(iVar7 + 4) =
           (((cVar14 << 1 | (byte)uVar5 & 1) << 1 | (byte)uVar9 & 1) << 1 | (byte)(uVar9 >> 8) & 1)
           << 1 | (byte)(uVar5 >> 8) & 1;
      iVar10 = iVar10 + 1;
      iVar7 = iVar13 + 1;
    } while ((byte)iVar10 < 0x7f);
    bVar11 = (char)((uint)iVar10 >> 8) + 1;
    iVar10 = CONCAT22((short)((uint)iVar10 >> 0x10),CONCAT11(bVar11,1));
    iVar7 = iVar13 + 3;
  } while (bVar11 < 0x7f);
  return;
}

