
void FUN_00431ad7(void)

{
  ushort uVar1;
  undefined2 uVar2;
  undefined2 uVar3;
  undefined2 uVar4;
  undefined2 uVar5;
  undefined2 uVar6;
  byte bVar7;
  uint uVar8;
  int iVar9;
  int iVar10;
  
  iVar10 = DAT_00981ef8;
  iVar9 = DAT_00628920;
  if (DAT_00628920 != 0) {
    uVar2 = *(undefined2 *)(DAT_00981ef8 + 4);
    uVar3 = *(undefined2 *)(DAT_00981ef8 + 6);
    uVar4 = *(undefined2 *)(DAT_00981ef8 + 8);
    uVar5 = *(undefined2 *)(DAT_00981ef8 + 10);
    uVar6 = *(undefined2 *)(DAT_00981ef8 + 0xe);
    LOCK();
    uVar1 = *(ushort *)(DAT_00981ef8 + 0xe);
    *(ushort *)(DAT_00981ef8 + 0xe) = 0;
    uVar8 = (uint)uVar1;
    UNLOCK();
    bVar7 = (byte)uVar1;
    *(short *)(iVar10 + 4) = *(short *)(iVar10 + 4) >> (bVar7 & 0x1f);
    *(short *)(iVar10 + 6) = *(short *)(iVar10 + 6) >> (bVar7 & 0x1f);
    *(short *)(iVar10 + 8) = *(short *)(iVar10 + 8) >> (bVar7 & 0x1f);
    *(short *)(iVar10 + 10) = *(short *)(iVar10 + 10) >> (bVar7 & 0x1f);
    do {
      FUN_00458bcf(iVar9,iVar10,*(undefined2 *)(iVar9 + 8),*(undefined2 *)(iVar9 + 6),uVar8);
      DAT_00971e84 = 0xe0;
      FUN_009bafe6();
      iVar9 = *(int *)(iVar9 + 2);
    } while (iVar9 != 0);
    *(undefined2 *)(iVar10 + 0xe) = uVar6;
    *(undefined2 *)(iVar10 + 10) = uVar5;
    *(undefined2 *)(iVar10 + 8) = uVar4;
    *(undefined2 *)(iVar10 + 6) = uVar3;
    *(undefined2 *)(iVar10 + 4) = uVar2;
  }
  return;
}

