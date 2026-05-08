
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined8 FUN_0053e318(int param_1)

{
  undefined1 *puVar1;
  undefined4 in_EAX;
  undefined4 in_ECX;
  undefined4 in_EDX;
  uint uVar2;
  undefined1 *puVar3;
  int iVar4;
  uint uVar5;
  uint uVar6;
  int iVar7;
  undefined4 uVar8;
  uint unaff_EDI;
  
  puVar1 = DAT_00991f80;
  DAT_0099a4ec = (short)in_EDX + 7;
  uVar2 = (uint)DAT_0099a4ec;
  uVar6 = (uint)*(byte *)(param_1 + 7);
  iVar7 = uVar6 * 0x260;
  puVar3 = (undefined1 *)0xffffffff;
  if (((&DAT_00887422)[uVar6 * 0x130] & 1) != 0) {
    puVar3 = (undefined1 *)(int)(short)*(ushort *)(&DAT_0088747e + iVar7);
    if (puVar3 != (undefined1 *)0xffffffff) {
      puVar3 = &DAT_00743b94 + (uint)*(ushort *)(&DAT_0088747e + iVar7) * 0x100;
      DAT_00991f78._0_1_ = 2;
      DAT_00991f80 = puVar3;
    }
  }
  _DAT_00651bb0 = *(uint *)(&DAT_00651b70 + unaff_EDI * 4);
  if ((puVar3 != (undefined1 *)0xffffffff) && (iVar4 = (int)(char)puVar3[0x1f], iVar4 != 0)) {
    if ((unaff_EDI & 2) != 0) {
      iVar4 = -iVar4;
    }
    if (iVar4 < 0) {
      iVar4 = iVar4 + 0x48;
    }
    _DAT_00651bb0 = *(int *)(&DAT_00651b80 + unaff_EDI * 4) + (iVar4 + -1) * 2;
  }
  uVar5 = (uint)*(byte *)((int)&DAT_00887426 + iVar7 + 1) << 0x18 |
          (uint)*(byte *)(&DAT_00887426 + uVar6 * 0x130) << 0x11 | _DAT_00651bb0;
  DAT_0099a4e8 = *(undefined2 *)(&DAT_00651b94 + unaff_EDI * 8);
  DAT_0099a4ea = *(undefined2 *)(&DAT_00651b96 + unaff_EDI * 8);
  uVar8 = CONCAT22((short)(((uint)*(byte *)(&DAT_00887426 + uVar6 * 0x130) << 0x11) >> 0x10),
                   *(undefined2 *)(&DAT_00651b92 + unaff_EDI * 8));
  uVar6 = (uint)*(ushort *)(&DAT_00651b90 + unaff_EDI * 8);
  DAT_00651bb4 = unaff_EDI;
  if ((unaff_EDI & 2) == 0) {
    (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])(iVar7,uVar8,uVar6,uVar2);
  }
  if ((DAT_00651bb4 & 2) == 0) {
    (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(iVar7,uVar8,uVar6,uVar2,in_ECX);
  }
  else {
    (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])();
  }
  if ((DAT_00651bb4 & 2) != 0) {
    (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(iVar7,uVar8,uVar6,uVar2,in_ECX,uVar5);
  }
  DAT_00991f80 = puVar1;
  DAT_00991f78._0_1_ = 3;
  return CONCAT44(in_EDX,in_EAX);
}

