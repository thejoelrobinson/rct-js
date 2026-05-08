
undefined8 FUN_005e6a55(void)

{
  byte bVar1;
  undefined4 in_EAX;
  undefined4 in_EDX;
  byte *pbVar2;
  byte *pbVar3;
  
  pbVar2 = &DAT_009a0018;
  pbVar3 = &DAT_009a0018;
  while( true ) {
    bVar1 = *pbVar2;
    *pbVar3 = bVar1;
    if (bVar1 == 0) break;
    if ((0x1f < bVar1) &&
       ((((bVar1 < 0x7b || (bVar1 == 0xa3)) || (bVar1 == 0xab)) ||
        ((bVar1 == 0xbb || (0xbe < bVar1)))))) {
      pbVar3 = pbVar3 + 1;
    }
    pbVar2 = pbVar2 + 1;
  }
  return CONCAT44(in_EDX,in_EAX);
}

