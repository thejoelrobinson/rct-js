
void FUN_005e06cc(void)

{
  ushort uVar1;
  ushort uVar2;
  
  uVar1 = 0x20;
  uVar2 = 0x20;
  do {
    do {
      if (*(byte *)((&DAT_00971ef4)
                    [(ushort)((ushort)(uVar2 << 7 | uVar2 >> 9 | uVar1) >> 5 | (uVar2 >> 9) << 0xb)]
                   + 2) < 0x18) {
        *(undefined1 *)
         ((&DAT_00971ef4)
          [(ushort)((ushort)(uVar2 << 7 | uVar2 >> 9 | uVar1) >> 5 | (uVar2 >> 9) << 0xb)] + 5) = 6;
      }
      uVar1 = uVar1 + 0x20;
    } while (uVar1 < 0xfe0);
    uVar1 = 0x20;
    uVar2 = uVar2 + 0x20;
  } while (uVar2 < 0xfe0);
  return;
}

