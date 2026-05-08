
void FUN_0043fecb(void)

{
  undefined2 *puVar1;
  ushort uVar2;
  undefined2 uVar3;
  char cVar4;
  undefined2 extraout_CX;
  int extraout_ECX;
  short extraout_DX;
  short sVar5;
  uint uVar6;
  uint extraout_EDX;
  int unaff_ESI;
  int iVar7;
  
  if (*(short *)(unaff_ESI + 0x164) != 0) {
    return;
  }
  uVar6 = (uint)*(ushort *)(unaff_ESI + 0x30);
  iVar7 = uVar6 * 0x100;
  if ((&DAT_00743bbf)[iVar7] != '\t') {
    if (((&DAT_00743bbf)[iVar7] != '\x03') && ((&DAT_00743bbf)[iVar7] != '\a')) goto LAB_0043ff95;
LAB_0043ff0b:
    if (((&DAT_00887422)[(uint)(byte)(&DAT_00743bfc)[iVar7] * 0x130] & 1) == 0) goto LAB_0043ff95;
    uVar2 = *(ushort *)
             (&DAT_0088747e +
             (uint)(byte)(&DAT_00743bfe)[iVar7] * 2 + (uint)(byte)(&DAT_00743bfc)[iVar7] * 0x260);
    for (cVar4 = (&DAT_00743bff)[iVar7]; cVar4 != '\0'; cVar4 = cVar4 + -1) {
      uVar2 = *(ushort *)(&DAT_00743bd2 + (uint)uVar2 * 0x100);
    }
    uVar6 = (uint)(ushort)(&DAT_00743b9e)[(uint)uVar2 * 0x80];
    goto LAB_0043ffaf;
  }
  uVar6 = 0xffff;
  iVar7 = 0;
LAB_0043ffc3:
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
  if (uVar6 != 0xffff) {
    FUN_0044002c();
  }
  if (*(int *)(unaff_ESI + 8) != 0) {
    *(undefined2 *)(*(int *)(unaff_ESI + 8) + 0x12) = uVar3;
  }
  FUN_005e43de();
  return;
LAB_0043ff95:
  if (((&DAT_00743bbf)[iVar7] != '\x04') || ((&DAT_00743ba2)[uVar6 * 0x80] != -0x8000))
  goto LAB_0043ffa7;
  goto LAB_0043ff0b;
LAB_0043ffa7:
  if ((&DAT_00743ba2)[uVar6 * 0x80] == -0x8000) {
    uVar3 = FUN_00423677();
    sVar5 = extraout_DX + 0x20;
    uVar6 = CONCAT22(extraout_CX,uVar3) | 0x40000000;
  }
  else {
LAB_0043ffaf:
    uVar6 = uVar6 | 0xc0000000;
    sVar5 = 0;
  }
  iVar7 = (uint)CONCAT21(sVar5,(undefined1)DAT_00991f88) << 8;
  goto LAB_0043ffc3;
}

