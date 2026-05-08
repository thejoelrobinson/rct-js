
void FUN_005e5c36(void)

{
  ushort *puVar1;
  short *psVar2;
  undefined2 uVar3;
  short sVar4;
  undefined2 *unaff_ESI;
  undefined2 *puVar5;
  undefined2 *puVar6;
  
  puVar5 = DAT_009a1164;
  if ((unaff_ESI[0x19] & 3) == 0) {
    do {
      puVar6 = puVar5 + -0xbc;
      puVar1 = puVar5 + -0xa3;
      puVar5 = puVar6;
    } while ((*puVar1 >> 1 & 1) != 0);
    if (((undefined2 *)0x9a013b < puVar6) && (puVar6 != unaff_ESI)) {
      do {
        LOCK();
        uVar3 = unaff_ESI[0xbc];
        unaff_ESI[0xbc] = *unaff_ESI;
        UNLOCK();
        *unaff_ESI = uVar3;
        unaff_ESI = unaff_ESI + 1;
      } while (unaff_ESI != puVar6);
      FUN_005e43de();
    }
    if ((short)(unaff_ESI[0x10] + unaff_ESI[0x12]) < 0x14) {
      sVar4 = unaff_ESI[0x10];
      unaff_ESI[0x10] = unaff_ESI[0x10] + (0x14 - sVar4);
      if (*(int *)(unaff_ESI + 4) != 0) {
        psVar2 = (short *)(*(int *)(unaff_ESI + 4) + 4);
        *psVar2 = *psVar2 + (0x14 - sVar4);
      }
      FUN_005e43de();
    }
  }
  return;
}

