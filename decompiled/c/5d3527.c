
void FUN_005d3527(void)

{
  int iVar1;
  
  FUN_0044e607();
  iVar1 = (uint)DAT_00652289 * 0x260;
  if ((&DAT_00887420)[iVar1] != '\x14') {
    FUN_005e3f31();
    *(undefined **)(iVar1 + 0x1c) = &DAT_00651d90;
    *(uint *)(iVar1 + 0xc) = *(uint *)(iVar1 + 0xc) | 0xdffef84;
    *(uint *)(iVar1 + 0xc) = *(uint *)(iVar1 + 0xc) | 0x60001041;
    *(uint *)(iVar1 + 0xc) = *(uint *)(iVar1 + 0xc) | 0x82000000;
    FUN_005e412c();
    *(ushort *)(iVar1 + 0x30) = (ushort)DAT_00652289;
    FUN_005e6bcd();
    FUN_005e0c2f();
    FUN_00424db7();
    DAT_006522a4 = 8;
    DAT_006522a5 = 0x12;
    if ((&DAT_00887420)[(uint)DAT_00652289 * 0x260] == '*') {
      DAT_006522a5 = 0x1e;
    }
    return;
  }
  FUN_005e3f31();
  *(undefined **)(iVar1 + 0x1c) = &DAT_00651fa4;
  *(uint *)(iVar1 + 0xc) = *(uint *)(iVar1 + 0xc) | 0xf000004;
  *(uint *)(iVar1 + 0xc) = *(uint *)(iVar1 + 0xc) | 0x600001c0;
  FUN_005e412c();
  *(ushort *)(iVar1 + 0x30) = (ushort)DAT_00652289;
  FUN_005e6bcd();
  FUN_005e0c2f();
  FUN_00424db7();
  return;
}

