
undefined8 FUN_0042688b(void)

{
  byte *pbVar1;
  undefined4 in_EAX;
  short in_CX;
  undefined4 in_EDX;
  ushort uVar2;
  uint uVar3;
  ushort uVar4;
  byte *unaff_ESI;
  undefined1 *puVar5;
  
  uVar3 = *unaff_ESI & 3;
  uVar4 = (in_CX + (&DAT_0065247a)[uVar3 * 2]) * 0x80 |
          (ushort)(in_CX + (&DAT_0065247a)[uVar3 * 2]) >> 9 |
          (short)in_EAX + (&DAT_00652478)[uVar3 * 2];
  puVar5 = (undefined1 *)(&DAT_00971ef4)[(ushort)(uVar4 >> 5 | uVar4 << 0xb)];
  while( true ) {
    uVar4 = CONCAT11(*puVar5,(char)uVar3) & 0x3cff;
    uVar3 = (uint)uVar4;
    if (((((char)(uVar4 >> 8) == '\b') && (unaff_ESI[7] == puVar5[7])) &&
        (unaff_ESI[2] == puVar5[2])) && (puVar5[4] == 'e')) break;
    pbVar1 = puVar5 + 1;
    puVar5 = puVar5 + 8;
    if ((*pbVar1 & 0x80) != 0) {
LAB_0042693d:
      return CONCAT44(in_EDX,in_EAX);
    }
  }
  uVar2 = (ushort)(byte)((char)uVar4 * '\x04' + 9);
  uVar4 = uVar2 & 0xf;
  puVar5[((int)(short)uVar4 >> 3) + 5] =
       puVar5[((int)(short)uVar4 >> 3) + 5] & ~('\x01' << (uVar2 & 7));
  uVar2 = (ushort)(byte)((char)uVar4 + 3);
  uVar4 = uVar2 & 0xf;
  puVar5[((int)(short)uVar4 >> 3) + 5] =
       puVar5[((int)(short)uVar4 >> 3) + 5] & ~('\x01' << (uVar2 & 7));
  uVar2 = (ushort)(byte)((char)uVar4 - 2);
  uVar4 = uVar2 & 0xf;
  puVar5[((int)(short)uVar4 >> 3) + 5] =
       puVar5[((int)(short)uVar4 >> 3) + 5] & ~('\x01' << (uVar2 & 7));
  uVar2 = (ushort)(byte)((char)uVar4 + 1);
  uVar4 = uVar2 & 0xf;
  puVar5[((int)(short)uVar4 >> 3) + 5] =
       puVar5[((int)(short)uVar4 >> 3) + 5] & ~('\x01' << (uVar2 & 7));
  uVar4 = (ushort)(byte)((char)uVar4 + 4);
  puVar5[((int)(short)(uVar4 & 0xf) >> 3) + 5] =
       puVar5[((int)(short)(uVar4 & 0xf) >> 3) + 5] & ~('\x01' << (uVar4 & 7));
  FUN_005e56d3(puVar5);
  goto LAB_0042693d;
}

