
void FUN_005dde9c(void)

{
  ushort uVar1;
  short *psVar2;
  short sVar3;
  ushort *puVar4;
  ushort *puVar5;
  undefined1 *puVar6;
  uint uVar7;
  
  uVar7 = 0;
  do {
    puVar5 = (ushort *)(&PTR_DAT_006e2758)[uVar7];
    puVar4 = (ushort *)(&PTR_DAT_006e2788)[uVar7];
    while( true ) {
      uVar1 = *puVar5;
      if (uVar1 == 0xffff) break;
      if ((*(byte *)((uint)(uVar1 >> 5) * 4 + 0x87cba8 + ((int)(uVar1 & 0x1f) >> 3)) >> (uVar1 & 7)
          & 1) != 0) {
        *puVar4 = uVar1;
        puVar4 = puVar4 + 1;
      }
      puVar5 = puVar5 + 1;
    }
    *puVar4 = 0xffff;
    uVar7 = uVar7 + 1;
  } while (uVar7 < 0xc);
  uVar7 = 0;
  puVar6 = &DAT_006e1d80;
  sVar3 = 4;
  do {
    psVar2 = (short *)(&PTR_DAT_006e2788)[uVar7];
    *puVar6 = 0;
    if (*psVar2 != -1) {
      *puVar6 = 5;
      *(short *)(puVar6 + 2) = sVar3;
      *(short *)(puVar6 + 4) = sVar3 + 0x22;
      sVar3 = sVar3 + 0x23;
    }
    uVar7 = uVar7 + 1;
    puVar6 = puVar6 + 0x10;
  } while (uVar7 < 0xc);
  FUN_005e5301();
  return;
}

