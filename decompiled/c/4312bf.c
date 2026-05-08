
undefined4 FUN_004312bf(void)

{
  byte *pbVar1;
  undefined4 in_EAX;
  int *piVar2;
  
  DAT_005f96bc = 0;
  for (piVar2 = &DAT_0087ccd0; *piVar2 != -1; piVar2 = (int *)((int)piVar2 + 5)) {
  }
  while (*(int *)((int)piVar2 + 5) != -2) {
    pbVar1 = (byte *)((int)&DAT_005f96bc + ((int)(short)(ushort)*(byte *)((int)piVar2 + 9) >> 3));
    *pbVar1 = *pbVar1 | '\x01' << (*(byte *)((int)piVar2 + 9) & 7);
    piVar2 = (int *)((int)piVar2 + 5);
  }
  return in_EAX;
}

