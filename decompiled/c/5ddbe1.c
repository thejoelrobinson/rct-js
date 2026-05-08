
void FUN_005ddbe1(void)

{
  byte in_AL;
  byte bVar1;
  byte in_AH;
  char cVar2;
  char *pcVar3;
  uint uVar4;
  
  uVar4 = (uint)in_AL;
  bVar1 = 1;
  pcVar3 = &DAT_0065ea78;
  do {
    cVar2 = (&DAT_005f6b10)[uVar4 * 4];
    if (bVar1 == in_AH) {
      if ((&DAT_005f6b13)[uVar4 * 4] != -1) {
        cVar2 = (&DAT_005f6b13)[uVar4 * 4];
      }
    }
    if (bVar1 == 1) {
      if ((&DAT_005f6b11)[uVar4 * 4] != -1) {
        cVar2 = (&DAT_005f6b11)[uVar4 * 4];
      }
    }
    if (bVar1 == 2) {
      if ((&DAT_005f6b12)[uVar4 * 4] != -1) {
        cVar2 = (&DAT_005f6b12)[uVar4 * 4];
      }
    }
    *pcVar3 = cVar2;
    pcVar3 = pcVar3 + 1;
    bVar1 = bVar1 + 1;
  } while (bVar1 <= in_AH);
  *pcVar3 = -1;
  return;
}

