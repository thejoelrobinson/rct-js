
void FUN_0043670c(void)

{
  ushort uVar1;
  ushort extraout_CX;
  byte unaff_BL;
  byte unaff_BH;
  undefined4 *puVar2;
  undefined4 *puVar3;
  
  uVar1 = FUN_0043657e();
  uVar1 = extraout_CX << 7 | extraout_CX >> 9 | uVar1;
  LOCK();
  puVar2 = (undefined4 *)(&DAT_00971ef4)[(ushort)(uVar1 >> 5 | uVar1 << 0xb)];
  (&DAT_00971ef4)[(ushort)(uVar1 >> 5 | uVar1 << 0xb)] = DAT_00981ef4;
  UNLOCK();
  do {
    puVar3 = DAT_00981ef4;
    DAT_00981ef4 = puVar3;
    if (unaff_BL < *(byte *)((int)puVar2 + 2)) goto LAB_00436759;
    *puVar3 = *puVar2;
    puVar3[1] = puVar2[1];
    *(undefined1 *)puVar2 = 0xff;
    DAT_00981ef4 = puVar3 + 2;
    puVar2 = puVar2 + 2;
  } while ((*(byte *)((int)puVar3 + 1) & 0x80) == 0);
  unaff_BH = unaff_BH | 0x80;
  *(byte *)((int)puVar3 + 1) = *(byte *)((int)puVar3 + 1) & 0x7f;
LAB_00436759:
  *(byte *)((int)DAT_00981ef4 + 2) = unaff_BL;
  *(byte *)((int)DAT_00981ef4 + 1) = unaff_BH;
  *(byte *)((int)DAT_00981ef4 + 3) = unaff_BL;
  DAT_00981ef4[1] = 0;
  while (puVar3 = DAT_00981ef4 + 2, (unaff_BH & 0x80) == 0) {
    *puVar3 = *puVar2;
    DAT_00981ef4[3] = puVar2[1];
    *(undefined1 *)puVar2 = 0xff;
    puVar2 = puVar2 + 2;
    unaff_BH = *(byte *)((int)DAT_00981ef4 + 9);
    DAT_00981ef4 = puVar3;
  }
  DAT_00981ef4 = puVar3;
  return;
}

