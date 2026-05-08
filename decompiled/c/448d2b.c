
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00448d2b(void)

{
  undefined2 uVar1;
  undefined2 extraout_CX;
  undefined2 extraout_CX_00;
  undefined1 extraout_DL;
  ushort extraout_DX;
  undefined4 unaff_EBX;
  int iVar2;
  bool bVar3;
  
  if ((DAT_00630b21 == '\x02') && (DAT_00630b1b = DAT_00630b1b + -1, DAT_00630b1b < '\0')) {
    DAT_00630b1b = 5;
    DAT_00630b1a = DAT_00630b1a ^ 1;
    DAT_0099a4de = FUN_004490cb();
    DAT_0099a4e2 = (extraout_DX & 0xff) << 2;
    DAT_0099a4e4 = DAT_00630b18;
    _DAT_0099a020 = _DAT_0099a020 & 0xfffb;
    if ((DAT_00630b1a & 1) != 0) {
      _DAT_0099a020 = _DAT_0099a020 | 4;
    }
    DAT_0099a4e0 = extraout_CX;
    FUN_005e5562();
    bVar3 = false;
    if ((DAT_00630b1a & 1) == 0) {
      uVar1 = FUN_004490cb();
      if (!bVar3) {
        iVar2 = CONCAT31((int3)((uint)unaff_EBX >> 8),0x79);
        DAT_00630b1c = uVar1;
        DAT_00630b1e = extraout_CX_00;
        DAT_00630b20 = extraout_DL;
        FUN_00426f56();
        _DAT_00630b22 = iVar2;
        FUN_005e5301();
        if (iVar2 != -0x80000000) {
          DAT_00630b1a = DAT_00630b1a | 2;
        }
      }
    }
    else if ((DAT_00630b1a & 2) != 0) {
      DAT_00630b1a = DAT_00630b1a & 0xfd;
      FUN_00426f56();
    }
    return;
  }
  return;
}

