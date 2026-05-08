
void FUN_0043909f(void)

{
  ushort uVar1;
  char *pcVar2;
  
  uVar1 = FUN_005df40c();
  if (uVar1 < 0x42) {
    pcVar2 = &DAT_00887420;
    do {
      if (*pcVar2 != -1) {
        FUN_00426f56();
        return;
      }
      pcVar2 = pcVar2 + 0x260;
    } while (pcVar2 < &DAT_008ad1c0);
  }
  return;
}

