
void FUN_00426f56(void)

{
  ushort uVar1;
  uint unaff_EBX;
  uint uVar2;
  int unaff_ESI;
  
  uVar1 = (ushort)unaff_EBX;
  if (DAT_005f4a6a == '\0') {
    DAT_00991efc = 0xffff;
  }
  DAT_005f4a6a = DAT_005f4a6a + '\x01';
  uVar2 = unaff_EBX & 0xfffffffe;
  DAT_005f4a68 = uVar1;
  (*(code *)(&PTR_LAB_005f49a0)[unaff_ESI])();
  DAT_005f4a68 = uVar1;
  if (uVar2 != 0x80000000) {
    if ((((DAT_005f4a6a == '\x01') && ((unaff_EBX & 4) == 0)) && ((unaff_EBX & 0x20) == 0)) &&
       (uVar2 != 0)) {
      FUN_004429a8();
    }
    uVar1 = DAT_005f4a68;
    DAT_005f4a64 = uVar2;
    if (uVar2 != 0x80000000) {
      if ((unaff_EBX & 1) != 0) {
        (*(code *)(&PTR_LAB_005f49a0)[unaff_ESI])();
        if ((unaff_EBX != 0x80000000) && ((int)unaff_EBX <= (int)uVar2)) {
          uVar2 = unaff_EBX;
        }
        DAT_005f4a6a = DAT_005f4a6a + -1;
        DAT_005f4a68 = uVar1;
        if (((DAT_005f4a6a == '\0') && ((uVar1 & 0x20) == 0)) &&
           ((FUN_004429db(), DAT_0099c163 == DAT_008d7ea4 && (uVar2 != 0)))) {
          FUN_0044294c();
        }
        return;
      }
      DAT_005f4a6a = DAT_005f4a6a + -1;
      return;
    }
  }
  DAT_005f4a6a = DAT_005f4a6a + -1;
  if ((((DAT_005f4a6a == '\0') && ((unaff_EBX & 1) != 0)) && (DAT_0099c163 == DAT_008d7ea4)) &&
     ((unaff_EBX & 8) == 0)) {
    FUN_00427108();
  }
  return;
}

