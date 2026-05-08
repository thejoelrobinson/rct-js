
undefined8 FUN_00428ec0(void)

{
  short sVar1;
  ushort uVar2;
  ushort uVar3;
  undefined4 in_EAX;
  ushort uVar4;
  ushort uVar5;
  ushort uVar6;
  undefined4 in_EDX;
  short sVar7;
  int iVar8;
  char *pcVar9;
  undefined4 local_1c;
  
  uVar4 = (ushort)((uint)in_EAX >> 0x10);
  uVar2 = DAT_0087c81c;
  if (1999 < DAT_0087c81c) {
    uVar2 = 2000;
  }
  uVar5 = 0;
  sVar7 = 0;
  for (uVar6 = DAT_0087c398; uVar6 != 0xffff; uVar6 = (&DAT_00743b98)[(uint)uVar6 * 0x80]) {
    iVar8 = (uint)uVar6 * 0x100;
    if (((&DAT_00743bc2)[iVar8] == '\0') && ((&DAT_00743bbe)[iVar8] == '\0')) {
      if (0x80 < (byte)(&DAT_00743bce)[iVar8]) {
        uVar5 = uVar5 + 1;
      }
      if (((*(ushort *)(&DAT_00743c5c + iVar8) & 1) != 0) && ((byte)(&DAT_00743c5a)[iVar8] < 0x5a))
      {
        sVar7 = sVar7 + 1;
      }
    }
  }
  sVar1 = 0x28a - (0x96 - (uVar2 / 0xd & 0xff));
  if (DAT_0087c81c != 0) {
    uVar2 = (ushort)(((uint)uVar5 * 300) / (uint)DAT_0087c81c);
    if (0xf9 < uVar2) {
      uVar2 = 0xfa;
    }
    sVar1 = sVar1 + uVar2 * 2;
  }
  if (-1 < (short)(sVar7 + -0x19)) {
    sVar1 = sVar1 + (sVar7 + -0x19) * -7;
  }
  uVar6 = 0;
  uVar2 = 0;
  pcVar9 = &DAT_00887420;
  do {
    if (*pcVar9 != -1) {
      uVar2 = uVar2 + (100 - (ushort)(byte)pcVar9[0x149]);
      uVar6 = uVar6 + 1;
    }
    pcVar9 = pcVar9 + 0x260;
  } while (pcVar9 < &DAT_008ad1c0);
  sVar1 = sVar1 + -200;
  if (uVar6 != 0) {
    sVar1 = sVar1 + (uVar2 / uVar6) * 2;
  }
  pcVar9 = &DAT_00887420;
  uVar2 = 0;
  uVar6 = 0;
  do {
    if ((*pcVar9 != -1) && (*(short *)(pcVar9 + 0xf0) != -1)) {
      uVar2 = uVar2 + (*(ushort *)(pcVar9 + 0xf0) >> 3);
      uVar6 = uVar6 + (*(ushort *)(pcVar9 + 0xf2) >> 3);
    }
    pcVar9 = pcVar9 + 0x260;
  } while (pcVar9 < &DAT_008ad1c0);
  if (999 < uVar2) {
    uVar2 = 1000;
  }
  if (999 < uVar6) {
    uVar6 = 1000;
  }
  uVar3 = 0;
  for (uVar5 = DAT_0087c39c; uVar5 != 0xffff; uVar5 = (&DAT_00743b98)[(uint)uVar5 * 0x80]) {
    if (0x1dff < (uint)(*(int *)(&DAT_00743bb8 + (uint)uVar5 * 0x100) - DAT_006e3b84)) {
      uVar3 = uVar3 + 1;
    }
  }
  if (0x95 < uVar3) {
    uVar3 = 0x96;
  }
  sVar7 = (sVar1 - (200 - (ushort)(uVar2 + uVar6) / 10)) - ((0x96 - uVar3) * -4 + 600);
  pcVar9 = &DAT_00887420;
  uVar2 = 0;
  uVar5 = 0;
  uVar6 = 0;
  do {
    if ((*pcVar9 != -1) && (*(short *)(pcVar9 + 0xf0) != -1)) {
      uVar2 = uVar2 + (*(ushort *)(pcVar9 + 0xf0) >> 3);
      uVar5 = uVar5 + (*(ushort *)(pcVar9 + 0xf2) >> 3);
      uVar6 = uVar6 + 1;
    }
    pcVar9 = pcVar9 + 0x260;
  } while (pcVar9 < &DAT_008ad1c0);
  sVar1 = sVar7 + -100;
  if (uVar6 != 0) {
    uVar2 = uVar2 / uVar6 - 0x2e;
    if ((short)uVar2 < 0) {
      uVar2 = -uVar2;
    }
    uVar6 = uVar5 / uVar6 - 0x41;
    if ((short)uVar6 < 0) {
      uVar6 = -uVar6;
    }
    uVar2 = uVar2 >> 1;
    uVar6 = uVar6 >> 1;
    if (0x31 < uVar2) {
      uVar2 = 0x32;
    }
    if (0x31 < uVar6) {
      uVar6 = 0x32;
    }
    sVar1 = sVar7 - (uVar6 + uVar2);
  }
  local_1c = CONCAT22(uVar4,sVar1);
  if (sVar1 < 0) {
    local_1c = (uint)uVar4 << 0x10;
  }
  if (999 < (short)local_1c) {
    local_1c = CONCAT22((short)((uint)local_1c >> 0x10),999);
  }
  return CONCAT44(in_EDX,local_1c);
}

