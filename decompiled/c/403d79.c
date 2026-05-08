
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

HWND FUN_00403d79(HWND param_1,uint param_2,HDROP param_3,uint param_4)

{
  short sVar1;
  short sVar2;
  HDC hdc;
  uint uVar3;
  HWND pHVar4;
  tagRECT local_14;
  
  if (DAT_005e9168 != 0) {
    FUN_004059dd(param_2,param_3,param_4);
  }
  sVar1 = (short)param_4;
  sVar2 = (short)(param_4 >> 0x10);
  if (param_2 < 0x10) {
    if (param_2 == 0xf) {
      GetUpdateRect(DAT_005e916c,&local_14,0);
      FUN_00401120(&local_14);
      ValidateRect(DAT_005e916c,(RECT *)0x0);
      return (HWND)0x1;
    }
    pHVar4 = (HWND)(param_2 - 1);
    switch(pHVar4) {
    case (HWND)0x0:
      break;
    default:
      goto switchD_004044fd_caseD_1;
    case (HWND)0x2:
      DAT_005f1cac = (int)sVar1;
      DAT_005f1cb0 = (int)sVar2;
      _DAT_005e9180 = 1;
      pHVar4 = (HWND)0x0;
      break;
    case (HWND)0x4:
      DAT_005f15c4 = (int)sVar1;
      DAT_005f1b34 = (int)sVar2;
      _DAT_005e917c = 1;
      DAT_005e9178 = (uint)(param_3 == (HDROP)0x1);
      pHVar4 = (HWND)0x0;
      break;
    case (HWND)0x5:
    }
  }
  else {
    if (param_2 < 0x15) {
      if (param_2 == 0x14) {
        return (HWND)0x1;
      }
      if (param_2 == 0x10) {
        DAT_005e9188 = 1;
        return (HWND)0x10;
      }
    }
    else if (param_2 < 0x1d) {
      if (param_2 == 0x1c) {
        DAT_005e9174 = param_3;
        if (param_3 == (HDROP)0x0) {
          return (HWND)0x0;
        }
        FUN_00406fb5();
        FUN_00407b0c();
        pHVar4 = (HWND)FUN_004015f0(0,0,DAT_005f12ac,DAT_005f129c);
        return pHVar4;
      }
      if (param_2 == 0x16) {
        _DAT_005e918c = 1;
        FUN_00401200();
        return (HWND)0x0;
      }
    }
    else if (param_2 < 0x25) {
      if (param_2 == 0x24) {
        *(undefined4 *)(param_4 + 0x18) = DAT_005f1a04;
        *(undefined4 *)(param_4 + 0x1c) = DAT_005f139c;
        *(undefined4 *)(param_4 + 0x20) = DAT_005f1fc0;
        *(undefined4 *)(param_4 + 0x24) = DAT_005f1b28;
        return (HWND)0x0;
      }
      if (param_2 == 0x20) {
        switch(param_4 & 0xffff) {
        case 1:
          goto switchD_004041f1_caseD_1;
        case 2:
        case 3:
        case 10:
        case 0xb:
        case 0xc:
        case 0xd:
        case 0xe:
        case 0xf:
        case 0x10:
        case 0x11:
          pHVar4 = (HWND)DefWindowProcA(param_1,0x20,(WPARAM)param_3,param_4);
          return pHVar4;
        default:
          pHVar4 = (HWND)DefWindowProcA(param_1,0x20,(WPARAM)param_3,param_4);
          return pHVar4;
        }
      }
    }
    else if (param_2 < 0x101) {
      if (param_2 == 0x100) {
        FUN_00403337(param_3);
        DAT_005f1b30 = param_3;
        FUN_004033fa(param_3);
        return (HWND)0x0;
      }
      if (param_2 == 0x7e) {
        DAT_005f15a8 = param_4 & 0xffff;
        DAT_005f15ac = param_4 >> 0x10;
        DAT_005f15b0 = param_3;
        hdc = GetDC((HWND)0x0);
        if (hdc == (HDC)0x0) {
          _DAT_005f15b4 = 0;
        }
        else {
          uVar3 = GetDeviceCaps(hdc,0x26);
          _DAT_005f15b4 = (uint)((uVar3 & 0x100) != 0);
          ReleaseDC((HWND)0x0,hdc);
        }
        DAT_005e9184 = 1;
        return (HWND)0x0;
      }
    }
    else if (param_2 < 0x114) {
      if (param_2 == 0x113) {
        if (param_3 == (HDROP)0x3e8) {
          FlashWindow(DAT_005e916c,1);
        }
        return (HWND)0x0;
      }
      switch(param_2) {
      case 0x101:
        FUN_00403370(param_3);
        _DAT_005f1a0c = param_3;
        return (HWND)0x0;
      case 0x102:
        DAT_005f1fdc = param_3;
        *(HDROP *)(&DAT_005f15e4 + DAT_005e91d8 * 8) = param_3;
        return (HWND)0x0;
      case 0x104:
        if (param_3 == (HDROP)0x0) {
          return (HWND)0x0;
        }
        if (param_3 != (HDROP)0x73) {
          if (param_3 != (HDROP)0x79) {
            return (HWND)0x0;
          }
          FUN_00403337(0x79);
          DAT_005f1b30 = param_3;
          FUN_004033fa(0x79);
          return (HWND)0x0;
        }
        pHVar4 = (HWND)DefWindowProcA(param_1,param_2,0x73,param_4);
        return pHVar4;
      case 0x105:
        if (param_3 == (HDROP)0x0) {
          return (HWND)0x0;
        }
        if (param_3 != (HDROP)0x79) {
          pHVar4 = (HWND)DefWindowProcA(param_1,param_2,(WPARAM)param_3,param_4);
          return pHVar4;
        }
        FUN_00403370(0x79);
        _DAT_005f1a0c = param_3;
        return (HWND)0x0;
      }
    }
    else if (param_2 < 0x234) {
      if (param_2 == 0x233) {
        _DAT_005f1fcc = 1;
        DragQueryFileA(param_3,0,&DAT_005f1900,0x104);
        return (HWND)0x0;
      }
      switch((HWND)(param_2 - 0x200)) {
      case (HWND)0x0:
        if (DAT_005ebe40 == 0) {
          return (HWND)(param_2 - 0x200);
        }
        pHVar4 = (HWND)(int)sVar2;
        DAT_005f1b20 = (int)pHVar4 - (int)DAT_005f1a14;
        _DAT_005f14c4 = sVar1 - DAT_005f1a10;
        DAT_005f1a10 = (int)sVar1;
        DAT_005f1a14 = pHVar4;
        return pHVar4;
      case (HWND)0x1:
        DAT_005e9170 = 1;
        _DAT_005f1b80 = 1;
        DAT_005f1cb4 = (int)sVar1;
        DAT_005f1cb8 = (int)sVar2;
        SetCapture(DAT_005e916c);
        _DAT_005e91c4 = 1;
        FUN_00403454(1);
        return (HWND)0x0;
      case (HWND)0x2:
        DAT_005e9170 = 1;
        _DAT_005f1b80 = 0;
        DAT_005f1cb4 = (int)sVar1;
        DAT_005f1cb8 = (int)sVar2;
        ReleaseCapture();
        _DAT_005e91c4 = 0;
        FUN_00403454(3);
        return (HWND)0x0;
      case (HWND)0x4:
        DAT_005e9170 = 1;
        DAT_005f13a0 = 1;
        DAT_005f1cb4 = (int)sVar1;
        DAT_005f1cb8 = (int)sVar2;
        SetCapture(DAT_005e916c);
        _DAT_005e91c4 = 1;
        FUN_00403454(2);
        return (HWND)0x0;
      case (HWND)0x5:
        DAT_005e9170 = 1;
        DAT_005f13a0 = 0;
        DAT_005f1cb4 = (int)sVar1;
        DAT_005f1cb8 = (int)sVar2;
        ReleaseCapture();
        _DAT_005e91c4 = 0;
        FUN_00403454(4);
        return (HWND)0x0;
      }
    }
    else {
      if (param_2 == 0x30f) {
LAB_00404234:
        if (DAT_005e91cc != (code *)0x0) {
          (*DAT_005e91cc)();
        }
        FUN_00401120(0);
        return (HWND)0x1;
      }
      if (param_2 == 0x311) {
        if (param_3 == (HDROP)param_1) {
          return param_1;
        }
        goto LAB_00404234;
      }
      if (param_2 == 0x400) {
        switch(param_4) {
        case 0x201:
          _DAT_005e9400 = 1;
          _DAT_005f13a8 = 1;
          break;
        case 0x203:
          _DAT_005e9400 = 1;
          _DAT_005f13a8 = 5;
          break;
        case 0x204:
          _DAT_005e9400 = 1;
          _DAT_005f13a8 = 2;
          break;
        case 0x206:
          _DAT_005e9400 = 1;
          _DAT_005f13a8 = 6;
        }
        return (HWND)0x0;
      }
    }
switchD_004044fd_caseD_1:
    pHVar4 = (HWND)DefWindowProcA(param_1,param_2,(WPARAM)param_3,param_4);
  }
  return pHVar4;
switchD_004041f1_caseD_1:
  if (DAT_005ebe40 == 0) {
    SetCursor((HCURSOR)0x0);
  }
  else {
    SetCursor(DAT_005e91c8);
  }
  return (HWND)0x1;
}

