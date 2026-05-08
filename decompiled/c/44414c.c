
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0044414c(void)

{
  byte bVar1;
  ushort uVar2;
  undefined4 uVar3;
  byte *extraout_ECX;
  byte *pbVar4;
  int unaff_ESI;
  byte *pbVar5;
  byte *pbVar6;
  undefined1 uVar7;
  bool bVar8;
  
  bVar8 = true;
  uVar3 = FUN_005e5fcb();
  if (!bVar8) {
    if ((short)uVar3 == *(short *)(unaff_ESI + 0x15a)) {
      return;
    }
    uVar3 = FUN_005e5bd8();
  }
  FUN_005e3c3c();
  *(undefined **)(unaff_ESI + 0x1c) = &DAT_00630774;
  *(uint *)(unaff_ESI + 0xc) = *(uint *)(unaff_ESI + 0xc) | 0x734;
  *(uint *)(unaff_ESI + 0x18) = *(uint *)(unaff_ESI + 0x18) | 0x300;
  FUN_005e412c();
  *(short *)(unaff_ESI + 0x15a) = (short)uVar3;
  _DAT_0063078e = CONCAT22((short)((uint)uVar3 >> 0x10),(short)uVar3 + 0x982);
  *(undefined2 *)(unaff_ESI + 0x15c) = 2;
  *(undefined2 *)(unaff_ESI + 0x15e) = 0xffff;
  _DAT_00630880 = 0xffff;
  pbVar5 = &DAT_00887420;
  bVar1 = 0;
  pbVar4 = &DAT_00630880;
  do {
    if ((*pbVar5 != 0xff) && ((*(uint *)(&DAT_005f5b78 + (uint)*pbVar5 * 8) & 0x3820000) == 0)) {
      *pbVar4 = bVar1;
      pbVar4 = pbVar4 + 1;
    }
    pbVar5 = pbVar5 + 0x260;
    bVar1 = bVar1 + 1;
  } while (bVar1 != 0xff);
  *pbVar4 = 0xff;
  pbVar5 = extraout_ECX;
  for (; &DAT_006308a8 < pbVar4; pbVar4 = pbVar4 + -1) {
    pbVar6 = &DAT_00630880;
    uVar2 = 0xffff;
    do {
      if ((ushort)(&DAT_00887516)[(uint)*pbVar6 * 0x130] <= uVar2) {
        uVar2 = (&DAT_00887516)[(uint)*pbVar6 * 0x130];
        pbVar5 = pbVar6;
      }
      pbVar6 = pbVar6 + 1;
    } while (pbVar6 < pbVar4);
    do {
      *pbVar5 = pbVar5[1];
      pbVar5 = pbVar5 + 1;
    } while (pbVar5 < pbVar4);
  }
  pbVar4 = &DAT_00630881;
  do {
    if (*pbVar4 == 0xff) {
      return;
    }
    DAT_00971e86 = (&DAT_00887444)[(uint)*pbVar4 * 0x98];
    FUN_00458bcf();
    pbVar5 = pbVar4;
    while (pbVar6 = pbVar5 + -1, &DAT_0063087f < pbVar6) {
      uVar7 = 0;
      DAT_00971e86 = (&DAT_00887444)[(uint)*pbVar6 * 0x98];
      FUN_00458bcf();
      FUN_0045a94c();
      if (!(bool)uVar7) break;
      LOCK();
      bVar1 = *pbVar5;
      *pbVar5 = *pbVar6;
      UNLOCK();
      *pbVar6 = bVar1;
      pbVar5 = pbVar6;
    }
    pbVar4 = pbVar4 + 1;
  } while( true );
}

