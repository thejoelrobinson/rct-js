
short FUN_0044247c(void)

{
  ushort *puVar1;
  short in_AX;
  uint unaff_EBX;
  ushort uVar2;
  uint uVar3;
  int iVar4;
  
  uVar2 = DAT_0087c398;
  while (uVar2 != 0xffff) {
    uVar3 = (uint)uVar2;
    iVar4 = uVar3 * 0x100;
    if (((&DAT_00743bc2)[iVar4] == '\0') && ((&DAT_00743bbe)[iVar4] == '\0')) {
      puVar1 = (ushort *)(&DAT_00743c5e + iVar4);
      uVar2 = *puVar1;
      *puVar1 = *puVar1 & 0xfffe;
      if (((uVar2 & 1) != 0) && (in_AX = (&DAT_00743ba2)[uVar3 * 0x80], in_AX != -0x8000)) {
        unaff_EBX = unaff_EBX & 0xffff0000;
        in_AX = FUN_0042dfd1();
        (&DAT_00743bd9)[iVar4] = (&DAT_00743bd9)[iVar4] | 8;
      }
      if ((((&DAT_00743bbf)[iVar4] == '\x05') || ((&DAT_00743bbf)[iVar4] == '\x06')) &&
         (0xfd < (byte)(&DAT_00743c05)[iVar4])) {
        (&DAT_00743c05)[iVar4] = 0x1a;
        (&DAT_00743c06)[iVar4] = 0;
        (&DAT_00743c04)[iVar4] = 0;
        FUN_0043c60b();
        in_AX = FUN_005e53ca();
      }
    }
    uVar2 = (&DAT_00743b98)[uVar3 * 0x80];
  }
  FUN_00452fce(unaff_EBX);
  return in_AX;
}

