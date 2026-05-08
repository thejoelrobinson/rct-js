
uint FUN_00411e74(int *param_1,COLORREF param_2)

{
  int iVar1;
  COLORREF local_80;
  uint local_7c;
  HDC local_78;
  int local_74;
  undefined4 local_70 [9];
  uint *local_4c;
  byte local_1c;
  
  local_7c = 0xffffffff;
  if (param_2 != 0xffffffff) {
    iVar1 = (**(code **)(*param_1 + 0x44))(param_1,&local_78);
    if (iVar1 == 0) {
      local_80 = GetPixel(local_78,0,0);
      SetPixel(local_78,0,0,param_2);
      (**(code **)(*param_1 + 0x68))(param_1,local_78);
    }
  }
  local_70[0] = 0x6c;
  while( true ) {
    local_74 = (**(code **)(*param_1 + 100))(param_1,0,local_70,0,0);
    if (local_74 != -0x7789fde4) break;
    local_74 = 0x8876021c;
  }
  if (local_74 == 0) {
    local_7c = *local_4c & (1 << (local_1c & 0x1f)) - 1U;
    (**(code **)(*param_1 + 0x80))(param_1,0);
  }
  if (param_2 != 0xffffffff) {
    iVar1 = (**(code **)(*param_1 + 0x44))(param_1,&local_78);
    if (iVar1 == 0) {
      SetPixel(local_78,0,0,local_80);
      (**(code **)(*param_1 + 0x68))(param_1,local_78);
    }
  }
  return local_7c;
}

