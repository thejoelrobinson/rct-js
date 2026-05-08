
undefined4 FUN_0040da11(void)

{
  int iVar1;
  undefined4 uVar2;
  
  DAT_005ec06c = 0;
  iVar1 = DirectSoundEnumerateA(FUN_0040d9f4,0);
  uVar2 = DAT_005ec06c;
  if (iVar1 != 0) {
    uVar2 = 0;
  }
  return uVar2;
}

