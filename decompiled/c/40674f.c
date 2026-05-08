
void FUN_0040674f(LPRECT param_1,char *param_2)

{
  size_t cchText;
  UINT format;
  
  if (DAT_005ebe44 != 0) {
    param_1->left = 0;
    param_1->right = 0;
    param_1->top = 0;
    param_1->bottom = 0;
    format = 0xc20;
    cchText = _strlen(param_2);
    DrawTextA(DAT_005ebe48,param_2,cchText,param_1,format);
  }
  return;
}

