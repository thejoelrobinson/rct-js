
HDC FUN_00409677(int param_1)

{
  int iVar1;
  tagRECT local_18;
  HDC local_8;
  
  if (((*(short *)(param_1 + 0xc) == 0) && (*(int *)(param_1 + 0x80) != 0)) &&
     (iVar1 = (**(code **)(**(int **)(param_1 + 0x80) + 0x44))
                        (*(undefined4 *)(param_1 + 0x80),&local_8), iVar1 == 0)) {
    *(undefined2 *)(param_1 + 0xc) = 1;
    if ((DAT_005ebf54 == 0) && (*(int *)(param_1 + 0x80) == DAT_005ebf34)) {
      GetClientRect(DAT_005e916c,&local_18);
      ClientToScreen(DAT_005e916c,(LPPOINT)&local_18);
      SetViewportOrgEx(local_8,local_18.left,local_18.top,(LPPOINT)0x0);
    }
  }
  else {
    local_8 = (HDC)0x0;
  }
  return local_8;
}

