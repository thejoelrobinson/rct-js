
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_005ddcbe(void)

{
  ushort uVar1;
  int iVar2;
  int unaff_ESI;
  uint uVar3;
  int iVar4;
  
  uVar3 = (uint)*(byte *)(unaff_ESI + 0x30);
  iVar4 = uVar3 * 0x260;
  if (((((&DAT_00887422)[uVar3 * 0x130] & 0x480) == 0) &&
      ((*(uint *)(&DAT_005f5b78 + (uint)(byte)(&DAT_00887420)[iVar4] * 8) & 0x8000000) != 0)) &&
     (*(short *)(unaff_ESI + 0xd0) = *(short *)(unaff_ESI + 0xd0) + 1,
     ((&DAT_00887422)[uVar3 * 0x130] & 0x800) == 0)) {
    uVar1 = 0x2580;
    if ((&DAT_00887420)[iVar4] == '\b') {
      uVar1 = 0x3c00;
    }
    if (uVar1 < *(ushort *)(unaff_ESI + 0xd0)) {
      (&DAT_00887422)[uVar3 * 0x130] = (&DAT_00887422)[uVar3 * 0x130] | 0x800;
      DAT_00971e86._0_2_ = *(short *)(&DAT_005f5802 + (uint)(byte)(&DAT_00887420)[iVar4] * 8) + 6;
      iVar2 = 0;
      while (*(short *)(unaff_ESI + 10) != *(short *)(&DAT_0088747e + iVar2 * 2 + iVar4)) {
        iVar2 = iVar2 + 1;
      }
      DAT_00971e86._2_2_ = (short)iVar2 + 1;
      DAT_00971e8a._0_2_ = (&DAT_00887442)[uVar3 * 0x130];
      unique0x00017200 = (&DAT_00887444)[uVar3 * 0x98];
      DAT_00971e90 = *(undefined2 *)(&DAT_005f5806 + (uint)(byte)(&DAT_00887420)[iVar4] * 8);
      FUN_0042c711(iVar4);
    }
  }
  return;
}

