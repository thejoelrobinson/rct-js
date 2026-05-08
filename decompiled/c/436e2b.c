
void FUN_00436e2b(void)

{
  byte bVar1;
  uint uVar2;
  char cVar3;
  char cVar4;
  char cVar5;
  char cVar6;
  char cVar7;
  int unaff_EBX;
  int iVar8;
  uint uVar9;
  byte *pbVar10;
  
  uVar2 = FUN_005df40c();
  DAT_00628ae9 = (undefined1)(uVar2 >> 8);
  uVar9 = (uint)(ushort)((byte)((char)((ushort)((ushort)(byte)uVar2 *
                                               (ushort)(byte)(&DAT_00628aec)[unaff_EBX]) >> 8) +
                               (&DAT_00628af1)[unaff_EBX]) + 0x7097);
  iVar8 = uVar9 * 0x10;
  pbVar10 = (byte *)(&DAT_008dc0b4)[uVar9 * 4];
  cVar3 = (&DAT_008dc0b8)[iVar8];
  cVar4 = (&DAT_008dc0ba)[iVar8];
  if ((uVar2 & 0x100) != 0) {
    cVar3 = (&DAT_008dc0ba)[iVar8];
    cVar4 = (&DAT_008dc0b8)[iVar8];
  }
  uVar9 = uVar2 >> 0x10;
  cVar7 = (char)(uVar2 >> 0x10);
  cVar6 = (char)(uVar2 >> 0x18);
  if ((uVar2 & 0x100) == 0) {
    cVar5 = cVar3;
    if ((uVar2 & 0x200) == 0) {
      do {
        do {
          uVar2 = uVar9;
          bVar1 = *pbVar10;
          pbVar10 = pbVar10 + 1;
          if ((byte)(&DAT_00981efc)[uVar2] <= bVar1) {
            (&DAT_00981efc)[uVar2] = bVar1;
          }
          cVar6 = (char)uVar2 + '\x01';
          cVar5 = cVar5 + -1;
          uVar9 = CONCAT31((int3)(uVar2 >> 8),cVar6);
        } while (cVar5 != '\0');
        cVar4 = cVar4 + -1;
        uVar9 = (uint)CONCAT11((char)(uVar2 >> 8) + '\x01',cVar6 - cVar3);
        cVar5 = cVar3;
      } while (cVar4 != '\0');
      return;
    }
    uVar2 = (uint)CONCAT11(cVar6,cVar7 + cVar3 + -1);
    cVar6 = cVar3;
    do {
      do {
        uVar9 = uVar2;
        bVar1 = *pbVar10;
        pbVar10 = pbVar10 + 1;
        if ((byte)(&DAT_00981efc)[uVar9] <= bVar1) {
          (&DAT_00981efc)[uVar9] = bVar1;
        }
        cVar7 = (char)uVar9 + -1;
        cVar6 = cVar6 + -1;
        uVar2 = CONCAT31((int3)(uVar9 >> 8),cVar7);
      } while (cVar6 != '\0');
      cVar4 = cVar4 + -1;
      uVar2 = (uint)CONCAT11((char)(uVar9 >> 8) + '\x01',cVar7 + cVar3);
      cVar6 = cVar3;
    } while (cVar4 != '\0');
    return;
  }
  cVar5 = cVar4;
  if ((uVar2 & 0x200) == 0) {
    do {
      do {
        bVar1 = *pbVar10;
        pbVar10 = pbVar10 + 1;
        if ((byte)(&DAT_00981efc)[uVar9] <= bVar1) {
          (&DAT_00981efc)[uVar9] = bVar1;
        }
        cVar6 = (char)uVar9;
        cVar7 = (char)(uVar9 >> 8) + '\x01';
        uVar9 = (uint)CONCAT11(cVar7,cVar6);
        cVar5 = cVar5 + -1;
      } while (cVar5 != '\0');
      uVar9 = (uint)CONCAT11(cVar7 - cVar4,cVar6 + '\x01');
      cVar3 = cVar3 + -1;
      cVar5 = cVar4;
    } while (cVar3 != '\0');
    return;
  }
  uVar2 = (uint)CONCAT11(cVar6 + cVar4 + -1,cVar7);
  cVar6 = cVar4;
  do {
    do {
      bVar1 = *pbVar10;
      pbVar10 = pbVar10 + 1;
      if ((byte)(&DAT_00981efc)[uVar2] <= bVar1) {
        (&DAT_00981efc)[uVar2] = bVar1;
      }
      cVar7 = (char)uVar2;
      cVar5 = (char)(uVar2 >> 8) + -1;
      uVar2 = (uint)CONCAT11(cVar5,cVar7);
      cVar6 = cVar6 + -1;
    } while (cVar6 != '\0');
    uVar2 = (uint)CONCAT11(cVar5 + cVar4,cVar7 + '\x01');
    cVar3 = cVar3 + -1;
    cVar6 = cVar4;
  } while (cVar3 != '\0');
  return;
}

