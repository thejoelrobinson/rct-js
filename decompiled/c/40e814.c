
undefined4 FUN_0040e814(undefined4 *param_1,int param_2,int param_3)

{
  int iVar1;
  undefined4 *puVar2;
  undefined4 uVar3;
  uint uVar4;
  HDC hdc;
  HBITMAP pHVar5;
  HPALETTE local_20;
  int local_10;
  
  param_1[0x24] = 0;
  uVar3 = FUN_004133c0(0x428);
  param_1[0x22] = uVar3;
  if (param_1[0x22] == 0) {
    uVar3 = 0;
  }
  else {
    iVar1 = param_1[0x22];
    for (local_10 = 0; local_10 < 0x100; local_10 = local_10 + 1) {
      *(undefined *)(iVar1 + 0x2a + local_10 * 4) = (&DAT_005eee9a)[local_10 * 4];
      *(undefined *)(iVar1 + 0x29 + local_10 * 4) = (&DAT_005eee99)[local_10 * 4];
      *(undefined *)(iVar1 + 0x28 + local_10 * 4) = (&DAT_005eee98)[local_10 * 4];
      *(undefined1 *)(iVar1 + 0x2b + local_10 * 4) = 0;
    }
    puVar2 = (undefined4 *)param_1[0x22];
    uVar4 = param_2 + 3U & 0xfffffffc;
    *puVar2 = 0x28;
    puVar2[1] = param_2;
    puVar2[2] = -param_3;
    *(undefined2 *)(puVar2 + 3) = 1;
    *(undefined2 *)((int)puVar2 + 0xe) = 8;
    puVar2[4] = 0;
    puVar2[5] = uVar4 * param_3;
    puVar2[6] = 0;
    puVar2[7] = 0;
    puVar2[8] = 0x100;
    puVar2[9] = 0x100;
    hdc = CreateCompatibleDC((HDC)0x0);
    if (hdc == (HDC)0x0) {
      uVar3 = 0;
    }
    else {
      if (DAT_005ec07c == (HPALETTE)0x0) {
        local_20 = (HPALETTE)0x0;
      }
      else {
        local_20 = SelectPalette(hdc,DAT_005ec07c,1);
      }
      pHVar5 = CreateDIBSection(hdc,(BITMAPINFO *)param_1[0x22],0,(void **)(param_1 + 0x21),
                                (HANDLE)0x0,0);
      param_1[0x23] = pHVar5;
      if (local_20 != (HPALETTE)0x0) {
        SelectPalette(hdc,local_20,1);
      }
      DeleteDC(hdc);
      if (param_1[0x21] == 0) {
        uVar3 = 0;
      }
      else {
        *(short *)((int)param_1 + 6) = (short)param_2;
        *(short *)(param_1 + 2) = (short)param_3;
        param_1[4] = uVar4;
        *param_1 = param_1[0x21];
        uVar3 = 1;
      }
    }
  }
  return uVar3;
}

