
void FUN_0044ba3c(void)

{
  uint uVar1;
  uint uVar2;
  int unaff_ESI;
  
  uVar1 = 0;
  uVar2 = (uint)(byte)(&DAT_00887420)[(uint)*(ushort *)(unaff_ESI + 0x30) * 0x260];
  if ((*(uint *)(&DAT_005f5b78 + uVar2 * 8) & 0x200) == 0) {
    uVar1 = 0x200;
  }
  if ((*(uint *)(&DAT_005f5b78 + uVar2 * 8) & 0x2000) != 0) {
    uVar1 = uVar1 | 0x20;
  }
  if ((*(uint *)(&DAT_005f5b78 + uVar2 * 8) & 0x4000007) == 0) {
    uVar1 = uVar1 | 0x80;
  }
  if ((*(uint *)(&DAT_005f5b78 + uVar2 * 8) & 0x20000) != 0) {
    uVar1 = uVar1 | 0x140;
  }
  *(uint *)(unaff_ESI + 0x10) = uVar1;
  return;
}

