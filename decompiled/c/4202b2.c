
void FUN_004202b2(void)

{
  byte *pbVar1;
  short sVar2;
  ushort uVar3;
  short extraout_CX;
  ushort uVar4;
  ushort uVar5;
  uint uVar6;
  byte bVar7;
  ushort extraout_DX;
  int iVar8;
  int iVar9;
  int unaff_EDI;
  
  uVar6 = 0;
  do {
    if (*(short *)(unaff_EDI + uVar6 * 2 + 0x2a) != -1) {
      bVar7 = *(byte *)(unaff_EDI + uVar6 * 2 + 0x32);
      sVar2 = FUN_00423677();
      if ((ushort)((ushort)bVar7 << 2) < extraout_DX) {
        return;
      }
      uVar4 = extraout_CX - 0xa0;
      iVar9 = 0;
      uVar5 = sVar2 - 0xa0;
      do {
        do {
          uVar3 = uVar5;
          iVar8 = iVar9;
          if ((uVar3 < 0xfff) && (uVar4 < 0xfff)) {
            uVar5 = uVar4 << 7 | uVar4 >> 9 | uVar3;
            iVar9 = (&DAT_00971ef4)[(ushort)(uVar5 >> 5 | uVar5 << 0xb)];
            do {
              pbVar1 = (byte *)(iVar9 + 1);
              iVar9 = iVar9 + 8;
            } while ((*pbVar1 & 0x80) == 0);
          }
          bVar7 = (char)iVar8 + 1;
          iVar9 = CONCAT31((int3)((uint)iVar8 >> 8),bVar7);
          uVar5 = uVar3 + 0x20;
        } while (bVar7 < 0xb);
        uVar4 = uVar4 + 0x20;
        bVar7 = (char)((uint)iVar8 >> 8) + 1;
        iVar9 = (uint)bVar7 << 8;
        uVar5 = uVar3 - 0x140;
      } while (bVar7 < 0xb);
      return;
    }
    uVar6 = uVar6 + 1;
  } while (uVar6 < 4);
  return;
}

