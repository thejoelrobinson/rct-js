
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00429aff(void)

{
  short *psVar1;
  short sVar2;
  ushort uVar3;
  short sVar4;
  short sVar5;
  int unaff_ESI;
  undefined1 in_CF;
  bool bVar6;
  
  sVar4 = DAT_00971ed8;
  sVar2 = FUN_005e68e2();
  if (!(bool)in_CF) {
    psVar1 = *(short **)(unaff_ESI + 8);
    *(short *)(unaff_ESI + 0x24) = sVar2;
    sVar5 = sVar4;
    if ((_DAT_0099a500 & 1) == 0) {
      sVar5 = sVar4 + -0x40;
    }
    *(short *)(unaff_ESI + 0x26) = sVar5;
    _DAT_005f5114 = sVar2 + -1;
    _DAT_005f5118 = sVar5 + -1;
    *psVar1 = sVar2;
    psVar1[1] = sVar5;
    psVar1[6] = sVar2 << (*(byte *)(psVar1 + 8) & 0x1f);
    psVar1[7] = sVar5 << (*(byte *)(psVar1 + 8) & 0x1f);
  }
  bVar6 = true;
  uVar3 = FUN_005e3b2b();
  if (!bVar6) {
    if (uVar3 < 0x280) {
      uVar3 = 0x280;
    }
    *(ushort *)(unaff_ESI + 0x24) = uVar3;
  }
  bVar6 = true;
  uVar3 = FUN_005e3b2b();
  if (!bVar6) {
    *(short *)(unaff_ESI + 0x22) = sVar4 + -0x22;
    if (uVar3 < 0x280) {
      uVar3 = 0x280;
    }
    *(ushort *)(unaff_ESI + 0x24) = uVar3;
    _DAT_005f52fc = uVar3 - 1;
    _DAT_005f530c = uVar3 - 3;
    _DAT_005f530a = uVar3 - 0x76;
    _DAT_005f52fa = uVar3 - 0x78;
    _DAT_005f52bc = uVar3 - 0x79;
    _DAT_005f52cc = uVar3 - 0x7b;
    _DAT_005f52ec = uVar3 - 0x7e;
    _DAT_005f52ea = uVar3 - 0x95;
  }
  bVar6 = true;
  uVar3 = FUN_005e3b2b();
  if (!bVar6) {
    *(ushort *)(unaff_ESI + 0x20) = (uVar3 >> 1) - 0xa4;
    *(short *)(unaff_ESI + 0x22) = sVar4 + -0x66;
  }
  bVar6 = true;
  sVar4 = FUN_005e3b2b();
  if (!bVar6) {
    *(short *)(unaff_ESI + 0x20) = sVar4 + -200;
  }
  return;
}

