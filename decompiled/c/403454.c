
void FUN_00403454(undefined4 param_1)

{
  int iVar1;
  uint uVar2;
  
  uVar2 = DAT_005e91e4 + 1 & 0x3f;
  if (uVar2 != DAT_005e91e8) {
    iVar1 = DAT_005e91e4 * 0xc;
    *(undefined4 *)(&DAT_005f1cc0 + iVar1) = DAT_005f1cb4;
    *(undefined4 *)(&DAT_005f1cc4 + iVar1) = DAT_005f1cb8;
    *(undefined4 *)(&DAT_005f1cc8 + iVar1) = param_1;
    DAT_005e91e4 = uVar2;
  }
  return;
}

