
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined8 FUN_00555a50(int param_1)

{
  ushort uVar1;
  undefined1 *puVar2;
  undefined4 in_EAX;
  undefined4 uVar3;
  undefined4 in_EDX;
  uint uVar4;
  undefined1 *puVar5;
  uint uVar6;
  uint uVar7;
  undefined1 *puVar8;
  undefined4 uVar9;
  int unaff_EDI;
  undefined4 extraout_var;
  
  puVar2 = DAT_00991f80;
  DAT_0099a4ec = (short)in_EDX + 7;
  uVar4 = (uint)DAT_0099a4ec;
  uVar7 = (uint)*(byte *)(param_1 + 7);
  puVar8 = (undefined1 *)(uVar7 * 0x260);
  puVar5 = (undefined1 *)0xffffffff;
  if (((&DAT_00887422)[uVar7 * 0x130] & 1) != 0) {
    puVar5 = (undefined1 *)(int)(short)*(ushort *)(&DAT_0088747e + (int)puVar8);
    if (puVar5 != (undefined1 *)0xffffffff) {
      puVar5 = &DAT_00743b94 + (uint)*(ushort *)(&DAT_0088747e + (int)puVar8) * 0x100;
      DAT_00991f78._0_1_ = 2;
      DAT_00991f80 = puVar5;
    }
  }
  _DAT_00651c40 = unaff_EDI * 8 + 0xa0008d7a;
  if (puVar5 != (undefined1 *)0xffffffff) {
    _DAT_00651c40 = _DAT_00651c40 + ((byte)puVar5[0x1f] & 7);
  }
  uVar6 = (uint)*(byte *)((int)&DAT_00887426 + (int)(puVar8 + 1)) << 0x18 |
          (uint)*(byte *)(&DAT_00887426 + uVar7 * 0x130) << 0x11 | _DAT_00651c40;
  DAT_0099a4e8 = *(undefined2 *)(&DAT_00651c24 + unaff_EDI * 8);
  DAT_0099a4ea = *(undefined2 *)(&DAT_00651c26 + unaff_EDI * 8);
  uVar9 = CONCAT22((short)(((uint)*(byte *)(&DAT_00887426 + uVar7 * 0x130) << 0x11) >> 0x10),
                   *(undefined2 *)(&DAT_00651c22 + unaff_EDI * 8));
  uVar7 = (uint)*(ushort *)(&DAT_00651c20 + unaff_EDI * 8);
  DAT_00651c44 = unaff_EDI;
  (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])(puVar8,uVar9,uVar7,uVar4);
  uVar3 = extraout_var;
  (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(puVar8,uVar9,uVar7,uVar4,extraout_var);
  if ((*(ushort *)(DAT_00981ef8 + 0xe) < 2) &&
     ((*(ushort *)((int)&DAT_00887422 + (int)puVar8) & 1) != 0)) {
    uVar1 = *(ushort *)(&DAT_0088747e + (int)puVar8);
    puVar8 = (undefined1 *)(uint)uVar1;
    if (uVar1 != 0xffff) {
      puVar8 = &DAT_00743b94 + (uint)uVar1 * 0x100;
      uVar6 = 0;
      do {
        if ((*(short *)(puVar8 + uVar6 * 2 + 0x52) != -1) &&
           ((&DAT_00743bbf)[(uint)*(ushort *)(puVar8 + uVar6 * 2 + 0x52) * 0x100] == '\x03')) {
          (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])();
        }
        uVar6 = uVar6 + 2;
      } while (uVar6 < 0x20);
    }
  }
  (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(puVar8,uVar9,uVar7,uVar4,uVar3,uVar6);
  DAT_00991f80 = puVar2;
  DAT_00991f78._0_1_ = 3;
  return CONCAT44(in_EDX,in_EAX);
}

