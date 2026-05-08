
undefined8 FUN_004448fb(void)

{
  undefined4 in_EAX;
  undefined4 in_EDX;
  char *pcVar1;
  
  pcVar1 = &DAT_00743b94;
  do {
    if (*pcVar1 != -1) {
      FUN_00444927();
    }
    pcVar1 = pcVar1 + 0x100;
  } while (pcVar1 < &DAT_0087c394);
  return CONCAT44(in_EDX,in_EAX);
}

