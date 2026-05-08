
void FUN_00409549(int param_1,int param_2,int param_3)

{
  int local_c;
  
  if ((DAT_005ebf3c != (int *)0x0) && (param_2 < 0x100)) {
    if (param_2 < 10) {
      param_2 = 10;
    }
    if (0xf6 < param_3 + param_2) {
      param_3 = 0xf6 - param_2;
    }
    for (local_c = param_2; local_c < param_3 + param_2; local_c = local_c + 1) {
      (&DAT_005f0960)[local_c * 4] = *(undefined1 *)(param_1 + 2 + local_c * 4);
      *(undefined1 *)(local_c * 4 + 0x5f0961) = *(undefined1 *)(param_1 + 1 + local_c * 4);
      *(undefined1 *)(local_c * 4 + 0x5f0962) = *(undefined1 *)(param_1 + local_c * 4);
      *(undefined1 *)(local_c * 4 + 0x5f0963) = 5;
    }
    (**(code **)(*DAT_005ebf3c + 0x18))(DAT_005ebf3c,0,param_2,param_3,&DAT_005f0960 + param_2 * 4);
  }
  return;
}

