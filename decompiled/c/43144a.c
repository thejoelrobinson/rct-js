
undefined8 FUN_0043144a(void)

{
  uint uVar1;
  undefined4 in_EAX;
  int iVar2;
  undefined4 in_EDX;
  uint uVar3;
  
  DAT_0087d0bf = 0xff;
  if ((DAT_0087cccb != '\0') && (DAT_0087c3d7 != 0)) {
    iVar2 = 0x10000;
    if (DAT_0087cccb != '\x02') {
      iVar2 = 0x20000;
    }
    uVar1 = ((iVar2 - (uint)DAT_0087d0bc) /
            (uint)*(ushort *)(&DAT_005f96b4 + (uint)DAT_0087c3d7 * 2)) * 0x80 +
            CONCAT22(DAT_006e3b80,DAT_006e3b82);
    uVar3 = uVar1 >> 0x10 & 7;
    DAT_0087d0bf = (undefined1)
                   ((uVar1 & 0xffff) * (uint)*(ushort *)(&DAT_0064bc60 + uVar3 * 2) >> 0x10);
    DAT_0087d0c0 = (undefined1)uVar3;
  }
  return CONCAT44(in_EDX,in_EAX);
}

