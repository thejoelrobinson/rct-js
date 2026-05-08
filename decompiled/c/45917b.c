
void FUN_0045917b(void)

{
  ushort uVar1;
  uint in_EAX;
  byte bVar2;
  byte bVar3;
  byte *unaff_EDI;
  
  if ((int)in_EAX < 0) {
    *unaff_EDI = 0x2d;
    unaff_EDI = unaff_EDI + 1;
    in_EAX = -in_EAX;
  }
  bVar2 = 0x30;
  while (999999999 < in_EAX) {
    bVar2 = bVar2 + 1;
    in_EAX = in_EAX + 0xc4653600;
  }
  if ((bVar2 | 0x30) != 0x30) {
    *unaff_EDI = bVar2;
    unaff_EDI = unaff_EDI + 1;
  }
  bVar3 = 0x30;
  while (99999999 < in_EAX) {
    bVar3 = bVar3 + 1;
    in_EAX = in_EAX + 0xfa0a1f00;
  }
  bVar2 = bVar2 | 0x30 | bVar3;
  if (bVar2 != 0x30) {
    *unaff_EDI = bVar3;
    unaff_EDI[1] = 0x2c;
    unaff_EDI = unaff_EDI + 2;
  }
  bVar3 = 0x30;
  while (9999999 < in_EAX) {
    bVar3 = bVar3 + 1;
    in_EAX = in_EAX - 10000000;
  }
  bVar2 = bVar2 | bVar3;
  if (bVar2 != 0x30) {
    *unaff_EDI = bVar3;
    unaff_EDI = unaff_EDI + 1;
  }
  bVar3 = 0x30;
  while (999999 < in_EAX) {
    bVar3 = bVar3 + 1;
    in_EAX = in_EAX - 1000000;
  }
  bVar2 = bVar2 | bVar3;
  if (bVar2 != 0x30) {
    *unaff_EDI = bVar3;
    unaff_EDI = unaff_EDI + 1;
  }
  bVar3 = 0x30;
  while (99999 < in_EAX) {
    bVar3 = bVar3 + 1;
    in_EAX = in_EAX - 100000;
  }
  bVar2 = bVar2 | bVar3;
  if (bVar2 != 0x30) {
    *unaff_EDI = bVar3;
    unaff_EDI[1] = 0x2c;
    unaff_EDI = unaff_EDI + 2;
  }
  bVar3 = 0x30;
  while (9999 < in_EAX) {
    bVar3 = bVar3 + 1;
    in_EAX = in_EAX - 10000;
  }
  bVar2 = bVar2 | bVar3;
  if (bVar2 != 0x30) {
    *unaff_EDI = bVar3;
    unaff_EDI = unaff_EDI + 1;
  }
  bVar3 = 0x30;
  while( true ) {
    uVar1 = (ushort)in_EAX;
    in_EAX = (uint)(ushort)(uVar1 - 1000);
    if (uVar1 < 1000) break;
    bVar3 = bVar3 + 1;
  }
  if ((bVar2 | bVar3) != 0x30) {
    *unaff_EDI = bVar3;
    unaff_EDI = unaff_EDI + 1;
  }
  bVar2 = 0x30;
  while( true ) {
    if (uVar1 < 100) break;
    bVar2 = bVar2 + 1;
    uVar1 = uVar1 - 100;
  }
  *unaff_EDI = bVar2;
  unaff_EDI[1] = 0x2e;
  bVar2 = 0x30;
  while( true ) {
    if (uVar1 < 10) break;
    bVar2 = bVar2 + 1;
    uVar1 = uVar1 - 10;
  }
  unaff_EDI[2] = bVar2;
  *(ushort *)(unaff_EDI + 3) = uVar1 + 0x30;
  return;
}

