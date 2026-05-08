
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_0040ae98(void)

{
  undefined4 uVar1;
  int iVar2;
  undefined4 local_4e8;
  undefined4 local_4e4;
  undefined4 local_4e0 [20];
  undefined4 local_490;
  HDC local_47c;
  int local_478;
  int local_474;
  undefined4 local_470;
  undefined4 local_46c;
  undefined4 local_468;
  int local_464;
  int local_45c;
  undefined4 local_408;
  tagPALETTEENTRY local_404 [10];
  BYTE aBStack_3dc [944];
  tagPALETTEENTRY local_2c [10];
  
  DAT_005f0950 = DAT_005f12b4 + 1;
  DAT_005e916c = FUN_00405b05();
  if (DAT_005e916c == 0) {
    uVar1 = 0;
  }
  else {
    _DAT_005f0d80 = 0x16c;
    (**(code **)(*DAT_005ebf30 + 0x2c))(DAT_005ebf30,0,&DAT_005f0d80);
    local_474 = (**(code **)(*DAT_005ebf30 + 0x50))(DAT_005ebf30,DAT_005e916c,0x13);
    if (local_474 == 0) {
      local_474 = (**(code **)(*DAT_005ebf30 + 0x54))
                            (DAT_005ebf30,DAT_005f12ac,DAT_005f129c,DAT_005f1380);
      if (local_474 == 0) {
        if (DAT_005f12b4 < 1) {
          _memset(&local_470,0,0x6c);
          local_470 = 0x6c;
          local_46c = 1;
          local_408 = 0x200;
          local_474 = (**(code **)(*DAT_005ebf30 + 0x18))(DAT_005ebf30,&local_470,&DAT_005ebf34,0);
          if (local_474 != 0) {
            FUN_0040ab58();
            return 0;
          }
          DAT_005ebf38 = 0;
        }
        else {
          _memset(&local_470,0,0x6c);
          local_470 = 0x6c;
          local_46c = 0x21;
          local_408 = 0x218;
          local_45c = DAT_005f12b4;
          local_474 = (**(code **)(*DAT_005ebf30 + 0x18))(DAT_005ebf30,&local_470,&DAT_005ebf34,0);
          if (local_474 != 0) {
            FUN_0040ab58();
            return 0;
          }
          DAT_005ebf38 = FUN_00413830(DAT_005f12b4,4);
          if (DAT_005ebf38 == 0) {
            FUN_0040ab58();
            return 0;
          }
          DAT_005f0ef0 = 0;
          local_474 = (**(code **)(*DAT_005ebf34 + 0x24))(DAT_005ebf34,0,FUN_0040ab29);
          if (local_474 != 0) {
            FUN_0040ab58();
            return 0;
          }
          if (DAT_005f0ef0 != DAT_005f12b4) {
            FUN_0040ab58();
            return 0;
          }
        }
        local_474 = 0;
        local_474 = (**(code **)(*DAT_005ebf30 + 0x10))(DAT_005ebf30,0,&DAT_005ebf44,0);
        if (local_474 == 0) {
          local_474 = (**(code **)(*DAT_005ebf44 + 0x20))(DAT_005ebf44,0,DAT_005e916c);
          if (local_474 == 0) {
            iVar2 = 0;
            if (DAT_005f1380 == 8) {
              local_47c = GetDC((HWND)0x0);
              GetSystemPaletteEntries(local_47c,0,10,local_404);
              for (local_478 = 0; local_478 < 10; local_478 = local_478 + 1) {
                local_404[local_478].peFlags = '\x02';
                local_2c[local_478].peFlags = '\x02';
              }
              GetSystemPaletteEntries(local_47c,0xf6,10,(LPPALETTEENTRY)(aBStack_3dc + 0x3b0));
              ReleaseDC((HWND)0x0,local_47c);
              for (local_478 = 10; local_478 < 0xf6; local_478 = local_478 + 1) {
                local_404[local_478].peBlue = (char)local_478 + 0xf7;
                local_404[local_478].peGreen = local_404[local_478].peBlue;
                local_404[local_478].peRed = local_404[local_478].peGreen;
                local_404[local_478].peFlags = '\x05';
              }
              local_474 = (**(code **)(*DAT_005ebf30 + 0x14))
                                    (DAT_005ebf30,0x4c,local_404,&DAT_005ebf3c,0);
              if (local_474 != 0) {
                FUN_0040acfb();
                return 0;
              }
              (**(code **)(*DAT_005ebf34 + 0x7c))(DAT_005ebf34,DAT_005ebf3c);
              for (local_478 = 0; iVar2 = local_474, local_478 < 0x100; local_478 = local_478 + 1) {
                *(tagPALETTEENTRY *)(&DAT_005f0960 + local_478 * 4) = local_404[local_478];
              }
            }
            local_474 = iVar2;
            local_46c = 7;
            local_408 = 0x40;
            local_464 = DAT_005f0950 * 0x40 + 0x40;
            local_468 = 0x40;
            iVar2 = (**(code **)(*DAT_005ebf30 + 0x18))(DAT_005ebf30,&local_470,&DAT_005ebf40,0);
            if (iVar2 == 0) {
              local_4e0[0] = 100;
              local_490 = 0;
              local_474 = 0;
              while (iVar2 = (**(code **)(*DAT_005ebf40 + 0x14))
                                       (DAT_005ebf40,0,0,0,0x1000400,local_4e0),
                    iVar2 == -0x7789fe3e) {
                FUN_00408d5d();
              }
              FUN_004119a0(DAT_005ebf40,s_InternalCursor_005ebfc8);
              local_4e8 = 0;
              local_4e4 = 0;
              (**(code **)(*DAT_005ebf40 + 0x74))(DAT_005ebf40,8,&local_4e8);
            }
            DAT_005f138c = 8;
            DAT_005f12a4 = 8;
            for (local_478 = 0; local_478 < DAT_005f12b4; local_478 = local_478 + 1) {
              (&DAT_005f0f04)[local_478 * 4] = 0;
              (&DAT_005f0f00)[local_478 * 4] = (&DAT_005f0f04)[local_478 * 4];
              (&DAT_005f0f0c)[local_478 * 4] = 0;
              (&DAT_005f0f08)[local_478 * 4] = (&DAT_005f0f0c)[local_478 * 4];
            }
            DAT_005ebe50 = FUN_0040ab58;
            uVar1 = 1;
          }
          else {
            FUN_0040ab58();
            uVar1 = 0;
          }
        }
        else {
          FUN_0040ab58();
          uVar1 = 0;
        }
      }
      else {
        FUN_0040ab58();
        uVar1 = 0;
      }
    }
    else {
      FUN_0040ab58();
      uVar1 = 0;
    }
  }
  return uVar1;
}

