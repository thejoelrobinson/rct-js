
void FUN_005e12eb(void)

{
  short in_AX;
  short in_DX;
  short unaff_BX;
  uint uVar1;
  short unaff_BP;
  undefined *puVar2;
  
  FUN_009bb355();
  DAT_0099fb94 = in_DX - in_AX;
  DAT_0099fb98 = -((DAT_0099fb94 - DAT_0099fb84) - DAT_0099fb88);
  DAT_0099fb96 = unaff_BP - unaff_BX;
  uVar1 = (uint)unaff_BX;
  DAT_0099fb8c = DAT_0099fb7c + in_AX + (ushort)(DAT_0099fb84 + DAT_0099fb88) * uVar1;
  DAT_0099fb90 = in_AX;
  DAT_0099fb92 = unaff_BX;
  for (puVar2 = &DAT_009a013c; puVar2 < DAT_009a1164; puVar2 = puVar2 + 0x178) {
    if (((((*(ushort *)(puVar2 + 0x32) & 0x10) == 0) && (*(short *)(puVar2 + 0x20) < in_DX)) &&
        (*(short *)(puVar2 + 0x22) < unaff_BP)) &&
       ((in_AX < (short)(*(short *)(puVar2 + 0x20) + *(short *)(puVar2 + 0x24)) &&
        ((short)uVar1 < (short)(*(short *)(puVar2 + 0x22) + *(short *)(puVar2 + 0x26)))))) {
      FUN_005e13d2();
      uVar1 = uVar1 & 0xffff;
    }
  }
  return;
}

