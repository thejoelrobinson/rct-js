
void FUN_0040cb41(int param_1)

{
  uint local_28;
  int local_24;
  int local_20;
  undefined1 local_1c [4];
  undefined4 local_18;
  undefined4 local_14;
  uint local_10;
  uint local_c;
  int local_8;
  
  local_8 = (**(code **)(**(int **)(&DAT_005ebfe8 + param_1 * 4) + 0x2c))
                      (*(undefined4 *)(&DAT_005ebfe8 + param_1 * 4),0,
                       *(undefined4 *)(&DAT_005f04f0 + param_1 * 0x16c),&local_20,&local_10,
                       &local_18,local_1c,0);
  if (local_8 == 0) {
    if ((local_10 != 0) &&
       (local_14 = FUN_004122a3(*(undefined4 *)(&DAT_005f04c0 + param_1 * 0x16c),local_10,local_20,
                                param_1 * 0x16c + 0x5f04c4,&local_c), local_c < local_10)) {
      if (*(int *)(&DAT_005f0504 + param_1 * 0x16c) == 0) {
        *(undefined4 *)(&DAT_005f0508 + param_1 * 0x16c) = 1;
        *(uint *)(&DAT_005f04fc + param_1 * 0x16c) = local_c;
        _memset((void *)(local_c + local_20),
                (uint)(-(*(short *)(*(int *)(&DAT_005f04bc + param_1 * 0x16c) + 0xe) == 8) & 0x80),
                local_10 - local_c);
      }
      else {
        local_24 = local_20;
        local_28 = local_10;
        do {
          local_24 = local_24 + local_c;
          local_28 = local_28 - local_c;
          FUN_0040c93f(param_1);
          local_14 = FUN_004122a3(*(undefined4 *)(&DAT_005f04c0 + param_1 * 0x16c),local_28,local_24
                                  ,param_1 * 0x16c + 0x5f04c4,&local_c);
        } while (local_c < local_28);
      }
    }
    (**(code **)(**(int **)(&DAT_005ebfe8 + param_1 * 4) + 0x4c))
              (*(undefined4 *)(&DAT_005ebfe8 + param_1 * 4),local_20,local_10,local_18,0);
    *(undefined4 *)(&DAT_005f04f8 + param_1 * 0x16c) = 0;
    *(undefined4 *)(&DAT_005f04f4 + param_1 * 0x16c) =
         *(undefined4 *)(&DAT_005f04f8 + param_1 * 0x16c);
  }
  return;
}

