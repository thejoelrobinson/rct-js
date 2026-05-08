
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0059e41a(int param_1)

{
  undefined1 *puVar1;
  undefined4 in_EAX;
  undefined4 in_ECX;
  short in_DX;
  uint uVar2;
  undefined1 *puVar3;
  int iVar4;
  undefined4 uVar5;
  int unaff_EDI;
  undefined4 uVar6;
  
  puVar1 = DAT_00991f80;
  DAT_0099a4ec = in_DX + 7;
  uVar2 = (uint)DAT_0099a4ec;
  iVar4 = (uint)*(byte *)(param_1 + 7) * 0x260;
  puVar3 = (undefined1 *)0xffffffff;
  if (((&DAT_00887422)[(uint)*(byte *)(param_1 + 7) * 0x130] & 1) != 0) {
    puVar3 = (undefined1 *)(int)(short)*(ushort *)(&DAT_0088747e + iVar4);
    if (puVar3 != (undefined1 *)0xffffffff) {
      puVar3 = &DAT_00743b94 + (uint)*(ushort *)(&DAT_0088747e + iVar4) * 0x100;
      DAT_00991f78._0_1_ = 2;
      DAT_00991f80 = puVar3;
    }
  }
  _DAT_00651d24 = unaff_EDI * 0x58;
  if (0xd7 < _DAT_00651d24) {
    _DAT_00651d24 = _DAT_00651d24 - 0xd8;
  }
  if (puVar3 != (undefined1 *)0xffffffff) {
    for (_DAT_00651d24 =
              _DAT_00651d24 + (uint)((byte)puVar3[0x1e] >> 3) * 0x10 + (uint)(byte)puVar3[0x1f];
        0xd7 < _DAT_00651d24; _DAT_00651d24 = _DAT_00651d24 - 0xd8) {
    }
  }
  DAT_0099a4e8 = (char)in_EAX + 0x10;
  DAT_0099a4ea = (char)in_ECX + 0x10;
  uVar6 = CONCAT22((short)(_DAT_00651d24 >> 0x10),0x18);
  uVar5 = 0x18;
  _DAT_00651d20 = unaff_EDI;
  (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])(iVar4,0x18,uVar6,uVar2);
  if (((*(short *)(DAT_00981ef8 + 0xe) == 0) && ((*(ushort *)((int)&DAT_00887422 + iVar4) & 1) != 0)
      ) && (*(ushort *)(&DAT_0088747e + iVar4) != 0xffff)) {
    puVar3 = &DAT_00743b94 + (uint)*(ushort *)(&DAT_0088747e + iVar4) * 0x100;
    for (iVar4 = 0; (byte)iVar4 < (byte)puVar3[0xb3]; iVar4 = iVar4 + 2) {
      (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(puVar3,uVar5,uVar6,uVar2,in_ECX,iVar4,in_EAX);
    }
  }
  DAT_00991f80 = puVar1;
  DAT_00991f78._0_1_ = 3;
  return;
}

