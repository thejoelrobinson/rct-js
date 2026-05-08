
uint FUN_00430081(void)

{
  int iVar1;
  uint uVar2;
  
  FUN_0042f239();
  iVar1 = FUN_0040844b(2,&DAT_005f92e7);
  if (iVar1 != -1) {
    uVar2 = DAT_005f92eb >> 0x10;
    FUN_00408490(iVar1);
    return uVar2;
  }
  return 0xffff0000;
}

