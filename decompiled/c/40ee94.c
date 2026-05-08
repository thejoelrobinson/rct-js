
undefined4 FUN_0040ee94(int param_1,int param_2)

{
  undefined4 uVar1;
  
  if (DAT_005ec080 == (HDC)0x0) {
    if ((*(int *)(param_1 + 0x90) == 0) && (*(int *)(param_2 + 0x90) != 0)) {
      DAT_005ec080 = GetDC(DAT_005e916c);
      if (DAT_005ec080 == (HDC)0x0) {
        uVar1 = 0;
      }
      else {
        DAT_005ec084 = *(undefined4 *)(param_1 + 0x88);
        DAT_005ec088 = *(undefined4 *)(param_1 + 0x84);
        DAT_005ec08c = (int)*(short *)(param_1 + 8);
        DAT_005ef298 = SelectPalette(DAT_005ec080,DAT_005ec07c,0);
        FUN_0040ec7b(param_1,0,0x100,&DAT_005eee98);
        RealizePalette(DAT_005ec080);
        uVar1 = 1;
      }
    }
    else {
      uVar1 = 0;
    }
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}

