
BOOL FUN_0040871f(int param_1,LPCSTR param_2,char *param_3,undefined4 param_4,undefined4 param_5)

{
  undefined4 uVar1;
  size_t sVar2;
  int iVar3;
  undefined4 *puVar4;
  BOOL local_26c;
  CHAR local_268;
  undefined4 local_267;
  char *local_164;
  char *local_160;
  char *local_15c;
  undefined4 local_158;
  undefined1 local_154;
  undefined4 local_153;
  DWORD local_50;
  HWND local_4c;
  LPCSTR local_44;
  char *local_34;
  DWORD local_30;
  CHAR *local_24;
  LPCSTR local_20;
  DWORD local_1c;
  
  local_164 = &DAT_005f0f20;
  local_268 = DAT_005ebf24;
  puVar4 = &local_267;
  for (iVar3 = 0x40; iVar3 != 0; iVar3 = iVar3 + -1) {
    *puVar4 = 0;
    puVar4 = puVar4 + 1;
  }
  *(undefined2 *)puVar4 = 0;
  *(undefined1 *)((int)puVar4 + 2) = 0;
  local_154 = DAT_005ebf28;
  puVar4 = &local_153;
  for (iVar3 = 0x40; iVar3 != 0; iVar3 = iVar3 + -1) {
    *puVar4 = 0;
    puVar4 = puVar4 + 1;
  }
  *(undefined2 *)puVar4 = 0;
  *(undefined1 *)((int)puVar4 + 2) = 0;
  local_158 = 0x2e;
  local_15c = _strrchr(param_3,0x2e);
  local_158 = 0x5c;
  local_160 = _strrchr(param_3,0x5c);
  if (local_15c == (char *)0x0) {
    if (local_160 != (char *)0x0) {
      FUN_00413170(&local_268,param_3);
    }
  }
  else if (local_160 == (char *)0x0) {
    FUN_00413170(&local_154,param_3);
  }
  else {
    FUN_00413170(&local_154,local_160 + 1);
    local_160[1] = '\0';
    FUN_00413170(&local_268,param_3);
  }
  FUN_00413170(param_3,&local_154);
  _memset(&local_50,0,0x4c);
  local_50 = 0x4c;
  local_4c = DAT_005e916c;
  local_34 = param_3;
  local_24 = &local_268;
  local_20 = param_2;
  local_30 = 0x104;
  FUN_00413170(local_164,param_5);
  sVar2 = _strlen(local_164);
  local_164 = local_164 + sVar2 + 1;
  FUN_00413170(local_164,param_4);
  sVar2 = _strlen(local_164);
  local_164 = local_164 + sVar2 + 1;
  *local_164 = '\0';
  uVar1 = DAT_005e9150;
  local_44 = &DAT_005f0f20;
  if ((DAT_005ebe3c == 2) && (DAT_005ebf54 == 1)) {
    FUN_0040ba8c(0);
    DAT_005e9150 = 1;
  }
  if (param_1 == 1) {
    local_1c = 0xa1804;
    local_26c = GetOpenFileNameA((LPOPENFILENAMEA)&local_50);
  }
  else if (param_1 == 2) {
    local_1c = 0x82806;
    local_26c = GetSaveFileNameA((LPOPENFILENAMEA)&local_50);
  }
  if ((DAT_005ebe3c == 2) && (DAT_005ebf54 == 1)) {
    FUN_0040ba8c(1);
  }
  DAT_005e9150 = uVar1;
  return local_26c;
}

