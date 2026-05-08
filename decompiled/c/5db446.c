
void FUN_005db446(void)

{
  ushort uVar1;
  ushort uVar2;
  undefined4 uVar3;
  undefined2 unaff_BX;
  int iVar4;
  undefined1 *unaff_ESI;
  uint uVar5;
  int iVar6;
  undefined1 *puVar7;
  
  unaff_ESI[0x50] = 9;
  FUN_005db5d7();
  uVar5 = (uint)(byte)unaff_ESI[0x30];
  iVar6 = uVar5 * 0x260;
  puVar7 = unaff_ESI;
  if (((&DAT_00887422)[uVar5 * 0x130] & 0x400) == 0) {
    for (; puVar7[1] != '\0'; puVar7 = &DAT_00743b94 + (uint)*(ushort *)(puVar7 + 0x40) * 0x100) {
    }
    iVar4 = -1;
    do {
      iVar4 = iVar4 + 1;
    } while (*(short *)(puVar7 + 10) != *(short *)(&DAT_0088747e + iVar4 * 2 + iVar6));
    FUN_0045192e();
    if ((&DAT_00887441)[iVar6] != '\0') {
      FUN_00426f56();
    }
  }
  (&DAT_00887422)[uVar5 * 0x130] = (&DAT_00887422)[uVar5 * 0x130] | 0x400;
  (&DAT_0088751d)[iVar6] = (&DAT_0088751d)[iVar6] | 0xc;
  FUN_005ddd9c();
  puVar7 = unaff_ESI;
  while( true ) {
    puVar7[0x51] = 2;
    FUN_00452fce(*(undefined2 *)(puVar7 + 0x10),*(undefined2 *)(puVar7 + 0xe),unaff_BX);
    FUN_0042df47();
    unaff_BX = *(undefined2 *)(puVar7 + 0x32);
    FUN_0042deab();
    FUN_0042deab();
    FUN_0042deab();
    FUN_0042deab();
    FUN_0042deab();
    FUN_0042deab();
    FUN_0042deab();
    FUN_0042deab();
    FUN_0042deab();
    FUN_0042deab();
    *(ushort *)(puVar7 + 0xc) = *(ushort *)(puVar7 + 0xc) | 0x80;
    uVar3 = FUN_005df40c();
    *(undefined4 *)(puVar7 + 200) = uVar3;
    puVar7[0xc5] = (byte)((uint)uVar3 >> 0x10) & 7;
    puVar7[0x14] = 0xd;
    puVar7[9] = 0x2d;
    puVar7[0x15] = 5;
    FUN_00444927();
    FUN_005e53ca();
    *(undefined2 *)(puVar7 + 0x4e) = 0;
    if (*(ushort *)(puVar7 + 0x3e) == 0xffff) break;
    puVar7 = &DAT_00743b94 + (uint)*(ushort *)(puVar7 + 0x3e) * 0x100;
  }
  uVar1 = *(ushort *)(unaff_ESI + 0x40);
  uVar2 = *(ushort *)(puVar7 + 0x42);
  *(ushort *)(&DAT_00743bd6 + (uint)uVar1 * 0x100) = uVar2;
  *(ushort *)(&DAT_00743bd4 + (uint)uVar2 * 0x100) = uVar1;
  *(undefined4 *)(unaff_ESI + 0x28) = 0;
  return;
}

