
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_004410df(void)

{
  undefined *puVar1;
  byte bVar2;
  char cVar3;
  ushort uVar4;
  ushort uVar5;
  uint uVar6;
  uint uVar7;
  undefined1 *unaff_ESI;
  uint uVar8;
  
  if (399 < DAT_0087c3a0) {
    FUN_00444bd4();
    FUN_00444c74();
    *unaff_ESI = 1;
    unaff_ESI[0x2d] = 0;
    unaff_ESI[0x2a] = 1;
    unaff_ESI[0x2b] = 0;
    unaff_ESI[0x71] = 0xff;
    unaff_ESI[0x6d] = 0;
    unaff_ESI[0x70] = 0;
    unaff_ESI[0xe0] = 0;
    unaff_ESI[0x6e] = 0;
    *(undefined2 *)(unaff_ESI + 200) = 0;
    uVar8 = (uint)(byte)unaff_ESI[0x6e];
    puVar1 = (&PTR_DAT_0062d644)[(uint)(byte)unaff_ESI[0x2d] * 2];
    unaff_ESI[0x14] = puVar1[uVar8 * 4];
    unaff_ESI[9] = puVar1[uVar8 * 4 + 1];
    unaff_ESI[0x15] = puVar1[uVar8 * 4 + 2];
    unaff_ESI[0x1e] = 0;
    FUN_00444927();
    FUN_005e53ca();
    uVar6 = FUN_005df40c();
    uVar8 = uVar6 >> 5;
    uVar7 = uVar8 | uVar6 << 0x1b;
    unaff_ESI[0x41] = ((byte)uVar6 & 0x1f) + 0x2d;
    unaff_ESI[0xc4] = 0;
    unaff_ESI[0x79] = 0xff;
    unaff_ESI[0x2e] = 0;
    unaff_ESI[0xad] = 0xff;
    unaff_ESI[0xb0] = 0xff;
    unaff_ESI[0x45] = 0;
    uVar6 = uVar7 >> 3;
    bVar2 = ((byte)uVar8 & 7) + 3;
    uVar5 = CONCAT11(bVar2,bVar2);
    if (7 < bVar2) {
      uVar5 = CONCAT11(7,bVar2);
    }
    bVar2 = (byte)(uVar5 >> 8);
    uVar4 = CONCAT11(bVar2 - 3,(char)uVar5);
    if (bVar2 < 3) {
      uVar4 = uVar5 & 0xff;
    }
    if (6 < (byte)uVar4) {
      uVar4 = (ushort)CONCAT31((uint3)(byte)(uVar4 >> 8),0xf);
    }
    unaff_ESI[0x43] = (char)uVar4 << 4 | (byte)(uVar4 >> 8);
    unaff_ESI[0x44] = (&DAT_0062d630)[(uVar8 & 0x38) >> 3];
    uVar8 = uVar6 & 0xf8f80000 | uVar8 << 0x1d;
    cVar3 = (char)(uVar8 >> 0x13) + -0xf + DAT_0087d0c1;
    if (DAT_0087d0c1 == '\0') {
      cVar3 = cVar3 + -0x80;
    }
    unaff_ESI[0x3a] = cVar3;
    unaff_ESI[0x3b] = cVar3;
    unaff_ESI[0x3c] = 0;
    unaff_ESI[0x3d] = 0;
    unaff_ESI[0x3e] = ((byte)(uVar8 >> 0x1b) - 0xf) + DAT_0087d0ce;
    unaff_ESI[0x3f] = (((byte)((uVar6 << 0xd) >> 0x10) & 0x1f) - 0xf) + DAT_0087d0cf;
    unaff_ESI[0x40] = 0;
    unaff_ESI[0x42] = 0;
    *(undefined4 *)(unaff_ESI + 0x7c) = 0;
    *(undefined4 *)(unaff_ESI + 0x80) = 0;
    *(undefined4 *)(unaff_ESI + 0x84) = 0;
    *(undefined4 *)(unaff_ESI + 0x88) = 0;
    *(undefined4 *)(unaff_ESI + 0x8c) = 0;
    *(undefined4 *)(unaff_ESI + 0x90) = 0;
    *(undefined4 *)(unaff_ESI + 0x94) = 0;
    *(undefined4 *)(unaff_ESI + 0x98) = 0;
    unaff_ESI[0x2f] = 0;
    *(undefined4 *)(unaff_ESI + 0x48) = 0;
    *(undefined4 *)(unaff_ESI + 0x4c) = 0;
    *(undefined4 *)(unaff_ESI + 0x50) = 0;
    *(undefined4 *)(unaff_ESI + 0x54) = 0;
    *(undefined4 *)(unaff_ESI + 0x58) = 0;
    *(undefined4 *)(unaff_ESI + 0x5c) = 0;
    *(undefined4 *)(unaff_ESI + 0x60) = 0;
    *(undefined4 *)(unaff_ESI + 100) = 0;
    *(int *)(unaff_ESI + 0x9c) = DAT_008d4224;
    DAT_008d4224 = DAT_008d4224 + 1;
    *(undefined2 *)(unaff_ESI + 0x22) = 0x2ff;
    uVar5 = (ushort)(uVar7 >> 0x1e) * 100 + -100 + DAT_0087d0cc;
    if (DAT_0087d0cc == 0) {
      uVar5 = 500;
    }
    if (DAT_0087d0cc == -1) {
      uVar5 = 0;
    }
    *(uint *)(unaff_ESI + 0xa0) = (uint)uVar5;
    *(undefined4 *)(unaff_ESI + 0xa4) = 0;
    *(undefined4 *)(unaff_ESI + 0xa8) = 0xffffffff;
    *(undefined4 *)(unaff_ESI + 0xcc) = 0xffffffff;
    *(undefined2 *)(unaff_ESI + 0xca) = 0;
    unaff_ESI[0xc5] = 0xff;
    unaff_ESI[0xe1] = 0;
    unaff_ESI[0xe3] = 0;
    unaff_ESI[0xef] = 0;
    *(undefined2 *)(unaff_ESI + 0xe4) = 0;
    *(undefined2 *)(unaff_ESI + 0xe6) = 0;
    *(undefined2 *)(unaff_ESI + 0xe8) = 0;
    *(undefined2 *)(unaff_ESI + 0xea) = 0;
    unaff_ESI[0xec] = 0;
    unaff_ESI[0xed] = 0;
    unaff_ESI[0xee] = 0;
    unaff_ESI[0xf2] = 0;
    unaff_ESI[0xf3] = 0;
    unaff_ESI[0xf4] = 0;
    unaff_ESI[0x30] = (char)((ushort)((ushort)(byte)uVar6 * 0x1b) >> 8);
    unaff_ESI[0x31] = (char)((ushort)((ushort)(byte)(uVar6 >> 8) * 0x1b) >> 8);
    cVar3 = ((byte)(uVar6 >> 0x10) & 0x3f) + 0x41;
    unaff_ESI[0x38] = cVar3;
    unaff_ESI[0x39] = cVar3;
    FUN_0044049c();
    _DAT_0087c81e = _DAT_0087c81e + 1;
    return;
  }
  return;
}

