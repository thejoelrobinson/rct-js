
undefined8 FUN_004575af(void)

{
  byte bVar1;
  undefined4 in_EAX;
  uint uVar2;
  undefined4 in_EDX;
  uint uVar3;
  ushort uVar4;
  int iVar5;
  int iVar6;
  
  uVar3 = 0;
  do {
    iVar6 = (uVar3 + 0x74) * 0x80;
    uVar2 = 0;
    do {
      *(undefined4 *)(&DAT_008d422a + uVar2 * 4 + iVar6) = 0;
      uVar2 = uVar2 + 1;
      uVar4 = DAT_0087c398;
    } while (uVar2 < 0x20);
    for (; uVar4 != 0xffff; uVar4 = (&DAT_00743b98)[(uint)uVar4 * 0x80]) {
      iVar5 = (uint)uVar4 * 0x100;
      if (((&DAT_00743bc2)[iVar5] == '\x01') && ((char)uVar3 == (&DAT_00743bc3)[iVar5])) {
        bVar1 = (&DAT_00743c59)[iVar5];
        uVar2 = 0;
        do {
          *(uint *)(&DAT_008d422a + uVar2 * 4 + iVar6) =
               *(uint *)(&DAT_008d422a + uVar2 * 4 + iVar6) |
               *(uint *)(&DAT_008d422a + uVar2 * 4 + (uint)bVar1 * 0x80);
          uVar2 = uVar2 + 1;
        } while (uVar2 < 0x20);
      }
    }
    uVar3 = uVar3 + 1;
  } while (uVar3 < 4);
  return CONCAT44(in_EDX,in_EAX);
}

