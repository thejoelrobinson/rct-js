
void FUN_00440fe3(void)

{
  uint *puVar1;
  uint uVar2;
  uint in_EAX;
  uint uVar3;
  uint uVar4;
  int unaff_ESI;
  
  if (((&DAT_0062d324)[(in_EAX & 0xff) * 2] != -1) && (0xfd < *(byte *)(unaff_ESI + 0x71))) {
    *(undefined *)(unaff_ESI + 0x71) = (&DAT_0062d324)[(in_EAX & 0xff) * 2];
    *(undefined1 *)(unaff_ESI + 0x72) = 0;
    *(undefined1 *)(unaff_ESI + 0x70) = 0;
    FUN_0043c60b();
    in_EAX = FUN_005e53ca();
  }
  uVar3 = 0;
  do {
    while( true ) {
      if (*(char *)(unaff_ESI + 0xb0 + uVar3 * 4) == -1) goto LAB_00441052;
      uVar4 = uVar3;
      if ((short)in_EAX != *(short *)(unaff_ESI + 0xb0 + uVar3 * 4)) break;
      for (; uVar4 != 4; uVar4 = uVar4 + 1) {
        *(undefined4 *)(unaff_ESI + 0xb0 + uVar4 * 4) =
             *(undefined4 *)(unaff_ESI + 0xb4 + uVar4 * 4);
      }
      *(undefined1 *)(unaff_ESI + 0xc0) = 0xff;
    }
    uVar3 = uVar3 + 1;
  } while (uVar3 < 5);
LAB_00441052:
  uVar4 = 0;
  uVar3 = in_EAX & 0xffff;
  do {
    LOCK();
    puVar1 = (uint *)(unaff_ESI + 0xb0 + uVar4 * 4);
    uVar2 = *puVar1;
    *puVar1 = uVar3;
    UNLOCK();
    uVar4 = uVar4 + 1;
    uVar3 = uVar2;
  } while (uVar4 < 5);
  *(byte *)(unaff_ESI + 0x45) = *(byte *)(unaff_ESI + 0x45) | 1;
  return;
}

