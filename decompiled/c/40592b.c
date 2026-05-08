
/* Library Function - Single Match
    struct HWND__ * __cdecl GetNextWindow(struct HWND__ *,unsigned int)
   
   Library: Visual Studio 1998 Debug */

HWND__ * __cdecl GetNextWindow(HWND__ *param_1,uint param_2)

{
  HWND__ *pHVar1;
  
  pHVar1 = (HWND__ *)SetCursorPos((int)param_1,param_2);
  return pHVar1;
}

