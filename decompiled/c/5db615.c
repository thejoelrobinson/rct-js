
undefined4 FUN_005db615(void)

{
  byte *pbVar1;
  byte bVar2;
  char cVar3;
  ushort uVar4;
  char cVar5;
  undefined4 in_EAX;
  ushort in_DX;
  ushort unaff_BX;
  ushort uVar6;
  byte *pbVar7;
  int unaff_ESI;
  
  uVar4 = *(ushort *)(unaff_ESI + 0x3c) >> 2;
  uVar6 = in_DX << 7 | in_DX >> 9 | unaff_BX;
  pbVar7 = (byte *)(&DAT_00971ef4)[(ushort)(uVar6 >> 5 | uVar6 << 0xb)];
  do {
    bVar2 = (byte)uVar4;
    if ((*pbVar7 & 0x3c) == 0) {
      uVar4 = CONCAT11(pbVar7[5],bVar2) & 0x1fff;
      cVar3 = (char)uVar4;
      cVar5 = (char)(uVar4 >> 8) * '\x04';
      uVar4 = CONCAT11(cVar5,cVar3);
      if (cVar3 != cVar5) {
        return in_EAX;
      }
    }
    else {
      uVar4 = CONCAT11(pbVar7[2] - 4,bVar2);
      if (((byte)(pbVar7[2] - 4) < bVar2) &&
         (uVar4 = CONCAT11(pbVar7[3] + 4,bVar2), bVar2 < (byte)(pbVar7[3] + 4))) {
        return in_EAX;
      }
    }
    pbVar1 = pbVar7 + 1;
    pbVar7 = pbVar7 + 8;
    if ((*pbVar1 & 0x80) != 0) {
      return in_EAX;
    }
  } while( true );
}

