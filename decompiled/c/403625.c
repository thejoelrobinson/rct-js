
undefined4 FUN_00403625(HWND param_1,int param_2,int param_3)

{
  size_t sVar1;
  HWND hWnd;
  
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
    }
    hWnd = GetDlgItem(param_1,1000);
    SetFocus(hWnd);
  }
  else if (param_2 == 0x111) {
    if (param_3 == 1) {
      GetDlgItemTextA(param_1,1000,DAT_005f1390,0x104);
    }
    else if (param_3 != 2) {
      return 0;
    }
    EndDialog(param_1,param_3);
  }
  return 0;
}

