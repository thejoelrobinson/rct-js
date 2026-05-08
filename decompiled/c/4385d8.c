
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_004385d8(void)

{
  uint uVar1;
  ushort uVar2;
  undefined1 *puVar3;
  ushort uVar4;
  int iVar5;
  short sVar6;
  
  DAT_00991f6c = &stack0xfffffffc;
  DAT_005e9154 = 0;
  puVar3 = &stack0xfffffffc;
  if (DAT_00628cb8 == '\0') {
    DAT_00628cb8 = '\x01';
    DAT_00628cb0 = DAT_005e9190;
    FUN_004046fc();
    DAT_0099a502 = DAT_005f1ca4;
    DAT_0099a504 = DAT_005f1394;
    FUN_0042ef8a();
    FUN_005df3bb();
    FUN_0042f339();
    FUN_0042fdf4();
    FUN_009bb6af();
    FUN_0045268c();
    FUN_005e0d60();
    FUN_0042c6f3();
    FUN_004269d0();
    FUN_0045a895();
    FUN_00444a79();
    FUN_0044a381();
    FUN_0043910f();
    FUN_00454520();
    FUN_0043645c();
    FUN_004269da();
    FUN_004298a0();
    FUN_0045aaf8();
    FUN_0045abea();
    FUN_005ddf20();
    FUN_0044a363();
    FUN_004390dc();
    FUN_00454518();
    FUN_00438a1f();
    FUN_009b30bc();
    DAT_0099a888 = 0;
    FUN_004039ff(&DAT_0099a888,&DAT_0099a888,&DAT_0099a888,0xa888,0xa888);
    FUN_00403abb();
    _DAT_00999f90 = FUN_0040473c();
    DAT_00628cb9 = '\x01';
    puVar3 = DAT_00991f6c;
  }
  DAT_00991f6c = puVar3;
  iVar5 = FUN_0040473c();
  _DAT_00999f90 = iVar5 - _DAT_00999f90;
  if (500 < (ushort)_DAT_00999f90) {
    _DAT_00999f90 = CONCAT22((short)((uint)_DAT_00999f90 >> 0x10),500);
  }
  DAT_00999f98 = (ushort)_DAT_00999f90;
  if (DAT_0099c169 == '\0') {
    DAT_00999f94 = DAT_00999f94 + _DAT_00999f90;
  }
  if (DAT_0099c16b != '\0') {
    DAT_00999f98 = 0x1f;
  }
  DAT_005f4a6a = 0;
  _DAT_00999f90 = iVar5;
  FUN_009bb9f5();
  if (DAT_005f8da2 == 0) {
    DAT_005f8da2 = 0x10;
    FUN_009b30bc();
    FUN_004058f8(0x8cd0,0x8cd4);
    DAT_00628ce0 = 0;
  }
  else {
    if (0xf < DAT_005f8da2) {
      DAT_005f8da2 = DAT_005f8da2 + 1;
      if (0x2f < DAT_005f8da2) {
        iVar5 = FUN_0040bb01(0x8cd8,0x8cdc);
        if (iVar5 != 0) {
          DAT_00628ce0 = DAT_00628ce0 |
                         *(uint *)((int)&DAT_00628cd0->unused +
                                  _DAT_00628cd8 + (DAT_00628cd4 + 4) * DAT_00628cdc + 2);
          FUN_0040bbcf();
        }
      }
      GetNextWindow(DAT_00628cd0,DAT_00628cd4);
      FUN_005e6028();
      if (DAT_005f8da2 != 0x60) goto LAB_00438a0d;
      DAT_005f8da2 = 1;
      if (DAT_00628ce0 != 0) {
        DAT_005f8da2 = 2;
      }
      FUN_0042f3a2();
    }
    FUN_009bc184();
    FUN_0042eae0();
    if (DAT_005e9188 == 1) {
      DAT_005e9188 = 0;
      _DAT_0099a4fc = _DAT_0099a4fc | 2;
    }
    FUN_005df7a1();
    FUN_004531b0();
    if (DAT_00628cb9 == '\0') {
      uVar4 = DAT_00999f98 / 0x1f;
      if (uVar4 == 0) {
        uVar4 = 1;
      }
      if (4 < uVar4) {
        uVar4 = 4;
      }
      if (DAT_0099c169 == '\0') {
        while( true ) {
          sVar6 = DAT_0099a4fe;
          DAT_0088741c = DAT_0088741c + 1;
          DAT_006e3b84 = DAT_006e3b84 + 1;
          DAT_0099a4fe = DAT_0099a4fe + 1;
          if (DAT_0099a4fe == 0) {
            DAT_0099a4fe = sVar6;
          }
          FUN_004365c3();
          sVar6 = DAT_006e3b82;
          FUN_0045ab15();
          FUN_0045acae();
          FUN_00424e0f();
          FUN_00439135();
          FUN_005d74b4();
          FUN_0042d678();
          FUN_004499cc();
          FUN_00426c8a();
          FUN_004313a7();
          FUN_00450188();
          FUN_00450b4c();
          FUN_00436508();
          FUN_004533d0();
          FUN_004543bd();
          FUN_00453f76();
          FUN_00454351();
          FUN_0042ca0e();
          FUN_005e5ff1();
          FUN_004306ee();
          if (sVar6 == DAT_006e3b82) {
            FUN_0043909f();
          }
          if (DAT_005e9170 == 1) break;
          if ((((DAT_00991f36 != '\0') && (DAT_00991f36 != '\x01')) ||
              (uVar1 = DAT_00991f30 >> 7, DAT_00991f30 = DAT_00991f30 & 0xffffff7f, (uVar1 & 1) != 0
              )) || (uVar4 = uVar4 - 1, uVar4 == 0)) goto LAB_0043896a;
        }
        DAT_005e9170 = 0;
      }
LAB_0043896a:
      DAT_00991f30 = DAT_00991f30 & 0xffffff7f;
      _DAT_006293cb = _DAT_006293cb ^ 0x8000;
      uVar4 = _DAT_006293cb & 1;
      _DAT_006293cb = _DAT_006293cb & 0xfffc;
      if (uVar4 != 0) {
        _DAT_006293cb = _DAT_006293cb | 2;
      }
      uVar2 = _DAT_006293cb;
      _DAT_006293cb = _DAT_006293cb & 0xfff7;
      uVar4 = _DAT_006293cb >> 2;
      _DAT_006293cb = uVar2 & 0xfff3;
      if ((uVar4 & 1) != 0) {
        _DAT_006293cb = _DAT_006293cb | 8;
      }
      FUN_005e1653();
      _DAT_008ad1c0 = _DAT_008ad1c0 + 1;
      FUN_004270f2();
      FUN_009bb7bb();
      FUN_009bbfb3();
    }
    else {
      FUN_00438aac();
    }
    if (DAT_005f8da2 == 2) {
      DAT_005e9150 = 1;
      FUN_004058f8(0x8cd0,0x8cd4);
      GetNextWindow(DAT_00628cd0,DAT_00628cd4);
    }
  }
LAB_00438a0d:
  do {
    iVar5 = FUN_0040473c();
  } while ((uint)(iVar5 - _DAT_00999f90) < 0x19);
  return;
}

