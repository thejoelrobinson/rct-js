
int FUN_00411a34(int *param_1,HANDLE param_2,int param_3,int param_4,int param_5,int param_6)

{
  HDC local_94;
  undefined1 local_90 [4];
  int local_8c;
  int local_88;
  int local_78;
  HDC local_74;
  undefined4 local_70;
  undefined4 local_6c;
  
  if ((param_2 == (HANDLE)0x0) || (param_1 == (int *)0x0)) {
    local_78 = -0x7fffbffb;
  }
  else {
    (**(code **)(*param_1 + 0x6c))(param_1);
    local_74 = CreateCompatibleDC((HDC)0x0);
    SelectObject(local_74,param_2);
    GetObjectA(param_2,0x18,local_90);
    if (param_5 == 0) {
      param_5 = local_8c;
    }
    if (param_6 == 0) {
      param_6 = local_88;
    }
    local_70 = 0x6c;
    local_6c = 6;
    (**(code **)(*param_1 + 0x58))(param_1,&local_70);
    local_78 = (**(code **)(*param_1 + 0x44))(param_1,&local_94);
    if (local_78 == 0) {
      BitBlt(local_94,0,0,param_5,param_6,local_74,param_3,param_4,0xcc0020);
      (**(code **)(*param_1 + 0x68))(param_1,local_94);
    }
    DeleteDC(local_74);
  }
  return local_78;
}

