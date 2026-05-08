
void FUN_005e5ca6(void)

{
  byte bVar1;
  uint in_EAX;
  uint extraout_ECX;
  ushort uVar2;
  uint uVar3;
  int unaff_ESI;
  
  if (in_EAX != *(uint *)(unaff_ESI + 0x10)) {
    LOCK();
    uVar3 = *(uint *)(unaff_ESI + 0x10);
    *(uint *)(unaff_ESI + 0x10) = in_EAX;
    UNLOCK();
    bVar1 = 0;
    do {
      uVar2 = CONCAT11((char)in_EAX,(char)uVar3) & 0x101;
      if ((char)uVar2 != (char)(uVar2 >> 8)) {
        FUN_005e5301();
        in_EAX = extraout_ECX;
      }
      uVar3 = uVar3 >> 1;
      in_EAX = in_EAX >> 1;
      bVar1 = bVar1 + 1;
    } while (bVar1 < 0x20);
  }
  return;
}

