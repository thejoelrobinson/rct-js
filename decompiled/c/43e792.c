
undefined8 FUN_0043e792(void)

{
  ushort uVar1;
  undefined4 in_EAX;
  ushort uVar2;
  undefined4 in_EDX;
  uint uVar3;
  int unaff_ESI;
  int iVar4;
  
  iVar4 = (uint)*(byte *)(unaff_ESI + 0x68) * 0x260;
  uVar3 = (uint)*(byte *)(unaff_ESI + 0x69);
  uVar1 = *(ushort *)(unaff_ESI + 10);
  (&DAT_0088747a)[iVar4 + uVar3] = (&DAT_0088747a)[iVar4 + uVar3] + -1;
  uVar2 = *(ushort *)(&DAT_00887472 + uVar3 * 2 + iVar4);
  if (uVar1 == uVar2) {
    *(undefined2 *)(&DAT_00887472 + uVar3 * 2 + iVar4) = *(undefined2 *)(unaff_ESI + 0x74);
  }
  else {
    while (iVar4 = (uint)uVar2 * 0x100, uVar1 != *(ushort *)(&DAT_00743c08 + iVar4)) {
      uVar2 = *(ushort *)(&DAT_00743c08 + iVar4);
    }
    *(undefined2 *)(&DAT_00743c08 + iVar4) = *(undefined2 *)(unaff_ESI + 0x74);
  }
  return CONCAT44(in_EDX,in_EAX);
}

