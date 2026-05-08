
void FUN_00458bcf(void)

{
  undefined4 uVar1;
  ushort uVar2;
  byte *pbVar3;
  byte bVar4;
  int in_EAX;
  byte *pbVar5;
  uint uVar6;
  ushort *in_ECX;
  ushort *extraout_ECX;
  ushort *extraout_ECX_00;
  ushort *extraout_ECX_01;
  ushort *extraout_ECX_02;
  ushort *extraout_ECX_03;
  ushort *extraout_ECX_04;
  ushort *extraout_ECX_05;
  ushort *extraout_ECX_06;
  ushort *extraout_ECX_07;
  ushort *extraout_ECX_08;
  ushort *extraout_ECX_09;
  ushort *extraout_ECX_10;
  ushort *extraout_ECX_11;
  ushort *extraout_ECX_12;
  ushort *extraout_ECX_13;
  ushort *extraout_ECX_14;
  ushort *extraout_ECX_15;
  undefined **ppuVar7;
  char *pcVar8;
  byte *pbVar9;
  byte *pbVar10;
  byte *unaff_EDI;
  
  if (0x7fff < (ushort)in_EAX) {
    if ((ushort)in_EAX < 0x9000) {
      pbVar5 = &DAT_0087f41c + (in_EAX - 0x8000U & 0xfffff3ff) * 0x20;
      do {
        bVar4 = *pbVar5;
        *unaff_EDI = bVar4;
        pbVar5 = pbVar5 + 1;
        unaff_EDI = unaff_EDI + 1;
      } while (bVar4 != 0);
      return;
    }
                    /* WARNING: Could not recover jumptable at 0x00458bdb. Too many branches */
                    /* WARNING: Treating indirect jump as call */
    (**(code **)(&DAT_0061f2d4 + in_EAX * 4))();
    return;
  }
  pbVar5 = (&PTR_DAT_00640194)[in_EAX];
FUN_00458c14:
  while( true ) {
    bVar4 = *pbVar5;
    pbVar10 = pbVar5 + 1;
    if (0x1f < bVar4) break;
    if (bVar4 == 0) {
      *unaff_EDI = 0;
      return;
    }
    if (bVar4 < 5) {
LAB_00458c4a:
      *unaff_EDI = bVar4;
      unaff_EDI = unaff_EDI + 1;
      bVar4 = *pbVar10;
      pbVar10 = pbVar10 + 1;
    }
    else if (0x10 < bVar4) {
      if (0x16 < bVar4) {
        *unaff_EDI = bVar4;
        unaff_EDI[1] = *pbVar10;
        unaff_EDI = unaff_EDI + 2;
        bVar4 = pbVar5[2];
        pbVar10 = pbVar5 + 3;
      }
      *unaff_EDI = bVar4;
      unaff_EDI = unaff_EDI + 1;
      bVar4 = *pbVar10;
      pbVar10 = pbVar10 + 1;
      goto LAB_00458c4a;
    }
    *unaff_EDI = bVar4;
    unaff_EDI = unaff_EDI + 1;
    pbVar5 = pbVar10;
  }
  switch(bVar4) {
  case 0x7b:
    FUN_0045905e();
    in_ECX = extraout_ECX;
    pbVar5 = pbVar10;
    goto FUN_00458c14;
  case 0x7c:
    FUN_00458f53();
    in_ECX = extraout_ECX_00;
    pbVar5 = pbVar10;
    goto FUN_00458c14;
  case 0x7d:
    FUN_0045917b();
    in_ECX = extraout_ECX_01;
    pbVar5 = pbVar10;
    goto FUN_00458c14;
  case 0x7e:
    FUN_0045905e();
    in_ECX = extraout_ECX_02;
    pbVar5 = pbVar10;
    goto FUN_00458c14;
  case 0x7f:
    FUN_00458f53();
    in_ECX = extraout_ECX_03;
    pbVar5 = pbVar10;
    goto FUN_00458c14;
  case 0x80:
    (*(code *)(&PTR_LAB_00458dfc)[DAT_005f8da1 & 0x7f])();
    in_ECX = extraout_ECX_08;
    pbVar5 = pbVar10;
    goto FUN_00458c14;
  case 0x81:
    (*(code *)(&PTR_LAB_00458e40)[DAT_005f8da1 & 0x7f])();
    in_ECX = extraout_ECX_09;
    pbVar5 = pbVar10;
    goto FUN_00458c14;
  case 0x82:
    FUN_00458bcf();
    in_ECX = extraout_ECX_12;
    pbVar5 = pbVar10;
    goto FUN_00458c14;
  case 0x83:
    pbVar5 = pbVar5 + 3;
    FUN_00458bcf();
    in_ECX = extraout_ECX_13;
    goto FUN_00458c14;
  case 0x84:
    pbVar9 = *(byte **)in_ECX;
    in_ECX = in_ECX + 2;
    pbVar3 = unaff_EDI;
    do {
      unaff_EDI = pbVar3;
      bVar4 = *pbVar9;
      *unaff_EDI = bVar4;
      pbVar9 = pbVar9 + 1;
      pbVar5 = pbVar10;
      pbVar3 = unaff_EDI + 1;
    } while (bVar4 != 0);
    goto FUN_00458c14;
  case 0x85:
    FUN_00458f25();
    in_ECX = extraout_ECX_14;
    pbVar5 = pbVar10;
    goto FUN_00458c14;
  case 0x86:
    FUN_00458f0f();
    in_ECX = extraout_ECX_15;
    pbVar5 = pbVar10;
    goto FUN_00458c14;
  case 0x87:
    if (DAT_005f8d60 == '\0') {
      FUN_0045905e();
      ppuVar7 = &PTR_DAT_0064015b;
      in_ECX = extraout_ECX_10;
      pbVar9 = unaff_EDI;
    }
    else {
      FUN_0045905e();
      ppuVar7 = (undefined **)&DAT_0064015f;
      in_ECX = extraout_ECX_11;
      pbVar9 = unaff_EDI;
    }
    break;
  case 0x88:
    in_ECX = in_ECX + 1;
    pbVar5 = pbVar10;
    goto FUN_00458c14;
  case 0x89:
    in_ECX = in_ECX + -1;
    pbVar5 = pbVar10;
    goto FUN_00458c14;
  case 0x8a:
    if (*in_ECX / 0x3c != 0) {
      FUN_00458f53(*in_ECX % 0x3c);
      pbVar9 = &DAT_00640176;
      pbVar5 = unaff_EDI;
      do {
        unaff_EDI = pbVar5;
        bVar4 = *pbVar9;
        *unaff_EDI = bVar4;
        pbVar9 = pbVar9 + 1;
        pbVar5 = unaff_EDI + 1;
      } while (bVar4 != 0);
    }
    FUN_00458f53();
    ppuVar7 = (undefined **)&DAT_0064017b;
    in_ECX = extraout_ECX_07;
    pbVar9 = unaff_EDI;
    break;
  case 0x8b:
    uVar2 = *in_ECX / 0x3c;
    if (uVar2 != 0) {
      uVar6 = (uint)uVar2;
      FUN_00458f53(uVar6,*in_ECX % 0x3c);
      pcVar8 = s_hours__0064016a;
      pbVar5 = unaff_EDI;
      if (uVar6 == 1) {
        pcVar8 = &DAT_00640164;
      }
      do {
        unaff_EDI = pbVar5;
        bVar4 = *pcVar8;
        *unaff_EDI = bVar4;
        pcVar8 = pcVar8 + 1;
        pbVar5 = unaff_EDI + 1;
      } while (bVar4 != 0);
    }
    FUN_00458f53();
    ppuVar7 = (undefined **)&DAT_00640171;
    in_ECX = extraout_ECX_06;
    pbVar9 = unaff_EDI;
    break;
  case 0x8c:
    if (DAT_005f8d60 == '\0') {
      FUN_0045905e();
      ppuVar7 = (undefined **)&DAT_00640180;
      in_ECX = extraout_ECX_04;
      pbVar9 = unaff_EDI;
    }
    else {
      FUN_0045905e();
      ppuVar7 = (undefined **)&DAT_00640183;
      in_ECX = extraout_ECX_05;
      pbVar9 = unaff_EDI;
    }
    break;
  case 0x8d:
    *unaff_EDI = 0x17;
    uVar1 = *(undefined4 *)in_ECX;
    in_ECX = in_ECX + 2;
    *(undefined4 *)(unaff_EDI + 1) = uVar1;
    unaff_EDI = unaff_EDI + 5;
    pbVar5 = pbVar10;
    goto FUN_00458c14;
  default:
    goto switchD_00458c5d_default;
  }
  do {
    unaff_EDI = pbVar9;
    bVar4 = *(byte *)ppuVar7;
    *unaff_EDI = bVar4;
    ppuVar7 = (undefined **)((int)ppuVar7 + 1);
    pbVar5 = pbVar10;
    pbVar9 = unaff_EDI + 1;
  } while (bVar4 != 0);
  goto FUN_00458c14;
switchD_00458c5d_default:
  *unaff_EDI = bVar4;
  unaff_EDI = unaff_EDI + 1;
  pbVar5 = pbVar10;
  goto FUN_00458c14;
}

