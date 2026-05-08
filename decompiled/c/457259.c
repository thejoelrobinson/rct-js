
undefined8 FUN_00457259(void)

{
  uint uVar1;
  uint uVar2;
  uint extraout_ECX;
  undefined4 in_EDX;
  int unaff_ESI;
  bool bVar3;
  
  bVar3 = 0xffef < *(ushort *)(unaff_ESI + 0x12);
  uVar1 = FUN_0042547b();
  if ((!bVar3) &&
     ((((&DAT_008d7e2a)[*(byte *)(unaff_ESI + 0xc5)] & 2) == 0 ||
      (uVar2 = (uVar1 & 0xf80) >> 7,
      ((byte)(&DAT_008d422a)
             [((int)uVar2 >> 3) +
              ((extraout_ECX & 0xf80) >> 7) * 4 + (uint)*(byte *)(unaff_ESI + 0xc5) * 0x80] >>
       (uVar2 & 7) & 1) != 0)))) {
    return CONCAT44(in_EDX,uVar1);
  }
  return CONCAT44(in_EDX,uVar1);
}

