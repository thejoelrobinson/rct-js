
void FUN_0040670b(LPRECT param_1,char *param_2)

{
  uint format;
  size_t cchText;
  
  if (DAT_005ebe44 != 0) {
    format = DAT_005ebe4c | 0x810;
    cchText = _strlen(param_2);
    DrawTextA(DAT_005ebe48,param_2,cchText,param_1,format);
  }
  return;
}

