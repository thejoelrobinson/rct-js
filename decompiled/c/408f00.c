
undefined4 FUN_00408f00(void *param_1)

{
  _memset(param_1,0,0xa8);
  _memset((void *)((int)param_1 + 0x14),0,0x6c);
  *(undefined4 *)((int)param_1 + 0x14) = 0x6c;
  *(undefined4 *)((int)param_1 + 0x80) = DAT_005ebf34;
  return 1;
}

