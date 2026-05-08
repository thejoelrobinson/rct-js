
undefined8 FUN_004500ad(void)

{
  ushort uVar1;
  undefined4 in_EAX;
  byte bVar3;
  uint in_EDX;
  uint uVar2;
  ushort uVar4;
  undefined1 *puVar5;
  
  uVar2 = 0;
  do {
    uVar1 = (&DAT_00887462)[(in_EDX & 0xff) * 0x130 + (uVar2 >> 8)];
    if (uVar1 != 0xffff) {
      uVar4 = (ushort)(byte)(&DAT_00887452)[(in_EDX & 0xff) * 0x260 + (uVar2 >> 8)];
      for (puVar5 = (undefined1 *)
                    (&DAT_00971ef4)
                    [(ushort)((ushort)((uVar1 >> 8) << 0xc | (uVar1 & 0xff) << 5) >> 5 |
                             ((ushort)((uVar1 >> 8) << 5) >> 9) << 0xb)];
          (uVar4 = CONCAT11(*puVar5,(char)uVar4) & 0x3cff, (char)(uVar4 >> 8) != '\x10' ||
          ((char)uVar4 != puVar5[2])); puVar5 = puVar5 + 8) {
      }
      FUN_00448a45();
    }
    bVar3 = (char)(uVar2 >> 8) + 1;
    uVar2 = (uint)bVar3 << 8;
  } while (bVar3 < 4);
  return CONCAT44(in_EDX,in_EAX);
}

