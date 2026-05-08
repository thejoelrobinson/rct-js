
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00429502(void)

{
  short *psVar1;
  byte bVar2;
  uint uVar3;
  
  if ((_DAT_0087c3bc & 1) == 0) {
    uVar3 = 0;
    do {
      if ((&DAT_0087d738)[uVar3 * 2] != 0) {
        psVar1 = &DAT_0087d738 + uVar3 * 2;
        *psVar1 = *psVar1 + -1;
        if (*psVar1 == 0) {
          FUN_005e5301();
        }
      }
      uVar3 = uVar3 + 1;
    } while (uVar3 < 4);
    return;
  }
  do {
    bVar2 = FUN_005df40c();
    bVar2 = (byte)((ushort)((ushort)bVar2 * (CONCAT11(7,bVar2) >> 8)) >> 8);
    uVar3 = 0;
    while (((&DAT_0087d738)[uVar3 * 2] == 0 || ((ushort)bVar2 != (&DAT_0087d73a)[uVar3 * 2]))) {
      uVar3 = uVar3 + 1;
      if (3 < uVar3) {
                    /* WARNING: Could not recover jumptable at 0x0042953b. Too many branches */
                    /* WARNING: Treating indirect jump as call */
        (*(code *)(&PTR_LAB_00429544)[bVar2])();
        return;
      }
    }
  } while( true );
}

