
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined8 FUN_00442079(void)

{
  undefined1 uVar1;
  undefined4 in_EAX;
  int iVar2;
  undefined4 in_EDX;
  undefined2 unaff_BX;
  
  uVar1 = DAT_0062d2ff;
  LOCK();
  DAT_0062d2ff = DAT_0062d2fa;
  UNLOCK();
  FUN_00441ffd();
  DAT_0062d2ff = uVar1;
  iVar2 = CONCAT22((undefined2)DAT_00971e86,unaff_BX);
  if (((short)DAT_0062d2de == -1) && (DAT_0062d2fa == '\x01')) {
    iVar2 = CONCAT22((undefined2)DAT_00971e86,0xffff);
  }
  if ((iVar2 == DAT_0062d2de) && (ram0x00971e88 == DAT_0062d2e2)) {
    return CONCAT44(in_EDX,in_EAX);
  }
  return CONCAT44(in_EDX,in_EAX);
}

