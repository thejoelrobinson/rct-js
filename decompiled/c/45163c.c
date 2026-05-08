
void FUN_0045163c(void)

{
  byte bVar1;
  uint uVar2;
  ushort uVar3;
  uint uVar4;
  uint uVar5;
  ushort extraout_CX;
  ushort uVar6;
  short sVar7;
  int unaff_ESI;
  char cStack_10;
  
  (**(code **)(unaff_ESI + 4))();
  sVar7 = 0;
  uVar5 = 0xff00;
  do {
    bVar1 = (&DAT_005f5560)[uVar5 & 0xff];
    uVar4 = CONCAT31((int3)(uVar5 >> 8),bVar1);
    uVar2 = (uint)bVar1;
    if ((DAT_00631d0c == (&DAT_005f5d05)[uVar2 * 8]) &&
       ((*(byte *)((int)&DAT_0087c3dc + ((int)(uVar2 & 0x1f) >> 3) + (uint)(bVar1 >> 5) * 4) >>
         (uVar2 & 7) & 1) != 0)) {
      if ((char)(uVar5 >> 8) == -1) {
        uVar4 = (uint)CONCAT11(bVar1,bVar1);
      }
      if ((char)uVar4 == (&DAT_00631d0d)[DAT_00631d0c]) goto LAB_004516ad;
      sVar7 = sVar7 + 1;
    }
    cStack_10 = (char)uVar5;
    uVar5 = CONCAT31((int3)(uVar4 >> 8),cStack_10 + 1U);
  } while ((byte)(cStack_10 + 1U) < 0x31);
  (&DAT_00631d0d)[DAT_00631d0c] = (char)(uVar4 >> 8);
  sVar7 = 0;
LAB_004516ad:
  uVar3 = (DAT_00631bac - DAT_00631baa) - 1;
  uVar6 = extraout_CX - uVar3;
  if (extraout_CX < uVar3) {
    uVar6 = 0;
  }
  uVar3 = sVar7 * 0x7a;
  if (uVar6 < (ushort)(sVar7 * 0x7a)) {
    uVar3 = uVar6;
  }
  *(ushort *)(unaff_ESI + 0x36) = uVar3;
  FUN_005e4198();
  return;
}

