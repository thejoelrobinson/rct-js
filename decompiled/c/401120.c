
void FUN_00401120(undefined4 *param_1)

{
  HRGN hRgn;
  int iVar1;
  DWORD DVar2;
  undefined4 *puVar3;
  uint uVar4;
  _RGNDATA local_120;
  undefined4 local_fc [63];
  
  if (param_1 == (undefined4 *)0x0) {
    DAT_005e9154 = 1;
  }
  else {
    hRgn = CreateRectRgn(0,0,1,1);
    if (hRgn != (HRGN)0x0) {
      iVar1 = GetUpdateRgn(DAT_005e916c,hRgn,0);
      if (iVar1 == 2) {
        FUN_004015f0(*param_1,param_1[1],param_1[2],param_1[3]);
      }
      else if (iVar1 == 3) {
        local_120.rdh.dwSize = 0x20;
        DVar2 = GetRegionData(hRgn,0x120,&local_120);
        if ((DVar2 != 0) && (uVar4 = 0, local_120.rdh.nCount != 0)) {
          puVar3 = local_fc + 1;
          do {
            FUN_004015f0(puVar3[-2],puVar3[-1],*puVar3,puVar3[1]);
            uVar4 = uVar4 + 1;
            puVar3 = puVar3 + 4;
          } while (uVar4 < local_120.rdh.nCount);
        }
      }
    }
  }
  if ((DAT_005e9104 != 0) && (DAT_005e9100 != 0)) {
    FUN_0040179d();
  }
  return;
}

