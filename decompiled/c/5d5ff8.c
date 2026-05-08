
undefined8 FUN_005d5ff8(void)

{
  char cVar1;
  uint uVar2;
  undefined4 in_EAX;
  HWND__ *pHVar3;
  uint uVar4;
  HWND__ *pHVar5;
  uint in_EDX;
  char *pcVar6;
  char *pcVar7;
  char *pcVar8;
  char *pcVar9;
  bool bVar10;
  char local_24;
  
  pHVar3 = (HWND__ *)FUN_0040844b(&DAT_005f90c5,&DAT_0065d900);
  pcVar6 = &DAT_00658aae;
  if (pHVar3 != (HWND__ *)0xffffffff) {
LAB_005d6021:
    DAT_005f9427 = pHVar3;
    pcVar7 = &DAT_005f90c5;
    pcVar8 = &DAT_0099aa88;
    do {
      pcVar9 = pcVar8;
      cVar1 = *pcVar7;
      *pcVar9 = cVar1;
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar9 + 1;
    } while (cVar1 != '*');
    pcVar8 = &DAT_0065d92c;
    do {
      cVar1 = *pcVar8;
      *pcVar9 = cVar1;
      pcVar8 = pcVar8 + 1;
      pcVar9 = pcVar9 + 1;
      bVar10 = false;
    } while (cVar1 != '\0');
    FUN_0042fc2c();
    if (!bVar10) {
      local_24 = (char)in_EDX;
      uVar4 = DAT_00656b36;
      if (local_24 == DAT_00656b34) {
        do {
          uVar2 = 0;
          if (uVar4 != 0) {
            for (; (uVar4 >> uVar2 & 1) == 0; uVar2 = uVar2 + 1) {
            }
          }
          if (uVar4 == 0) {
            if (((byte)(&DAT_0087c3fc)
                       [((int)(DAT_00656b35 & 0x1f) >> 3) + (uint)(DAT_00656b35 >> 5) * 4] >>
                 (DAT_00656b35 & 7) & 1) != 0) {
              pcVar7 = &DAT_0065d92c;
              uVar4 = 0;
              pcVar8 = pcVar6;
              goto LAB_005d6095;
            }
            break;
          }
          uVar4 = uVar4 & ~(1 << (uVar2 & 0x1f));
        } while ((*(byte *)((int)&DAT_0087c41c + ((int)uVar2 >> 3) + (in_EDX & 0xff) * 4) >>
                  (uVar2 & 7) & 1) != 0);
      }
    }
    goto LAB_005d60c6;
  }
LAB_005d60f4:
  *pcVar6 = '\0';
  return CONCAT44(in_EDX,in_EAX);
  while (cVar1 != '\0') {
LAB_005d6095:
    cVar1 = *pcVar7;
    *pcVar8 = cVar1;
    uVar4 = uVar4 + 1;
    pcVar7 = pcVar7 + 1;
    pcVar8 = pcVar8 + 1;
    if (0x27 < uVar4) break;
  }
  if (0x28 < uVar4) {
    pcVar7 = &DAT_0065da30;
    pcVar8 = pcVar6;
    do {
      cVar1 = *pcVar7;
      *pcVar8 = cVar1;
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    } while (cVar1 != '\0');
  }
  pcVar6 = pcVar6 + 0x28;
  if ((char *)0x65d8cd < pcVar6) goto LAB_005d60f4;
LAB_005d60c6:
  pHVar5 = GetNextWindow(DAT_005f9427,0x65d900);
  pHVar3 = DAT_005f9427;
  if (pHVar5 != (HWND__ *)0x1) goto code_r0x005d60e4;
  goto LAB_005d6021;
code_r0x005d60e4:
  FUN_00408490(DAT_005f9427);
  goto LAB_005d60f4;
}

