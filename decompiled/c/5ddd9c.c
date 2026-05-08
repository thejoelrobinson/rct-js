
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined8 FUN_005ddd9c(void)

{
  byte bVar1;
  ushort uVar2;
  undefined4 in_EAX;
  undefined4 in_ECX;
  undefined4 extraout_ECX;
  undefined4 in_EDX;
  int iVar3;
  undefined4 uVar4;
  undefined1 *unaff_ESI;
  undefined1 *puVar5;
  uint uVar6;
  int iVar7;
  
  uVar6 = 0;
  puVar5 = unaff_ESI;
  while( true ) {
    uVar2 = CONCAT11((char)(uVar6 >> 8) + CARRY1((byte)uVar6,puVar5[0xb3]),
                     (byte)uVar6 + puVar5[0xb3]);
    uVar6 = (uint)uVar2;
    if (*(ushort *)(puVar5 + 0x3e) == 0xffff) break;
    puVar5 = &DAT_00743b94 + (uint)*(ushort *)(puVar5 + 0x3e) * 0x100;
  }
  uVar6 = (uint)(byte)unaff_ESI[0x30];
  uVar4 = 2;
  if (uVar2 != 0) {
    uVar4 = 8;
  }
  DAT_00971e86._0_2_ = uVar2;
  if ((byte)(&DAT_0088757e)[uVar6 * 0x260] <= (byte)uVar4) {
    (&DAT_0088757e)[uVar6 * 0x260] = (byte)uVar4;
  }
  if (uVar2 != 0) {
    DAT_00971e86._2_2_ = (&DAT_00887442)[uVar6 * 0x130];
    DAT_00971e8a = (&DAT_00887444)[uVar6 * 0x98];
    uVar4 = 0x7f2;
    FUN_0042c711();
    in_ECX = extraout_ECX;
  }
  iVar7 = (uint)(byte)unaff_ESI[0x30] * 0x260;
  while( true ) {
    bVar1 = unaff_ESI[0xb3];
    if ((bVar1 == unaff_ESI[0xb4]) && (uVar6 = (uint)bVar1, bVar1 != 0)) {
      iVar3 = 0;
      do {
        uVar2 = *(ushort *)(unaff_ESI + iVar3 * 2 + 0x52);
        if ((&DAT_00743bbe)[(uint)uVar2 * 0x100] == '\0') {
          DAT_0087c81c = DAT_0087c81c + -1;
          _DAT_005f54ec = _DAT_005f54ec | 4;
        }
        (&DAT_0088752b)[iVar7] = (&DAT_0088752b)[iVar7] + -1;
        FUN_0044153e(iVar7,unaff_ESI,&DAT_00743b94 + (uint)uVar2 * 0x100,&stack0xffffffdc,uVar4,
                     iVar3,in_ECX,uVar6);
        iVar3 = iVar3 + 1;
      } while ((byte)iVar3 < (byte)unaff_ESI[0xb3]);
      unaff_ESI[0xb3] = 0;
      unaff_ESI[0xb4] = 0;
    }
    if (*(ushort *)(unaff_ESI + 0x3e) == 0xffff) break;
    unaff_ESI = &DAT_00743b94 + (uint)*(ushort *)(unaff_ESI + 0x3e) * 0x100;
  }
  return CONCAT44(in_EDX,in_EAX);
}

