
void FUN_0044c464(void)

{
  undefined2 *puVar1;
  byte bVar2;
  undefined2 uVar3;
  undefined2 extraout_CX;
  int extraout_ECX;
  undefined2 extraout_DX;
  uint extraout_EDX;
  int iVar4;
  int unaff_ESI;
  uint uVar6;
  int iVar7;
  int iVar5;
  
  if (*(short *)(unaff_ESI + 0x164) != 0) {
    return;
  }
  uVar6 = (uint)*(ushort *)(unaff_ESI + 0x30);
  iVar7 = uVar6 * 0x260;
  bVar2 = (char)*(undefined2 *)(unaff_ESI + 0x15a) - 1;
  if (-1 < (char)bVar2) {
    if (bVar2 < (byte)(&DAT_00887498)[iVar7]) {
      if (((&DAT_00887422)[uVar6 * 0x130] & 1) != 0) {
        uVar6 = *(ushort *)
                 (&DAT_0088747e +
                 (uint)CONCAT11((char)((ushort)*(undefined2 *)(unaff_ESI + 0x15a) >> 8),bVar2) * 2 +
                 iVar7) | 0xc0000000;
        iVar7 = (uint)(byte)DAT_00991f88 << 8;
        goto LAB_0044c557;
      }
      *(undefined2 *)(unaff_ESI + 0x15a) = 0;
    }
    else {
      bVar2 = bVar2 - (&DAT_00887498)[iVar7];
      if (bVar2 < (byte)(&DAT_00887497)[iVar7]) {
        iVar4 = -1;
        do {
          do {
            iVar5 = iVar4;
            iVar4 = iVar5 + 1;
          } while ((&DAT_0088744a)[uVar6 * 0x130 + iVar4] == -1);
          bVar2 = bVar2 - 1;
        } while (-1 < (char)bVar2);
        uVar6 = CONCAT22(((ushort)(&DAT_0088744a)[uVar6 * 0x130 + iVar4] >> 8) << 5,
                         ((&DAT_0088744a)[uVar6 * 0x130 + iVar4] & 0xff) << 5) | 0x40000000;
        iVar7 = (uint)CONCAT21((short)(((uint)(byte)(&DAT_00887453)[iVar7 + iVar5] << 0x12) >> 0x10)
                               ,(byte)DAT_00991f88) << 8;
        goto LAB_0044c557;
      }
      *(undefined2 *)(unaff_ESI + 0x15a) = 0;
    }
  }
  uVar3 = FUN_00423677();
  uVar6 = CONCAT22(extraout_CX,uVar3) | 0x40000000;
  iVar7 = CONCAT22(extraout_DX,CONCAT11((byte)DAT_00991f88,1));
LAB_0044c557:
  if (*(int *)(unaff_ESI + 8) == 0) {
    uVar3 = 0;
    if (DAT_005f8d5c == '\x01') {
      uVar3 = 0x100;
    }
  }
  else {
    if ((uVar6 == *(uint *)(unaff_ESI + 0x15c)) && (iVar7 == *(int *)(unaff_ESI + 0x160))) {
      return;
    }
    LOCK();
    puVar1 = *(undefined2 **)(unaff_ESI + 8);
    *(undefined4 *)(unaff_ESI + 8) = 0;
    UNLOCK();
    *puVar1 = 0;
    uVar3 = FUN_005e6a83();
    iVar7 = extraout_ECX;
    uVar6 = extraout_EDX;
  }
  *(uint *)(unaff_ESI + 0x15c) = uVar6;
  *(int *)(unaff_ESI + 0x160) = iVar7;
  FUN_0044bacd();
  if (*(int *)(unaff_ESI + 8) != 0) {
    *(undefined2 *)(*(int *)(unaff_ESI + 8) + 0x12) = uVar3;
    FUN_005e43de();
  }
  return;
}

