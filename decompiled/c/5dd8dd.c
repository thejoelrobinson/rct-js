
undefined8 FUN_005dd8dd(void)

{
  undefined2 uVar1;
  undefined4 in_EAX;
  int iVar2;
  int extraout_ECX;
  uint in_EDX;
  int iVar3;
  int extraout_EDX;
  uint uVar4;
  ushort uVar5;
  uint uVar6;
  int iVar7;
  
  uVar6 = in_EDX & 0xff;
  iVar7 = uVar6 * 0x260;
  if (((&DAT_00887420)[iVar7] == 0x29) ||
     ((*(uint *)(&DAT_005f5b78 + (uint)(byte)(&DAT_00887420)[iVar7] * 8) & 0x10000) != 0)) {
    FUN_005e6028();
  }
  uVar4 = 0;
  iVar3 = 0;
  do {
    uVar5 = *(ushort *)(&DAT_0088747e + uVar4 * 2 + iVar7);
    if (uVar5 != 0xffff) {
      iVar2 = 0;
      do {
        if (((&DAT_00887425)[iVar7] & 3) == 0) {
          uVar1 = (&DAT_00887426)[uVar6 * 0x130];
        }
        else if (((&DAT_00887425)[iVar7] & 3) == 1) {
          uVar1 = (&DAT_00887426)[uVar6 * 0x130 + iVar3];
        }
        else {
          uVar1 = (&DAT_00887426)[uVar6 * 0x130 + iVar2];
        }
        *(undefined2 *)(&DAT_00743bc6 + (uint)uVar5 * 0x100) = uVar1;
        FUN_005e53ca();
        iVar2 = extraout_ECX + 1;
        uVar5 = *(ushort *)(&DAT_00743bd2 + (uint)uVar5 * 0x100);
        iVar3 = extraout_EDX;
      } while (uVar5 != 0xffff);
      iVar3 = extraout_EDX + 1;
    }
    uVar4 = uVar4 + 1;
  } while (uVar4 < 0xc);
  return CONCAT44(in_EDX,in_EAX);
}

