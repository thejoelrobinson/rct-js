
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00414250(UINT param_1,int param_2,int param_3)

{
  HANDLE hProcess;
  undefined4 *puVar1;
  undefined4 *puVar2;
  UINT uExitCode;
  
  if (DAT_005eff08 == 1) {
    uExitCode = param_1;
    hProcess = GetCurrentProcess();
    TerminateProcess(hProcess,uExitCode);
  }
  _DAT_005eff04 = 1;
  DAT_005eff00 = (undefined1)param_3;
  if (param_2 == 0) {
    if ((DAT_005f3f6c != (undefined4 *)0x0) &&
       (puVar2 = (undefined4 *)(DAT_005f3f68 + -4), puVar1 = DAT_005f3f6c, DAT_005f3f6c <= puVar2))
    {
      do {
        if ((code *)*puVar2 != (code *)0x0) {
          (*(code *)*puVar2)();
          puVar1 = DAT_005f3f6c;
        }
        puVar2 = puVar2 + -1;
      } while (puVar1 <= puVar2);
    }
    FUN_00414300(&DAT_005e9014,&DAT_005e901c);
  }
  FUN_00414300(&DAT_005e9020,&DAT_005e9024);
  if (param_3 == 0) {
    DAT_005eff08 = 1;
                    /* WARNING: Subroutine does not return */
    ExitProcess(param_1);
  }
  return;
}

