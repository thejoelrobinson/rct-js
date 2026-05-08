
undefined8 FUN_005e698a(void)

{
  undefined4 in_EAX;
  undefined4 in_EDX;
  int unaff_ESI;
  undefined1 in_ZF;
  
  FUN_00403abb();
  FUN_005e6a55();
  LOCK();
  DAT_009a0128 = 0xff;
  UNLOCK();
  FUN_005e3b2b();
  if (!(bool)in_ZF) {
    (**(code **)(unaff_ESI + 4))();
  }
  return CONCAT44(in_EDX,in_EAX);
}

