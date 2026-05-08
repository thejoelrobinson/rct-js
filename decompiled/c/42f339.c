
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0042f339(void)

{
  int iVar1;
  
  FUN_0042f239();
  iVar1 = FUN_004083b5(0x12);
  if (iVar1 != -1) {
    DAT_005f88a4 = iVar1;
    FUN_00408276(iVar1,&DAT_008dc08c,4);
    if (_DAT_008dc08c == 0x1a668) {
      FUN_00408276(DAT_005f88a4,&DAT_005f8d48,0x5b);
      DAT_005f8da1 = DAT_005f8da1 | 0x80;
    }
    FUN_00408387(DAT_005f88a4);
  }
  return;
}

