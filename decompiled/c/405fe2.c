
undefined4
FUN_00405fe2(int param_1,int param_2,int param_3,int param_4,undefined4 param_5,undefined4 param_6,
            undefined4 param_7,undefined4 param_8,undefined4 param_9)

{
  bool bVar1;
  int iVar2;
  undefined4 uVar3;
  int local_c;
  
  DAT_005f1a04 = GetSystemMetrics(0x22);
  DAT_005f1fc0 = GetSystemMetrics(0);
  DAT_005f139c = GetSystemMetrics(0x23);
  DAT_005f1b28 = GetSystemMetrics(1);
  DAT_005f12a8 = param_6;
  DAT_005f12ac = param_2;
  DAT_005f129c = param_3;
  DAT_005f1380 = param_4;
  DAT_005f12b4 = param_5;
  DAT_005f1384 = param_8;
  DAT_005f1388 = param_9;
  DAT_005f1298 = 0;
  DAT_005f138c = 0x40;
  DAT_005f12a4 = 0x40;
  DAT_005ebe44 = 0;
  DAT_005ebe48 = 0;
  DAT_005ebe3c = param_1;
  if (param_1 == 1) {
    DAT_005ebf54 = 0;
    uVar3 = FUN_0040e0d4();
  }
  else {
    if (param_1 == 2) {
      DAT_005ebf54 = param_7;
      bVar1 = false;
      DAT_005f1290 = 0;
      iVar2 = (**(code **)(*DAT_005ebf30 + 0x20))(DAT_005ebf30,0,0,0,FUN_00405a70);
      if (iVar2 == 0) {
        local_c = 0;
        while ((local_c < DAT_005f1290 && (!bVar1))) {
          if ((*(short *)(&DAT_005f12c0 + local_c * 6) == param_2) &&
             ((*(short *)(&DAT_005f12c2 + local_c * 6) == param_3 &&
              (*(short *)(&DAT_005f12c4 + local_c * 6) == param_4)))) {
            bVar1 = true;
          }
          else {
            local_c = local_c + 1;
          }
        }
        if ((bVar1) && (iVar2 = FUN_0040b8fc(), iVar2 != 0)) {
          return 1;
        }
      }
    }
    DAT_005ebe3c = 0;
    uVar3 = 0;
  }
  return uVar3;
}

