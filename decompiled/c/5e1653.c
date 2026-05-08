
void FUN_005e1653(void)

{
  undefined *puVar1;
  undefined *puVar2;
  
  if (DAT_00971ef0 != '\0') {
    FUN_005e1210();
    for (puVar1 = &DAT_009a013c; puVar1 < DAT_009a1164; puVar1 = puVar1 + 0x178) {
      if (*(int *)(puVar1 + 8) != 0) {
        FUN_005e16f7();
      }
    }
    DAT_0099fe00 = DAT_0099fe00 + DAT_00999f98;
    puVar1 = DAT_009a1164;
    if (999 < DAT_0099fe00) {
      DAT_0099fe00 = 0;
      puVar2 = DAT_009a1164;
      while (puVar1 = DAT_009a1164, (undefined *)0x9a013b < puVar2 + -0x178) {
        (**(code **)(puVar2 + -0x174))();
        puVar2 = puVar2 + -0x178;
      }
    }
    while (puVar2 = puVar1, puVar1 = puVar2 + -0x178, (undefined *)0x9a013b < puVar1) {
      if (((*(ushort *)(puVar2 + -0x146) & 0x600) != 0) &&
         (*(short *)(puVar2 + -0x146) = *(short *)(puVar2 + -0x146) + -0x200,
         (*(ushort *)(puVar2 + -0x146) & 0x600) == 0)) {
        FUN_005e43de();
      }
    }
  }
  return;
}

