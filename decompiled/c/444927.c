
void FUN_00444927(void)

{
  undefined2 uVar1;
  ushort in_AX;
  uint uVar2;
  uint in_ECX;
  undefined2 in_DX;
  undefined1 *unaff_ESI;
  uint uVar3;
  ushort *puVar4;
  
  if (in_AX == 0x8000) {
    uVar2 = 0x4000;
  }
  else {
    uVar2 = (uint)(ushort)((in_AX & 0xfe0) << 2 | (ushort)(in_ECX >> 5) & 0x7ff);
  }
  if (*(ushort *)(unaff_ESI + 0xe) == 0x8000) {
    uVar3 = 0x4000;
  }
  else {
    uVar3 = (uint)(ushort)((*(ushort *)(unaff_ESI + 0xe) & 0xfe0) << 2 |
                          *(ushort *)(unaff_ESI + 0x10) >> 5);
  }
  if (uVar2 != uVar3) {
    puVar4 = &DAT_00991f8e + uVar3;
    while (&DAT_00743b94 + (uint)*puVar4 * 0x100 != unaff_ESI) {
      puVar4 = &DAT_00743b96 + (uint)*puVar4 * 0x80;
    }
    *puVar4 = *(ushort *)(unaff_ESI + 2);
    LOCK();
    uVar1 = (&DAT_00991f8e)[uVar2];
    (&DAT_00991f8e)[uVar2] = *(undefined2 *)(unaff_ESI + 10);
    UNLOCK();
    *(undefined2 *)(unaff_ESI + 2) = uVar1;
  }
  if (in_AX != 0x8000) {
                    /* WARNING: Could not recover jumptable at 0x004449bb. Too many branches */
                    /* WARNING: Treating indirect jump as call */
    (*(code *)(&PTR_LAB_004449c4)[DAT_00991f88])();
    return;
  }
  *(undefined2 *)(unaff_ESI + 0x16) = 0x8000;
  *(undefined2 *)(unaff_ESI + 0xe) = 0x8000;
  *(short *)(unaff_ESI + 0x10) = (short)in_ECX;
  *(undefined2 *)(unaff_ESI + 0x12) = in_DX;
  return;
}

