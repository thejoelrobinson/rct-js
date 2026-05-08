
undefined8 FUN_005db5d7(void)

{
  byte bVar1;
  short sVar2;
  undefined4 in_EAX;
  undefined4 in_EDX;
  int iVar3;
  int unaff_ESI;
  int iVar4;
  undefined1 in_ZF;
  
  bVar1 = *(byte *)(unaff_ESI + 0x30);
  sVar2 = *(short *)(unaff_ESI + 10);
  FUN_005e3b2b();
  if (!(bool)in_ZF) {
    iVar4 = (uint)bVar1 * 0x260;
    iVar3 = *(ushort *)(unaff_ESI + 0x15a) - 1;
    if (((-1 < iVar3) && ((byte)iVar3 < (byte)(&DAT_00887498)[iVar4])) &&
       (sVar2 == *(short *)(&DAT_0088747e + iVar3 * 2 + iVar4))) {
      FUN_005e43de();
    }
  }
  return CONCAT44(in_EDX,in_EAX);
}

