
void FUN_009bb4b4(void)

{
  char in_AL;
  char cVar1;
  
  if (in_AL == '\x01') {
LAB_009bb511:
    DAT_005f8d5b = 1;
    cVar1 = FUN_00401220(3);
    if (cVar1 != '\0') goto LAB_009bb526;
  }
  else {
    if (in_AL == '\x02') {
LAB_009bb4fc:
      DAT_005f8d5b = 2;
      cVar1 = FUN_00401220(4);
      if (cVar1 != '\0') goto LAB_009bb526;
      goto LAB_009bb511;
    }
    if (in_AL == '\x03') {
      DAT_005f8d5b = 3;
      cVar1 = FUN_00401220(5);
      if (cVar1 != '\0') goto LAB_009bb526;
      goto LAB_009bb4fc;
    }
  }
  DAT_005f8d5b = 0;
  cVar1 = FUN_00401220(1);
  if (cVar1 == '\0') {
    DAT_005f8d5b = 1;
    FUN_00401220(3);
    return;
  }
LAB_009bb526:
  FUN_0042f3a2();
  return;
}

