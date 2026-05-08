
void FUN_005e6a83(void)

{
  short *psVar1;
  undefined4 *puVar2;
  
  puVar2 = &DAT_009a121c;
  psVar1 = &DAT_009a1168;
  do {
    if (*psVar1 != 0) {
      *puVar2 = psVar1;
      puVar2 = puVar2 + 1;
    }
    psVar1 = psVar1 + 10;
  } while (psVar1 < &DAT_009a121c);
  *puVar2 = 0;
  return;
}

