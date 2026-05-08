
int FUN_00414cb0(int param_1)

{
  int iVar1;
  bool bVar2;
  
  if (param_1 == -2) {
    DAT_005f023c = 1;
                    /* WARNING: Could not recover jumptable at 0x00414ccd. Too many branches */
                    /* WARNING: Treating indirect jump as call */
    iVar1 = GetOEMCP();
    return iVar1;
  }
  if (param_1 == -3) {
    DAT_005f023c = 1;
                    /* WARNING: Could not recover jumptable at 0x00414ce2. Too many branches */
                    /* WARNING: Treating indirect jump as call */
    iVar1 = GetACP();
    return iVar1;
  }
  bVar2 = param_1 == -4;
  if (bVar2) {
    param_1 = DAT_005f0280;
  }
  DAT_005f023c = (uint)bVar2;
  return param_1;
}

