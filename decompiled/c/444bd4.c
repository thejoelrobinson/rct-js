
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00444bd4(void)

{
  undefined2 uVar1;
  byte unaff_BL;
  uint uVar2;
  int iVar3;
  
  if ((unaff_BL & 2) == 0) {
    if (DAT_0087c3a0 < 1) {
      return;
    }
  }
  else if (DAT_0087c3a0 <= (short)(300 - _DAT_0087c3a6)) {
    return;
  }
  uVar2 = (uint)DAT_0087c394;
  iVar3 = uVar2 * 0x100;
  FUN_00444c74();
  (&DAT_00743ba2)[uVar2 * 0x80] = 0x8000;
  (&DAT_00743ba4)[uVar2 * 0x80] = 0x8000;
  (&DAT_00743ba6)[uVar2 * 0x80] = 0;
  LOCK();
  UNLOCK();
  uVar1 = (&DAT_00743b9e)[uVar2 * 0x80];
  (&DAT_00743b96)[uVar2 * 0x80] = DAT_00999f8e;
  DAT_00999f8e = uVar1;
  *(undefined2 *)(&DAT_00743bb6 + iVar3) = 0;
  (&DAT_00743ba8)[iVar3] = 0x10;
  (&DAT_00743b9d)[iVar3] = 0x14;
  (&DAT_00743ba9)[iVar3] = 8;
  *(undefined2 *)(&DAT_00743ba0 + iVar3) = 0;
  *(undefined2 *)(&DAT_00743baa + iVar3) = 0x8000;
  return;
}

