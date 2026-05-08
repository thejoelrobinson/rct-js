
bool FUN_004039ff(undefined4 param_1,undefined4 param_2,undefined4 param_3,undefined4 *param_4,
                 undefined4 param_5)

{
  bool bVar1;
  
  if (DAT_005e91e0 == (HWND)0x0) {
    DAT_005f1fd4 = param_1;
    DAT_005f1fc8 = param_2;
    DAT_005f1390 = param_3;
    DAT_005f13b0 = param_4;
    DAT_005f1ca8 = param_5;
    *param_4 = 0;
    DAT_005e91e0 = CreateDialogParamA(DAT_005f1398,(LPCSTR)0x65,DAT_005e916c,FUN_004037cf,0);
    bVar1 = DAT_005e91e0 != (HWND)0x0;
  }
  else {
    bVar1 = false;
  }
  return bVar1;
}

