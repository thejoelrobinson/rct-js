
void FUN_004406bd(void)

{
  byte in_AL;
  undefined2 uVar1;
  uint unaff_EBX;
  uint uVar2;
  
  FUN_00440659();
  if (in_AL == 0) {
    DAT_0062d2fa = 0;
    uVar2 = unaff_EBX & 0xff;
    uVar1 = 0x5bf;
    if ((*(uint *)(&DAT_005f5b78 + (uint)(byte)(&DAT_00887420)[uVar2 * 0x260] * 8) & 0x400000) != 0)
    {
      uVar1 = 0x5c0;
    }
    DAT_0062d2de = CONCAT22((&DAT_00887442)[uVar2 * 0x130],uVar1);
    DAT_0062d2e2 = (&DAT_00887444)[uVar2 * 0x98];
    DAT_0062d2fc = 0xffff;
    DAT_0062d2fe = 0;
    DAT_0062d2ff = 0;
    return;
  }
  if (in_AL != 1) {
    if (2 < in_AL) {
      DAT_0062d2fa = 1;
      DAT_0062d2de = (uint)(ushort)(((ushort)unaff_EBX & 0xff) + 0x5eb);
      DAT_0062d2e2 = 0;
      DAT_0062d2fc = 0xffff;
      DAT_0062d2fe = 0;
      DAT_0062d2ff = 1;
      return;
    }
    DAT_0062d2fa = 1;
    DAT_0062d2de = CONCAT22((&DAT_00887442)[(unaff_EBX & 0xff) * 0x130],0xffff);
    DAT_0062d2e2 = (&DAT_00887444)[(unaff_EBX & 0xff) * 0x98];
    DAT_0062d2fc = 0xffff;
    DAT_0062d2fe = 0;
    DAT_0062d2ff = 1;
    return;
  }
  DAT_0062d2fa = 0;
  DAT_0062d2de = CONCAT22((&DAT_00887442)[(unaff_EBX & 0xff) * 0x130],0x5be);
  DAT_0062d2e2 = (&DAT_00887444)[(unaff_EBX & 0xff) * 0x98];
  DAT_0062d2fc = 0xffff;
  DAT_0062d2fe = 0;
  DAT_0062d2ff = 0;
  return;
}

