
undefined4 FUN_00408c1c(int param_1)

{
  undefined2 *puVar1;
  
  puVar1 = (undefined2 *)(DAT_005f0954 * 0x12 + DAT_005ebe38);
  *puVar1 = (short)*(undefined4 *)(param_1 + 0xc);
  puVar1[1] = (short)*(undefined4 *)(param_1 + 8);
  *(undefined1 *)(puVar1 + 2) = 2;
  *(undefined1 *)(puVar1 + 7) = *(undefined1 *)(param_1 + 0x18);
  if ((*(byte *)(param_1 + 0x4c) & 0x40) == 0) {
    *(undefined1 *)((int)puVar1 + 5) = 0;
    *(undefined1 *)(puVar1 + 3) = 0;
    puVar1[8] = 0;
  }
  else {
    *(undefined1 *)((int)puVar1 + 5) = 1;
    *(undefined1 *)(puVar1 + 3) = *(undefined1 *)(param_1 + 0x54);
    puVar1[8] = 6;
  }
  if ((*(uint *)(param_1 + 0x4c) & 0x1828) == 0) {
    *(undefined1 *)((int)puVar1 + 7) = 0;
    puVar1[6] = 0;
  }
  else {
    *(undefined1 *)((int)puVar1 + 7) = 1;
    puVar1[6] = (short)(1 << (*(byte *)(puVar1 + 3) & 0x1f));
  }
  puVar1[4] = 0;
  puVar1[5] = 0;
  *(undefined1 *)((int)puVar1 + 0xf) = 1;
  DAT_005f0954 = DAT_005f0954 + 1;
  return 1;
}

