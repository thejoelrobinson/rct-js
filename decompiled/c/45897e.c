
void FUN_0045897e(void)

{
  byte bVar1;
  uint uVar2;
  uint *puVar3;
  byte bVar4;
  ushort uVar5;
  uint uVar6;
  uint *unaff_ESI;
  uint *puVar7;
  byte *pbVar8;
  ushort unaff_DI;
  
  uVar6 = (uint)DAT_00971e84;
  DAT_00642fc0 = 0;
  do {
    uVar5 = 0;
    DAT_00642fbc = (uint *)0x0;
LAB_0045899d:
    do {
      puVar7 = unaff_ESI;
      bVar4 = (byte)*puVar7;
      unaff_ESI = (uint *)((int)puVar7 + 1);
      if (bVar4 == 0) {
        return;
      }
      if (bVar4 == 0x20) {
        DAT_00642fbc = unaff_ESI;
      }
      puVar3 = unaff_ESI;
      if (bVar4 == 5) goto LAB_004589d8;
      if (bVar4 < 0x20) {
        if (bVar4 < 5) {
          unaff_ESI = (uint *)((int)puVar7 + 2);
          goto LAB_0045899d;
        }
        if (bVar4 == 7) {
          uVar6 = 0x1c0;
          goto LAB_0045899d;
        }
        if (bVar4 == 8) {
          uVar6 = 0x2a0;
          goto LAB_0045899d;
        }
        if (bVar4 == 9) {
          uVar6 = 0xe0;
          goto LAB_0045899d;
        }
        if (bVar4 == 10) {
          uVar6 = 0;
          goto LAB_0045899d;
        }
        if (bVar4 < 0x11) goto LAB_0045899d;
        if (bVar4 != 0x17) {
          unaff_ESI = (uint *)((int)puVar7 + 3);
          if (0x16 < bVar4) {
            unaff_ESI = (uint *)((int)puVar7 + 5);
          }
          goto LAB_0045899d;
        }
        uVar2 = *unaff_ESI;
        unaff_ESI = (uint *)((int)puVar7 + 5);
        uVar5 = uVar5 + *(short *)(&DAT_008dc0b8 + (uVar2 & 0x1ffff) * 0x10);
      }
      else {
        uVar5 = CONCAT11((char)(uVar5 >> 8) +
                         CARRY1((byte)uVar5,(&DAT_0099a508)[(byte)(bVar4 - 0x20) + uVar6]),
                         (byte)uVar5 + (&DAT_0099a508)[(byte)(bVar4 - 0x20) + uVar6]);
      }
    } while (uVar5 <= unaff_DI);
    puVar3 = DAT_00642fbc;
    if (DAT_00642fbc == (uint *)0x0) {
      pbVar8 = (byte *)((int)unaff_ESI + -1);
      bVar4 = 0;
      do {
        LOCK();
        bVar1 = *pbVar8;
        *pbVar8 = bVar4;
        UNLOCK();
        pbVar8 = pbVar8 + 1;
        bVar4 = bVar1;
      } while (bVar1 != 0);
      *pbVar8 = 0;
      DAT_00642fc0 = DAT_00642fc0 + 1;
    }
    else {
LAB_004589d8:
      unaff_ESI = puVar3;
      DAT_00642fc0 = DAT_00642fc0 + 1;
      *(byte *)((int)unaff_ESI + -1) = 0;
    }
  } while( true );
}

