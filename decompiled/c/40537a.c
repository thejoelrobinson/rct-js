
undefined4 FUN_0040537a(undefined4 param_1)

{
  LSTATUS LVar1;
  undefined4 uVar2;
  int iVar3;
  undefined4 *puVar4;
  CHAR local_124;
  undefined4 local_123;
  BYTE local_a4 [128];
  HKEY local_24;
  char local_20 [4];
  char local_1c [4];
  char local_18 [4];
  char local_14 [4];
  char local_10 [2];
  undefined2 local_e;
  DWORD local_c [2];
  
  local_20 = (char  [4])s_SOFTWARE_CLASSES__005ebd4c._0_4_;
  local_1c = (char  [4])s_SOFTWARE_CLASSES__005ebd4c._4_4_;
  local_18 = (char  [4])s_SOFTWARE_CLASSES__005ebd4c._8_4_;
  local_14 = (char  [4])s_SOFTWARE_CLASSES__005ebd4c._12_4_;
  local_10 = (char  [2])s_SOFTWARE_CLASSES__005ebd4c._16_2_;
  local_e = 0;
  local_124 = DAT_005ebd60;
  puVar4 = &local_123;
  for (iVar3 = 0x1f; iVar3 != 0; iVar3 = iVar3 + -1) {
    *puVar4 = 0;
    puVar4 = puVar4 + 1;
  }
  *(undefined2 *)puVar4 = 0;
  *(undefined1 *)((int)puVar4 + 2) = 0;
  FUN_00413170(&local_124,local_20);
  FUN_00413180(&local_124,param_1);
  LVar1 = RegOpenKeyExA((HKEY)0x80000002,&local_124,0,0xf003f,&local_24);
  if (LVar1 == 0) {
    local_c[1] = 0x80;
    LVar1 = RegQueryValueExA(local_24,(LPCSTR)0x0,(LPDWORD)0x0,local_c,local_a4,local_c + 1);
    if (LVar1 == 0) {
      RegCloseKey(local_24);
      LVar1 = RegDeleteKeyA((HKEY)0x80000002,&local_124);
      if (LVar1 == 0) {
        FUN_00413170(&local_124,local_20);
        FUN_00413180(&local_124,local_a4);
        LVar1 = RegDeleteKeyA((HKEY)0x80000002,&local_124);
        if (LVar1 == 0) {
          RegFlushKey((HKEY)0x80000002);
          uVar2 = 1;
        }
        else {
          uVar2 = 0;
        }
      }
      else {
        uVar2 = 0;
      }
    }
    else {
      uVar2 = 0;
    }
  }
  else {
    uVar2 = 0;
  }
  return uVar2;
}

