
undefined8 FUN_004442d3(void)

{
  ushort uVar1;
  undefined4 in_EAX;
  ushort uVar2;
  undefined4 in_EDX;
  byte *pbVar3;
  undefined1 *puVar4;
  
  pbVar3 = &DAT_00887420;
  uVar2 = 0;
  do {
    if ((*pbVar3 != 0xff) && ((&DAT_005f5e88)[(uint)*pbVar3 * 4] != 0xff)) {
      uVar2 = uVar2 | 1 << ((byte)(&DAT_005f5e88)[(uint)*pbVar3 * 4] & 0xf);
    }
    pbVar3 = pbVar3 + 0x260;
  } while (pbVar3 < &DAT_008ad1c0);
  uVar2 = uVar2 & 0xa3e0;
  puVar4 = &DAT_00630980;
  while( true ) {
    uVar1 = 0;
    if (uVar2 != 0) {
      for (; (uVar2 >> uVar1 & 1) == 0; uVar1 = uVar1 + 1) {
      }
    }
    if (uVar2 == 0) break;
    *puVar4 = (char)uVar1;
    puVar4 = puVar4 + 1;
    uVar2 = uVar2 & ~(1 << (uVar1 & 0xf));
  }
  *puVar4 = 0xff;
  return CONCAT44(in_EDX,in_EAX);
}

