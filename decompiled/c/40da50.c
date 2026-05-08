
undefined4 FUN_0040da50(int param_1,undefined4 param_2,undefined4 param_3)

{
  void *_Dst;
  
  _Dst = (void *)(DAT_005f0394 * 0x210 + DAT_005ebf10);
  if (param_1 == 0) {
    _memset(_Dst,0,0x10);
  }
  else {
    FUN_004138d0(_Dst,param_1,0x10);
  }
  FUN_00413170((int)_Dst + 0x10,param_2);
  FUN_00413170((int)_Dst + 0x110,param_3);
  DAT_005f0394 = DAT_005f0394 + 1;
  return 1;
}

