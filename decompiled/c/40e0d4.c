
undefined4 FUN_0040e0d4(void)

{
  undefined4 uVar1;
  int local_8;
  
  DAT_005e916c = FUN_00405b58();
  if (DAT_005e916c == 0) {
    uVar1 = 0;
  }
  else {
    if (0 < DAT_005f12b4) {
      FUN_00413c90(&DAT_005ec0a0,s_C__gsk_DibGfx_c_005ec090,0x2cf);
    }
    for (local_8 = 0; local_8 < 0x100; local_8 = local_8 + 1) {
      (&DAT_005eee98)[local_8 * 4] = (undefined1)local_8;
      (&DAT_005eee99)[local_8 * 4] = (&DAT_005eee98)[local_8 * 4];
      (&DAT_005eee9a)[local_8 * 4] = (&DAT_005eee99)[local_8 * 4];
      (&DAT_005eee9b)[local_8 * 4] = 0;
    }
    DAT_005ec07c = FUN_0040f2f4(&DAT_005eee98,0x100,&DAT_005ef2a0);
    if (DAT_005ec07c == 0) {
      uVar1 = 0;
    }
    else {
      DAT_005ebe50 = FUN_0040f14c;
      DAT_005ebe54 = FUN_0040e2e6;
      DAT_005ebe58 = FUN_0040e2f8;
      DAT_005ebe5c = FUN_0040e32d;
      DAT_005ebe60 = FUN_0040e36f;
      DAT_005ebe70 = FUN_0040e51d;
      DAT_005ebe68 = FUN_0040e500;
      DAT_005ebe6c = FUN_0040e38e;
      DAT_005ebe64 = FUN_0040e383;
      DAT_005ebe74 = FUN_0040e528;
      DAT_005ebe78 = FUN_0040e533;
      DAT_005ebe7c = FUN_0040e63e;
      DAT_005ebe80 = FUN_0040e71a;
      DAT_005ebe84 = FUN_0040e725;
      DAT_005ebe88 = FUN_0040e730;
      DAT_005ebe8c = FUN_0040e73b;
      DAT_005ebe90 = FUN_0040ea49;
      DAT_005ebe94 = FUN_0040eb48;
      DAT_005ebe98 = FUN_0040ecca;
      DAT_005ebe9c = FUN_0040ecdc;
      DAT_005ebea0 = FUN_0040ee0a;
      DAT_005ebea4 = FUN_0040ee94;
      DAT_005ebea8 = FUN_0040ef6e;
      DAT_005ebeac = FUN_0040efca;
      DAT_005ebeb0 = FUN_0040f068;
      DAT_005ebeb4 = FUN_0040f07a;
      DAT_005ebeb8 = FUN_0040f13a;
      DAT_005e91cc = FUN_0040ee1c;
      uVar1 = 1;
    }
  }
  return uVar1;
}

