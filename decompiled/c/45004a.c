
undefined8 FUN_0045004a(void)

{
  undefined4 in_EAX;
  uint in_EDX;
  uint uVar1;
  uint uVar2;
  
  uVar2 = in_EDX & 0xff;
  if ((*(uint *)(&DAT_005f5b78 + (uint)(byte)(&DAT_00887420)[uVar2 * 0x260] * 8) & 0x20000) == 0) {
    uVar1 = 0;
    do {
      if ((&DAT_0088744a)[uVar2 * 0x130 + uVar1] != -1) {
        if ((&DAT_00887462)[uVar2 * 0x130 + uVar1] == -1) {
          DAT_00991efc = 0x4af;
          return CONCAT44(in_EDX,in_EAX);
        }
        if ((&DAT_0088746a)[uVar2 * 0x130 + uVar1] == -1) {
          DAT_00991efc = 0x4b0;
          return CONCAT44(in_EDX,in_EAX);
        }
      }
      uVar1 = uVar1 + 1;
    } while (uVar1 < 4);
  }
  return CONCAT44(in_EDX,in_EAX);
}

