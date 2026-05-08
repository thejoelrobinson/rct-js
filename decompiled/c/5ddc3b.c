
undefined8 FUN_005ddc3b(void)

{
  byte *pbVar1;
  byte bVar2;
  undefined4 in_EAX;
  int iVar3;
  int extraout_ECX;
  undefined4 in_EDX;
  char *pcVar4;
  char *unaff_ESI;
  uint uVar5;
  
  pbVar1 = (&PTR_DAT_005f6cb8)[(byte)unaff_ESI[1]];
  if (*pbVar1 == 0xff) {
    unaff_ESI[5] = '\x01';
    uVar5 = 0;
    do {
      *(undefined2 *)(unaff_ESI + uVar5 * 2 + 6) = *(undefined2 *)(pbVar1 + uVar5 * 2 + 1);
      uVar5 = uVar5 + 1;
    } while (uVar5 < 0xc);
    return CONCAT44(in_EDX,in_EAX);
  }
  unaff_ESI[5] = '\0';
  iVar3 = 200;
  while (iVar3 != 1) {
    bVar2 = FUN_005df40c();
    uVar5 = (uint)(ushort)(((ushort)((ushort)bVar2 * (ushort)*pbVar1) >> 8) * 2);
    pcVar4 = &DAT_00887420;
    while ((((*pcVar4 == -1 || (pcVar4 == unaff_ESI)) || (unaff_ESI[1] != pcVar4[1])) ||
           (iVar3 = extraout_ECX, *(short *)(pbVar1 + uVar5 + 1) != *(short *)(pcVar4 + 6)))) {
      pcVar4 = pcVar4 + 0x260;
      if ((char *)0x8ad1bf < pcVar4) goto LAB_005ddc9b;
    }
  }
  uVar5 = 0;
LAB_005ddc9b:
  *(undefined2 *)(unaff_ESI + 6) = *(undefined2 *)(pbVar1 + uVar5 + 1);
  return CONCAT44(in_EDX,in_EAX);
}

