
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0042f4be(void)

{
  undefined2 uVar1;
  short sVar2;
  int iVar3;
  byte bVar4;
  bool bVar5;
  
  FUN_005d3b30();
  DAT_005f8d35 = 0;
  iVar3 = FUN_004083b5(&DAT_0099aa88);
  bVar5 = iVar3 != -1;
  if (iVar3 != -1) {
    DAT_005f88a4 = iVar3;
    FUN_0042fa5f();
    if (!bVar5) {
      FUN_0042f96d();
      FUN_0042f98e();
      FUN_00408387(DAT_005f88a4);
      sVar2 = FUN_004314ed();
      if ((((-sVar2 == DAT_0087d7a2) &&
           ((0x1f < DAT_008dbed2 ||
            (((byte)(&DAT_0099fb78)[(int)(uint)DAT_008dbed2 >> 3] >> (DAT_008dbed2 & 7) & 1) == 0)))
           ) && ((4 < DAT_006e3b80 || (DAT_0087c3b4 < 0xf4241)))) &&
         ((((8 < DAT_006e3b80 || (DAT_0087c3b4 < 0x4c4b41)) &&
           ((0x10 < DAT_006e3b80 || (DAT_0087c3b4 < 0x7270e1)))) &&
          ((0x50 < DAT_006e3b80 || (DAT_0087c3b4 < 0x2faf081)))))) {
        FUN_00436558();
        FUN_00444b4a();
        if (DAT_0087c81c < 0) {
          DAT_0087c81c = 0;
        }
        _DAT_0099a500 = _DAT_0099a500 & 0xfffe;
        FUN_005e0d60();
        FUN_004298a0();
        FUN_005e68e2();
        uVar1 = DAT_008ad1c6;
        iVar3 = DAT_006e3b88;
        DAT_006e3cee = 0xffff;
        DAT_006e3cf0 = DAT_008ad1c2;
        DAT_006e3cf2 = DAT_008ad1c4;
        bVar4 = (char)DAT_008ad1c6 - *(char *)(DAT_006e3b88 + 0x10);
        *(char *)(DAT_006e3b88 + 0x10) = (char)DAT_008ad1c6;
        DAT_00991f88._0_1_ = (undefined1)((ushort)uVar1 >> 8);
        if (bVar4 != 0) {
          if ((char)bVar4 < '\0') {
            *(short *)(iVar3 + 0xc) = *(short *)(iVar3 + 0xc) >> (-bVar4 & 0x1f);
            *(short *)(iVar3 + 0xe) = *(short *)(iVar3 + 0xe) >> (-bVar4 & 0x1f);
          }
          else {
            *(short *)(iVar3 + 0xc) = *(short *)(iVar3 + 0xc) << (bVar4 & 0x1f);
            *(short *)(iVar3 + 0xe) = *(short *)(iVar3 + 0xe) << (bVar4 & 0x1f);
          }
        }
        DAT_006e3cf0 = DAT_006e3cf0 - (*(ushort *)(iVar3 + 0xc) >> 1);
        DAT_006e3cf2 = DAT_006e3cf2 - (*(ushort *)(iVar3 + 0xe) >> 1);
        FUN_005e43de();
        FUN_005e16f7();
        FUN_004448fb();
        FUN_005ddf20();
        DAT_0099fe00 = 0;
        if (DAT_0087d79c == 0) {
          FUN_004447f6();
        }
        FUN_005e6028();
        DAT_0099a4fe = 0;
        return;
      }
      FUN_0042c4d3();
      return;
    }
    FUN_00408387(DAT_005f88a4);
  }
  return;
}

