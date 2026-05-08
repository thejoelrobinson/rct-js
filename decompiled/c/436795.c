
void FUN_00436795(void)

{
  byte bVar1;
  undefined4 *unaff_ESI;
  
  bVar1 = *(byte *)((int)unaff_ESI + 1);
  while ((bVar1 & 0x80) == 0) {
    *unaff_ESI = unaff_ESI[2];
    unaff_ESI[1] = unaff_ESI[3];
    bVar1 = *(byte *)((int)unaff_ESI + 9);
    unaff_ESI = unaff_ESI + 2;
  }
  *(byte *)((int)unaff_ESI + -7) = *(byte *)((int)unaff_ESI + -7) | 0x80;
  *(undefined1 *)unaff_ESI = 0xff;
  if (unaff_ESI + 2 == DAT_00981ef4) {
    DAT_00981ef4 = DAT_00981ef4 + -2;
  }
  return;
}

