
void FUN_00421553(void)

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
  int iVar12;
  byte *pbVar13;
  uint uVar14;
  char cVar3;
  char cVar5;
  undefined2 uVar10;
  
  uVar11 = DAT_00991f74 + *(short *)(&DAT_005f4676 + DAT_00991f88 * 4);
  uVar10 = (undefined2)((uint)in_EDX >> 0x10);
  if (((ushort)(DAT_00991f70 + *(short *)(&DAT_005f4674 + DAT_00991f88 * 4)) < 0x1000) &&
     (uVar11 < 0x1000)) {
    uVar11 = uVar11 * 0x80 | uVar11 >> 9 |
             DAT_00991f70 + *(short *)(&DAT_005f4674 + DAT_00991f88 * 4);
    pbVar13 = (byte *)(&DAT_00971ef4)[(ushort)(uVar11 >> 5 | uVar11 << 0xb)];
    bVar2 = *pbVar13;
    while ((bVar2 & 0x3c) != 0) {
      pbVar13 = pbVar13 + 8;
      bVar2 = *pbVar13;
    }
    uVar14 = CONCAT22(uVar10,CONCAT11(pbVar13[5],(char)in_EDX)) & 0xffff1fff;
    if ((char)uVar14 == (char)(uVar14 >> 8)) {
      return;
    }
    uVar11 = (pbVar13[4] & 0xf) << (in_CL & 0x1f);
    uVar8 = CONCAT22((short)(uVar14 >> 0x10),CONCAT11(pbVar13[2] >> 2,(char)uVar14));
    uVar14 = pbVar13[4] & 0x10 | (ushort)(uVar11 >> 4 | uVar11) & 0xf;
  }
  else {
    uVar14 = 0;
    uVar8 = CONCAT22(uVar10,CONCAT11(1,(char)in_EDX));
  }
  cVar3 = (char)uVar8;
  bVar2 = cVar3 + (&DAT_005f46a4)[unaff_EBX];
  bVar6 = cVar3 + (&DAT_005f4704)[unaff_EBX];
  cVar5 = (char)((uint)uVar8 >> 8);
  bVar4 = cVar5 + (&DAT_005f46c4)[uVar14];
  bVar7 = cVar5 + (&DAT_005f46e4)[uVar14];
  if ((bVar2 <= bVar4) && (bVar6 <= bVar7)) {
    return;
  }
  iVar12 = DAT_005f476c;
  if ((DAT_00991f8c & 1) != 0) {
    iVar12 = DAT_005f4770;
  }
  DAT_005f4724 = iVar12 + 5;
  uVar10 = (undefined2)((uint)uVar8 >> 0x10);
  iVar9 = CONCAT22(uVar10,CONCAT11(bVar7,cVar3));
  iVar12 = iVar9;
  if (bVar7 != bVar4) {
    if (bVar4 <= bVar7) {
      iVar9 = CONCAT22(uVar10,CONCAT11(bVar4,cVar3));
    }
    bVar4 = (byte)((uint)iVar9 >> 8);
    iVar12 = iVar9;
    if ((bVar4 != bVar2) && (bVar4 != bVar6)) {
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])();
      iVar9 = CONCAT22((short)((uint)iVar9 >> 0x10),CONCAT11(bVar4 + 1,(char)iVar9));
      iVar12 = iVar9;
    }
  }
LAB_00421670:
  do {
    bVar4 = (byte)((uint)iVar9 >> 8);
    if ((bVar2 <= bVar4) || (bVar6 <= bVar4)) {
      if ((bVar4 < bVar2) || (bVar4 < bVar6)) {
        (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])(iVar12,unaff_EBX);
      }
      return;
    }
    while (bVar4 != (byte)DAT_00999fdc) {
      if (bVar4 <= (byte)DAT_00999fdc) {
        (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])();
        iVar9 = (uint)(byte)(bVar4 + 1) << 8;
        goto LAB_00421670;
      }
      DAT_00999fdc._0_1_ = (byte)DAT_00999fdc._2_2_;
      DAT_00999fdc._1_1_ = (byte)((ushort)DAT_00999fdc._2_2_ >> 8);
      DAT_00999fdc._2_2_ = (undefined2)DAT_00999fe0;
      DAT_00999fe0._0_2_ = DAT_00999fe0._2_2_;
      DAT_00999fe0._2_2_ = (undefined2)DAT_00999fe4;
      DAT_00999fe4._0_2_ = DAT_00999fe4._2_2_;
      DAT_00999fe4._2_2_ = (undefined2)DAT_00999fe8;
      DAT_00999fe8._0_2_ = DAT_00999fe8._2_2_;
      DAT_00999fe8._2_2_ = (undefined2)DAT_00999fec;
      DAT_00999fec._0_2_ = DAT_00999fec._2_2_;
      DAT_00999fec._2_2_ = (undefined2)DAT_00999ff0;
      DAT_00999ff0._0_2_ = DAT_00999ff0._2_2_;
      DAT_00999ff0._2_2_ = (undefined2)DAT_00999ff4;
      DAT_00999ff4._0_2_ = DAT_00999ff4._2_2_;
      DAT_00999ff4._2_2_ = (undefined2)DAT_00999ff8;
      DAT_00999ff8._0_2_ = DAT_00999ff8._2_2_;
      DAT_00999ff8._2_2_ = (undefined2)DAT_00999ffc;
      DAT_00999ffc._0_2_ = DAT_00999ffc._2_2_;
      DAT_00999ffc._2_2_ = (undefined2)DAT_0099a000;
      DAT_0099a000._0_2_ = DAT_0099a000._2_2_;
      DAT_0099a000._2_2_ = (undefined2)DAT_0099a004;
      DAT_0099a004._0_2_ = DAT_0099a004._2_2_;
      DAT_0099a004._2_2_ = (undefined2)DAT_0099a008;
      DAT_0099a008._0_2_ = DAT_0099a008._2_2_;
      DAT_0099a008._2_2_ = (undefined2)DAT_0099a00c;
      DAT_0099a00c._0_2_ = DAT_0099a00c._2_2_;
      DAT_0099a00c._2_2_ = (undefined2)DAT_0099a010;
      DAT_0099a010._0_2_ = DAT_0099a010._2_2_;
      DAT_0099a010._2_2_ = (undefined2)DAT_0099a014;
      DAT_0099a014._0_2_ = DAT_0099a014._2_2_;
      DAT_0099a014._2_2_ = (undefined2)DAT_0099a018;
      DAT_0099a018._0_2_ = DAT_0099a018._2_2_;
      DAT_0099a018._2_2_ = uRam0099a01c;
    }
    uVar14 = (uint)DAT_00999fdc._1_1_;
    bVar7 = bVar4 + (&DAT_005f472e)[uVar14 * 2];
    if ((bVar2 < bVar7) || (bVar6 < bVar7)) {
      iVar1 = uVar14 * 2;
      DAT_00999fdc._1_1_ = (&DAT_005f475e)[uVar14];
      uVar14 = (uint)DAT_00999fdc._1_1_;
      bVar7 = (bVar7 - (&DAT_005f472e)[iVar1]) + (&DAT_005f472e)[uVar14 * 2];
    }
    DAT_0099a4ec = (ushort)(byte)(bVar7 - (&DAT_005f472e)[uVar14 * 2]) * 0x10 +
                   *(short *)(&DAT_005f4746 + uVar14 * 2);
    if (DAT_0099a4ec < 0x10) {
      DAT_0099a4ec = DAT_0099a4ec + 0x10;
    }
    DAT_0099a4e8 = 0;
    DAT_0099a4ea = 0;
    (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])();
    DAT_0099a4ec = ((ushort)iVar9 >> 8) * 0x10 +
                   *(short *)(&DAT_005f4746 + (uint)DAT_00999fdc._1_1_ * 2);
    if (DAT_0099a4ec == 0) {
      DAT_0099a4ec = 0x10;
    }
    DAT_0099a4e8 = 0x1f;
    DAT_0099a4ea = 0;
    (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])();
    iVar9 = (uint)(byte)(bVar4 + (&DAT_005f472e)[(uint)DAT_00999fdc._1_1_ * 2]) << 8;
    DAT_00999fdc._0_1_ = (byte)DAT_00999fdc._2_2_;
    DAT_00999fdc._1_1_ = (byte)((ushort)DAT_00999fdc._2_2_ >> 8);
    DAT_00999fdc._2_2_ = (undefined2)DAT_00999fe0;
    DAT_00999fe0._0_2_ = DAT_00999fe0._2_2_;
    DAT_00999fe0._2_2_ = (undefined2)DAT_00999fe4;
    DAT_00999fe4._0_2_ = DAT_00999fe4._2_2_;
    DAT_00999fe4._2_2_ = (undefined2)DAT_00999fe8;
    DAT_00999fe8._0_2_ = DAT_00999fe8._2_2_;
    DAT_00999fe8._2_2_ = (undefined2)DAT_00999fec;
    DAT_00999fec._0_2_ = DAT_00999fec._2_2_;
    DAT_00999fec._2_2_ = (undefined2)DAT_00999ff0;
    DAT_00999ff0._0_2_ = DAT_00999ff0._2_2_;
    DAT_00999ff0._2_2_ = (undefined2)DAT_00999ff4;
    DAT_00999ff4._0_2_ = DAT_00999ff4._2_2_;
    DAT_00999ff4._2_2_ = (undefined2)DAT_00999ff8;
    DAT_00999ff8._0_2_ = DAT_00999ff8._2_2_;
    DAT_00999ff8._2_2_ = (undefined2)DAT_00999ffc;
    DAT_00999ffc._0_2_ = DAT_00999ffc._2_2_;
    DAT_00999ffc._2_2_ = (undefined2)DAT_0099a000;
    DAT_0099a000._0_2_ = DAT_0099a000._2_2_;
    DAT_0099a000._2_2_ = (undefined2)DAT_0099a004;
    DAT_0099a004._0_2_ = DAT_0099a004._2_2_;
    DAT_0099a004._2_2_ = (undefined2)DAT_0099a008;
    DAT_0099a008._0_2_ = DAT_0099a008._2_2_;
    DAT_0099a008._2_2_ = (undefined2)DAT_0099a00c;
    DAT_0099a00c._0_2_ = DAT_0099a00c._2_2_;
    DAT_0099a00c._2_2_ = (undefined2)DAT_0099a010;
    DAT_0099a010._0_2_ = DAT_0099a010._2_2_;
    DAT_0099a010._2_2_ = (undefined2)DAT_0099a014;
    DAT_0099a014._0_2_ = DAT_0099a014._2_2_;
    DAT_0099a014._2_2_ = (undefined2)DAT_0099a018;
    DAT_0099a018._0_2_ = DAT_0099a018._2_2_;
    DAT_0099a018._2_2_ = uRam0099a01c;
  } while( true );
}

