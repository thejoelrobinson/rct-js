
uint FUN_00451f42(void)

{
  byte *pbVar1;
  byte bVar2;
  byte bVar3;
  ushort uVar4;
  undefined4 in_EAX;
  uint uVar5;
  ushort uVar6;
  ushort uVar7;
  int unaff_EBX;
  uint uVar8;
  int unaff_ESI;
  byte *pbVar9;
  undefined1 *puVar10;
  
  uVar6 = (ushort)(byte)((uint)in_EAX >> 8);
  uVar4 = (ushort)(byte)in_EAX * 0x20;
  uVar7 = uVar6 * 0x20;
  bVar2 = *(byte *)(unaff_EBX + 0x32 + unaff_ESI);
  pbVar9 = (byte *)(&DAT_00971ef4)
                   [(ushort)((ushort)(uVar6 << 0xc | uVar4) >> 5 | (uVar7 >> 9) << 0xb)];
  while (((*pbVar9 & 0x3c) != 0x10 || (bVar2 != pbVar9[2]))) {
    pbVar1 = pbVar9 + 1;
    pbVar9 = pbVar9 + 8;
    if ((*pbVar1 & 0x80) != 0) {
      return (uint)uVar4;
    }
  }
  uVar8 = *pbVar9 & 3;
  uVar5 = (uint)(ushort)(uVar4 - (&DAT_00652478)[uVar8 * 2]);
  uVar7 = uVar7 - (&DAT_0065247a)[uVar8 * 2];
  uVar4 = uVar7 * 0x80 | uVar7 >> 9 | uVar4 - (&DAT_00652478)[uVar8 * 2];
  puVar10 = (undefined1 *)(&DAT_00971ef4)[(ushort)(uVar4 >> 5 | uVar4 << 0xb)];
  do {
    uVar5 = CONCAT31((int3)(uVar5 >> 8),*puVar10) & 0xffffff3c;
    if ((char)uVar5 == '\x04') {
      if ((puVar10[4] & 4) == 0) {
        bVar3 = puVar10[2];
      }
      else {
        uVar5 = CONCAT31((int3)(uVar5 >> 8),puVar10[4]) & 0xffffff03;
        if ((char)uVar5 == (char)uVar8) {
          bVar3 = puVar10[2] + 4;
          uVar5 = CONCAT31((int3)(uVar5 >> 8),bVar3);
        }
        else {
          uVar5 = uVar5 ^ 2;
          if ((char)uVar5 != (char)uVar8) goto LAB_00451fe5;
          bVar3 = puVar10[2];
        }
      }
      if (bVar3 == bVar2) {
        return uVar5;
      }
    }
LAB_00451fe5:
    pbVar9 = puVar10 + 1;
    puVar10 = puVar10 + 8;
    if ((*pbVar9 & 0x80) != 0) {
      return uVar5;
    }
  } while( true );
}

