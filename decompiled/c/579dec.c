
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00579dec(int param_1)

{
  char in_AL;
  uint uVar1;
  undefined4 in_ECX;
  short in_DX;
  uint uVar2;
  int iVar3;
  int iVar4;
  undefined4 uVar5;
  int unaff_EDI;
  undefined4 uVar6;
  
  DAT_0099a4ec = in_DX + 3;
  uVar2 = (uint)DAT_0099a4ec;
  iVar4 = (uint)*(byte *)(param_1 + 7) * 0x260;
  DAT_00651c60 = (undefined1 *)0xffffffff;
  DAT_00651c68 = 0;
  _DAT_00651c6c = 0;
  if (((&DAT_00887422)[(uint)*(byte *)(param_1 + 7) * 0x130] & 1) != 0) {
    DAT_00651c60 = (undefined1 *)(int)(short)*(ushort *)(&DAT_0088747e + iVar4);
    if (DAT_00651c60 != (undefined1 *)0xffffffff) {
      iVar3 = (uint)*(ushort *)(&DAT_0088747e + iVar4) * 0x100;
      DAT_00651c60 = &DAT_00743b94 + iVar3;
      DAT_00991f78._0_1_ = 2;
      DAT_00651c68 = (uint)(byte)(&DAT_00743bb3)[iVar3];
      _DAT_00651c6c = (uint)(byte)(&DAT_00743bb4)[iVar3];
      DAT_00991f80 = DAT_00651c60;
    }
  }
  DAT_0099a4e8 = in_AL + 0x10;
  DAT_0099a4ea = (char)in_ECX + 0x10;
  uVar6 = 0x18;
  uVar5 = 0x18;
  uVar1 = (uint)CONCAT11(0x5a,in_AL);
  DAT_00651c64 = unaff_EDI;
  (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])(iVar4,0x18,0x18,uVar2);
  (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(iVar4,uVar5,uVar6,uVar2,in_ECX,uVar1);
  _DAT_00651c70 = DAT_00651c64 * 0x10 + _DAT_00651c6c + -0x5fffb8f0;
  if ((DAT_00651c60 != (undefined1 *)0xffffffff) && (0x3f < (byte)DAT_00651c60[0xb5])) {
    _DAT_00651c70 = ((byte)DAT_00651c60[0xb5] - 0x40 >> 6) + DAT_00651c64 * 3 + -0x5fffb8b0;
  }
                    /* WARNING: Could not recover jumptable at 0x00579fcd. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  (*(code *)(&PTR_LAB_00579fd4)[DAT_00651c64])(uVar5,uVar6,uVar2,in_ECX,uVar1);
  return;
}

