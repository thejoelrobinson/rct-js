
int FUN_00412bbd(undefined4 param_1,undefined4 *param_2,undefined4 param_3,int *param_4,int *param_5
                )

{
  HGLOBAL pvVar1;
  undefined4 local_38;
  HMMIO local_34;
  undefined1 local_30 [20];
  undefined1 local_1c [4];
  SIZE_T local_18;
  int local_8;
  
  *param_5 = 0;
  *param_4 = 0;
  *param_2 = 0;
  local_8 = FUN_00411fd0(param_1,&local_34,param_4,local_30);
  if ((local_8 == 0) && (local_8 = FUN_00412224(&local_34,local_1c,local_30), local_8 == 0)) {
    pvVar1 = GlobalAlloc(0,local_18);
    *param_5 = (int)pvVar1;
    if (*param_5 == 0) {
      local_8 = 0xe000;
    }
    else {
      local_8 = FUN_004122a3(local_34,local_18,*param_5,local_1c,&local_38);
      if (local_8 == 0) {
        *param_2 = local_38;
        goto LAB_00412cd9;
      }
    }
  }
  if (*param_5 != 0) {
    GlobalFree((HGLOBAL)*param_5);
    *param_5 = 0;
  }
  if (*param_4 != 0) {
    GlobalFree((HGLOBAL)*param_4);
    *param_4 = 0;
  }
LAB_00412cd9:
  if (local_34 != (HMMIO)0x0) {
    mmioClose(local_34,0);
  }
  return local_8;
}

