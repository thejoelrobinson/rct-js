
undefined8 FUN_005dd1c4(void)

{
  byte bVar1;
  byte bVar2;
  char cVar3;
  short sVar4;
  byte bVar5;
  undefined4 in_EAX;
  uint uVar6;
  uint uVar7;
  uint in_EDX;
  uint uVar8;
  ushort uVar9;
  int iVar10;
  byte *pbVar11;
  byte local_22;
  byte local_21;
  
  iVar10 = (in_EDX & 0xff) * 0x260;
  pbVar11 = &DAT_00887420 + iVar10;
  local_22 = (&DAT_0088749b)[iVar10];
  local_21 = (&DAT_0088749a)[iVar10];
  uVar6 = (uint)(byte)(&DAT_00887421)[iVar10];
  bVar5 = (&DAT_005f6be6)[uVar6 * 4];
  if (bVar5 == 0xff) {
    uVar6 = 0;
    uVar8 = 0xff;
    do {
      if (((&DAT_0088744a)[(in_EDX & 0xff) * 0x130 + uVar6] != -1) &&
         (pbVar11[uVar6 + 0x36] < (byte)uVar8)) {
        uVar8 = (uint)pbVar11[uVar6 + 0x36];
      }
      uVar6 = uVar6 + 1;
    } while (uVar6 < 4);
    if ((char)uVar8 == -1) {
      return CONCAT44(in_EDX,in_EAX);
    }
    bVar5 = (&DAT_005f6be5)[(uint)(byte)(&DAT_00887421)[iVar10] * 4];
    bVar1 = (&DAT_005f5d03)[(uint)*pbVar11 * 8];
    do {
      FUN_005ddbe1();
      uVar6 = 0;
      uVar9 = 0;
      for (pbVar11 = &DAT_0065ea78; bVar2 = *pbVar11, bVar2 != 0xff; pbVar11 = pbVar11 + 1) {
        uVar6 = uVar6 + *(int *)(&DAT_005f6f1c + (uint)bVar2 * 8);
        uVar9 = uVar9 + *(short *)(&DAT_005f6f20 + (uint)bVar2 * 8);
      }
      if ((uVar6 <= uVar8 * 0x44180) && (uVar9 <= (ushort)((ushort)bVar1 * 0x100)))
      goto LAB_005dd294;
      bVar5 = bVar5 - 1;
    } while (bVar5 != 0);
    bVar5 = 1;
LAB_005dd294:
    bVar1 = (&DAT_005f6be4)[(uint)(byte)(&DAT_00887421)[iVar10] * 4];
    if (local_22 < bVar1) {
      local_22 = bVar1;
    }
    if (bVar5 < bVar1) {
      bVar5 = bVar1;
    }
    if (bVar5 <= local_22) {
      local_22 = bVar5;
    }
    (&DAT_0088749d)[iVar10] = bVar5 | bVar1 << 4;
    FUN_005ddbe1();
    uVar6 = 0;
    for (pbVar11 = &DAT_0065ea78; *pbVar11 != 0xff; pbVar11 = pbVar11 + 1) {
      uVar6 = uVar6 + *(int *)(&DAT_005f6f1c + (uint)*pbVar11 * 8);
    }
    uVar7 = uVar6 >> 1;
    if (local_22 != 1) {
      uVar7 = uVar6 >> 2;
    }
    bVar5 = 0;
    do {
      bVar5 = bVar5 + 1;
      uVar7 = uVar7 + uVar6;
    } while (uVar7 <= uVar8 * 0x44180);
    if (0xc < bVar5) {
      bVar5 = 0xc;
    }
    cVar3 = (&DAT_00887424)[iVar10];
    if ((((cVar3 == '\x04') || (cVar3 == '\x02')) || (cVar3 == '\x03')) || (cVar3 == '\x17')) {
      bVar5 = 1;
    }
    (&DAT_0088749c)[iVar10] = bVar5;
    if (bVar5 <= local_21) {
      local_21 = bVar5;
    }
    sVar4 = CONCAT11(local_21,local_22);
  }
  else {
    (&DAT_0088749c)[iVar10] = bVar5;
    bVar1 = (&DAT_005f6be5)[uVar6 * 4];
    (&DAT_0088749d)[iVar10] = (&DAT_005f6be4)[uVar6 * 4] << 4 | bVar1;
    if (bVar5 < local_21) {
      local_21 = bVar5;
    }
    sVar4 = CONCAT11(local_21,bVar1);
  }
  if (sVar4 != CONCAT11((&DAT_00887498)[iVar10],(&DAT_00887499)[iVar10])) {
    (&DAT_00887499)[iVar10] = (char)sVar4;
    (&DAT_00887498)[iVar10] = (char)((ushort)sVar4 >> 8);
    FUN_005e5301();
  }
  return CONCAT44(in_EDX,in_EAX);
}

