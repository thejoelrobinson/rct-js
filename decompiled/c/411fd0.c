
MMRESULT FUN_00411fd0(LPSTR param_1,undefined4 *param_2,int *param_3,LPMMCKINFO param_4)

{
  LONG LVar1;
  HGLOBAL pvVar2;
  uint uVar3;
  uint local_34;
  uint local_30 [4];
  HMMIO local_20;
  _MMCKINFO local_1c;
  MMRESULT local_8;
  
  *param_3 = 0;
  local_8 = 0;
  local_20 = (HMMIO)0x0;
  local_20 = mmioOpenA(param_1,(LPMMIOINFO)0x0,0x10000);
  if (local_20 == (HMMIO)0x0) {
    local_8 = 0xe100;
  }
  else {
    local_8 = mmioDescend(local_20,param_4,(MMCKINFO *)0x0,0);
    if (local_8 == 0) {
      if ((param_4->ckid == 0x46464952) && (param_4->fccType == 0x45564157)) {
        local_1c.ckid = 0x20746d66;
        local_8 = mmioDescend(local_20,&local_1c,param_4,0x10);
        if (local_8 == 0) {
          if (local_1c.cksize < 0x10) {
            local_8 = 0xe101;
          }
          else {
            LVar1 = mmioRead(local_20,(HPSTR)local_30,0x10);
            if (LVar1 == 0x10) {
              if ((local_30[0] & 0xffff) == 1) {
                local_34 = local_34 & 0xffff0000;
              }
              else {
                LVar1 = mmioRead(local_20,(HPSTR)&local_34,2);
                if (LVar1 != 2) {
                  local_8 = 0xe102;
                  goto LAB_004121d1;
                }
              }
              pvVar2 = GlobalAlloc(0,(local_34 & 0xffff) + 0x12);
              *param_3 = (int)pvVar2;
              if (*param_3 == 0) {
                local_8 = 0xe000;
              }
              else {
                FUN_004138d0(*param_3,local_30,0x10);
                *(undefined2 *)(*param_3 + 0x10) = (undefined2)local_34;
                if (((local_34 & 0xffff) == 0) ||
                   (uVar3 = mmioRead(local_20,(HPSTR)(*param_3 + 0x12),local_34 & 0xffff),
                   uVar3 == (local_34 & 0xffff))) {
                  local_8 = mmioAscend(local_20,&local_1c,0);
                  if (local_8 == 0) goto LAB_0041220f;
                }
                else {
                  local_8 = 0xe101;
                }
              }
            }
            else {
              local_8 = 0xe102;
            }
          }
        }
      }
      else {
        local_8 = 0xe101;
      }
    }
  }
LAB_004121d1:
  if (*param_3 != 0) {
    GlobalFree((HGLOBAL)*param_3);
    *param_3 = 0;
  }
  if (local_20 != (HMMIO)0x0) {
    mmioClose(local_20,0);
    local_20 = (HMMIO)0x0;
  }
LAB_0041220f:
  *param_2 = local_20;
  return local_8;
}

