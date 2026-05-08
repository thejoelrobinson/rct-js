
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined8 FUN_0042c711(void)

{
  undefined4 in_EAX;
  undefined4 uVar1;
  undefined4 in_ECX;
  undefined4 extraout_ECX;
  undefined4 in_EDX;
  uint uVar2;
  char *pcVar3;
  
  uVar1 = in_EAX;
  do {
    pcVar3 = &DAT_008d7eb8;
    do {
      if (*pcVar3 == '\0') {
        *pcVar3 = (char)uVar1;
        *(undefined4 *)(pcVar3 + 2) = in_ECX;
        pcVar3[6] = '\0';
        pcVar3[7] = '\0';
        pcVar3[1] = '\0';
        pcVar3[0x10c] = '\0';
        FUN_00458bcf();
        uVar1 = ram0x0099aa8c;
        *(undefined4 *)(pcVar3 + 0xc) = _DAT_0099aa88;
        *(undefined4 *)(pcVar3 + 0x10) = uVar1;
        uVar1 = DAT_0099aa94;
        *(undefined4 *)(pcVar3 + 0x14) = DAT_0099aa90;
        *(undefined4 *)(pcVar3 + 0x18) = uVar1;
        uVar1 = DAT_0099aa9c;
        *(undefined4 *)(pcVar3 + 0x1c) = DAT_0099aa98;
        *(undefined4 *)(pcVar3 + 0x20) = uVar1;
        uVar1 = DAT_0099aaa4;
        *(undefined4 *)(pcVar3 + 0x24) = DAT_0099aaa0;
        *(undefined4 *)(pcVar3 + 0x28) = uVar1;
        uVar1 = DAT_0099aaac;
        *(undefined4 *)(pcVar3 + 0x2c) = DAT_0099aaa8;
        *(undefined4 *)(pcVar3 + 0x30) = uVar1;
        uVar1 = DAT_0099aab4;
        *(undefined4 *)(pcVar3 + 0x34) = DAT_0099aab0;
        *(undefined4 *)(pcVar3 + 0x38) = uVar1;
        uVar1 = DAT_0099aabc;
        *(undefined4 *)(pcVar3 + 0x3c) = DAT_0099aab8;
        *(undefined4 *)(pcVar3 + 0x40) = uVar1;
        uVar1 = DAT_0099aac4;
        *(undefined4 *)(pcVar3 + 0x44) = DAT_0099aac0;
        *(undefined4 *)(pcVar3 + 0x48) = uVar1;
        uVar1 = DAT_0099aacc;
        *(undefined4 *)(pcVar3 + 0x4c) = DAT_0099aac8;
        *(undefined4 *)(pcVar3 + 0x50) = uVar1;
        uVar1 = DAT_0099aad4;
        *(undefined4 *)(pcVar3 + 0x54) = DAT_0099aad0;
        *(undefined4 *)(pcVar3 + 0x58) = uVar1;
        uVar1 = DAT_0099aadc;
        *(undefined4 *)(pcVar3 + 0x5c) = DAT_0099aad8;
        *(undefined4 *)(pcVar3 + 0x60) = uVar1;
        uVar1 = DAT_0099aae4;
        *(undefined4 *)(pcVar3 + 100) = DAT_0099aae0;
        *(undefined4 *)(pcVar3 + 0x68) = uVar1;
        uVar1 = DAT_0099aaec;
        *(undefined4 *)(pcVar3 + 0x6c) = DAT_0099aae8;
        *(undefined4 *)(pcVar3 + 0x70) = uVar1;
        uVar1 = DAT_0099aaf4;
        *(undefined4 *)(pcVar3 + 0x74) = DAT_0099aaf0;
        *(undefined4 *)(pcVar3 + 0x78) = uVar1;
        uVar1 = DAT_0099aafc;
        *(undefined4 *)(pcVar3 + 0x7c) = DAT_0099aaf8;
        *(undefined4 *)(pcVar3 + 0x80) = uVar1;
        uVar1 = DAT_0099ab04;
        *(undefined4 *)(pcVar3 + 0x84) = DAT_0099ab00;
        *(undefined4 *)(pcVar3 + 0x88) = uVar1;
        uVar1 = DAT_0099ab0c;
        *(undefined4 *)(pcVar3 + 0x8c) = DAT_0099ab08;
        *(undefined4 *)(pcVar3 + 0x90) = uVar1;
        uVar1 = DAT_0099ab14;
        *(undefined4 *)(pcVar3 + 0x94) = DAT_0099ab10;
        *(undefined4 *)(pcVar3 + 0x98) = uVar1;
        uVar1 = DAT_0099ab1c;
        *(undefined4 *)(pcVar3 + 0x9c) = DAT_0099ab18;
        *(undefined4 *)(pcVar3 + 0xa0) = uVar1;
        uVar1 = DAT_0099ab24;
        *(undefined4 *)(pcVar3 + 0xa4) = DAT_0099ab20;
        *(undefined4 *)(pcVar3 + 0xa8) = uVar1;
        uVar1 = DAT_0099ab2c;
        *(undefined4 *)(pcVar3 + 0xac) = DAT_0099ab28;
        *(undefined4 *)(pcVar3 + 0xb0) = uVar1;
        uVar1 = DAT_0099ab34;
        *(undefined4 *)(pcVar3 + 0xb4) = DAT_0099ab30;
        *(undefined4 *)(pcVar3 + 0xb8) = uVar1;
        uVar1 = DAT_0099ab3c;
        *(undefined4 *)(pcVar3 + 0xbc) = DAT_0099ab38;
        *(undefined4 *)(pcVar3 + 0xc0) = uVar1;
        uVar1 = DAT_0099ab44;
        *(undefined4 *)(pcVar3 + 0xc4) = DAT_0099ab40;
        *(undefined4 *)(pcVar3 + 200) = uVar1;
        uVar1 = DAT_0099ab4c;
        *(undefined4 *)(pcVar3 + 0xcc) = DAT_0099ab48;
        *(undefined4 *)(pcVar3 + 0xd0) = uVar1;
        uVar1 = DAT_0099ab54;
        *(undefined4 *)(pcVar3 + 0xd4) = DAT_0099ab50;
        *(undefined4 *)(pcVar3 + 0xd8) = uVar1;
        uVar1 = DAT_0099ab5c;
        *(undefined4 *)(pcVar3 + 0xdc) = DAT_0099ab58;
        *(undefined4 *)(pcVar3 + 0xe0) = uVar1;
        uVar1 = DAT_0099ab64;
        *(undefined4 *)(pcVar3 + 0xe4) = DAT_0099ab60;
        *(undefined4 *)(pcVar3 + 0xe8) = uVar1;
        uVar1 = DAT_0099ab6c;
        *(undefined4 *)(pcVar3 + 0xec) = DAT_0099ab68;
        *(undefined4 *)(pcVar3 + 0xf0) = uVar1;
        uVar1 = DAT_0099ab74;
        *(undefined4 *)(pcVar3 + 0xf4) = DAT_0099ab70;
        *(undefined4 *)(pcVar3 + 0xf8) = uVar1;
        uVar1 = DAT_0099ab7c;
        *(undefined4 *)(pcVar3 + 0xfc) = DAT_0099ab78;
        *(undefined4 *)(pcVar3 + 0x100) = uVar1;
        uVar1 = DAT_0099ab84;
        *(undefined4 *)(pcVar3 + 0x104) = DAT_0099ab80;
        *(undefined4 *)(pcVar3 + 0x108) = uVar1;
        pcVar3[0x10b] = '\0';
        uVar2 = (uint)DAT_006e3b80;
        *(ushort *)(pcVar3 + 8) = DAT_006e3b80;
        pcVar3[10] = (char)((uint)DAT_006e3b82 * (uint)*(ushort *)(&DAT_0064bc60 + (uVar2 & 7) * 2)
                           >> 0x10) + '\x01';
        return CONCAT44(in_EDX,in_EAX);
      }
      pcVar3 = pcVar3 + 0x10c;
    } while (pcVar3 < &DAT_008d8930);
    uVar1 = FUN_0042cb29();
    in_ECX = extraout_ECX;
  } while( true );
}

