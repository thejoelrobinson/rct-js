
bool FUN_00405653(LPBYTE param_1,undefined4 param_2)

{
  LSTATUS LVar1;
  LOGFONTA local_158;
  BYTE local_11c [4];
  LONG local_118;
  CHAR local_114 [260];
  HKEY local_10;
  DWORD local_c [2];
  
  FUN_00413170(local_114,s_Software_Fish_Technology_Group__005ebd64);
  FUN_00413180(local_114,param_2);
  LVar1 = RegOpenKeyA((HKEY)0x80000002,local_114,&local_10);
  if (LVar1 == 0) {
    local_c[1] = 0x104;
    RegQueryValueExA(local_10,s_Title_005ebd84,(LPDWORD)0x0,local_c,param_1 + 4,local_c + 1);
    local_c[1] = 0x104;
    RegQueryValueExA(local_10,&DAT_005ebd8c,(LPDWORD)0x0,local_c,param_1 + 0x108,local_c + 1);
    local_c[1] = 0x104;
    RegQueryValueExA(local_10,s_SetupPath_005ebd94,(LPDWORD)0x0,local_c,param_1 + 0x20c,local_c + 1)
    ;
    local_c[1] = 4;
    RegQueryValueExA(local_10,s_InstallLevel_005ebda0,(LPDWORD)0x0,local_c,param_1,local_c + 1);
    _memset(&local_158,0,0x3c);
    local_c[1] = 4;
    RegQueryValueExA(local_10,s_FontPointSize_005ebdb0,(LPDWORD)0x0,local_c,(LPBYTE)&local_118,
                     local_c + 1);
    local_c[1] = 0x20;
    RegQueryValueExA(local_10,s_FontFaceName_005ebdc0,(LPDWORD)0x0,local_c,
                     (LPBYTE)local_158.lfFaceName,local_c + 1);
    local_c[1] = 4;
    RegQueryValueExA(local_10,s_CharSet_005ebdd0,(LPDWORD)0x0,local_c,local_11c,local_c + 1);
    local_158.lfHeight = local_118;
    local_158.lfWeight = 400;
    local_158.lfCharSet = local_11c[0];
    DAT_005e91ec = CreateFontIndirectA(&local_158);
    local_c[1] = 0x104;
    RegQueryValueExA(local_10,s_OKPrompt_005ebdd8,(LPDWORD)0x0,local_c,&DAT_005e91f0,local_c + 1);
    local_c[1] = 0x104;
    RegQueryValueExA(local_10,s_CancelPrompt_005ebde4,(LPDWORD)0x0,local_c,&DAT_005e92f8,local_c + 1
                    );
    RegCloseKey(local_10);
  }
  return LVar1 == 0;
}

