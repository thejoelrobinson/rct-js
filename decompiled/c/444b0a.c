
void FUN_00444b0a(void)

{
  undefined2 uVar1;
  undefined4 uVar2;
  int iVar3;
  ushort uVar4;
  uint uVar5;
  undefined4 *puVar6;
  
  uVar4 = DAT_0087c394;
  while (uVar4 != 0xffff) {
    uVar5 = (uint)uVar4;
    uVar2 = *(undefined4 *)(&DAT_00743b98 + uVar5 * 0x80);
    uVar1 = (&DAT_00743b9e)[uVar5 * 0x80];
    puVar6 = (undefined4 *)(&DAT_00743b94 + uVar5 * 0x100);
    for (iVar3 = 0x40; iVar3 != 0; iVar3 = iVar3 + -1) {
      *puVar6 = 0;
      puVar6 = puVar6 + 1;
    }
    (&DAT_00743b94)[uVar5 * 0x100] = 0xff;
    *(undefined4 *)(&DAT_00743b98 + uVar5 * 0x80) = uVar2;
    (&DAT_00743b9c)[uVar5 * 0x100] = 0;
    (&DAT_00743b9e)[uVar5 * 0x80] = uVar1;
    uVar4 = (&DAT_00743b98)[uVar5 * 0x80];
  }
  return;
}

