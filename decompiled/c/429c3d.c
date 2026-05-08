
short FUN_00429c3d(void)

{
  ushort uVar1;
  short sVar2;
  char cVar3;
  uint in_ECX;
  char in_DL;
  int iVar4;
  
  if (in_DL == '\x01') {
    if (*(short *)(&DAT_00887448 + in_ECX * 0x260) != -1) {
      sVar2 = FUN_00423677();
      return sVar2;
    }
  }
  else {
    if (in_DL == '\x02') {
      iVar4 = (in_ECX & 0xffff) * 0x100;
      sVar2 = (&DAT_00743ba2)[(in_ECX & 0xffff) * 0x80];
      if (sVar2 == -0x8000) {
        if (((&DAT_00743bbf)[iVar4] != '\x03') && ((&DAT_00743bbf)[iVar4] != '\a')) {
          return -0x8000;
        }
        if (((&DAT_00887422)[(uint)(byte)(&DAT_00743bfc)[iVar4] * 0x130] & 1) == 0) {
          return -0x8000;
        }
        uVar1 = *(ushort *)
                 (&DAT_0088747e +
                 (uint)(byte)(&DAT_00743bfe)[iVar4] * 2 + (uint)(byte)(&DAT_00743bfc)[iVar4] * 0x260
                 );
        cVar3 = (&DAT_00743bff)[iVar4];
        while( true ) {
          if (cVar3 == '\0') break;
          cVar3 = cVar3 + -1;
          uVar1 = *(ushort *)(&DAT_00743bd2 + (uint)uVar1 * 0x100);
        }
        sVar2 = (&DAT_00743ba2)[(uint)uVar1 * 0x80];
      }
      return sVar2;
    }
    if (in_DL == '\x03') {
      return (&DAT_00743ba2)[(in_ECX & 0xffff) * 0x80];
    }
    if (in_DL == '\x05') {
      sVar2 = FUN_00423677();
      return sVar2;
    }
  }
  return -0x8000;
}

