
void FUN_004210f9(void)

{
  int iVar1;
  byte bVar2;
  byte bVar4;
  byte in_CL;
  byte bVar6;
  byte bVar7;
  undefined4 uVar8;
  undefined4 in_EDX;
  int iVar9;
  int unaff_EBX;
  ushort uVar11;
  byte *pbVar12;
  uint uVar13;
  int iVar14;
  char cVar3;
  char cVar5;
  undefined2 uVar10;
  
  uVar11 = DAT_00991f74 + *(short *)(&DAT_005f4666 + DAT_00991f88 * 4);
  uVar10 = (undefined2)((uint)in_EDX >> 0x10);
  if (((ushort)(DAT_00991f70 + *(short *)(&DAT_005f4664 + DAT_00991f88 * 4)) < 0x1000) &&
     (uVar11 < 0x1000)) {
    uVar11 = uVar11 * 0x80 | uVar11 >> 9 |
             DAT_00991f70 + *(short *)(&DAT_005f4664 + DAT_00991f88 * 4);
    pbVar12 = (byte *)(&DAT_00971ef4)[(ushort)(uVar11 >> 5 | uVar11 << 0xb)];
    bVar2 = *pbVar12;
    while ((bVar2 & 0x3c) != 0) {
      pbVar12 = pbVar12 + 8;
      bVar2 = *pbVar12;
    }
    uVar13 = CONCAT22(uVar10,CONCAT11(pbVar12[5],(char)in_EDX)) & 0xffff1fff;
    if ((char)uVar13 == (char)(uVar13 >> 8)) {
      return;
    }
    uVar11 = (pbVar12[4] & 0xf) << (in_CL & 0x1f);
    uVar8 = CONCAT22((short)(uVar13 >> 0x10),CONCAT11(pbVar12[2] >> 2,(char)uVar13));
    uVar13 = pbVar12[4] & 0x10 | (ushort)(uVar11 >> 4 | uVar11) & 0xf;
  }
  else {
    uVar13 = 0;
    uVar8 = CONCAT22(uVar10,CONCAT11(1,(char)in_EDX));
  }
  cVar3 = (char)uVar8;
  bVar2 = cVar3 + (&DAT_005f46e4)[unaff_EBX];
  bVar6 = cVar3 + (&DAT_005f4704)[unaff_EBX];
  cVar5 = (char)((uint)uVar8 >> 8);
  bVar4 = cVar5 + (&DAT_005f46c4)[uVar13];
  bVar7 = cVar5 + (&DAT_005f46a4)[uVar13];
  if ((bVar2 <= bVar4) && (bVar6 <= bVar7)) {
    return;
  }
  DAT_005f4724 = DAT_005f476c;
  if ((DAT_00991f8c & 1) != 0) {
    DAT_005f4724 = DAT_005f4770;
  }
  uVar10 = (undefined2)((uint)uVar8 >> 0x10);
  iVar9 = CONCAT22(uVar10,CONCAT11(bVar7,cVar3));
  iVar14 = iVar9;
  if (bVar7 != bVar4) {
    if (bVar4 <= bVar7) {
      iVar9 = CONCAT22(uVar10,CONCAT11(bVar4,cVar3));
    }
    bVar4 = (byte)((uint)iVar9 >> 8);
    iVar14 = iVar9;
    if ((bVar4 != bVar2) && (bVar4 != bVar6)) {
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])();
      iVar9 = CONCAT22((short)((uint)iVar9 >> 0x10),CONCAT11(bVar4 + 1,(char)iVar9));
      iVar14 = iVar9;
    }
  }
LAB_00421213:
  do {
    bVar4 = (byte)((uint)iVar9 >> 8);
    if ((bVar2 <= bVar4) || (bVar6 <= bVar4)) {
      if ((bVar4 < bVar2) || (bVar4 < bVar6)) {
        (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])(iVar14,unaff_EBX);
      }
      return;
    }
    while (bVar4 != (byte)DAT_00999f9a) {
      if (bVar4 <= (byte)DAT_00999f9a) {
        (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])();
        iVar9 = (uint)(byte)(bVar4 + 1) << 8;
        goto LAB_00421213;
      }
      DAT_00999f9a._0_1_ = (byte)DAT_00999f9a._2_2_;
      DAT_00999f9a._1_1_ = (byte)((ushort)DAT_00999f9a._2_2_ >> 8);
      DAT_00999f9a._2_2_ = (undefined2)DAT_00999f9e;
      DAT_00999f9e._0_2_ = DAT_00999f9e._2_2_;
      DAT_00999f9e._2_2_ = (undefined2)DAT_00999fa2;
      DAT_00999fa2._0_2_ = DAT_00999fa2._2_2_;
      DAT_00999fa2._2_2_ = (undefined2)DAT_00999fa6;
      DAT_00999fa6._0_2_ = DAT_00999fa6._2_2_;
      DAT_00999fa6._2_2_ = (undefined2)DAT_00999faa;
      DAT_00999faa._0_2_ = DAT_00999faa._2_2_;
      DAT_00999faa._2_2_ = (undefined2)DAT_00999fae;
      DAT_00999fae._0_2_ = DAT_00999fae._2_2_;
      DAT_00999fae._2_2_ = (undefined2)DAT_00999fb2;
      DAT_00999fb2._0_2_ = DAT_00999fb2._2_2_;
      DAT_00999fb2._2_2_ = (undefined2)DAT_00999fb6;
      DAT_00999fb6._0_2_ = DAT_00999fb6._2_2_;
      DAT_00999fb6._2_2_ = (undefined2)DAT_00999fba;
      DAT_00999fba._0_2_ = DAT_00999fba._2_2_;
      DAT_00999fba._2_2_ = (undefined2)DAT_00999fbe;
      DAT_00999fbe._0_2_ = DAT_00999fbe._2_2_;
      DAT_00999fbe._2_2_ = (undefined2)DAT_00999fc2;
      DAT_00999fc2._0_2_ = DAT_00999fc2._2_2_;
      DAT_00999fc2._2_2_ = (undefined2)DAT_00999fc6;
      DAT_00999fc6._0_2_ = DAT_00999fc6._2_2_;
      DAT_00999fc6._2_2_ = (undefined2)DAT_00999fca;
      DAT_00999fca._0_2_ = DAT_00999fca._2_2_;
      DAT_00999fca._2_2_ = (undefined2)DAT_00999fce;
      DAT_00999fce._0_2_ = DAT_00999fce._2_2_;
      DAT_00999fce._2_2_ = (undefined2)DAT_00999fd2;
      DAT_00999fd2._0_2_ = DAT_00999fd2._2_2_;
      DAT_00999fd2._2_2_ = (undefined2)DAT_00999fd6;
      DAT_00999fd6._0_2_ = DAT_00999fd6._2_2_;
      DAT_00999fd6._2_2_ = uRam00999fda;
    }
    uVar13 = (uint)DAT_00999f9a._1_1_;
    bVar7 = bVar4 + (&DAT_005f472e)[uVar13 * 2];
    if ((bVar2 < bVar7) || (bVar6 < bVar7)) {
      iVar1 = uVar13 * 2;
      DAT_00999f9a._1_1_ = (&DAT_005f475e)[uVar13];
      uVar13 = (uint)DAT_00999f9a._1_1_;
      bVar7 = (bVar7 - (&DAT_005f472e)[iVar1]) + (&DAT_005f472e)[uVar13 * 2];
    }
    DAT_0099a4ec = (ushort)(byte)(bVar7 - (&DAT_005f472e)[uVar13 * 2]) * 0x10 +
                   *(short *)(&DAT_005f4746 + uVar13 * 2);
    if (DAT_0099a4ec < 0x10) {
      DAT_0099a4ec = DAT_0099a4ec + 0x10;
    }
    DAT_0099a4e8 = 0;
    DAT_0099a4ea = 0;
    (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])();
    DAT_0099a4ec = ((ushort)iVar9 >> 8) * 0x10 +
                   *(short *)(&DAT_005f4746 + (uint)DAT_00999f9a._1_1_ * 2);
    if (DAT_0099a4ec == 0) {
      DAT_0099a4ec = 0x10;
    }
    DAT_0099a4e8 = 0;
    DAT_0099a4ea = 0x1f;
    (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])();
    iVar9 = (uint)(byte)(bVar4 + (&DAT_005f472e)[(uint)DAT_00999f9a._1_1_ * 2]) << 8;
    DAT_00999f9a._0_1_ = (byte)DAT_00999f9a._2_2_;
    DAT_00999f9a._1_1_ = (byte)((ushort)DAT_00999f9a._2_2_ >> 8);
    DAT_00999f9a._2_2_ = (undefined2)DAT_00999f9e;
    DAT_00999f9e._0_2_ = DAT_00999f9e._2_2_;
    DAT_00999f9e._2_2_ = (undefined2)DAT_00999fa2;
    DAT_00999fa2._0_2_ = DAT_00999fa2._2_2_;
    DAT_00999fa2._2_2_ = (undefined2)DAT_00999fa6;
    DAT_00999fa6._0_2_ = DAT_00999fa6._2_2_;
    DAT_00999fa6._2_2_ = (undefined2)DAT_00999faa;
    DAT_00999faa._0_2_ = DAT_00999faa._2_2_;
    DAT_00999faa._2_2_ = (undefined2)DAT_00999fae;
    DAT_00999fae._0_2_ = DAT_00999fae._2_2_;
    DAT_00999fae._2_2_ = (undefined2)DAT_00999fb2;
    DAT_00999fb2._0_2_ = DAT_00999fb2._2_2_;
    DAT_00999fb2._2_2_ = (undefined2)DAT_00999fb6;
    DAT_00999fb6._0_2_ = DAT_00999fb6._2_2_;
    DAT_00999fb6._2_2_ = (undefined2)DAT_00999fba;
    DAT_00999fba._0_2_ = DAT_00999fba._2_2_;
    DAT_00999fba._2_2_ = (undefined2)DAT_00999fbe;
    DAT_00999fbe._0_2_ = DAT_00999fbe._2_2_;
    DAT_00999fbe._2_2_ = (undefined2)DAT_00999fc2;
    DAT_00999fc2._0_2_ = DAT_00999fc2._2_2_;
    DAT_00999fc2._2_2_ = (undefined2)DAT_00999fc6;
    DAT_00999fc6._0_2_ = DAT_00999fc6._2_2_;
    DAT_00999fc6._2_2_ = (undefined2)DAT_00999fca;
    DAT_00999fca._0_2_ = DAT_00999fca._2_2_;
    DAT_00999fca._2_2_ = (undefined2)DAT_00999fce;
    DAT_00999fce._0_2_ = DAT_00999fce._2_2_;
    DAT_00999fce._2_2_ = (undefined2)DAT_00999fd2;
    DAT_00999fd2._0_2_ = DAT_00999fd2._2_2_;
    DAT_00999fd2._2_2_ = (undefined2)DAT_00999fd6;
    DAT_00999fd6._0_2_ = DAT_00999fd6._2_2_;
    DAT_00999fd6._2_2_ = uRam00999fda;
  } while( true );
}

