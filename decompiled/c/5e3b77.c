
short FUN_005e3b77(void)

{
  short in_AX;
  ushort in_CX;
  short in_DX;
  ushort unaff_BX;
  undefined *puVar1;
  
  if (((((short)-(unaff_BX >> 2) <= in_DX) &&
       (in_DX <= (short)((unaff_BX >> 2) * -2 + DAT_00971ed6))) && (0x1d < in_AX)) &&
     (in_AX <= (short)(DAT_00971ed8 - (in_CX >> 2)))) {
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

