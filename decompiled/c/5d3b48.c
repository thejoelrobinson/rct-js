
undefined8 FUN_005d3b48(void)

{
  short sVar1;
  short sVar2;
  short sVar3;
  undefined4 in_EAX;
  short sVar4;
  ushort uVar5;
  ushort extraout_CX;
  uint in_EDX;
  byte bVar6;
  ushort uVar7;
  uint unaff_EBX;
  uint uVar8;
  ushort uVar9;
  char *pcVar10;
  byte *pbVar11;
  undefined4 unaff_EDI;
  undefined4 uVar12;
  undefined4 uVar13;
  byte bVar14;
  undefined4 extraout_var;
  short local_6;
  undefined2 uStack_2;
  
  uStack_2 = DAT_00991f8c;
  DAT_00991f8c = 0;
  uVar8 = unaff_EBX & 0xffff03ff;
  DAT_005f96e0 = &DAT_006284ac;
  FUN_00431b6f();
  pbVar11 = &DAT_00887420 + (in_EDX & 0xff) * 0x260;
  uVar12 = 0;
  uVar13 = extraout_var;
  for (pcVar10 = (&PTR_DAT_00652498)[in_EDX >> 8 & 0xff]; *pcVar10 != -1; pcVar10 = pcVar10 + 10) {
    sVar1 = *(short *)(pcVar10 + 1);
    sVar2 = *(short *)(pcVar10 + 3);
    bVar6 = pcVar10[8];
    bVar14 = (byte)(uVar8 >> 8);
                    /* WARNING (jumptable): Sanity check requires truncation of jumptable */
    sVar3 = sVar1;
    sVar4 = sVar2;
    switch((&switchD_005d3bb2::switchdataD_005d3bbc)[bVar14]) {
    case (undefined *)0x5d3bcc:
      sVar4 = -sVar1;
      uVar7 = CONCAT11((byte)(bVar6 << 1) >> 4,bVar6 << 1) & 0x11ee;
      bVar6 = (byte)uVar7 | (byte)(uVar7 >> 8);
      sVar3 = sVar2;
      break;
    case (undefined *)0x5d3be1:
      sVar4 = -sVar2;
      uVar7 = CONCAT11((byte)(bVar6 << 2) >> 4,bVar6 << 2) & 0x33cc;
      bVar6 = (byte)uVar7 | (byte)(uVar7 >> 8);
      sVar3 = -sVar1;
      break;
    case (undefined *)0x5d3bf8:
      uVar7 = CONCAT11((byte)(bVar6 << 3) >> 4,bVar6 << 3) & 0x7788;
      bVar6 = (byte)uVar7 | (byte)(uVar7 >> 8);
      sVar3 = -sVar2;
      sVar4 = sVar1;
    }
    local_6 = (short)in_EAX;
    uVar5 = sVar4 + (short)uVar13;
    DAT_00656ae2 = (char)((ushort)(*(short *)(pcVar10 + 5) + (short)unaff_EDI) >> 2);
    DAT_00656ae3 = ((byte)(pcVar10[7] + (&DAT_005f5d01)[(uint)*pbVar11 * 8]) >> 2) + DAT_00656ae2;
    uVar7 = uVar5 * 0x80 | uVar5 >> 9 | sVar3 + local_6;
    LOCK();
    DAT_00656af0 = (&DAT_00971ef4)[(ushort)(uVar7 >> 5 | uVar7 << 0xb)];
    (&DAT_00971ef4)[(ushort)(uVar7 >> 5 | uVar7 << 0xb)] = &DAT_00656ae0;
    UNLOCK();
    uVar7 = sVar3 + local_6 + 0x20U & 0xfe0;
    LOCK();
    DAT_00656af4 = (&DAT_00971ef4)
                   [(ushort)((ushort)(uVar5 * 0x80 | uVar5 >> 9 | uVar7) >> 5 | (uVar5 >> 9) << 0xb)
                   ];
    (&DAT_00971ef4)
    [(ushort)((ushort)(uVar5 * 0x80 | uVar5 >> 9 | uVar7) >> 5 | (uVar5 >> 9) << 0xb)] =
         &DAT_00656ae8;
    UNLOCK();
    uVar7 = uVar7 - 0x40 & 0xfe0;
    LOCK();
    DAT_00656af8 = (&DAT_00971ef4)
                   [(ushort)((ushort)(uVar5 * 0x80 | uVar5 >> 9 | uVar7) >> 5 | (uVar5 >> 9) << 0xb)
                   ];
    (&DAT_00971ef4)
    [(ushort)((ushort)(uVar5 * 0x80 | uVar5 >> 9 | uVar7) >> 5 | (uVar5 >> 9) << 0xb)] =
         &DAT_00656ae8;
    UNLOCK();
    uVar7 = uVar7 + 0x20 & 0xfe0;
    uVar9 = uVar5 + 0x20 & 0xfe0;
    LOCK();
    DAT_00656afc = (&DAT_00971ef4)
                   [(ushort)((ushort)(uVar9 << 7 | uVar7) >> 5 | (uVar9 >> 9) << 0xb)];
    (&DAT_00971ef4)[(ushort)((ushort)(uVar9 << 7 | uVar7) >> 5 | (uVar9 >> 9) << 0xb)] =
         &DAT_00656ae8;
    UNLOCK();
    uVar5 = uVar5 - 0x20 & 0xfe0;
    LOCK();
    DAT_00656b00 = (&DAT_00971ef4)
                   [(ushort)((ushort)(uVar5 << 7 | uVar7) >> 5 | (uVar5 >> 9) << 0xb)];
    (&DAT_00971ef4)[(ushort)((ushort)(uVar5 << 7 | uVar7) >> 5 | (uVar5 >> 9) << 0xb)] =
         &DAT_00656ae8;
    UNLOCK();
    DAT_00656ae1 = bVar6 & 0xf | 0x80;
    DAT_00656ae0 = bVar14 | 8;
    if ((in_EDX & 0x10000) != 0) {
      DAT_00656ae0 = bVar14 | 0x88;
    }
    DAT_00656ae5 = *pcVar10;
    DAT_00656ae7 = (undefined1)in_EDX;
    DAT_00656ae4 = (undefined1)(in_EDX >> 8);
    DAT_00656ae6 = 0;
    uVar7 = FUN_004367cb();
    uVar5 = extraout_CX << 7 | extraout_CX >> 9 | uVar7;
    (&DAT_00971ef4)[(ushort)(uVar5 >> 5 | uVar5 << 0xb)] = DAT_00656af0;
    uVar7 = uVar7 + 0x20 & 0xfe0;
    (&DAT_00971ef4)
    [(ushort)((ushort)(extraout_CX << 7 | extraout_CX >> 9 | uVar7) >> 5 | (extraout_CX >> 9) << 0xb
             )] = DAT_00656af4;
    uVar7 = uVar7 - 0x40 & 0xfe0;
    (&DAT_00971ef4)
    [(ushort)((ushort)(extraout_CX << 7 | extraout_CX >> 9 | uVar7) >> 5 | (extraout_CX >> 9) << 0xb
             )] = DAT_00656af8;
    uVar7 = uVar7 + 0x20 & 0xfe0;
    uVar5 = extraout_CX + 0x20 & 0xfe0;
    (&DAT_00971ef4)[(ushort)((ushort)(uVar5 << 7 | uVar7) >> 5 | (uVar5 >> 9) << 0xb)] =
         DAT_00656afc;
    uVar5 = extraout_CX - 0x20 & 0xfe0;
    (&DAT_00971ef4)[(ushort)((ushort)(uVar5 << 7 | uVar7) >> 5 | (uVar5 >> 9) << 0xb)] =
         DAT_00656b00;
  }
  FUN_00433bae(unaff_EDI,pbVar11,pcVar10,&uStack_2,uVar12,in_EDX,uVar13);
  FUN_00433e1c();
  DAT_00991f8c = uStack_2;
  return CONCAT44(in_EDX,in_EAX);
}

