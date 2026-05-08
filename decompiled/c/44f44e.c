
undefined8 FUN_0044f44e(void)

{
  byte *pbVar1;
  byte bVar2;
  undefined4 in_EAX;
  int iVar3;
  int extraout_ECX;
  char extraout_DL;
  uint in_EDX;
  char *pcVar4;
  int unaff_ESI;
  uint uVar5;
  
  *(undefined1 *)(unaff_ESI + 5) = 0;
  pbVar1 = (&PTR_DAT_005f5f4c)[in_EDX & 0xff];
  iVar3 = 200;
  while (iVar3 != 1) {
    bVar2 = FUN_005df40c();
    uVar5 = (uint)(ushort)(((ushort)((ushort)bVar2 * (ushort)*pbVar1) >> 8) * 3);
    pcVar4 = &DAT_00887420;
    while (((extraout_DL != *pcVar4 || (*(short *)(pbVar1 + uVar5 + 1) != *(short *)(pcVar4 + 0x1e))
            ) || (iVar3 = extraout_ECX, pbVar1[uVar5 + 3] != pcVar4[0x20]))) {
      pcVar4 = pcVar4 + 0x260;
      if ((char *)0x8ad1bf < pcVar4) goto LAB_0044f4a3;
    }
  }
  uVar5 = 0;
LAB_0044f4a3:
  *(undefined2 *)(unaff_ESI + 0x1e) = *(undefined2 *)(pbVar1 + uVar5 + 1);
  *(byte *)(unaff_ESI + 0x20) = pbVar1[uVar5 + 3];
  return CONCAT44(in_EDX,in_EAX);
}

