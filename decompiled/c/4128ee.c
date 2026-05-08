
undefined4
FUN_004128ee(undefined4 *param_1,LPMMCKINFO param_2,MMCKINFO *param_3,undefined4 *param_4)

{
  uint uVar1;
  LONG LVar2;
  MMRESULT MVar3;
  undefined4 local_8;
  
  LVar2 = mmioSeek((HMMIO)*param_1,param_3->dwDataOffset + 4,0);
  if (LVar2 == -1) {
    local_8 = 0xe102;
  }
  else {
    local_8 = 0;
    while ((MVar3 = mmioDescend((HMMIO)*param_1,param_2,param_3,0), MVar3 == 0 &&
           (param_2->cksize + param_2->dwDataOffset <= param_3->cksize + param_3->dwDataOffset))) {
      uVar1 = param_2->ckid;
      if ((0x20657563 < uVar1) && (0x4b4e554a < uVar1)) {
        if (uVar1 < 0x61746165) {
          if ((uVar1 != 0x61746164) && (uVar1 == 0x50534944)) {
            FUN_00412a85(*param_1,*param_4,param_2);
          }
        }
        else if ((uVar1 != 0x74636166) && (uVar1 == 0x74736c70)) {
          FUN_00412a85(*param_1,*param_4,param_2);
        }
      }
      mmioAscend((HMMIO)*param_1,param_2,0);
    }
  }
  mmioSeek((HMMIO)*param_1,param_3->dwDataOffset + 4,0);
  return local_8;
}

