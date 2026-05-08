
void FUN_00404b57(LPCSTR param_1)

{
  DWORD dwMessageId;
  DWORD dwLanguageId;
  CHAR *lpBuffer;
  DWORD nSize;
  va_list *Arguments;
  CHAR local_108 [260];
  
  Arguments = (va_list *)0x0;
  nSize = 0x104;
  lpBuffer = local_108;
  dwLanguageId = 0x400;
  dwMessageId = GetLastError();
  FormatMessageA(0x1000,(LPCVOID)0x0,dwMessageId,dwLanguageId,lpBuffer,nSize,Arguments);
  MessageBoxA((HWND)0x0,local_108,param_1,0x40);
  return;
}

