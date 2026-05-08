
void FUN_00428c0b(void)

{
  undefined2 *puVar1;
  undefined2 uVar2;
  int iVar3;
  int extraout_ECX;
  uint uVar4;
  uint extraout_EDX;
  int unaff_ESI;
  
  if (*(short *)(unaff_ESI + 0x164) == 0) {
    iVar3 = 0;
    uVar4 = 0xffff;
    if (DAT_0087c3c2 != -0x8000) {
      uVar4 = CONCAT22(DAT_0087c3c4 + 0x10,DAT_0087c3c2 + 0x10) | 0x40000000;
      iVar3 = (uint)CONCAT21(DAT_0087c3c6 + 0x20,(undefined1)DAT_00991f88) << 8;
    }
    if (*(int *)(unaff_ESI + 8) == 0) {
      uVar2 = 0;
      if (DAT_005f8d5c == '\x01') {
        uVar2 = 0x100;
      }
    }
    else {
      if ((uVar4 == *(uint *)(unaff_ESI + 0x15c)) && (iVar3 == *(int *)(unaff_ESI + 0x160))) {
        return;
      }
      LOCK();
      puVar1 = *(undefined2 **)(unaff_ESI + 8);
      *(undefined4 *)(unaff_ESI + 8) = 0;
      UNLOCK();
      *puVar1 = 0;
      uVar2 = FUN_005e6a83();
      iVar3 = extraout_ECX;
      uVar4 = extraout_EDX;
    }
    *(uint *)(unaff_ESI + 0x15c) = uVar4;
    *(int *)(unaff_ESI + 0x160) = iVar3;
    if (uVar4 != 0xffff) {
      FUN_00428cc9();
    }
    if (*(int *)(unaff_ESI + 8) != 0) {
      *(undefined2 *)(*(int *)(unaff_ESI + 8) + 0x12) = uVar2;
    }
    FUN_005e43de();
  }
  return;
}

