
undefined8 FUN_00448bbc(void)

{
  byte *pbVar1;
  byte bVar2;
  byte bVar3;
  ushort uVar4;
  undefined4 in_EAX;
  undefined4 in_EDX;
  uint uVar5;
  byte *pbVar6;
  byte *pbVar7;
  int iVar8;
  
  for (pbVar6 = &DAT_00630be0; pbVar6 < DAT_00630bdc; pbVar6 = pbVar6 + 1) {
    bVar2 = *pbVar6;
    iVar8 = (uint)bVar2 * 0x260;
    if ((&DAT_00887420)[iVar8] != -1) {
      uVar5 = 0;
      do {
        uVar4 = (&DAT_00887462)[(uint)bVar2 * 0x130 + uVar5];
        if (uVar4 != 0xffff) {
          bVar3 = (&DAT_00887452)[iVar8 + uVar5];
          pbVar7 = (byte *)(&DAT_00971ef4)
                           [(ushort)((ushort)((uVar4 >> 8) << 0xc | (uVar4 & 0xff) << 5) >> 5 |
                                    ((ushort)((uVar4 >> 8) << 5) >> 9) << 0xb)];
          do {
            if ((((*pbVar7 & 0x3c) == 0x10) && (bVar3 == pbVar7[2])) && (pbVar7[4] == 0)) {
              FUN_00448a45();
            }
            pbVar1 = pbVar7 + 1;
            pbVar7 = pbVar7 + 8;
          } while ((*pbVar1 & 0x80) == 0);
        }
        uVar5 = uVar5 + 1;
      } while (uVar5 < 4);
    }
  }
  return CONCAT44(in_EDX,in_EAX);
}

