
void FUN_005d91cd(void)

{
  uint uVar1;
  int iVar2;
  int unaff_ESI;
  int unaff_EDI;
  
  *(ushort *)((int)&DAT_00887422 + unaff_EDI) = *(ushort *)((int)&DAT_00887422 + unaff_EDI) & 0xfffb
  ;
  *(ushort *)(unaff_ESI + 0x48) = *(ushort *)(unaff_ESI + 0x48) & 0xffdf;
  *(ushort *)((int)&DAT_00887422 + unaff_EDI) = *(ushort *)((int)&DAT_00887422 + unaff_EDI) | 2;
  iVar2 = 0;
  uVar1 = 0;
  do {
    uVar1 = uVar1 + *(ushort *)(&DAT_008874c4 + iVar2 * 2 + unaff_EDI);
    iVar2 = iVar2 + 1;
  } while ((byte)iVar2 < (byte)(&DAT_00887497)[unaff_EDI]);
  if (uVar1 == 0) {
    uVar1 = 1;
  }
  *(uint *)(&DAT_008874ac + unaff_EDI) = *(uint *)(&DAT_008874ac + unaff_EDI) / uVar1;
  FUN_005e5301();
  return;
}

