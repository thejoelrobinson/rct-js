
undefined4 FUN_0040f923(void)

{
  undefined4 uVar1;
  int local_8;
  
  DAT_005e916c = FUN_00405b58();
  if (DAT_005e916c == 0) {
    uVar1 = 0;
  }
  else {
    if (0 < DAT_005f12b4) {
      FUN_00413c90(&DAT_005ec100,s_C__gsk_DibSect_c_005ec0ec,799);
    }
    for (local_8 = 0; local_8 < 0x100; local_8 = local_8 + 1) {
      (&DAT_005ef6a8)[local_8 * 4] = (undefined1)local_8;
      (&DAT_005ef6a9)[local_8 * 4] = (&DAT_005ef6a8)[local_8 * 4];
      (&DAT_005ef6aa)[local_8 * 4] = (&DAT_005ef6a9)[local_8 * 4];
      (&DAT_005ef6ab)[local_8 * 4] = 0;
    }
    DAT_005ec0d8 = FUN_0040f2f4(&DAT_005ef6a8,0x100,&DAT_005efaa8);
    if (DAT_005ec0d8 == 0) {
      uVar1 = 0;
    }
    else {
      DAT_005ebe50 = FUN_0041069d;
      DAT_005ebe54 = FUN_0040fb35;
      DAT_005ebe58 = FUN_0040fb47;
      DAT_005ebe5c = FUN_0040fb7c;
      DAT_005ebe60 = FUN_0040fbbe;
      DAT_005ebe70 = FUN_0040fd6c;
      DAT_005ebe68 = FUN_0040fd4f;
      DAT_005ebe6c = FUN_0040fbdd;
      DAT_005ebe64 = FUN_0040fbd2;
      DAT_005ebe74 = FUN_0040fd77;
      DAT_005ebe78 = FUN_0040fd82;
      DAT_005ebe7c = FUN_0040fe8d;
      DAT_005ebe80 = FUN_0040ff69;
      DAT_005ebe84 = FUN_0040ff74;
      DAT_005ebe88 = FUN_0040ff7f;
      DAT_005ebe8c = FUN_0040ff8a;
      DAT_005ebe90 = FUN_00410063;
      DAT_005ebe94 = FUN_004100f9;
      DAT_005ebe98 = FUN_0041023e;
      DAT_005ebe9c = FUN_00410250;
      DAT_005ebea0 = FUN_00410390;
      DAT_005ebea4 = FUN_0041041a;
      DAT_005ebea8 = FUN_0041051e;
      DAT_005ebeac = FUN_0041058e;
      DAT_005ebeb0 = FUN_00410606;
      DAT_005ebeb4 = FUN_00410618;
      DAT_005ebeb8 = FUN_0041068b;
      DAT_005e91cc = FUN_004103a2;
      uVar1 = 1;
    }
  }
  return uVar1;
}

