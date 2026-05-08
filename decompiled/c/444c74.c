
void FUN_00444c74(void)

{
  short *psVar1;
  byte bVar2;
  ushort uVar3;
  ushort uVar4;
  int in_ECX;
  int unaff_ESI;
  
  if ((char)in_ECX != *(char *)(unaff_ESI + 8)) {
    bVar2 = *(byte *)(unaff_ESI + 8);
    uVar3 = *(ushort *)(unaff_ESI + 4);
    uVar4 = *(ushort *)(unaff_ESI + 6);
    if (uVar4 == 0xffff) {
      *(ushort *)((int)&DAT_0087c394 + (uint)bVar2) = uVar3;
    }
    else {
      (&DAT_00743b98)[(uint)uVar4 * 0x80] = uVar3;
    }
    if (uVar3 != 0xffff) {
      (&DAT_00743b9a)[(uint)uVar3 * 0x80] = uVar4;
    }
    *(undefined2 *)(unaff_ESI + 6) = 0xffff;
    *(char *)(unaff_ESI + 8) = (char)in_ECX;
    LOCK();
    uVar3 = *(ushort *)((int)&DAT_0087c394 + in_ECX);
    *(ushort *)((int)&DAT_0087c394 + in_ECX) = *(ushort *)(unaff_ESI + 10);
    UNLOCK();
    *(ushort *)(unaff_ESI + 4) = uVar3;
    if (uVar3 != 0xffff) {
      (&DAT_00743b9a)[(uint)uVar3 * 0x80] = *(undefined2 *)(unaff_ESI + 10);
    }
    psVar1 = (short *)((int)&DAT_0087c3a0 + (uint)bVar2);
    *psVar1 = *psVar1 + -1;
    *(short *)((int)&DAT_0087c3a0 + in_ECX) = *(short *)((int)&DAT_0087c3a0 + in_ECX) + 1;
  }
  return;
}

