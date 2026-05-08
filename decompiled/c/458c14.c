
void FUN_00458c14(void)

{
  undefined4 uVar1;
  ushort uVar2;
  byte bVar3;
  uint uVar4;
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
  undefined **ppuVar5;
  char *pcVar6;
  byte *pbVar7;
  byte *unaff_ESI;
  byte *pbVar8;
  byte *pbVar9;
  byte *unaff_EDI;
  
code_r0x00458c14:
  while( true ) {
    bVar3 = *unaff_ESI;
    pbVar8 = unaff_ESI + 1;
    if (0x1f < bVar3) break;
    if (bVar3 == 0) {
      *unaff_EDI = 0;
      return;
    }
    if (bVar3 < 5) {
LAB_00458c4a:
      *unaff_EDI = bVar3;
      unaff_EDI = unaff_EDI + 1;
      bVar3 = *pbVar8;
      pbVar8 = pbVar8 + 1;
    }
    else if (0x10 < bVar3) {
      if (0x16 < bVar3) {
        *unaff_EDI = bVar3;
        unaff_EDI[1] = *pbVar8;
        unaff_EDI = unaff_EDI + 2;
        bVar3 = unaff_ESI[2];
        pbVar8 = unaff_ESI + 3;
      }
      *unaff_EDI = bVar3;
      unaff_EDI = unaff_EDI + 1;
      bVar3 = *pbVar8;
      pbVar8 = pbVar8 + 1;
      goto LAB_00458c4a;
    }
    *unaff_EDI = bVar3;
    unaff_EDI = unaff_EDI + 1;
    unaff_ESI = pbVar8;
  }
  switch(bVar3) {
  case 0x7b:
    FUN_0045905e();
    in_ECX = extraout_ECX;
    unaff_ESI = pbVar8;
    goto code_r0x00458c14;
  case 0x7c:
    FUN_00458f53();
    in_ECX = extraout_ECX_00;
    unaff_ESI = pbVar8;
    goto code_r0x00458c14;
  case 0x7d:
    FUN_0045917b();
    in_ECX = extraout_ECX_01;
    unaff_ESI = pbVar8;
    goto code_r0x00458c14;
  case 0x7e:
    FUN_0045905e();
    in_ECX = extraout_ECX_02;
    unaff_ESI = pbVar8;
    goto code_r0x00458c14;
  case 0x7f:
    FUN_00458f53();
    in_ECX = extraout_ECX_03;
    unaff_ESI = pbVar8;
    goto code_r0x00458c14;
  case 0x80:
    (*(code *)(&PTR_LAB_00458dfc)[DAT_005f8da1 & 0x7f])();
    in_ECX = extraout_ECX_08;
    unaff_ESI = pbVar8;
    goto code_r0x00458c14;
  case 0x81:
    (*(code *)(&PTR_LAB_00458e40)[DAT_005f8da1 & 0x7f])();
    in_ECX = extraout_ECX_09;
    unaff_ESI = pbVar8;
    goto code_r0x00458c14;
  case 0x82:
    FUN_00458bcf();
    in_ECX = extraout_ECX_12;
    unaff_ESI = pbVar8;
    goto code_r0x00458c14;
  case 0x83:
    unaff_ESI = unaff_ESI + 3;
    FUN_00458bcf();
    in_ECX = extraout_ECX_13;
    goto code_r0x00458c14;
  case 0x84:
    pbVar9 = *(byte **)in_ECX;
    in_ECX = in_ECX + 2;
    pbVar7 = unaff_EDI;
    do {
      unaff_EDI = pbVar7;
      bVar3 = *pbVar9;
      *unaff_EDI = bVar3;
      pbVar9 = pbVar9 + 1;
      unaff_ESI = pbVar8;
      pbVar7 = unaff_EDI + 1;
    } while (bVar3 != 0);
    goto code_r0x00458c14;
  case 0x85:
    FUN_00458f25();
    in_ECX = extraout_ECX_14;
    unaff_ESI = pbVar8;
    goto code_r0x00458c14;
  case 0x86:
    FUN_00458f0f();
    in_ECX = extraout_ECX_15;
    unaff_ESI = pbVar8;
    goto code_r0x00458c14;
  case 0x87:
    if (DAT_005f8d60 == '\0') {
      FUN_0045905e();
      ppuVar5 = &PTR_DAT_0064015b;
      in_ECX = extraout_ECX_10;
      pbVar9 = unaff_EDI;
    }
    else {
      FUN_0045905e();
      ppuVar5 = (undefined **)&DAT_0064015f;
      in_ECX = extraout_ECX_11;
      pbVar9 = unaff_EDI;
    }
    break;
  case 0x88:
    in_ECX = in_ECX + 1;
    unaff_ESI = pbVar8;
    goto code_r0x00458c14;
  case 0x89:
    in_ECX = in_ECX + -1;
    unaff_ESI = pbVar8;
    goto code_r0x00458c14;
  case 0x8a:
    if (*in_ECX / 0x3c != 0) {
      FUN_00458f53(*in_ECX % 0x3c);
      pbVar7 = &DAT_00640176;
      pbVar9 = unaff_EDI;
      do {
        unaff_EDI = pbVar9;
        bVar3 = *pbVar7;
        *unaff_EDI = bVar3;
        pbVar7 = pbVar7 + 1;
        pbVar9 = unaff_EDI + 1;
      } while (bVar3 != 0);
    }
    FUN_00458f53();
    ppuVar5 = (undefined **)&DAT_0064017b;
    in_ECX = extraout_ECX_07;
    pbVar9 = unaff_EDI;
    break;
  case 0x8b:
    uVar2 = *in_ECX / 0x3c;
    if (uVar2 != 0) {
      uVar4 = (uint)uVar2;
      FUN_00458f53(uVar4,*in_ECX % 0x3c);
      pcVar6 = s_hours__0064016a;
      pbVar9 = unaff_EDI;
      if (uVar4 == 1) {
        pcVar6 = &DAT_00640164;
      }
      do {
        unaff_EDI = pbVar9;
        bVar3 = *pcVar6;
        *unaff_EDI = bVar3;
        pcVar6 = pcVar6 + 1;
        pbVar9 = unaff_EDI + 1;
      } while (bVar3 != 0);
    }
    FUN_00458f53();
    ppuVar5 = (undefined **)&DAT_00640171;
    in_ECX = extraout_ECX_06;
    pbVar9 = unaff_EDI;
    break;
  case 0x8c:
    if (DAT_005f8d60 == '\0') {
      FUN_0045905e();
      ppuVar5 = (undefined **)&DAT_00640180;
      in_ECX = extraout_ECX_04;
      pbVar9 = unaff_EDI;
    }
    else {
      FUN_0045905e();
      ppuVar5 = (undefined **)&DAT_00640183;
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
    unaff_ESI = pbVar8;
    goto code_r0x00458c14;
  default:
    goto switchD_00458c5d_default;
  }
  do {
    unaff_EDI = pbVar9;
    bVar3 = *(byte *)ppuVar5;
    *unaff_EDI = bVar3;
    ppuVar5 = (undefined **)((int)ppuVar5 + 1);
    unaff_ESI = pbVar8;
    pbVar9 = unaff_EDI + 1;
  } while (bVar3 != 0);
  goto code_r0x00458c14;
switchD_00458c5d_default:
  *unaff_EDI = bVar3;
  unaff_EDI = unaff_EDI + 1;
  unaff_ESI = pbVar8;
  goto code_r0x00458c14;
}

