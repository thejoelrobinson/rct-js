
int FUN_00412d03(undefined4 param_1,undefined4 param_2,undefined4 param_3,undefined4 param_4,
                undefined4 param_5)

{
  undefined4 local_80;
  undefined1 local_7c [4];
  undefined1 local_78 [20];
  undefined1 local_64 [20];
  undefined1 local_50 [72];
  int local_8;
  
  local_8 = FUN_00412455(param_1,&local_80,param_4,local_64,local_78);
  if (((local_8 == 0) && (local_8 = FUN_0041263d(&local_80,local_64,local_50), local_8 == 0)) &&
     (local_8 = FUN_004126ba(local_80,param_2,param_5,local_64,local_7c,local_50), local_8 == 0)) {
    local_8 = FUN_00412759(&local_80,local_64,local_78,local_50,param_3);
  }
  return local_8;
}

