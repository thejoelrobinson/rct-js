
undefined4 FUN_00405051(undefined4 param_1,BYTE *param_2,BYTE *param_3,BYTE *param_4,BYTE *param_5)

{
  LSTATUS LVar1;
  undefined4 uVar2;
  int iVar3;
  char *pcVar4;
  undefined4 *puVar5;
  CHAR local_d4;
  undefined4 local_d3;
  char local_54 [4];
  char local_50 [4];
  char local_4c [4];
  char local_48;
  undefined4 local_47;
  undefined2 local_43;
  undefined1 local_41;
  HKEY local_40;
  DWORD local_3c;
  undefined4 local_38 [5];
  undefined4 local_24;
  undefined4 local_20;
  undefined2 local_1c;
  char local_18 [4];
  char local_14 [4];
  char local_10 [4];
  char local_c [4];
  char local_8 [2];
  undefined2 local_6;
  
  local_18 = (char  [4])s_SOFTWARE_CLASSES__005ebd10._0_4_;
  local_14 = (char  [4])s_SOFTWARE_CLASSES__005ebd10._4_4_;
  local_10 = (char  [4])s_SOFTWARE_CLASSES__005ebd10._8_4_;
  local_c = (char  [4])s_SOFTWARE_CLASSES__005ebd10._12_4_;
  local_8 = (char  [2])s_SOFTWARE_CLASSES__005ebd10._16_2_;
  local_6 = 0;
  local_d4 = DAT_005ebd24;
  puVar5 = &local_d3;
  for (iVar3 = 0x1f; iVar3 != 0; iVar3 = iVar3 + -1) {
    *puVar5 = 0;
    puVar5 = puVar5 + 1;
  }
  *(undefined2 *)puVar5 = 0;
  *(undefined1 *)((int)puVar5 + 2) = 0;
  pcVar4 = s__SHELL_OPEN_COMMAND_005ebd28;
  puVar5 = local_38;
  for (iVar3 = 5; iVar3 != 0; iVar3 = iVar3 + -1) {
    *puVar5 = *(undefined4 *)pcVar4;
    pcVar4 = pcVar4 + 4;
    puVar5 = puVar5 + 1;
  }
  local_24 = 0;
  local_20 = 0;
  local_1c = 0;
  local_54 = (char  [4])s__DEFAULTICON_005ebd3c._0_4_;
  local_50 = (char  [4])s__DEFAULTICON_005ebd3c._4_4_;
  local_4c = (char  [4])s__DEFAULTICON_005ebd3c._8_4_;
  local_48 = s__DEFAULTICON_005ebd3c[0xc];
  local_47 = 0;
  local_43 = 0;
  local_41 = 0;
  LVar1 = RegOpenKeyExA((HKEY)0x80000002,local_18,0,0xf003f,&local_40);
  if (LVar1 == 0) {
    RegCloseKey(local_40);
    FUN_00413170(&local_d4,local_18);
    FUN_00413180(&local_d4,param_1);
    LVar1 = RegCreateKeyExA((HKEY)0x80000002,&local_d4,0,(LPSTR)0x0,0,0xf003f,
                            (LPSECURITY_ATTRIBUTES)0x0,&local_40,&local_3c);
    if (LVar1 == 0) {
      LVar1 = RegSetValueExA(local_40,(LPCSTR)0x0,0,1,param_2,1);
      if (LVar1 == 0) {
        RegCloseKey(local_40);
        FUN_00413170(&local_d4,local_18);
        FUN_00413180(&local_d4,param_2);
        LVar1 = RegCreateKeyExA((HKEY)0x80000002,&local_d4,0,(LPSTR)0x0,0,0xf003f,
                                (LPSECURITY_ATTRIBUTES)0x0,&local_40,&local_3c);
        if (LVar1 == 0) {
          LVar1 = RegSetValueExA(local_40,(LPCSTR)0x0,0,1,param_3,1);
          if (LVar1 == 0) {
            FUN_00413180(&local_d4,local_38);
            LVar1 = RegCreateKeyExA((HKEY)0x80000002,&local_d4,0,(LPSTR)0x0,0,0xf003f,
                                    (LPSECURITY_ATTRIBUTES)0x0,&local_40,&local_3c);
            if (LVar1 == 0) {
              LVar1 = RegSetValueExA(local_40,(LPCSTR)0x0,0,1,param_4,4);
              if (LVar1 == 0) {
                RegCloseKey(local_40);
                FUN_00413170(&local_d4,local_18);
                FUN_00413180(&local_d4,param_2);
                FUN_00413180(&local_d4,local_54);
                LVar1 = RegCreateKeyExA((HKEY)0x80000002,&local_d4,0,(LPSTR)0x0,0,0xf003f,
                                        (LPSECURITY_ATTRIBUTES)0x0,&local_40,&local_3c);
                if (LVar1 == 0) {
                  LVar1 = RegSetValueExA(local_40,(LPCSTR)0x0,0,1,param_5,4);
                  if (LVar1 == 0) {
                    RegCloseKey(local_40);
                    LVar1 = RegFlushKey((HKEY)0x80000002);
                    if (LVar1 == 0) {
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

