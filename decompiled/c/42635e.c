
undefined8 FUN_0042635e(void)

{
  byte bVar1;
  undefined4 in_EAX;
  undefined4 uVar2;
  uint in_EDX;
  char cVar3;
  uint uVar4;
  byte *pbVar5;
  ushort uVar6;
  int iVar7;
  uint uVar8;
  int iVar9;
  char local_24;
  
  uVar8 = in_EDX & 0xff;
  iVar9 = uVar8 * 0x260;
  uVar4 = 0;
  do {
    if ((&DAT_0088744a)[uVar8 * 0x130 + uVar4] != -1) {
      uVar6 = (&DAT_0088746a)[uVar8 * 0x130 + uVar4];
      if (uVar6 != 0xffff) {
        uVar4 = (uint)(byte)(&DAT_00887452)[iVar9 + uVar4];
        for (pbVar5 = (byte *)(&DAT_00971ef4)
                              [(ushort)((ushort)((uVar6 >> 8) << 0xc | (uVar6 & 0xff) << 5) >> 5 |
                                       ((ushort)((uVar6 >> 8) << 5) >> 9) << 0xb)];
            (uVar4 = CONCAT11(*pbVar5,(char)uVar4) & 0xffff3cff, (char)(uVar4 >> 8) != '\x10' ||
            ((byte)uVar4 != pbVar5[2])); pbVar5 = pbVar5 + 8) {
        }
        cVar3 = (*pbVar5 & 3 ^ 2) << 3;
        goto LAB_00426416;
      }
      break;
    }
    uVar4 = uVar4 + 1;
  } while (uVar4 < 4);
  cVar3 = -1;
LAB_00426416:
  local_24 = (char)in_EDX;
  for (uVar6 = DAT_0087c398; uVar6 != 0xffff; uVar6 = (&DAT_00743b98)[(uint)uVar6 * 0x80]) {
    iVar7 = (uint)uVar6 * 0x100;
    if ((((((&DAT_00743bbf)[iVar7] == '\x02') || ((&DAT_00743bbf)[iVar7] == '\a')) ||
         ((&DAT_00743bbf)[iVar7] == '\x04')) || ((&DAT_00743bbf)[iVar7] == '\x03')) &&
       (local_24 == (&DAT_00743bfc)[iVar7])) {
      FUN_0044142c();
      if (((&DAT_00743bbf)[iVar7] == '\x02') && ((&DAT_00743bc0)[iVar7] == '\0')) {
        FUN_0043e792();
      }
      FUN_005e53ca();
      if (cVar3 == -1) {
        FUN_00444927();
      }
      else {
        FUN_00444927();
        (&DAT_00743bb2)[iVar7] = cVar3;
      }
      uVar2 = FUN_005e53ca();
      (&DAT_00743bbf)[iVar7] = 0;
      FUN_0043c698(uVar2);
      uVar4 = (uint)*(ushort *)(&DAT_00743bce + iVar7);
      if ((byte)(&DAT_00743bcf)[iVar7] <= (byte)*(ushort *)(&DAT_00743bce + iVar7)) {
        uVar4 = (uint)(byte)(&DAT_00743bcf)[iVar7];
      }
      bVar1 = (byte)(uVar4 >> 1) & 0x7f;
      (&DAT_00743bce)[iVar7] = bVar1;
      (&DAT_00743bcf)[iVar7] = bVar1;
      (&DAT_00743bd9)[iVar7] = (&DAT_00743bd9)[iVar7] | 2;
    }
  }
  (&DAT_0088752b)[iVar9] = 0;
  (&DAT_0088752d)[iVar9] = 0;
  (&DAT_0088751d)[iVar9] = (&DAT_0088751d)[iVar9] | 4;
  return CONCAT44(in_EDX,in_EAX);
}

