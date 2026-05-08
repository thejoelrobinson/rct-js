
void FUN_00444b4a(void)

{
  undefined2 uVar1;
  int iVar2;
  char *pcVar3;
  undefined2 *puVar4;
  uint uVar5;
  
  puVar4 = &DAT_00991f8e;
  for (iVar2 = 0x4001; iVar2 != 0; iVar2 = iVar2 + -1) {
    *puVar4 = 0xffff;
    puVar4 = puVar4 + 1;
  }
  pcVar3 = &DAT_00743b94;
  do {
    if (*pcVar3 != -1) {
      if (*(ushort *)(pcVar3 + 0xe) == 0x8000) {
        uVar5 = 0x4000;
      }
      else {
        uVar5 = (uint)(ushort)((*(ushort *)(pcVar3 + 0xe) & 0xfe0) << 2 |
                              *(ushort *)(pcVar3 + 0x10) >> 5);
      }
      LOCK();
      uVar1 = (&DAT_00991f8e)[uVar5];
      (&DAT_00991f8e)[uVar5] = *(undefined2 *)(pcVar3 + 10);
      UNLOCK();
      *(undefined2 *)(pcVar3 + 2) = uVar1;
    }
    pcVar3 = pcVar3 + 0x100;
  } while (pcVar3 < &DAT_0087c394);
  return;
}

