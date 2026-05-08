
void FUN_009bb7bb(void)

{
  int iVar1;
  short sVar2;
  uint uVar3;
  int iVar4;
  char *pcVar5;
  undefined2 *puVar6;
  undefined2 *puVar7;
  char *pcVar8;
  undefined2 *puVar9;
  
  if (DAT_009b2300 == '\x01') {
    pcVar8 = &DAT_005f2000 + (uint)DAT_008dff1c * 4;
    uVar3 = (uint)DAT_008dff18;
    pcVar5 = DAT_008dff14;
    do {
      *pcVar8 = -1 - ((byte)(-*pcVar5 - 1U) >> 1);
      pcVar8[1] = -1 - ((byte)(-pcVar5[1] - 1U) >> 1);
      pcVar8[2] = -1 - ((byte)(-pcVar5[2] - 1U) >> 1);
      pcVar5 = pcVar5 + 3;
      pcVar8 = pcVar8 + 4;
      uVar3 = uVar3 - 1;
    } while (uVar3 != 0);
    FUN_00405cc0(&DAT_005f2000,10,0xec);
    DAT_009b2300 = DAT_009b2300 + '\x01';
  }
  else {
    if (DAT_009b2300 == '\x02') {
      puVar9 = (undefined2 *)(&DAT_005f2000 + (uint)DAT_008dff1c * 4);
      uVar3 = (uint)DAT_008dff18;
      pcVar5 = DAT_008dff14;
      do {
        *puVar9 = *(undefined2 *)pcVar5;
        *(char *)(puVar9 + 1) = pcVar5[2];
        pcVar5 = pcVar5 + 3;
        puVar9 = puVar9 + 2;
        uVar3 = uVar3 - 1;
      } while (uVar3 != 0);
    }
    puVar9 = &DAT_005f2398;
    iVar4 = 0;
    if ((*(int *)(&DAT_00628a3c + (uint)DAT_008d7eb4 * 4) != -1) &&
       (iVar4 = 1, *(int *)(&DAT_00628a3c + (uint)DAT_008d7eb4 * 4) != 0x200002a)) {
      iVar4 = 2;
    }
    iVar1 = (&DAT_008dc0b4)[(iVar4 + 999) * 4];
    sVar2 = 5;
    puVar7 = (undefined2 *)
             ((uint)(ushort)((short)((uint)(ushort)((short)((uint)-DAT_00999f94 >> 1) << 7) * 0xf >>
                                    0x10) * 3) + iVar1);
    do {
      *puVar9 = *puVar7;
      *(undefined1 *)(puVar9 + 1) = *(undefined1 *)(puVar7 + 1);
      puVar6 = (undefined2 *)((int)puVar7 + 9);
      if ((undefined2 *)(iVar1 + 0x2dU) <= puVar6) {
        puVar6 = puVar7 + -0x12;
      }
      puVar9 = puVar9 + 2;
      sVar2 = sVar2 + -1;
      puVar7 = puVar6;
    } while (sVar2 != 0);
    iVar1 = (&DAT_008dc0b4)[(iVar4 + 0x3ea) * 4];
    sVar2 = 5;
    puVar7 = (undefined2 *)
             ((uint)(ushort)((short)((uint)(ushort)((short)((uint)-DAT_00999f94 >> 1) << 7) * 0xf >>
                                    0x10) * 3) + iVar1);
    do {
      *puVar9 = *puVar7;
      *(undefined1 *)(puVar9 + 1) = *(undefined1 *)(puVar7 + 1);
      puVar6 = (undefined2 *)((int)puVar7 + 9);
      if ((undefined2 *)(iVar1 + 0x2dU) <= puVar6) {
        puVar6 = puVar7 + -0x12;
      }
      puVar9 = puVar9 + 2;
      sVar2 = sVar2 + -1;
      puVar7 = puVar6;
    } while (sVar2 != 0);
    iVar4 = (&DAT_008dc0b4)[(iVar4 + 0x3ed) * 4];
    sVar2 = 3;
    puVar7 = (undefined2 *)
             ((uint)(ushort)((short)((DAT_00999f94 * -0x3c0 & 0xffffU) * 3 >> 0x10) * 3) + iVar4);
    do {
      *puVar9 = *puVar7;
      *(undefined1 *)(puVar9 + 1) = *(undefined1 *)(puVar7 + 1);
      puVar6 = (undefined2 *)((int)puVar7 + 3);
      if ((undefined2 *)(iVar4 + 9U) <= puVar6) {
        puVar6 = puVar7 + -3;
      }
      puVar9 = puVar9 + 2;
      sVar2 = sVar2 + -1;
      puVar7 = puVar6;
    } while (sVar2 != 0);
    FUN_00405cc0(&DAT_005f2000,0xe6,0xd);
    if (DAT_009b2300 == '\x02') {
      FUN_00405cc0(&DAT_005f2000,10,0xec);
      DAT_009b2300 = '\0';
    }
  }
  if (((DAT_005e910c == 2) || (DAT_005e910c == 1)) && (DAT_005f15b0 != 8)) {
    DAT_005e9154 = 1;
  }
  return;
}

