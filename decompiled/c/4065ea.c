
void FUN_004065ea(HGDIOBJ param_1)

{
  HGDIOBJ pvVar1;
  
  if (DAT_005ebe44 != 0) {
    if (*(int *)(DAT_005f12b0 + 0xa0) == 0) {
      pvVar1 = SelectObject(DAT_005ebe48,param_1);
      *(HGDIOBJ *)(DAT_005f12b0 + 0xa0) = pvVar1;
    }
    else {
      SelectObject(DAT_005ebe48,param_1);
    }
  }
  return;
}

