
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

uint FUN_005d3e56(void)

{
  byte bVar1;
  byte bVar2;
  char cVar3;
  undefined2 uVar4;
  undefined2 uVar5;
  undefined2 extraout_CX;
  undefined2 extraout_CX_00;
  undefined2 extraout_CX_01;
  byte *in_EDX;
  byte *extraout_EDX;
  undefined1 uVar6;
  byte bVar7;
  undefined1 uVar9;
  uint uVar8;
  uint uVar10;
  int iVar11;
  int unaff_EDI;
  bool bVar12;
  undefined6 uVar13;
  
  uVar10 = (uint)in_EDX[7];
  iVar11 = uVar10 * 0x260;
  if ((((&DAT_00887422)[uVar10 * 0x130] & 0x80) == 0) && ((&DAT_00887441)[iVar11] == '\0')) {
    FUN_005dd134();
    uVar10 = FUN_0042635e();
    bVar12 = (*in_EDX & 0x3c) == 0x10;
    if (bVar12) {
      bVar1 = in_EDX[4];
      if ((bVar1 != 0) && (bVar1 != 1)) {
        return uVar10;
      }
      bVar7 = (in_EDX[5] & 0x70) >> 4;
      uVar9 = 0;
      uVar6 = bVar7 == 0;
      bVar2 = in_EDX[7];
      uVar10 = (uint)bVar2;
      FUN_005e3b2b();
      if ((!(bool)uVar6) || ((FUN_005d41a6(), !(bool)uVar9 && (FUN_005e3b2b(), !(bool)uVar6)))) {
        FUN_005d21fa();
        if ((DAT_00652288 == '\x05') && (((DAT_00991f30 >> 3 & 1) != 0 && (DAT_00991f5a == '\r'))))
        {
          DAT_00991f5c = 0x1d;
          DAT_006522e1 = 0;
          if (bVar1 != 0) {
            DAT_006522e1 = 1;
            DAT_00991f5c = 0x1e;
          }
        }
        else {
          FUN_005e680e();
          cVar3 = DAT_00652288;
          DAT_00991f30 = DAT_00991f30 | 0x40;
          LOCK();
          DAT_00652288 = '\x05';
          UNLOCK();
          if (cVar3 != '\x05') {
            DAT_006522a3 = cVar3;
          }
          DAT_006522e1 = bVar1;
          DAT_006522e2 = bVar2;
          DAT_006522e3 = bVar7;
          FUN_005d13e2();
          _DAT_0099a020 = _DAT_0099a020 & 0xfffd;
        }
        uVar10 = FUN_005e5301();
        return uVar10;
      }
    }
    else {
      uVar4 = FUN_005e3b2b();
      if ((bVar12) || ((ushort)in_EDX[7] != *(ushort *)(iVar11 + 0x30))) {
        uVar4 = FUN_005d3b30();
        DAT_00652289 = extraout_EDX[7];
        FUN_005d3527();
        in_EDX = extraout_EDX;
        uVar5 = extraout_CX_00;
      }
      else {
        *(ushort *)(iVar11 + 0x30) = (ushort)in_EDX[7];
        FUN_005d21fa();
        uVar5 = extraout_CX;
      }
      if ((&DAT_00887420)[(uint)in_EDX[7] * 0x260] == 0x14) {
        DAT_00652289 = in_EDX[7];
        DAT_00652288 = 6;
        DAT_0065228e = (ushort)in_EDX[2] << 2;
        DAT_00652292 = 0;
        DAT_00652293 = 0;
        DAT_0065228a = uVar4;
        DAT_0065228c = uVar5;
        uVar10 = FUN_005d5003();
        return uVar10;
      }
      if ((*(uint *)(&DAT_005f5b78 + (uint)(byte)(&DAT_00887420)[(uint)in_EDX[7] * 0x260] * 8) &
          0x100) != 0) {
        FUN_005d3329();
      }
      uVar8 = CONCAT11(*in_EDX,in_EDX[4]) & 0xffff03ff;
      bVar12 = false;
      uVar13 = FUN_005cfe66();
      uVar4 = (undefined2)((uint6)uVar13 >> 0x20);
      uVar10 = (uint)uVar13;
      if (!bVar12) {
        DAT_00652289 = *(byte *)(unaff_EDI + 7);
        DAT_00652288 = '\x03';
        uVar5 = (undefined2)uVar13;
        uVar9 = (undefined1)(uVar8 >> 8);
        uVar6 = (undefined1)uVar8;
        DAT_00652292 = 0;
        DAT_00652293 = 0;
        DAT_0065228a = uVar5;
        DAT_0065228c = extraout_CX_01;
        DAT_0065228e = uVar4;
        DAT_00652290 = uVar9;
        DAT_00652291 = uVar6;
        if (((*(uint *)(&DAT_005f5b78 + (uint)(byte)(&DAT_00887420)[(uint)DAT_00652289 * 0x260] * 8)
             & 0x8000) == 0) && (FUN_005d1dd4(), DAT_00652288 != '\x01')) {
          DAT_00652288 = '\x03';
          DAT_00652292 = 0;
          DAT_00652293 = 0;
          DAT_0065228a = uVar5;
          DAT_0065228c = extraout_CX_01;
          DAT_0065228e = uVar4;
          DAT_00652290 = uVar9;
          DAT_00652291 = uVar6;
          FUN_005d1ef6();
          if (DAT_00652288 != '\x02') {
            DAT_00652288 = '\x03';
            DAT_00652292 = 0;
            DAT_00652293 = 0;
            DAT_0065228a = uVar5;
            DAT_0065228c = extraout_CX_01;
            DAT_0065228e = uVar4;
            DAT_00652290 = uVar9;
            DAT_00652291 = uVar6;
          }
        }
        uVar10 = FUN_005d13e2();
        return uVar10;
      }
    }
  }
  else {
    DAT_00971e8a._2_2_ = (&DAT_00887442)[uVar10 * 0x130];
    _DAT_00971e8e = (&DAT_00887444)[uVar10 * 0x98];
    uVar10 = FUN_00427108();
  }
  return uVar10;
}

