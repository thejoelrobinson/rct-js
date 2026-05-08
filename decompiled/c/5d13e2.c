
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined8 FUN_005d13e2(void)

{
  byte bVar1;
  short sVar2;
  byte *pbVar3;
  short sVar4;
  short sVar5;
  short sVar6;
  short sVar7;
  undefined4 in_EAX;
  uint uVar8;
  short extraout_CX;
  short sVar9;
  undefined4 extraout_ECX;
  int iVar10;
  char cVar11;
  char cVar14;
  undefined4 in_EDX;
  uint extraout_EDX;
  int iVar12;
  uint uVar13;
  uint unaff_EBX;
  undefined1 *puVar15;
  short unaff_BP;
  short sVar16;
  short sVar17;
  int unaff_ESI;
  uint uVar18;
  char *pcVar19;
  uint uVar20;
  bool bVar21;
  undefined1 in_ZF;
  undefined8 uVar22;
  
  FUN_005e3b2b();
  if ((bool)in_ZF) goto LAB_005d1dd2;
  FUN_0043642b();
  _DAT_0099a020 = _DAT_0099a020 | 10;
  if (DAT_00652288 == 0) {
LAB_005d1435:
    uVar8 = (uint)DAT_00652290;
    uVar18 = 0;
    sVar7 = DAT_0065228a;
    sVar9 = DAT_0065228c;
  }
  else {
    bVar21 = DAT_00652288 < 3;
    if (DAT_00652288 == 3) {
      uVar8 = (uint)DAT_00652290;
      uVar18 = (uint)DAT_00652291;
      sVar7 = DAT_0065228a;
      sVar9 = DAT_0065228c;
    }
    else {
      sVar7 = FUN_005d298a();
      if (bVar21) goto LAB_005d1435;
      uVar8 = unaff_EBX >> 8 & 0xff;
      uVar18 = extraout_EDX >> 8 & 0xff;
      sVar9 = extraout_CX;
    }
  }
  iVar12 = 0;
  for (pcVar19 = (&PTR_DAT_00652498)[uVar18]; *pcVar19 != -1; pcVar19 = pcVar19 + 10) {
    if ((pcVar19[9] & 1U) == 0) {
      sVar16 = *(short *)(pcVar19 + 1);
      sVar2 = *(short *)(pcVar19 + 3);
      sVar17 = sVar2;
      switch(uVar8 & 3) {
      case 1:
        sVar17 = -sVar16;
        sVar16 = sVar2;
        break;
      case 2:
        sVar17 = -sVar2;
        sVar16 = -sVar16;
        break;
      case 3:
        sVar17 = sVar16;
        sVar16 = -sVar2;
      }
      unaff_BP = sVar16 + sVar7;
      *(short *)(&DAT_0099a02c + iVar12) = unaff_BP;
      *(short *)((int)&DAT_0099a02c + iVar12 * 4 + 2) = sVar17 + sVar9;
      iVar12 = iVar12 + 1;
    }
  }
  *(undefined2 *)(&DAT_0099a02c + iVar12) = 0xffff;
  uVar22 = FUN_0043642b();
  *(undefined4 *)(unaff_ESI + 0x18) = 0;
  DAT_006522a6 = -1;
  if (DAT_00652288 == 3) {
    bVar21 = false;
    FUN_005cfe66(CONCAT11(DAT_00652290,DAT_00652291),pcVar19,unaff_ESI,unaff_BP,&stack0xffffffe0,
                 uVar8 & 3,(int)((ulonglong)uVar22 >> 0x20),extraout_ECX,(int)uVar22);
    if (!bVar21) {
      DAT_006522a6 = pcVar19[4];
      if (DAT_006522a6 == 'c') {
        DAT_006522a4 = ((byte)pcVar19[5] >> 4) << 1;
      }
      if (DAT_006522a6 == 'd') {
        DAT_006522a5 = ((byte)pcVar19[5] >> 4) << 1;
      }
    }
  }
  DAT_006522a9 = '\0';
  uVar20 = (uint)(byte)(&DAT_00887420)[(uint)DAT_00652289 * 0x260];
  puVar15 = &DAT_0065226c;
  uVar8 = 0;
  DAT_0065226a = 0;
  uVar18 = 0;
  do {
    bVar1 = (&DAT_006545af)[uVar18 * 8];
    uVar13 = (uint)bVar1;
    if (bVar1 != 0) {
      if ((char)bVar1 < '\0') {
        if ((uVar13 & 0x7f) == uVar20) goto LAB_005d1588;
      }
      else if ((*(byte *)((int)&DAT_0087c41c + ((int)uVar13 >> 3) + uVar20 * 4) >> (uVar13 & 7) & 1)
               != 0) {
LAB_005d1588:
        if ((DAT_00652288 == 1) || (DAT_00652288 == 4)) {
          cVar11 = (&DAT_006545b3)[uVar18 * 8];
          cVar14 = (&DAT_006545b5)[uVar18 * 8];
        }
        else {
          if (DAT_00652288 != 2) goto LAB_005d1637;
          cVar11 = (&DAT_006545b2)[uVar18 * 8];
          cVar14 = (&DAT_006545b4)[uVar18 * 8];
        }
        if ((((((&DAT_006545af)[uVar18 * 8] != '\x15') && ((&DAT_006545af)[uVar18 * 8] != '\x16'))
             || (cVar14 == DAT_00652299)) || ((DAT_00652299 == '\0' && (cVar14 == '\x02')))) &&
           ((cVar14 != '\x0f' || (DAT_00652299 == '\x0f')))) {
          *puVar15 = (char)uVar18;
          puVar15 = puVar15 + 1;
          pbVar3 = (byte *)((int)&DAT_00652284 + ((int)uVar8 >> 3));
          *pbVar3 = *pbVar3 | '\x01' << (uVar8 & 7);
          if (((DAT_00652290 < 4) && (cVar11 == DAT_0065229a)) && (cVar14 == DAT_00652299)) {
            pbVar3 = (byte *)((int)&DAT_00652284 + ((int)uVar8 >> 3));
            *pbVar3 = *pbVar3 & ~('\x01' << (uVar8 & 7));
            DAT_0065226a = DAT_0065226a + 1;
          }
          uVar8 = uVar8 + 1;
        }
      }
    }
LAB_005d1637:
    uVar18 = uVar18 + 1;
  } while (uVar18 < 0xac);
  DAT_00652268 = (undefined2)uVar8;
  DAT_00651f50 = 0xe;
  DAT_00651f60 = 7;
  PTR_LAB_00651f70._0_1_ = 7;
  if ((*(uint *)(&DAT_005f5b78 + uVar20 * 8) & 0x20000) != 0) {
    DAT_00651f50 = 0;
    DAT_00651f60 = 0;
    PTR_LAB_00651f70._0_1_ = 0;
  }
  DAT_00651e60 = 0;
  if (DAT_0065226a != 0) {
    DAT_00651e60 = 7;
  }
  PTR_LAB_00651e20._0_1_ = 0;
  if (((uint)(&DAT_0087c41c)[uVar20] >> 1 & 1) != 0) {
    PTR_LAB_00651e20._0_1_ = 2;
  }
  DAT_00651f20 = 0;
  DAT_00651f80 = 0;
  if ((*(uint *)(&DAT_005f5b78 + uVar20 * 8) & 0x40000000) != 0) {
    DAT_00651f20 = 2;
    DAT_00651f80 = 2;
  }
  DAT_00651e10 = 0;
  PTR_DAT_00651e30._0_1_ = 0;
  DAT_00651e00 = 0;
  DAT_00651e40 = 0;
  DAT_00651df0 = 0;
  PTR_DAT_00651e50._0_1_ = 0;
  _DAT_00651e02 = 0x1c;
  _DAT_00651e04 = 0x31;
  _DAT_00651e42 = 0x74;
  _DAT_00651e44 = 0x89;
  _DAT_00651e0a = 0x5e95;
  _DAT_00651e4a = 0x5e96;
  if (((uint)(&DAT_0087c41c)[uVar20] >> 0x10 & 1) != 0) {
    DAT_00651e10 = 2;
    PTR_DAT_00651e30._0_1_ = 2;
    _DAT_00651e02 = 6;
    _DAT_00651e04 = 0x1b;
    _DAT_00651e42 = 0x8a;
    _DAT_00651e44 = 0x9f;
    _DAT_00651e0a = 0x5e97;
    _DAT_00651e4a = 0x5e98;
  }
  if (((uint)(&DAT_0087c41c)[uVar20] >> 0xf & 1) != 0) {
    DAT_00651e00 = 2;
    DAT_00651e40 = 2;
  }
  if (((uint)(&DAT_0087c41c)[uVar20] >> 0xe & 1) != 0) {
    DAT_00651df0 = 2;
    PTR_DAT_00651e50._0_1_ = 2;
  }
  DAT_00651e70 = 0;
  DAT_00651e80 = 0;
  DAT_00651e90 = 0;
  DAT_00651ea0 = 0;
  DAT_00651eb0 = 0;
  if (uVar20 == 0x2a) {
    DAT_00651e90 = 2;
    DAT_00651ea0 = 2;
  }
  if (((&DAT_0087c41c)[uVar20] & 0x300) != 0) {
    DAT_00651e90 = 2;
  }
  if (((&DAT_0087c41c)[uVar20] & 0x100) != 0) {
    DAT_00651e80 = 2;
    DAT_00651ea0 = 2;
  }
  if (((&DAT_0087c41c)[uVar20] & 0x200) != 0) {
    DAT_00651e70 = 2;
    DAT_00651eb0 = 2;
  }
  PTR_DAT_00651ec0._0_1_ = 0;
  DAT_00651e72 = 0x17;
  if ((((uint)(&DAT_0087c41c)[uVar20] >> 3 & 1) != 0) && (DAT_00652294 < 0x10)) {
    PTR_DAT_00651ec0._0_1_ = 2;
    DAT_00651e72 = 9;
  }
  PTR_DAT_00651e74._0_2_ = DAT_00651e72 + 0x17;
  DAT_00651e82 = DAT_00651e72 + 0x18;
  PTR_DAT_00651e84._0_2_ = DAT_00651e72 + 0x2f;
  DAT_00651e92 = DAT_00651e72 + 0x30;
  PTR_LAB_00651e94._0_2_ = DAT_00651e72 + 0x47;
  DAT_00651ea2 = DAT_00651e72 + 0x48;
  PTR_DAT_00651ea4._0_2_ = DAT_00651e72 + 0x5f;
  DAT_00651eb2 = DAT_00651e72 + 0x60;
  PTR_LAB_00651eb4._0_2_ = DAT_00651e72 + 0x77;
  _DAT_00651eba = 0x5e9f;
  DAT_00651ebe = 0x3ae;
  _DAT_00651e7a = 0x5e9b;
  DAT_00651e7e = 0x3aa;
  if (((uint)(&DAT_0087c41c)[uVar20] >> 0x1c & 1) != 0) {
    if ((DAT_0065229a == '\x04') ||
       (sVar7 = DAT_00651e72, sVar9 = (short)PTR_DAT_00651e74, sVar16 = DAT_00651e82,
       sVar2 = (short)PTR_DAT_00651e84, sVar17 = DAT_00651e92, sVar4 = (short)PTR_LAB_00651e94,
       sVar5 = DAT_00651ea2, sVar6 = (short)PTR_DAT_00651ea4, DAT_0065229a == '\n')) {
      LOCK();
      UNLOCK();
      LOCK();
      UNLOCK();
      LOCK();
      UNLOCK();
      LOCK();
      UNLOCK();
      LOCK();
      UNLOCK();
      LOCK();
      UNLOCK();
      LOCK();
      UNLOCK();
      LOCK();
      UNLOCK();
      _DAT_00651e7a = 0x5ea0;
      DAT_00651e7e = 0x3af;
      sVar7 = DAT_00651eb2;
      sVar9 = (short)PTR_LAB_00651eb4;
      sVar16 = DAT_00651e72;
      sVar2 = (short)PTR_DAT_00651e74;
      sVar17 = DAT_00651e82;
      sVar4 = (short)PTR_DAT_00651e84;
      sVar5 = DAT_00651e92;
      sVar6 = (short)PTR_LAB_00651e94;
      DAT_00651eb2 = DAT_00651ea2;
      PTR_LAB_00651eb4._0_2_ = (short)PTR_DAT_00651ea4;
    }
    PTR_DAT_00651ea4._0_2_ = sVar6;
    DAT_00651ea2 = sVar5;
    PTR_LAB_00651e94._0_2_ = sVar4;
    DAT_00651e92 = sVar17;
    PTR_DAT_00651e84._0_2_ = sVar2;
    DAT_00651e82 = sVar16;
    PTR_DAT_00651e74._0_2_ = sVar9;
    DAT_00651e72 = sVar7;
    sVar6 = (short)PTR_DAT_00651ea4;
    sVar5 = DAT_00651ea2;
    sVar4 = (short)PTR_LAB_00651e94;
    sVar17 = DAT_00651e92;
    sVar2 = (short)PTR_DAT_00651e84;
    sVar16 = DAT_00651e82;
    sVar9 = (short)PTR_DAT_00651e74;
    sVar7 = DAT_00651e72;
    if ((DAT_0065229a == '\b') || (DAT_0065229a == '\x12')) {
      LOCK();
      DAT_00651ea2 = DAT_00651eb2;
      UNLOCK();
      LOCK();
      DAT_00651e92 = sVar5;
      UNLOCK();
      LOCK();
      DAT_00651e82 = sVar17;
      UNLOCK();
      LOCK();
      DAT_00651e72 = sVar16;
      UNLOCK();
      DAT_00651eb2 = sVar7;
      LOCK();
      PTR_DAT_00651ea4._0_2_ = (short)PTR_LAB_00651eb4;
      UNLOCK();
      LOCK();
      PTR_LAB_00651e94._0_2_ = sVar6;
      UNLOCK();
      LOCK();
      PTR_DAT_00651e84._0_2_ = sVar4;
      UNLOCK();
      LOCK();
      PTR_DAT_00651e74._0_2_ = sVar2;
      UNLOCK();
      PTR_LAB_00651eb4._0_2_ = sVar9;
      _DAT_00651eba = 0x5ea1;
      DAT_00651ebe = 0x3a9;
    }
  }
  _DAT_00651dea = 0x3a1;
  _DAT_00651eda = 0x5ea2;
  _DAT_00651ede = 0x3a2;
  _DAT_00651ed2 = 0x2f;
  _DAT_00651ed4 = 0x46;
  _DAT_00651ed6 = 0x84;
  _DAT_00651ed8 = 0x9b;
  _DAT_00651eea = 0x5ea3;
  _DAT_00651eee = 0x3a4;
  _DAT_00651ee2 = 0x47;
  _DAT_00651ee4 = 0x5e;
  _DAT_00651ee6 = 0x84;
  _DAT_00651ee8 = 0x9b;
  _DAT_00651efa = 0x5ea4;
  _DAT_00651efe = 0x3a3;
  _DAT_00651ef2 = 0x5f;
  _DAT_00651ef4 = 0x76;
  _DAT_00651ef6 = 0x84;
  _DAT_00651ef8 = 0x9b;
  DAT_00651ed0 = 0;
  DAT_00651ef0 = 0;
  DAT_00651ee0 = 0;
  if ((*(uint *)(&DAT_005f5b78 + uVar20 * 8) & 0x1000) == 0) {
    if (DAT_006522a6 == 'c') {
LAB_005d1b40:
      _DAT_00651dea = 0x653;
      DAT_006522a9 = '\x01';
      _DAT_00651eda = 0x655;
      _DAT_00651ede = 0x657;
      _DAT_00651eee = 0x657;
      _DAT_00651efe = 0x657;
    }
    else {
      if (DAT_006522a6 != 'd') {
        if (DAT_00652294 == 0x73) goto LAB_005d1b40;
        if (DAT_00652294 != 0x74) {
          if (((uint)(&DAT_0087c41c)[uVar20] >> 6 & 1) != 0) {
            DAT_00651ed0 = 2;
            DAT_00651ef0 = 2;
            DAT_00651ee0 = 2;
          }
          goto LAB_005d1c4c;
        }
      }
      _DAT_00651dea = 0x654;
      DAT_006522a9 = '\x02';
      _DAT_00651eda = 0x656;
      _DAT_00651ede = 0x658;
      _DAT_00651eee = 0x658;
      _DAT_00651efe = 0x658;
    }
    DAT_00651ed0 = 10;
    _DAT_00651ed2 = 0x10;
    _DAT_00651ed4 = 0x95;
    _DAT_00651ed6 = 0x8a;
    _DAT_00651ed8 = 0x95;
    DAT_00651ee0 = 7;
    _DAT_00651eea = 0x506;
    _DAT_00651ee2 = 0x8a;
    _DAT_00651ee4 = 0x94;
    _DAT_00651ee6 = 0x8b;
    _DAT_00651ee8 = 0x8f;
    DAT_00651ef0 = 7;
    _DAT_00651efa = 0x507;
    _DAT_00651ef2 = 0x8a;
    _DAT_00651ef4 = 0x94;
    _DAT_00651ef6 = 0x90;
    _DAT_00651ef8 = 0x94;
    *(uint *)(unaff_ESI + 0x18) = *(uint *)(unaff_ESI + 0x18) | 0x600000;
  }
  else {
    _DAT_00651dea = 0x5d2;
    _DAT_00651eda = 0x5ea5;
    _DAT_00651efa = 0x5ea6;
    _DAT_00651ede = 0x5d3;
    _DAT_00651efe = 0x5d4;
    DAT_00651ed0 = 2;
    DAT_00651ef0 = 2;
  }
LAB_005d1c4c:
  uVar8 = *(uint *)(unaff_ESI + 0x14) & 0x7d80003f;
  DAT_00651f00 = 0;
  DAT_00651f10 = 2;
  PTR_LAB_00651f90._0_1_ = 0;
  DAT_00651f30 = 2;
  PTR_DAT_00651f40._0_1_ = 2;
  if ((*(uint *)(&DAT_005f5b78 + uVar20 * 8) & 0x100) != 0) {
    PTR_DAT_00651f40._0_1_ = 0;
    DAT_00651f30 = 0;
  }
  if (DAT_00652288 == 4) {
    DAT_00651f00 = 2;
    DAT_00651f10 = 0;
    PTR_DAT_00651f40._0_1_ = 0;
    DAT_00651f30 = 0;
    PTR_LAB_00651f90._0_1_ = 2;
LAB_005d1d15:
    iVar12 = 9;
    if (((((DAT_00652294 != 0) && (iVar12 = 8, DAT_00652294 != 1)) &&
         (iVar12 = 10, DAT_00652294 != 2)) &&
        (((iVar12 = 7, DAT_00652294 != 3 && (iVar12 = 0xb, DAT_00652294 != 4)) &&
         ((iVar12 = 6, DAT_00652294 != 5 &&
          ((iVar12 = 0xc, DAT_00652294 != 6 && (iVar12 = 0x19, DAT_00652294 != 7)))))))) &&
       (iVar12 = 0x1f, DAT_00652294 != 8)) {
      iVar12 = 0xd;
    }
    iVar10 = 0xe;
    if ((((DAT_00652295 != '\b') && (DAT_00652295 != '\n')) &&
        (iVar10 = 0xf, DAT_00652295 != '\x06')) &&
       (((iVar10 = 0x11, DAT_00652295 != '\x02' && (iVar10 = 0x12, DAT_00652295 != '\x04')) &&
        (DAT_00652295 != '\x12')))) {
      iVar10 = 0x10;
    }
    uVar8 = uVar8 | 1 << iVar12 | 1 << iVar10;
    if ((*(uint *)(&DAT_005f5b78 + uVar20 * 8) & 0x1000) == 0) {
      if (DAT_006522a9 == '\0') {
        iVar12 = 0x14;
        if ((DAT_00652296 != '\x02') && (iVar12 = 0x15, DAT_00652296 != '\0')) {
          iVar12 = 0x16;
        }
        goto LAB_005d1dba;
      }
    }
    else {
      iVar12 = 0x14;
      if (DAT_00652298 != '\0') {
        iVar12 = 0x16;
      }
LAB_005d1dba:
      uVar8 = uVar8 | 1 << iVar12;
    }
    if ((DAT_00652297 & 1) != 0) {
      uVar8 = uVar8 | 0x80000;
    }
  }
  else {
    if (DAT_00652288 == 5) {
      DAT_00651f10 = 0;
      PTR_DAT_00651f40._0_1_ = 0;
      DAT_00651f30 = 0;
      goto LAB_005d1d15;
    }
    if (DAT_00652288 == 1) {
      DAT_00651f00 = 2;
      PTR_DAT_00651f40._0_1_ = 0;
      goto LAB_005d1d15;
    }
    if (DAT_00652288 == 2) {
      DAT_00651f00 = 2;
      DAT_00651f30 = 0;
      goto LAB_005d1d15;
    }
  }
  *(uint *)(unaff_ESI + 0x14) = uVar8;
  FUN_005e43de();
LAB_005d1dd2:
  return CONCAT44(in_EDX,in_EAX);
}

