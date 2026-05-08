
void FUN_0042094b(void)

{
  byte bVar1;
  byte bVar2;
  byte in_CL;
  byte bVar3;
  char in_DL;
  byte bVar5;
  uint uVar4;
  int unaff_EBX;
  uint uVar6;
  ushort uVar7;
  int iVar8;
  byte *pbVar9;
  uint uVar10;
  
  uVar7 = DAT_00991f74 + *(short *)(&DAT_005f4676 + DAT_00991f88 * 4);
  if (((ushort)(DAT_00991f70 + *(short *)(&DAT_005f4674 + DAT_00991f88 * 4)) < 0x1000) &&
     (uVar7 < 0x1000)) {
    uVar7 = uVar7 * 0x80 | uVar7 >> 9 | DAT_00991f70 + *(short *)(&DAT_005f4674 + DAT_00991f88 * 4);
    pbVar9 = (byte *)(&DAT_00971ef4)[(ushort)(uVar7 >> 5 | uVar7 << 0xb)];
    bVar5 = *pbVar9;
    while ((bVar5 & 0x3c) != 0) {
      pbVar9 = pbVar9 + 8;
      bVar5 = *pbVar9;
    }
    uVar7 = (pbVar9[4] & 0xf) << (in_CL & 0x1f);
    bVar5 = pbVar9[2] >> 2;
    uVar10 = pbVar9[4] & 0x10 | (ushort)(uVar7 >> 4 | uVar7) & 0xf;
  }
  else {
    uVar10 = 0;
    bVar5 = 1;
  }
  bVar1 = in_DL + (&DAT_005f46a4)[unaff_EBX];
  bVar3 = in_DL + (&DAT_005f4704)[unaff_EBX];
  bVar2 = bVar5 + (&DAT_005f46c4)[uVar10];
  bVar5 = bVar5 + (&DAT_005f46e4)[uVar10];
  if ((bVar1 <= bVar2) && (bVar3 <= bVar5)) {
    return;
  }
  iVar8 = DAT_005f476c;
  if ((DAT_00991f8c & 1) != 0) {
    iVar8 = DAT_005f4770;
  }
  DAT_005f4724 = iVar8 + 5;
  uVar4 = (uint)CONCAT11(bVar5,in_DL);
  uVar10 = uVar4;
  if (bVar5 != bVar2) {
    if (bVar2 <= bVar5) {
      uVar4 = (uint)CONCAT11(bVar2,in_DL);
    }
    bVar5 = (byte)(uVar4 >> 8);
    uVar10 = uVar4;
    if ((bVar5 != bVar1) && (bVar5 != bVar3)) {
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])();
      uVar4 = (uint)CONCAT11(bVar5 + 1,(char)uVar4);
      uVar10 = uVar4;
    }
  }
LAB_00420a5a:
  do {
    bVar5 = (byte)(uVar4 >> 8);
    if ((bVar1 <= bVar5) || (bVar3 <= bVar5)) {
      if ((bVar1 <= bVar5) && (bVar3 <= bVar5)) {
        return;
      }
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])(uVar10,unaff_EBX);
      return;
    }
    while (bVar5 != (byte)DAT_00999fdc) {
      if (bVar5 <= (byte)DAT_00999fdc) {
        (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])();
        uVar4 = (uint)(byte)(bVar5 + 1) << 8;
        goto LAB_00420a5a;
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
    uVar6 = (uint)DAT_00999fdc._1_1_;
    bVar2 = bVar5 + (&DAT_005f472e)[uVar6 * 2];
    if ((bVar1 < bVar2) || (bVar3 < bVar2)) {
      iVar8 = uVar6 * 2;
      DAT_00999fdc._1_1_ = (&DAT_005f475e)[uVar6];
      uVar6 = (uint)DAT_00999fdc._1_1_;
      bVar2 = (bVar2 - (&DAT_005f472e)[iVar8]) + (&DAT_005f472e)[uVar6 * 2];
    }
    DAT_0099a4ec = (ushort)(byte)(bVar2 - (&DAT_005f472e)[uVar6 * 2]) * 0x10 +
                   *(short *)(&DAT_005f4746 + uVar6 * 2);
    if (DAT_0099a4ec < 0x10) {
      DAT_0099a4ec = DAT_0099a4ec + 0x10;
    }
    DAT_0099a4e8 = 0;
    DAT_0099a4ea = 0;
    (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])();
    DAT_0099a4ec = ((ushort)uVar4 >> 8) * 0x10 +
                   *(short *)(&DAT_005f4746 + (uint)DAT_00999fdc._1_1_ * 2);
    if (DAT_0099a4ec == 0) {
      DAT_0099a4ec = 0x10;
    }
    DAT_0099a4e8 = 0x1f;
    DAT_0099a4ea = 0;
    (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])();
    uVar4 = (uint)(byte)(bVar5 + (&DAT_005f472e)[(uint)DAT_00999fdc._1_1_ * 2]) << 8;
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

