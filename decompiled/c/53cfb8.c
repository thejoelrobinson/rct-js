
undefined8 FUN_0053cfb8(int param_1)

{
  ushort uVar1;
  undefined1 *puVar2;
  undefined4 in_EAX;
  undefined4 uVar3;
  undefined4 in_EDX;
  uint uVar4;
  undefined1 *puVar5;
  int iVar6;
  uint uVar7;
  uint uVar8;
  undefined1 *puVar9;
  undefined4 uVar10;
  uint unaff_EDI;
  undefined4 extraout_var;
  
  puVar2 = DAT_00991f80;
  DAT_0099a4ec = (short)in_EDX + 7;
  uVar4 = (uint)DAT_0099a4ec;
  uVar8 = (uint)*(byte *)(param_1 + 7);
  puVar9 = (undefined1 *)(uVar8 * 0x260);
  puVar5 = (undefined1 *)0xffffffff;
  if (((&DAT_00887422)[uVar8 * 0x130] & 1) != 0) {
    puVar5 = (undefined1 *)(int)(short)*(ushort *)(&DAT_0088747e + (int)puVar9);
    if (puVar5 != (undefined1 *)0xffffffff) {
      puVar5 = &DAT_00743b94 + (uint)*(ushort *)(&DAT_0088747e + (int)puVar9) * 0x100;
      DAT_00991f78._0_1_ = 2;
      DAT_00991f80 = puVar5;
    }
  }
  DAT_00651b60 = *(uint *)(&DAT_00651b30 + unaff_EDI * 4);
  if ((puVar5 != (undefined1 *)0xffffffff) && (iVar6 = (int)(char)puVar5[0x1f], iVar6 != 0)) {
    if ((unaff_EDI & 2) != 0) {
      iVar6 = -iVar6;
    }
    if (iVar6 < 0) {
      iVar6 = 9 - iVar6;
    }
    DAT_00651b60 = DAT_00651b60 + iVar6 * 0x12;
  }
  uVar7 = (uint)*(byte *)((int)&DAT_00887426 + (int)(puVar9 + 1)) << 0x18 |
          (uint)*(byte *)(&DAT_00887426 + uVar8 * 0x130) << 0x11 | DAT_00651b60;
  DAT_0099a4e8 = *(undefined2 *)(&DAT_00651b44 + unaff_EDI * 8);
  DAT_0099a4ea = *(undefined2 *)(&DAT_00651b46 + unaff_EDI * 8);
  uVar10 = CONCAT22((short)(((uint)*(byte *)(&DAT_00887426 + uVar8 * 0x130) << 0x11) >> 0x10),
                    *(undefined2 *)(&DAT_00651b42 + unaff_EDI * 8));
  uVar8 = (uint)*(ushort *)(&DAT_00651b40 + unaff_EDI * 8);
  DAT_00651b64 = unaff_EDI;
  (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])(puVar9,uVar10,uVar8,uVar4);
  uVar3 = extraout_var;
  (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(puVar9,uVar10,uVar8,uVar4,extraout_var);
  if ((*(ushort *)(DAT_00981ef8 + 0xe) < 2) &&
     ((*(ushort *)((int)&DAT_00887422 + (int)puVar9) & 1) != 0)) {
    uVar1 = *(ushort *)(&DAT_0088747e + (int)puVar9);
    puVar9 = (undefined1 *)(uint)uVar1;
    if ((uVar1 != 0xffff) &&
       (puVar9 = &DAT_00743b94 + (uint)uVar1 * 0x100, (&DAT_00743c47)[(uint)uVar1 * 0x100] != '\0'))
    {
      uVar7 = DAT_00651b60;
      (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(puVar9,uVar10,uVar8,uVar4,uVar3,DAT_00651b60);
      if (2 < (byte)puVar9[0xb3]) {
        (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(puVar9,uVar10,uVar8,uVar4,uVar3,uVar7);
        if (4 < (byte)puVar9[0xb3]) {
          (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(puVar9,uVar10,uVar8,uVar4,uVar3,uVar7);
          if (6 < (byte)puVar9[0xb3]) {
            (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(puVar9,uVar10,uVar8,uVar4,uVar3,uVar7);
            if (8 < (byte)puVar9[0xb3]) {
              (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(puVar9,uVar10,uVar8,uVar4,uVar3,uVar7);
              if (10 < (byte)puVar9[0xb3]) {
                (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(puVar9,uVar10,uVar8,uVar4,uVar3,uVar7);
                if (0xc < (byte)puVar9[0xb3]) {
                  (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])
                            (puVar9,uVar10,uVar8,uVar4,uVar3,uVar7);
                  if (0xe < (byte)puVar9[0xb3]) {
                    (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])
                              (puVar9,uVar10,uVar8,uVar4,uVar3,uVar7);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(puVar9,uVar10,uVar8,uVar4,uVar3,uVar7);
  DAT_00991f80 = puVar2;
  DAT_00991f78._0_1_ = 3;
  return CONCAT44(in_EDX,in_EAX);
}

