
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00458678(void)

{
  byte bVar1;
  undefined2 in_CX;
  short in_DX;
  ushort unaff_BX;
  short unaff_BP;
  byte *pbVar2;
  byte *pbVar3;
  short sVar4;
  undefined2 uVar5;
  undefined2 uStack_8;
  
  DAT_00971e84 = 0xe0;
  FUN_009ba943();
  FUN_00458bcf();
  DAT_00971e84 = 0xe0;
  FUN_0045897e(0xa888);
  DAT_006432d4 = 10;
  if ((0xe0 < unaff_BX) && (DAT_006432d4 = 6, unaff_BX != 0x1c0)) {
    DAT_006432d4 = 0x12;
  }
  sVar4 = unaff_BP * (DAT_006432d4 >> 1);
  _DAT_00971ef2 = 2;
  in_DX = in_DX - sVar4;
  pbVar2 = &DAT_0099a888;
  do {
    uVar5 = SUB42(pbVar2,0);
    uStack_8 = (undefined2)((uint)pbVar2 >> 0x10);
    FUN_00458a7c(uVar5,in_CX,uVar5,in_DX);
    FUN_009ba943();
    pbVar2 = (byte *)CONCAT22(uStack_8,uVar5);
    while( true ) {
      pbVar3 = pbVar2;
      bVar1 = *pbVar3;
      pbVar2 = pbVar3 + 1;
      if (bVar1 == 0) break;
      if (bVar1 < 0x20) {
        if (bVar1 < 5) {
          pbVar2 = pbVar3 + 2;
        }
        else if ((0x10 < bVar1) && (pbVar2 = pbVar3 + 3, 0x16 < bVar1)) {
          pbVar2 = pbVar3 + 5;
        }
      }
    }
    in_DX = in_DX + DAT_006432d4;
    sVar4 = sVar4 - (DAT_006432d4 >> 1);
  } while (-1 < sVar4);
  return;
}

