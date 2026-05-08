
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined8 FUN_0055203e(int param_1)

{
  undefined1 *puVar1;
  undefined4 in_EAX;
  undefined4 in_ECX;
  ushort uVar2;
  undefined4 in_EDX;
  undefined1 *puVar4;
  int iVar5;
  uint uVar6;
  int iVar7;
  undefined4 uVar8;
  undefined4 unaff_EDI;
  undefined4 uVar9;
  uint uVar3;
  
  puVar1 = DAT_00991f80;
  uVar2 = (short)in_EDX + 7;
  uVar3 = (uint)uVar2;
  uVar6 = (uint)*(byte *)(param_1 + 7);
  iVar7 = uVar6 * 0x260;
  puVar4 = (undefined1 *)0xffffffff;
  if (((&DAT_00887422)[uVar6 * 0x130] & 1) != 0) {
    puVar4 = (undefined1 *)(int)(short)*(ushort *)(&DAT_0088747e + iVar7);
    if (puVar4 != (undefined1 *)0xffffffff) {
      iVar5 = (uint)*(ushort *)(&DAT_0088747e + iVar7) * 0x100;
      puVar4 = &DAT_00743b94 + iVar5;
      DAT_00991f78._0_1_ = 2;
      DAT_00991f80 = puVar4;
      if (((((&DAT_00887422)[uVar6 * 0x130] & 0xc0) != 0) && ((&DAT_0088755c)[iVar7] == '\a')) &&
         (0x7f < (byte)(&DAT_0088757c)[iVar7])) {
        uVar3 = (uint)(ushort)(uVar2 + *(short *)(&DAT_00651be8 +
                                                 (*(ushort *)(&DAT_00743be0 + iVar5) >> 1 & 7) * 2))
        ;
      }
    }
  }
  DAT_00651bc4 = 0;
  if (puVar4 != (undefined1 *)0xffffffff) {
    DAT_00651bc4 = ((uint)((byte)puVar4[0x1e] >> 3) + DAT_00991f88) * 0x20 +
                   (uint)(byte)puVar4[0x1f] & 0x7f;
  }
  DAT_0099a4e8 = (char)in_EAX + 0x10;
  DAT_0099a4ea = (char)in_ECX + 0x10;
  uVar8 = 0x18;
  DAT_0099a4ec = (undefined2)uVar3;
  uVar9 = 0x18;
  _DAT_00651bc0 = unaff_EDI;
  (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])(iVar7,0x18,0x18,uVar3);
  if (((*(short *)(DAT_00981ef8 + 0xe) == 0) && ((*(ushort *)((int)&DAT_00887422 + iVar7) & 1) != 0)
      ) && ((*(ushort *)(&DAT_0088747e + iVar7) != 0xffff &&
            (iVar7 = (uint)*(ushort *)(&DAT_0088747e + iVar7) * 0x100,
            puVar4 = &DAT_00743b94 + iVar7, (&DAT_00743c47)[iVar7] != '\0')))) {
    if ((DAT_00651bc4 + _DAT_00651bc8 & 0x7f) - 0xd < 0x44) {
      (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(puVar4,uVar8,uVar9,uVar3,in_ECX);
    }
    if (2 < (byte)puVar4[0xb3]) {
      if ((DAT_00651bc4 + _DAT_00651bcc & 0x7f) - 0xd < 0x44) {
        (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(puVar4,uVar8,uVar9,uVar3,in_ECX);
      }
      if (4 < (byte)puVar4[0xb3]) {
        if ((DAT_00651bc4 + _DAT_00651bd0 & 0x7f) - 0xd < 0x44) {
          (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(puVar4,uVar8,uVar9,uVar3,in_ECX);
        }
        if (6 < (byte)puVar4[0xb3]) {
          if ((DAT_00651bc4 + _DAT_00651bd4 & 0x7f) - 0xd < 0x44) {
            (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(puVar4,uVar8,uVar9,uVar3,in_ECX);
          }
          if (8 < (byte)puVar4[0xb3]) {
            if ((DAT_00651bc4 + _DAT_00651bd8 & 0x7f) - 0xd < 0x44) {
              (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(puVar4,uVar8,uVar9,uVar3,in_ECX);
            }
            if (10 < (byte)puVar4[0xb3]) {
              if ((DAT_00651bc4 + _DAT_00651bdc & 0x7f) - 0xd < 0x44) {
                (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(puVar4,uVar8,uVar9,uVar3,in_ECX);
              }
              if (0xc < (byte)puVar4[0xb3]) {
                if ((DAT_00651bc4 + _DAT_00651be0 & 0x7f) - 0xd < 0x44) {
                  (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(puVar4,uVar8,uVar9,uVar3,in_ECX);
                }
                if ((0xe < (byte)puVar4[0xb3]) &&
                   ((DAT_00651bc4 + _DAT_00651be4 & 0x7f) - 0xd < 0x44)) {
                  (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])(puVar4,uVar8,uVar9,uVar3,in_ECX);
                }
              }
            }
          }
        }
      }
    }
  }
  DAT_00991f80 = puVar1;
  DAT_00991f78._0_1_ = 3;
  return CONCAT44(in_EDX,in_EAX);
}

