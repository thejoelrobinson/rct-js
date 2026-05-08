
undefined8 FUN_005dd134(void)

{
  ushort *puVar1;
  ushort uVar2;
  undefined4 uVar3;
  undefined4 in_EDX;
  int unaff_ESI;
  undefined4 unaff_EDI;
  uint uVar4;
  int iVar5;
  bool bVar6;
  undefined8 uVar7;
  
  uVar7 = FUN_00450b21();
  uVar3 = (undefined4)uVar7;
  uVar4 = (uint)((ulonglong)uVar7 >> 0x20) & 0xff;
  iVar5 = uVar4 * 0x260;
  (&DAT_00887422)[uVar4 * 0x130] = (&DAT_00887422)[uVar4 * 0x130] & 0xff3f;
  (&DAT_0088751d)[iVar5] = (&DAT_0088751d)[iVar5] | 0xc;
  puVar1 = &DAT_00887422 + uVar4 * 0x130;
  uVar2 = *puVar1;
  *puVar1 = *puVar1 & 0xfffe;
  if ((uVar2 & 1) != 0) {
    (&DAT_00887422)[uVar4 * 0x130] = (&DAT_00887422)[uVar4 * 0x130] & 0xf7fb;
    uVar4 = 0;
    do {
      LOCK();
      uVar2 = *(ushort *)(&DAT_0088747e + uVar4 * 2 + iVar5);
      *(ushort *)(&DAT_0088747e + uVar4 * 2 + iVar5) = 0xffff;
      UNLOCK();
      for (; uVar2 != 0xffff; uVar2 = *(ushort *)(&DAT_00743bd2 + (uint)uVar2 * 0x100)) {
        FUN_005e53ca();
        uVar3 = FUN_00444d1f();
      }
      uVar4 = uVar4 + 1;
    } while (uVar4 < 0xc);
    uVar4 = 0;
    do {
      (&DAT_0088745e)[uVar4 + iVar5] = 0xff;
      uVar4 = uVar4 + 1;
    } while (uVar4 < 4);
  }
  bVar6 = true;
  FUN_005e3b2b(unaff_EDI,unaff_ESI);
  if (!bVar6) {
    (**(code **)(unaff_ESI + 4))();
  }
  return CONCAT44(in_EDX,uVar3);
}

