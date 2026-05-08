
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00414690(void)

{
  int iVar1;
  char *pcVar2;
  int local_8;
  int local_4;
  
  GetModuleFileNameA((HMODULE)0x0,&DAT_005eff10,0x104);
  _DAT_005efef8 = &DAT_005eff10;
  pcVar2 = DAT_005f3f70;
  if (*DAT_005f3f70 == '\0') {
    pcVar2 = &DAT_005eff10;
  }
  FUN_00414730(pcVar2,0,0,&local_8,&local_4);
  iVar1 = FUN_004133c0(local_4 + local_8 * 4);
  if (iVar1 == 0) {
    __amsg_exit(8);
  }
  FUN_00414730(pcVar2,iVar1,iVar1 + local_8 * 4,&local_8,&local_4);
  _DAT_005efee0 = iVar1;
  _DAT_005efedc = local_8 + -1;
  return;
}

