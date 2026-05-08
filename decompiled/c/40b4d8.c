
undefined4 FUN_0040b4d8(void)

{
  int iVar1;
  undefined4 uVar2;
  HDC hdc;
  int local_478;
  undefined4 local_470;
  undefined4 local_46c;
  undefined4 local_468;
  undefined4 local_464;
  undefined4 local_408;
  tagPALETTEENTRY local_404 [10];
  BYTE aBStack_3dc [944];
  tagPALETTEENTRY local_2c [10];
  
  DAT_005f0950 = DAT_005f12b4;
  DAT_005e916c = FUN_00405b58();
  if (DAT_005e916c == 0) {
    uVar2 = 0;
  }
  else {
    iVar1 = (**(code **)(*DAT_005ebf30 + 0x50))(DAT_005ebf30,DAT_005e916c,8);
    if (iVar1 == 0) {
      _memset(&local_470,0,0x6c);
      local_470 = 0x6c;
      local_46c = 1;
      local_408 = 0x200;
      iVar1 = (**(code **)(*DAT_005ebf30 + 0x18))(DAT_005ebf30,&local_470,&DAT_005ebf34,0);
      if (iVar1 == 0) {
        if ((0 < DAT_005f12b4) && (DAT_005ebf38 = FUN_00413830(DAT_005f12b4,4), DAT_005ebf38 == 0))
        {
          FUN_0040acfb();
          return 0;
        }
        for (local_478 = 0; local_478 < DAT_005f12b4; local_478 = local_478 + 1) {
          local_46c = 7;
          local_408 = 0x840;
          local_468 = DAT_005f129c;
          local_464 = DAT_005f12ac;
          iVar1 = (**(code **)(*DAT_005ebf30 + 0x18))
                            (DAT_005ebf30,&local_470,local_478 * 4 + DAT_005ebf38,0);
          if (iVar1 != 0) {
            FUN_0040acfb();
            return 0;
          }
        }
        iVar1 = (**(code **)(*DAT_005ebf30 + 0x10))(DAT_005ebf30,0,&DAT_005ebf44,0);
        if (iVar1 == 0) {
          iVar1 = (**(code **)(*DAT_005ebf44 + 0x20))(DAT_005ebf44,0,DAT_005e916c);
          if (iVar1 == 0) {
            iVar1 = (**(code **)(*DAT_005ebf34 + 0x70))(DAT_005ebf34,DAT_005ebf44);
            if (iVar1 == 0) {
              if (DAT_005f1380 == 8) {
                hdc = GetDC((HWND)0x0);
                GetSystemPaletteEntries(hdc,0,10,local_404);
                GetSystemPaletteEntries(hdc,0xf6,10,(LPPALETTEENTRY)(aBStack_3dc + 0x3b0));
                ReleaseDC((HWND)0x0,hdc);
                for (local_478 = 0; local_478 < 10; local_478 = local_478 + 1) {
                  local_404[local_478].peFlags = '\x02';
                  local_2c[local_478].peFlags = '\x02';
                }
                for (local_478 = 10; local_478 < 0xf6; local_478 = local_478 + 1) {
                  local_404[local_478].peBlue = (char)local_478 + 0xf7;
                  local_404[local_478].peGreen = local_404[local_478].peBlue;
                  local_404[local_478].peRed = local_404[local_478].peGreen;
                  local_404[local_478].peFlags = '\x05';
                }
                iVar1 = (**(code **)(*DAT_005ebf30 + 0x14))
                                  (DAT_005ebf30,0x4c,local_404,&DAT_005ebf3c,0);
                if (iVar1 != 0) {
                  FUN_0040acfb();
                  return 0;
                }
                (**(code **)(*DAT_005ebf34 + 0x7c))(DAT_005ebf34,DAT_005ebf3c);
                for (local_478 = 0; local_478 < 0x100; local_478 = local_478 + 1) {
                  *(tagPALETTEENTRY *)(&DAT_005f0960 + local_478 * 4) = local_404[local_478];
                }
              }
              DAT_005ebe50 = FUN_0040acfb;
              uVar2 = 1;
            }
            else {
              FUN_0040acfb();
              uVar2 = 0;
            }
          }
          else {
            FUN_0040acfb();
            uVar2 = 0;
          }
        }
        else {
          FUN_0040acfb();
          uVar2 = 0;
        }
      }
      else {
        FUN_0040acfb();
        uVar2 = 0;
      }
    }
    else {
      FUN_0040acfb();
      uVar2 = 0;
    }
  }
  return uVar2;
}

