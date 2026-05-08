
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_004367cb(void)

{
  short in_AX;
  short in_CX;
  
  if ((((in_AX < 0xfe0) && (in_CX < 0xfe0)) && (0x1f < in_AX)) && (0x1f < in_CX)) {
    _DAT_00991f04 = 0xffff;
    _DAT_00991f08 = 0xffff;
    _DAT_00991f0c = 0xffff;
    _DAT_00991f10 = 0xffff;
    _DAT_00991f14 = 0xffff;
    _DAT_00991f18 = 0xffff;
    _DAT_00991f1c = 0xffff;
    _DAT_00991f20 = 0xffff;
    _DAT_00991f24 = 0xffff;
    _DAT_00991f28 = 0xffff;
    _DAT_00991f2c = 0xffff;
    _DAT_0099c165 = 0;
    DAT_00999f9a._0_1_ = 0xff;
    DAT_00999fdc._0_1_ = 0xff;
    DAT_0099a01e = 0xff;
                    /* WARNING: Could not recover jumptable at 0x004368c0. Too many branches */
                    /* WARNING: Treating indirect jump as call */
    DAT_00991f72 = in_AX;
    DAT_00991f76 = in_CX;
    DAT_00991f7c._0_2_ = in_AX;
    DAT_00991f7c._2_2_ = in_CX;
    (*(code *)(&PTR_LAB_004368c8)[DAT_00991f88])();
    return;
  }
                    /* WARNING: Could not recover jumptable at 0x00436a84. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  (*(code *)(&PTR_LAB_00436a8c)[DAT_00991f88])();
  return;
}

