
void FUN_0040657c(undefined4 param_1,LONG param_2,LONG param_3,BYTE param_4,BYTE param_5)

{
  LOGFONTA local_40;
  
  _memset(&local_40,0,0x3c);
  local_40.lfHeight = param_2;
  local_40.lfWeight = param_3;
  local_40.lfCharSet = 0x81;
  local_40.lfItalic = param_4;
  local_40.lfUnderline = param_5;
  FUN_00413170(local_40.lfFaceName,param_1);
  CreateFontIndirectA(&local_40);
  return;
}

