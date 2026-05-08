
undefined8 FUN_0042e062(void)

{
  ushort uVar1;
  ushort uVar2;
  undefined4 in_EAX;
  short in_CX;
  ushort uVar3;
  undefined4 extraout_ECX;
  undefined4 in_EDX;
  undefined4 extraout_EDX;
  uint uVar4;
  uint unaff_EBX;
  byte unaff_BP;
  byte *pbVar5;
  int iVar7;
  bool bVar8;
  undefined1 uVar9;
  byte *pbVar6;
  
  uVar2 = (short)in_EAX + ((short)(&DAT_00652478)[(unaff_EBX >> 3) * 2] >> 3);
  uVar3 = in_CX + ((short)(&DAT_0065247a)[(unaff_EBX >> 3) * 2] >> 3);
  bVar8 = false;
  FUN_0042547b();
  if (!bVar8) {
    uVar1 = uVar3 >> 9;
    pbVar6 = (byte *)(&DAT_00971ef4)
                     [(ushort)((ushort)((uVar3 & 0xffe0) << 7 | uVar1 | uVar2 & 0xffe0) >> 5 |
                              uVar1 << 0xb)];
    do {
      if ((*pbVar6 & 0x3c) == 4) {
        if (((short)((ushort)pbVar6[2] * 4) <= (short)extraout_EDX) &&
           ((short)extraout_EDX < (short)((ushort)pbVar6[2] * 4 + 0x20))) goto LAB_0042e0f3;
      }
      pbVar5 = pbVar6 + 1;
      pbVar6 = pbVar6 + 8;
    } while ((*pbVar5 & 0x80) == 0);
  }
  goto LAB_0042e189;
  while (pbVar6 = pbVar5, (*pbVar5 & 0x3c) != 0) {
LAB_0042e0f3:
    pbVar5 = pbVar6 + 8;
    if ((pbVar6[1] & 0x80) != 0) {
      uVar9 = DAT_0087c3a8 == 500;
      if (499 < DAT_0087c3a8) {
        uVar4 = 0;
        for (uVar2 = DAT_0087c39c; uVar9 = uVar2 == 0xffff, !(bool)uVar9;
            uVar2 = (&DAT_00743b98)[(uint)uVar2 * 0x80]) {
          iVar7 = (uint)uVar2 * 0x100;
          if (uVar4 <= *(uint *)(&DAT_00743bb8 + iVar7)) {
            uVar4 = *(uint *)(&DAT_00743bb8 + iVar7);
            pbVar5 = &DAT_00743b94 + iVar7;
          }
        }
        FUN_005e5496(extraout_EDX);
        FUN_00444d1f();
      }
      FUN_00444bd4();
      if (!(bool)uVar9) {
        FUN_00444c74(extraout_ECX);
        pbVar5[0x1e] = (byte)unaff_EBX;
        pbVar5[0x14] = 6;
        pbVar5[9] = 6;
        pbVar5[0x15] = 3;
        *pbVar5 = 3;
        pbVar5[1] = unaff_BP;
        FUN_00444927();
        FUN_005e5496();
        *(undefined4 *)(pbVar5 + 0x24) = DAT_006e3b84;
      }
      break;
    }
  }
LAB_0042e189:
  return CONCAT44(in_EDX,in_EAX);
}

