
undefined8 FUN_0044294c(void)

{
  short sVar1;
  undefined4 in_EAX;
  undefined4 in_EDX;
  bool bVar2;
  
  bVar2 = DAT_0099a4f6 < 0x8000;
  if (DAT_0099a4f6 == 0x8000) {
    FUN_005e68e2();
    if (bVar2) goto LAB_004429a6;
    sVar1 = FUN_0043424f();
    if (sVar1 == -0x8000) goto LAB_004429a6;
    FUN_00423677();
  }
  FUN_0042de29();
LAB_004429a6:
  return CONCAT44(in_EDX,in_EAX);
}

