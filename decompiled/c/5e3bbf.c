
short FUN_005e3bbf(void)

{
  short in_AX;
  short in_CX;
  short in_DX;
  short unaff_BX;
  undefined *puVar1;
  
  if ((((-1 < in_DX) && (0x1d < in_AX)) && ((short)(in_DX + unaff_BX) <= DAT_00971ed6)) &&
     ((short)(in_AX + in_CX) <= DAT_00971ed8)) {
    puVar1 = &DAT_009a013c;
    while( true ) {
      if (DAT_009a1164 <= puVar1) {
        return in_AX;
      }
      if ((((*(ushort *)(puVar1 + 0x32) & 1) == 0) &&
          (*(short *)(puVar1 + 0x20) < (short)(in_DX + unaff_BX))) &&
         ((in_DX < (short)(*(short *)(puVar1 + 0x20) + *(short *)(puVar1 + 0x24)) &&
          ((*(short *)(puVar1 + 0x22) < (short)(in_AX + in_CX) &&
           (in_AX < (short)(*(short *)(puVar1 + 0x22) + *(short *)(puVar1 + 0x26)))))))) break;
      puVar1 = puVar1 + 0x178;
    }
  }
  return in_AX;
}

