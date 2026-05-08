
undefined4 FUN_005d89c0(void)

{
  ushort *puVar1;
  byte *pbVar2;
  byte bVar3;
  ushort uVar4;
  undefined4 in_EAX;
  undefined4 in_EDX;
  undefined4 extraout_EDX;
  undefined4 extraout_EDX_00;
  undefined4 extraout_EDX_01;
  undefined4 unaff_EBX;
  int iVar5;
  undefined1 *unaff_ESI;
  undefined4 unaff_EDI;
  uint uVar6;
  int iVar7;
  
  iVar5 = 0;
  do {
    *(undefined2 *)(unaff_ESI + 0x4c) = 0;
    *(undefined2 *)(unaff_ESI + 0x4e) = 0;
    unaff_ESI[0x4a] = 0;
    bVar3 = unaff_ESI[0x31];
    if ((*(ushort *)(&DAT_005f7104 + (uint)bVar3 * 8) & 4) == 0) {
LAB_005d8a4f:
      if ((bVar3 == 0x22) && (unaff_ESI[0xc5] != '\0')) {
        puVar1 = (ushort *)(unaff_ESI + 200);
        uVar4 = *puVar1;
        *puVar1 = *puVar1 + 0x3333;
        if (0xcccc < uVar4) {
          unaff_ESI[0xc5] = unaff_ESI[0xc5] + '\x01';
          unaff_ESI[0xc5] = unaff_ESI[0xc5] & 7;
          FUN_005e53ca();
          in_EDX = extraout_EDX_00;
        }
        iVar5 = iVar5 + 1;
      }
      else {
        if ((((*(ushort *)(unaff_ESI + 0x48) & 0x100) == 0) || (unaff_ESI[0xb5] == -1)) ||
           ((uVar6 = (uint)(byte)unaff_ESI[0x30], iVar7 = uVar6 * 0x260,
            (&DAT_0088755c)[iVar7] != '\x01' && ((&DAT_0088755c)[iVar7] != '\x03')))) {
          pbVar2 = unaff_ESI + 0xb5;
          bVar3 = *pbVar2;
          *pbVar2 = *pbVar2 + 0x14;
          if (0xeb < bVar3) {
            unaff_ESI[0xb5] = 0xff;
            goto LAB_005d8b29;
          }
        }
        else if (((&DAT_00887422)[uVar6 * 0x130] & 0x80) == 0) {
          (&DAT_00887422)[uVar6 * 0x130] = (&DAT_00887422)[uVar6 * 0x130] | 0x80;
          FUN_004518fc(in_EDX,unaff_EDI,unaff_EBX);
          (&DAT_0088751d)[iVar7] = (&DAT_0088751d)[iVar7] | 0x1c;
          (&DAT_0088755d)[iVar7] = 1;
          (&DAT_00887560)[iVar7] =
               (&DAT_00743bdf)
               [(uint)*(ushort *)(&DAT_0088747e + (uint)(byte)(&DAT_00887561)[iVar7] * 2 + iVar7) *
                0x100];
          (&DAT_00887563)[iVar7] = (&DAT_0088755c)[iVar7];
        }
        FUN_005e53ca();
        iVar5 = iVar5 + 1;
        in_EDX = extraout_EDX_01;
      }
    }
    else {
      uVar4 = *(ushort *)(unaff_ESI + 0xb6);
      if ((short)uVar4 < 0) {
        uVar4 = -uVar4;
      }
      bVar3 = (byte)uVar4;
      if ((uVar4 < 0x1f5) && ((unaff_ESI[0xba] & 0x30) == 0)) {
        *(undefined2 *)(unaff_ESI + 0xb6) = 0;
        goto LAB_005d8a4f;
      }
      iVar5 = iVar5 + 1;
      uVar4 = *(ushort *)(unaff_ESI + 0xb6);
      if ((short)uVar4 < 0) {
        uVar4 = -uVar4;
      }
      if (uVar4 < 400) {
        *(undefined2 *)(unaff_ESI + 0xb6) = 400;
      }
      unaff_ESI[0xba] = unaff_ESI[0xba] + (char)((ushort)*(short *)(unaff_ESI + 0xb6) >> 8);
      *(short *)(unaff_ESI + 0xb6) =
           *(short *)(unaff_ESI + 0xb6) - (*(short *)(unaff_ESI + 0xb6) >> 8);
      FUN_005e53ca();
      in_EDX = extraout_EDX;
    }
LAB_005d8b29:
    if (*(short *)(unaff_ESI + 0x3e) == -1) {
      if (iVar5 == 0) {
        return in_EAX;
      }
      return in_EAX;
    }
    unaff_ESI = &DAT_00743b94 + (uint)*(ushort *)(unaff_ESI + 0x3e) * 0x100;
  } while( true );
}

