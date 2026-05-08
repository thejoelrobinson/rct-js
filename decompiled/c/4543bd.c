
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_004543bd(void)

{
  int iVar1;
  uint uVar2;
  uint uVar3;
  ushort uVar4;
  int iVar5;
  
  if (((((_DAT_006323f8 & 1) != 0) && (DAT_006326bc == '\0')) && ((DAT_006326bd & 1) != 0)) &&
     (DAT_006323fc != -1)) {
    uVar3 = 0;
    for (uVar4 = DAT_0087c398; uVar4 != 0xffff; uVar4 = (&DAT_00743b98)[(uint)uVar4 * 0x80]) {
      iVar5 = (uint)uVar4 * 0x100;
      uVar2 = uVar3;
      if (((((*(short *)(&DAT_00743baa + iVar5) != -0x8000) && ((&DAT_00743bc2)[iVar5] == '\0')) &&
           ((*(short *)(DAT_006323fc + 8) <= *(short *)(&DAT_00743bae + iVar5) &&
            ((*(short *)(&DAT_00743baa + iVar5) <=
              (short)(*(short *)(DAT_006323fc + 0xc) + *(short *)(DAT_006323fc + 8)) &&
             (*(short *)(DAT_006323fc + 10) <= *(short *)(&DAT_00743bb0 + iVar5))))))) &&
          (*(short *)(&DAT_00743bac + iVar5) <=
           (short)(*(short *)(DAT_006323fc + 0xe) + *(short *)(DAT_006323fc + 10)))) &&
         (uVar2 = uVar3 + 2, (&DAT_00743bbf)[iVar5] == '\x06')) {
        uVar2 = uVar3 + 1;
      }
      uVar3 = uVar2;
    }
    uVar3 = (uVar3 >> 1) - 6;
    if ((int)uVar3 < 0) {
      if (DAT_00632978 != 1) {
        FUN_0040d575(2);
        DAT_00632978 = 1;
      }
    }
    else {
      if (0x78 < uVar3) {
        uVar3 = 0x78;
      }
      iVar5 = -(uVar3 - 0x78) * -(uVar3 - 0x78);
      iVar5 = -0x96 - (-((0xc5c1000U - iVar5 * iVar5 >> (*(byte *)(DAT_006323fc + 0x10) & 0x1f)) +
                        0xf3a3f000) >> 0x10);
      if (DAT_00632978 == 1) {
        FUN_0042f239();
        iVar1 = FUN_0040d432(2,3,0);
        if (iVar1 != 0) {
          FUN_0040d4b8(2,1,iVar5,0,0);
          DAT_00632978 = iVar5;
        }
      }
      else if (iVar5 != DAT_00632978) {
        FUN_0040d777(2,iVar5);
        DAT_00632978 = iVar5;
      }
    }
  }
  return;
}

