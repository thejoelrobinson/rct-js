
undefined4 FUN_00414560(uint param_1,uint param_2,byte param_3)

{
  if ((*(byte *)((int)&DAT_005f0020 + (param_1 & 0xff) + 1) & param_3) == 0) {
    if (param_2 == 0) {
      param_2 = 0;
    }
    else {
      param_2 = *(ushort *)(&DAT_005ee552 + (param_1 & 0xff) * 2) & param_2;
    }
    if (param_2 == 0) {
      return 0;
    }
  }
  return 1;
}

