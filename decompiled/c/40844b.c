
HANDLE FUN_0040844b(LPCSTR param_1,LPWIN32_FIND_DATAA param_2)

{
  HANDLE pvVar1;
  
  pvVar1 = FindFirstFileA(param_1,param_2);
  return pvVar1;
}

