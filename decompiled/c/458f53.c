
void FUN_00458f53(void)

{
  ushort uVar1;
  uint in_EAX;
  byte bVar2;
  byte bVar3;
  byte bVar4;
  byte *unaff_EDI;
  
  bVar2 = DAT_00642fb8;
  if ((int)in_EAX < 0) {
    *unaff_EDI = 0x2d;
    unaff_EDI = unaff_EDI + 1;
    in_EAX = -in_EAX;
  }
  bVar3 = 0x30;
  while (999999999 < in_EAX) {
    bVar3 = bVar3 + 1;
    in_EAX = in_EAX + 0xc4653600;
  }
  if ((bVar2 | bVar3) != 0x30) {
    *unaff_EDI = bVar3;
    unaff_EDI = unaff_EDI + 1;
  }
  bVar4 = 0x30;
  while (99999999 < in_EAX) {
    bVar4 = bVar4 + 1;
    in_EAX = in_EAX + 0xfa0a1f00;
  }
  bVar2 = bVar2 | bVar3 | bVar4;
  if (bVar2 != 0x30) {
    *unaff_EDI = bVar4;
    unaff_EDI = unaff_EDI + 1;
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
    unaff_EDI = unaff_EDI + 1;
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
  bVar2 = bVar2 | bVar3;
  if (bVar2 != 0x30) {
    *unaff_EDI = bVar3;
    unaff_EDI = unaff_EDI + 1;
  }
  bVar3 = 0x30;
  while (99 < uVar1) {
    bVar3 = bVar3 + 1;
    uVar1 = uVar1 - 100;
  }
  bVar2 = bVar2 | bVar3;
  if (bVar2 != 0x30) {
    *unaff_EDI = bVar3;
    unaff_EDI = unaff_EDI + 1;
  }
  bVar3 = 0x30;
  while (9 < uVar1) {
    bVar3 = bVar3 + 1;
    uVar1 = uVar1 - 10;
  }
  if ((bVar2 | bVar3) != 0x30) {
    *unaff_EDI = bVar3;
    unaff_EDI = unaff_EDI + 1;
  }
  *(ushort *)unaff_EDI = uVar1 + 0x30;
  return;
}

