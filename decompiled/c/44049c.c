
undefined8 FUN_0044049c(void)

{
  undefined2 uVar1;
  byte bVar2;
  ushort uVar3;
  ushort uVar4;
  undefined4 in_EAX;
  undefined4 in_EDX;
  byte *pbVar5;
  ushort uVar6;
  int unaff_ESI;
  byte *pbVar7;
  uint uVar8;
  
  DAT_00642fb8 = 0x31;
  uVar6 = *(ushort *)(unaff_ESI + 4);
  uVar3 = *(ushort *)(unaff_ESI + 6);
  uVar4 = uVar6;
  if (uVar3 != 0xffff) {
    (&DAT_00743b98)[(uint)uVar3 * 0x80] = uVar6;
    uVar4 = DAT_0087c398;
  }
  DAT_0087c398 = uVar4;
  if (uVar6 != 0xffff) {
    (&DAT_00743b9a)[(uint)uVar6 * 0x80] = uVar3;
  }
  FUN_00458bcf();
  uVar6 = DAT_0087c398;
  do {
    if (uVar6 == 0xffff) {
      uVar6 = DAT_0087c398;
      if (DAT_0087c398 == 0xffff) {
        DAT_0087c398 = *(undefined2 *)(unaff_ESI + 10);
        *(undefined2 *)(unaff_ESI + 4) = 0xffff;
        *(undefined2 *)(unaff_ESI + 6) = 0xffff;
        DAT_00642fb8 = 0x30;
        return CONCAT44(in_EDX,in_EAX);
      }
      do {
        uVar8 = (uint)uVar6;
        uVar6 = (&DAT_00743b98)[uVar8 * 0x80];
      } while (uVar6 != 0xffff);
      (&DAT_00743b98)[uVar8 * 0x80] = *(undefined2 *)(unaff_ESI + 10);
      *(undefined2 *)(unaff_ESI + 6) = (&DAT_00743b9e)[uVar8 * 0x80];
      *(undefined2 *)(unaff_ESI + 4) = 0xffff;
      DAT_00642fb8 = 0x30;
      return CONCAT44(in_EDX,in_EAX);
    }
    FUN_00458bcf();
    pbVar7 = &DAT_0099a888;
    pbVar5 = &DAT_0099aa88;
    while( true ) {
      bVar2 = *pbVar7;
      if (bVar2 < *pbVar5) {
        LOCK();
        uVar3 = (&DAT_00743b9a)[(uint)uVar6 * 0x80];
        (&DAT_00743b9a)[(uint)uVar6 * 0x80] = *(ushort *)(unaff_ESI + 10);
        UNLOCK();
        *(ushort *)(unaff_ESI + 6) = uVar3;
        if (uVar3 == 0xffff) {
          LOCK();
          UNLOCK();
          uVar6 = *(ushort *)(unaff_ESI + 10);
          *(ushort *)(unaff_ESI + 4) = DAT_0087c398;
          DAT_0087c398 = uVar6;
        }
        else {
          LOCK();
          uVar1 = (&DAT_00743b98)[(uint)uVar3 * 0x80];
          (&DAT_00743b98)[(uint)uVar3 * 0x80] = *(undefined2 *)(unaff_ESI + 10);
          UNLOCK();
          *(undefined2 *)(unaff_ESI + 4) = uVar1;
        }
        DAT_00642fb8 = 0x30;
        return CONCAT44(in_EDX,in_EAX);
      }
      if ((bVar2 != *pbVar5) || (bVar2 == 0)) break;
      pbVar7 = pbVar7 + 1;
      pbVar5 = pbVar5 + 1;
    }
    uVar6 = (&DAT_00743b98)[(uint)uVar6 * 0x80];
  } while( true );
}

