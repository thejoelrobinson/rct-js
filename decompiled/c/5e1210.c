
void FUN_005e1210(void)

{
  uint uVar1;
  uint uVar2;
  uint uVar3;
  uint uVar4;
  uint uVar5;
  uint uVar6;
  
  uVar1 = 0;
  uVar5 = 0;
  uVar3 = 0;
  do {
    uVar2 = uVar5;
    uVar6 = uVar3;
    if ((&DAT_0099ad63)[uVar1 + uVar3] != '\0') {
      do {
        uVar6 = uVar6 + DAT_00971ee6;
        if (DAT_00971eea <= uVar2 + 1) break;
        uVar2 = uVar2 + 1;
      } while ((&DAT_0099ad63)[uVar1 + uVar6] != '\0');
      uVar6 = uVar6 - DAT_00971ee6;
      uVar2 = uVar1;
      uVar4 = uVar3;
      do {
        do {
          (&DAT_0099ad63)[uVar2 + uVar4] = 0;
          uVar2 = uVar2 + 1;
        } while (uVar2 <= uVar1);
        uVar4 = uVar4 + DAT_00971ee6;
        uVar2 = uVar1;
      } while (uVar4 <= uVar6);
      if (((ushort)((short)uVar1 * DAT_00971ee2) < DAT_00971eda) &&
         ((ushort)((short)uVar5 * DAT_00971ee4) < DAT_00971edc)) {
        FUN_005e12eb();
      }
    }
    uVar5 = uVar5 + 1;
    uVar3 = uVar3 + DAT_00971ee6;
    if (DAT_00971eea <= uVar5) {
      uVar5 = 0;
      uVar3 = 0;
      uVar1 = uVar1 + 1;
      if (DAT_00971ee6 <= uVar1) {
        return;
      }
    }
  } while( true );
}

