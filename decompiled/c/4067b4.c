
void FUN_004067b4(LPRECT param_1,char *param_2,LONG param_3)

{
  uint format;
  size_t cchText;
  
  if (DAT_005ebe44 != 0) {
    param_1->left = 0;
    param_1->right = param_3;
    param_1->top = 0;
    param_1->bottom = 0;
    format = DAT_005ebe4c | 0xc10;
    cchText = _strlen(param_2);
    DrawTextA(DAT_005ebe48,param_2,cchText,param_1,format);
  }
  return;
}

