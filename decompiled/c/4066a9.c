
void FUN_004066a9(int param_1,LONG param_2,char *param_3,int param_4)

{
  uint format;
  size_t cchText;
  tagRECT *lprc;
  tagRECT local_14;
  
  if (DAT_005ebe44 != 0) {
    local_14.left = param_1;
    local_14.top = param_2;
    local_14.bottom = param_2;
    local_14.right = param_4 + param_1;
    format = DAT_005ebe4c | 0x920;
    lprc = &local_14;
    cchText = _strlen(param_3);
    DrawTextA(DAT_005ebe48,param_3,cchText,lprc,format);
  }
  return;
}

