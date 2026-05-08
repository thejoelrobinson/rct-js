
void FUN_00420502(void)

{
  int iVar1;
  byte bVar2;
  byte bVar3;
  byte in_CL;
  byte bVar4;
  char in_DL;
  byte bVar6;
  uint uVar5;
  int unaff_EBX;
  uint uVar7;
  ushort uVar8;
  byte *pbVar9;
  uint uVar10;
  
  uVar8 = DAT_00991f74 + *(short *)(&DAT_005f4666 + DAT_00991f88 * 4);
  if (((ushort)(DAT_00991f70 + *(short *)(&DAT_005f4664 + DAT_00991f88 * 4)) < 0x1000) &&
     (uVar8 < 0x1000)) {
    uVar8 = uVar8 * 0x80 | uVar8 >> 9 | DAT_00991f70 + *(short *)(&DAT_005f4664 + DAT_00991f88 * 4);
    pbVar9 = (byte *)(&DAT_00971ef4)[(ushort)(uVar8 >> 5 | uVar8 << 0xb)];
    bVar6 = *pbVar9;
    while ((bVar6 & 0x3c) != 0) {
      pbVar9 = pbVar9 + 8;
      bVar6 = *pbVar9;
    }
    uVar8 = (pbVar9[4] & 0xf) << (in_CL & 0x1f);
    bVar6 = pbVar9[2] >> 2;
    uVar10 = pbVar9[4] & 0x10 | (ushort)(uVar8 >> 4 | uVar8) & 0xf;
  }
  else {
    uVar10 = 0;
    bVar6 = 1;
  }
  bVar2 = in_DL + (&DAT_005f46e4)[unaff_EBX];
  bVar4 = in_DL + (&DAT_005f4704)[unaff_EBX];
  bVar3 = bVar6 + (&DAT_005f46c4)[uVar10];
  bVar6 = bVar6 + (&DAT_005f46a4)[uVar10];
  if ((bVar2 <= bVar3) && (bVar4 <= bVar6)) {
    return;
  }
  DAT_005f4724 = DAT_005f476c;
  if ((DAT_00991f8c & 1) != 0) {
    DAT_005f4724 = DAT_005f4770;
  }
  uVar5 = (uint)CONCAT11(bVar6,in_DL);
  uVar10 = uVar5;
  if (bVar6 != bVar3) {
    if (bVar3 <= bVar6) {
      uVar5 = (uint)CONCAT11(bVar3,in_DL);
    }
    bVar6 = (byte)(uVar5 >> 8);
    uVar10 = uVar5;
    if ((bVar6 != bVar2) && (bVar6 != bVar4)) {
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])();
      uVar5 = (uint)CONCAT11(bVar6 + 1,(char)uVar5);
      uVar10 = uVar5;
    }
  }
LAB_0042060e:
  do {
    bVar6 = (byte)(uVar5 >> 8);
    if ((bVar2 <= bVar6) || (bVar4 <= bVar6)) {
      if ((bVar2 <= bVar6) && (bVar4 <= bVar6)) {
        return;
      }
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])(uVar10,unaff_EBX);
      return;
    }
    while (bVar6 != (byte)DAT_00999f9a) {
      if (bVar6 <= (byte)DAT_00999f9a) {
        (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])();
        uVar5 = (uint)(byte)(bVar6 + 1) << 8;
        goto LAB_0042060e;
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
    uVar7 = (uint)DAT_00999f9a._1_1_;
    bVar3 = bVar6 + (&DAT_005f472e)[uVar7 * 2];
    if ((bVar2 < bVar3) || (bVar4 < bVar3)) {
      iVar1 = uVar7 * 2;
      DAT_00999f9a._1_1_ = (&DAT_005f475e)[uVar7];
      uVar7 = (uint)DAT_00999f9a._1_1_;
      bVar3 = (bVar3 - (&DAT_005f472e)[iVar1]) + (&DAT_005f472e)[uVar7 * 2];
    }
    DAT_0099a4ec = (ushort)(byte)(bVar3 - (&DAT_005f472e)[uVar7 * 2]) * 0x10 +
                   *(short *)(&DAT_005f4746 + uVar7 * 2);
    if (DAT_0099a4ec < 0x10) {
      DAT_0099a4ec = DAT_0099a4ec + 0x10;
    }
    DAT_0099a4e8 = 0;
    DAT_0099a4ea = 0;
    (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])();
    DAT_0099a4ec = ((ushort)uVar5 >> 8) * 0x10 +
                   *(short *)(&DAT_005f4746 + (uint)DAT_00999f9a._1_1_ * 2);
    if (DAT_0099a4ec == 0) {
      DAT_0099a4ec = 0x10;
    }
    DAT_0099a4e8 = 0;
    DAT_0099a4ea = 0x1f;
    (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])();
    uVar5 = (uint)(byte)(bVar6 + (&DAT_005f472e)[(uint)DAT_00999f9a._1_1_ * 2]) << 8;
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

