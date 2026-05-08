
int FUN_00403557(void)

{
  int iVar1;
  
  do {
    if (DAT_005e91d4 == DAT_005e91d0) {
      return 0;
    }
    iVar1 = DAT_005e91d4 * 8;
    DAT_005e91d4 = DAT_005e91d4 + 1;
    DAT_005e91d4 = DAT_005e91d4 & 0x3f;
  } while (*(int *)(&DAT_005f15e4 + iVar1) == 0);
  return *(int *)(&DAT_005f15e4 + iVar1);
}

