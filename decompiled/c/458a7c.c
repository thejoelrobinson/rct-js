
void FUN_00458a7c(void)

{
  byte bVar1;
  byte *unaff_ESI;
  byte *pbVar2;
  
  while( true ) {
    pbVar2 = unaff_ESI;
    bVar1 = *pbVar2;
    unaff_ESI = pbVar2 + 1;
    if (bVar1 == 0) break;
    if (bVar1 < 0x20) {
      if (bVar1 < 5) {
        unaff_ESI = pbVar2 + 2;
      }
      else if ((((bVar1 != 7) && (bVar1 != 8)) && (bVar1 != 9)) && (bVar1 != 10)) {
        if (bVar1 == 0x17) {
          unaff_ESI = pbVar2 + 5;
        }
        else if ((0x10 < bVar1) && (unaff_ESI = pbVar2 + 3, 0x16 < bVar1)) {
          unaff_ESI = pbVar2 + 5;
        }
      }
    }
  }
  return;
}

