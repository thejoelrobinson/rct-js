
undefined4 FUN_004300b7(void)

{
  int iVar1;
  undefined4 uVar2;
  
  FUN_0042f239();
  iVar1 = FUN_0040844b(2,&DAT_005f92e7);
  if (iVar1 != -1) {
    uVar2 = DAT_005f92ef;
    FUN_00408490(iVar1);
    return uVar2;
  }
  return 0xffff0000;
}

