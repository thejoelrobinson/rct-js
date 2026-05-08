
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_00402a00(void)

{
  int iVar1;
  undefined4 uVar2;
  
  iVar1 = (*DAT_005ebe5c)(DAT_005e9100);
  if (iVar1 == 0) {
    DAT_005e9104 = 0;
    _DAT_005e9108 = 0;
    uVar2 = 0;
  }
  else {
    DAT_005f1fec = *DAT_005e9100;
    DAT_005f1ff4 = DAT_005e9100[4];
    DAT_005f2400 = *(undefined2 *)((int)DAT_005e9100 + 6);
    DAT_005f1ff0 = *(undefined2 *)(DAT_005e9100 + 2);
    DAT_005e9104 = 1;
    _DAT_005e9108 = 1;
    if (DAT_005e9130 != 0) {
      FUN_00402ada();
    }
    uVar2 = 1;
  }
  return uVar2;
}

