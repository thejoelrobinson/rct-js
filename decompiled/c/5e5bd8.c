
void FUN_005e5bd8(void)

{
  undefined4 in_ECX;
  uint uVar1;
  undefined2 *unaff_ESI;
  undefined2 *puVar2;
  
  if (unaff_ESI != (undefined2 *)0x0) {
    (**(code **)(unaff_ESI + 2))
              (CONCAT22((short)CONCAT31((int3)((uint)in_ECX >> 8),*(undefined1 *)(unaff_ESI + 0xba))
                        ,unaff_ESI[0x18]));
    FUN_005e3b2b();
    LOCK();
    puVar2 = *(undefined2 **)(unaff_ESI + 4);
    *(undefined4 *)(unaff_ESI + 4) = 0;
    UNLOCK();
    if (puVar2 != (undefined2 *)0x0) {
      *puVar2 = 0;
    }
    FUN_005e43de();
    DAT_009a1164 = DAT_009a1164 + -0x178;
    if (DAT_009a1164 - (int)unaff_ESI != 0 && (int)unaff_ESI <= DAT_009a1164) {
      uVar1 = (uint)(DAT_009a1164 - (int)unaff_ESI) >> 1;
      puVar2 = unaff_ESI + 0xbc;
      for (; uVar1 != 0; uVar1 = uVar1 - 1) {
        *unaff_ESI = *puVar2;
        puVar2 = puVar2 + 1;
        unaff_ESI = unaff_ESI + 1;
      }
    }
    FUN_005e6a83();
  }
  return;
}

