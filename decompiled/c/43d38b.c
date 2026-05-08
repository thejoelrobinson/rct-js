
void FUN_0043d38b(void)

{
  byte bVar1;
  int unaff_ESI;
  
  bVar1 = *(byte *)(unaff_ESI + 0x29);
  if ((bVar1 & 0x18) != 0) {
    FUN_00423677();
    return;
  }
  if ((bVar1 & 4) != 0) {
    switch(bVar1 & 3) {
    case 0:
      return;
    case 1:
      return;
    case 2:
      return;
    case 3:
    }
  }
  return;
}

