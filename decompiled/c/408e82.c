
undefined4 FUN_00408e82(void *param_1,int param_2)

{
  undefined4 uVar1;
  
  if ((param_2 < 0) || (DAT_005f12b4 <= param_2)) {
    uVar1 = 0;
  }
  else {
    _memset(param_1,0,0xa8);
    _memset((void *)((int)param_1 + 0x14),0,0x6c);
    *(undefined4 *)((int)param_1 + 0x14) = 0x6c;
    *(undefined4 *)((int)param_1 + 0x80) = *(undefined4 *)(DAT_005ebf38 + param_2 * 4);
    uVar1 = 1;
  }
  return uVar1;
}

