
undefined4 FUN_0040864b(HWND param_1,int param_2,undefined4 param_3,int param_4)

{
  HWND pHVar1;
  
  if (param_2 == 0x4e) {
    if (*(int *)(param_4 + 8) == -0x259) {
      pHVar1 = GetParent(param_1);
      GetDlgItem(pHVar1,0x40e);
    }
  }
  else if (param_2 == 0x110) {
    pHVar1 = GetParent(param_1);
    pHVar1 = GetDlgItem(pHVar1,0x40e);
    if (pHVar1 != (HWND)0x0) {
      ShowWindow(pHVar1,5);
    }
  }
  return 1;
}

