
undefined4 FUN_004059dd(int param_1,undefined4 param_2,undefined4 param_3)

{
  int *piVar1;
  char *pcVar2;
  char *local_408;
  CHAR local_404 [1024];
  
  local_408 = s_WM_NULL_005e9408;
  do {
    if (*(int *)(local_408 + 0x30) == param_1) break;
    pcVar2 = local_408 + 0x34;
    piVar1 = (int *)(local_408 + 100);
    local_408 = pcVar2;
  } while (*piVar1 != 0xffff);
  FUN_00413620(local_404,s_Message_id____s___i___wParam___0_005ebe00,local_408,param_1,param_2,
               param_3);
  OutputDebugStringA(local_404);
  return 1;
}

