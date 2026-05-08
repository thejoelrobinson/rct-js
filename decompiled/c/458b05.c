
uint FUN_00458b05(void)

{
  byte bVar1;
  uint uVar2;
  ushort uVar3;
  ushort uVar4;
  uint uVar5;
  uint *unaff_ESI;
  uint *puVar6;
  uint *puVar7;
  ushort unaff_DI;
  
  uVar5 = (uint)DAT_00971e84;
  uVar4 = (ushort)(byte)(&DAT_0099a516)[uVar5] * -3 + unaff_DI;
  uVar3 = 0;
  puVar7 = unaff_ESI;
  while( true ) {
    puVar6 = puVar7;
    bVar1 = (byte)*puVar6;
    puVar7 = (uint *)((int)puVar6 + 1);
    if (bVar1 == 0) {
      return 0;
    }
    uVar2 = (uint)(byte)(bVar1 - 0x20);
    if (0x1f < bVar1) break;
    if (bVar1 < 5) {
      if (bVar1 == 1) {
        uVar3 = (ushort)*(byte *)puVar7;
        puVar7 = (uint *)((int)puVar6 + 2);
      }
      else {
        puVar7 = (uint *)((int)puVar6 + 2);
      }
    }
    else if (bVar1 == 7) {
      uVar5 = 0x1c0;
LAB_00458bba:
      uVar4 = (ushort)(byte)(&DAT_0099a516)[uVar5] * -3 + unaff_DI;
    }
    else {
      if (bVar1 == 8) {
        uVar5 = 0x2a0;
        goto LAB_00458bba;
      }
      if (bVar1 == 9) {
        uVar5 = 0xe0;
        goto LAB_00458bba;
      }
      if (bVar1 == 10) {
        uVar5 = 0;
        goto LAB_00458bba;
      }
      if (0x10 < bVar1) {
        if (bVar1 == 0x17) {
          uVar2 = *puVar7;
          puVar7 = (uint *)((int)puVar6 + 5);
          uVar3 = uVar3 + *(short *)(&DAT_008dc0b8 + (uVar2 & 0x1ffff) * 0x10);
          uVar2 = 0;
LAB_00458b39:
          if (unaff_DI < uVar3) {
            *unaff_ESI = 0x2e2e2e;
            return uVar2;
          }
          if (uVar3 <= uVar4) {
            unaff_ESI = puVar7;
          }
        }
        else {
          puVar7 = (uint *)((int)puVar6 + 3);
          if (0x16 < bVar1) {
            puVar7 = (uint *)((int)puVar6 + 5);
          }
        }
      }
    }
  }
  uVar3 = CONCAT11((char)(uVar3 >> 8) + CARRY1((byte)uVar3,(&DAT_0099a508)[uVar2 + uVar5]),
                   (byte)uVar3 + (&DAT_0099a508)[uVar2 + uVar5]);
  goto LAB_00458b39;
}

