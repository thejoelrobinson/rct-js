
void FUN_0045174b(void)

{
  byte in_DL;
  int unaff_EBX;
  uint uVar1;
  int iVar2;
  
  uVar1 = (uint)in_DL;
  iVar2 = uVar1 * 0x260;
  if (((&DAT_00887422)[uVar1 * 0x130] & 0x4c0) == 0) {
    (&DAT_00887422)[uVar1 * 0x130] = (&DAT_00887422)[uVar1 * 0x130] & 0xfeff;
    (&DAT_00887422)[uVar1 * 0x130] = (&DAT_00887422)[uVar1 * 0x130] | 0x40;
    (&DAT_0088755c)[iVar2] = (char)unaff_EBX;
    (&DAT_0088755d)[iVar2] = 0;
    (&DAT_0088757c)[iVar2] = 0;
    (&DAT_0088757d)[iVar2] = 0;
                    /* WARNING: Could not recover jumptable at 0x0045178f. Too many branches */
                    /* WARNING: Treating indirect jump as call */
    (*(code *)(&PTR_LAB_00451798)[unaff_EBX])();
    return;
  }
  return;
}

