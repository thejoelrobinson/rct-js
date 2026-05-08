
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_004429db(void)

{
  int *piVar1;
  uint uVar2;
  int unaff_EBX;
  bool bVar3;
  
  uVar2 = ((uint)((int)&DAT_0070093a - DAT_0087c3b4) >> 5 |
          ((int)&DAT_0070093a - DAT_0087c3b4) * 0x8000000) - DAT_0087c3b8;
  uVar2 = (uVar2 >> 7 | uVar2 * 0x2000000) + DAT_0087d0c8;
  if ((uVar2 >> 3 | uVar2 * 0x20000000) != DAT_0087d79c) {
    if (-1 < DAT_0087c3b4) {
      DAT_0087c3b4 = -DAT_0087c3b4;
    }
    return;
  }
  if (DAT_0099c163 == '\0') {
    bVar3 = SBORROW4(DAT_0087c3b4,unaff_EBX);
    DAT_0087c3b4 = DAT_0087c3b4 - unaff_EBX;
    if (bVar3) {
      DAT_0087c3b4 = DAT_0087c3b4 + unaff_EBX;
      return;
    }
    uVar2 = (uint)DAT_0099c167;
    piVar1 = (int *)((int)&DAT_0087c820 + uVar2);
    *piVar1 = *piVar1 - unaff_EBX;
    if ((*(uint *)(&DAT_00630828 + uVar2) & 1) != 0) {
      DAT_0087d304 = DAT_0087d304 - unaff_EBX;
    }
    _DAT_005f54ec = _DAT_005f54ec | 1;
    FUN_005e5301();
    FUN_004447f6();
  }
  return;
}

