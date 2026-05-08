
int FUN_00401220(undefined4 param_1)

{
  int iVar1;
  int local_10;
  int local_c;
  int local_8;
  
  local_c = 0;
  FUN_004061b9();
  if (DAT_005e9100 != 0) {
    (*DAT_005ebe90)(DAT_005e9100);
  }
  DAT_005e9100 = 0;
  switch(param_1) {
  case 1:
    local_c = FUN_00405fe2(1,DAT_005e9134,DAT_005e9138,8,0,0,0,DAT_005e913c,DAT_005e9140);
    local_8 = DAT_005f15a8;
    local_10 = DAT_005f15ac;
    break;
  case 2:
    if (DAT_005f15b0 != 8) {
      DAT_005e9100 = 0;
      return 0;
    }
    local_c = FUN_00405fe2(2,DAT_005e9134,DAT_005e9138,8,0,0,0,DAT_005e913c,DAT_005e9140);
    local_8 = DAT_005f15a8;
    local_10 = DAT_005f15ac;
    break;
  case 3:
    local_c = FUN_00405fe2(2,0x280,0x1e0,8,0,0,1,0,0);
    local_8 = 0x280;
    local_10 = 0x1e0;
    break;
  case 4:
    local_c = FUN_00405fe2(2,800,600,8,0,0,1,0,0);
    local_8 = 800;
    local_10 = 600;
    break;
  case 5:
    local_c = FUN_00405fe2(2,0x400,0x300,8,0,0,1,0,0);
    local_8 = 0x400;
    local_10 = 0x300;
    break;
  case 6:
    local_c = FUN_00405fe2(2,0x480,0x360,8,0,0,1,0,0);
    local_8 = 0x480;
    local_10 = 0x360;
    break;
  case 7:
    local_c = FUN_00405fe2(2,0x500,0x400,8,0,0,1,0,0);
    local_8 = 0x500;
    local_10 = 0x400;
    break;
  case 8:
    local_c = FUN_00405fe2(2,0x280,0x1e0,0x10,0,0,1,0,0);
    local_8 = 0x280;
    local_10 = 0x1e0;
  }
  if (local_c == 0) {
    DAT_005e910c = 0;
  }
  else {
    if (0x500 < local_8) {
      local_8 = 0x500;
    }
    if (0x400 < local_10) {
      local_10 = 0x400;
    }
    DAT_005f1a04 = 0x140;
    DAT_005f1fc0 = local_8;
    DAT_005f139c = 0xf0;
    DAT_005f1b28 = local_10;
    DAT_005e9100 = (*DAT_005ebe8c)(local_8,local_10);
    iVar1 = FUN_00402a00();
    if (iVar1 == 0) {
      local_c = 0;
    }
    else {
      FUN_00402aa4();
      DAT_005e9154 = 1;
      DAT_005e910c = param_1;
    }
  }
  return local_c;
}

