
undefined8 FUN_005d3329(void)

{
  undefined4 in_EAX;
  undefined4 uVar1;
  undefined4 in_ECX;
  undefined4 extraout_ECX;
  undefined4 in_EDX;
  int iVar2;
  int unaff_ESI;
  undefined4 unaff_EDI;
  int iVar3;
  bool bVar4;
  
  bVar4 = (&DAT_00887420)[(uint)*(byte *)(unaff_ESI + 7) * 0x260] == '\x14';
  if (!bVar4) {
    uVar1 = FUN_005e3b2b();
    if (((!bVar4) && (DAT_00652288 != '\0')) && (DAT_00652289 == *(char *)(unaff_ESI + 7))) {
      FUN_005d21fa();
    }
    iVar2 = -1;
    while( true ) {
      iVar3 = iVar2;
      iVar2 = (uint)*(byte *)(unaff_ESI + 4) * 8;
      bVar4 = false;
      DAT_006522a7 = CONCAT11((&DAT_006545b2)[iVar2],(&DAT_006545b4)[iVar2]);
      in_EAX = uVar1;
      uVar1 = FUN_005cfac7(unaff_ESI,in_ECX,uVar1,unaff_EDI);
      if ((bVar4) ||
         (iVar2 = (uint)*(byte *)(unaff_ESI + 4) * 8, in_EAX = uVar1,
         CONCAT11((&DAT_006545b3)[iVar2],(&DAT_006545b5)[iVar2]) != DAT_006522a7)) break;
      in_ECX = extraout_ECX;
      iVar2 = unaff_ESI;
      if ((iVar3 != -1) && (iVar2 = iVar3, unaff_ESI == iVar3)) {
        return CONCAT44(in_EDX,uVar1);
      }
    }
  }
  return CONCAT44(in_EDX,in_EAX);
}

