
undefined4 FUN_004037cf(HWND param_1,int param_2,int param_3)

{
  size_t sVar1;
  HWND hWnd;
  undefined4 uVar2;
  
  if (param_2 == 0x110) {
    if (DAT_005e91ec != 0) {
      SendMessageA(param_1,0x30,DAT_005e91ec,1);
      SendDlgItemMessageA(param_1,0x3ea,0x30,DAT_005e91ec,1);
      SendDlgItemMessageA(param_1,1000,0x30,DAT_005e91ec,1);
      SendDlgItemMessageA(param_1,1,0x30,DAT_005e91ec,1);
      SendDlgItemMessageA(param_1,2,0x30,DAT_005e91ec,1);
    }
    SetWindowTextA(param_1,DAT_005f1fd4);
    SetDlgItemTextA(param_1,0x3ea,DAT_005f1fc8);
    SetDlgItemTextA(param_1,1,&DAT_005e91f0);
    SetDlgItemTextA(param_1,2,&DAT_005e92f8);
    sVar1 = _strlen(DAT_005f1390);
    if (sVar1 != 0) {
      SetDlgItemTextA(param_1,1000,DAT_005f1390);
      SendDlgItemMessageA(param_1,1000,0xb1,0,-1);
    }
    hWnd = GetDlgItem(param_1,1000);
    SetFocus(hWnd);
    return 0;
  }
  if (param_2 == 0x111) {
    if (param_3 == 1) {
      GetDlgItemTextA(param_1,1000,DAT_005f1390,0x104);
    }
    else if (param_3 != 2) goto LAB_004039ae;
    *DAT_005f1ca8 = param_3;
    *DAT_005f13b0 = 1;
    DestroyWindow(param_1);
    DAT_005e91e0 = 0;
    FUN_00401120(0);
    uVar2 = 1;
  }
  else {
LAB_004039ae:
    uVar2 = 0;
  }
  return uVar2;
}

