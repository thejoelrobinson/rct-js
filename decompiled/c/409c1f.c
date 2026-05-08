
undefined4 FUN_00409c1f(int param_1,undefined4 param_2,int param_3,int *param_4)

{
  int iVar1;
  tagRECT local_28;
  int local_18;
  int local_14;
  int local_10;
  int local_c;
  int local_8;
  
  if ((((param_1 != 0) && (param_3 != 0)) && (*(int *)(param_3 + 0x80) != 0)) &&
     (*(int *)(param_1 + 0x80) != 0)) {
    if (DAT_005ebf54 == 0) {
      local_18 = *param_4;
      local_14 = param_4[1];
      local_10 = param_4[2];
      local_c = param_4[3];
      GetClientRect(DAT_005e916c,&local_28);
      ClientToScreen(DAT_005e916c,(LPPOINT)&local_28);
      *param_4 = *param_4 + local_28.left;
      param_4[1] = param_4[1] + local_28.top;
      param_4[2] = param_4[2] + local_28.left;
      param_4[3] = param_4[3] + local_28.top;
    }
    do {
      local_8 = (**(code **)(**(int **)(param_3 + 0x80) + 0x14))
                          (*(undefined4 *)(param_3 + 0x80),param_4,*(undefined4 *)(param_1 + 0x80),
                           param_2,0x1000000,0);
      if ((local_8 == -0x7789fe3e) && (iVar1 = FUN_00408d5d(), iVar1 == 0)) break;
    } while (local_8 == -0x7789fe3e);
    if (DAT_005ebf54 == 0) {
      *param_4 = local_18;
      param_4[1] = local_14;
      param_4[2] = local_10;
      param_4[3] = local_c;
    }
    if (local_8 == 0) {
      return 1;
    }
    if (local_8 < -0x7fffbffa) {
      if (local_8 == -0x7fffbffb) {
        return 0;
      }
      if (local_8 == -0x7fffbfff) {
        return 0;
      }
    }
    else if (local_8 < -0x7789ff91) {
      if (local_8 == -0x7789ff92) {
        return 0;
      }
      if (local_8 == -0x7ff8ffa9) {
        return 0;
      }
    }
    else if (local_8 < -0x7789ff69) {
      if (local_8 == -0x7789ff6a) {
        return 0;
      }
      if (local_8 == -0x7789ff7e) {
        return 0;
      }
    }
    else if (local_8 < -0x7789ff32) {
      if (local_8 == -0x7789ff33) {
        return 0;
      }
      if (local_8 == -0x7789ff4c) {
        return 0;
      }
    }
    else if (local_8 < -0x7789fee7) {
      if (local_8 == -0x7789fee8) {
        return 0;
      }
      if (local_8 == -0x7789ff06) {
        return 0;
      }
    }
    else if (local_8 < -0x7789fec9) {
      if (local_8 == -0x7789feca) {
        return 0;
      }
      if (local_8 == -0x7789fede) {
        return 0;
      }
    }
    else {
      switch(local_8) {
      case -0x7789feac:
        return 0;
      case -0x7789fe52:
        return 0;
      case -0x7789fe3e:
        return 0;
      case -0x7789fdc1:
        return 0;
      case -0x7789fdc0:
        return 0;
      }
    }
  }
  return 0;
}

