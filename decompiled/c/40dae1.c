
int FUN_0040dae1(void)

{
  int iVar1;
  
  DAT_005f0394 = 0;
  iVar1 = DirectSoundEnumerateA(FUN_0040da50,0);
  if (iVar1 == 0) {
    iVar1 = DAT_005f0394;
  }
  return iVar1;
}

