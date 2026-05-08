
void FUN_009bc041(void)

{
  short sVar1;
  short *psVar2;
  short in_AX;
  short in_DX;
  short unaff_BX;
  short unaff_BP;
  uint unaff_ESI;
  uint uVar3;
  uint uVar4;
  
  uVar3 = unaff_ESI;
  while( true ) {
    while( true ) {
      while( true ) {
        while( true ) {
          do {
            uVar4 = uVar3;
            uVar3 = uVar4 + 0x178;
            if (DAT_009a1164 <= uVar3) {
              psVar2 = *(short **)(unaff_ESI + 8);
              if (psVar2 != (short *)0x0) {
                sVar1 = psVar2[2];
                if (in_AX < sVar1) {
                  in_AX = sVar1;
                }
                if ((short)(sVar1 + *psVar2) < in_DX) {
                  in_DX = sVar1 + *psVar2;
                }
                sVar1 = psVar2[3];
                if (unaff_BX < sVar1) {
                  unaff_BX = sVar1;
                }
                if ((short)(sVar1 + psVar2[1]) < unaff_BP) {
                  unaff_BP = sVar1 + psVar2[1];
                }
                if ((in_AX < in_DX) && (unaff_BX < unaff_BP)) {
                  (*DAT_009b2280)();
                }
              }
              return;
            }
          } while ((((in_DX <= *(short *)(uVar4 + 0x198)) || (unaff_BP <= *(short *)(uVar4 + 0x19a))
                    ) || ((short)(*(short *)(uVar4 + 0x198) + *(short *)(uVar4 + 0x19c)) <= in_AX))
                  || ((short)(*(short *)(uVar4 + 0x19a) + *(short *)(uVar4 + 0x19e)) <= unaff_BX));
          if (*(short *)(uVar4 + 0x198) <= in_AX) break;
          FUN_009bc041();
          in_AX = *(short *)(uVar4 + 0x198);
          uVar3 = unaff_ESI;
        }
        if (in_DX <= (short)(*(short *)(uVar4 + 0x198) + *(short *)(uVar4 + 0x19c))) break;
        FUN_009bc041();
        in_AX = *(short *)(uVar4 + 0x198) + *(short *)(uVar4 + 0x19c);
        uVar3 = unaff_ESI;
      }
      if (*(short *)(uVar4 + 0x19a) <= unaff_BX) break;
      FUN_009bc041();
      unaff_BX = *(short *)(uVar4 + 0x19a);
      uVar3 = unaff_ESI;
    }
    if (unaff_BP <= (short)(*(short *)(uVar4 + 0x19a) + *(short *)(uVar4 + 0x19e))) break;
    FUN_009bc041();
    unaff_BX = *(short *)(uVar4 + 0x19a) + *(short *)(uVar4 + 0x19e);
    uVar3 = unaff_ESI;
  }
  return;
}

