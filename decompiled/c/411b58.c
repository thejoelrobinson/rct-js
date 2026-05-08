
undefined4 FUN_00411b58(int *param_1,LPCSTR param_2)

{
  undefined1 uVar1;
  HGLOBAL hResData;
  int local_458 [3];
  ushort local_44a;
  uint local_438;
  undefined1 local_430 [16];
  uint local_420;
  undefined1 local_41c [1024];
  uint *local_1c;
  uint local_18;
  undefined4 local_14;
  HRSRC local_10;
  HFILE local_c;
  int local_8;
  
  for (local_18 = 0; (int)local_18 < 0x100; local_18 = local_18 + 1) {
    local_41c[local_18 * 4] = (char)(((local_18 >> 5 & 7) * 0xff) / 7);
    local_41c[local_18 * 4 + 1] = (char)(((local_18 >> 2 & 7) * 0xff) / 7);
    local_41c[local_18 * 4 + 2] = (char)(((local_18 & 3) * 0xff) / 3);
    local_41c[local_18 * 4 + 3] = 0;
  }
  if ((param_2 == (LPCSTR)0x0) ||
     (local_10 = FindResourceA((HMODULE)0x0,param_2,(LPCSTR)0x2), local_10 == (HRSRC)0x0)) {
    if ((param_2 != (LPCSTR)0x0) && (local_c = _lopen(param_2,0), local_c != -1)) {
      _lread(local_c,local_430,0xe);
      _lread(local_c,local_458,0x28);
      _lread(local_c,local_41c,0x400);
      _lclose(local_c);
      if (local_458[0] == 0x28) {
        if (local_44a < 9) {
          if (local_438 == 0) {
            local_420 = 1 << ((byte)local_44a & 0x1f);
          }
          else {
            local_420 = local_438;
          }
        }
        else {
          local_420 = 0;
        }
      }
      else {
        local_420 = 0;
      }
      for (local_18 = 0; (int)local_18 < (int)local_420; local_18 = local_18 + 1) {
        uVar1 = local_41c[local_18 * 4];
        local_41c[local_18 * 4] = local_41c[local_18 * 4 + 2];
        local_41c[local_18 * 4 + 2] = uVar1;
      }
    }
  }
  else {
    hResData = LoadResource((HMODULE)0x0,local_10);
    local_1c = LockResource(hResData);
    local_8 = *local_1c + (int)local_1c;
    if ((local_1c == (uint *)0x0) || (*local_1c < 0x28)) {
      local_420 = 0;
    }
    else if (*(ushort *)((int)local_1c + 0xe) < 9) {
      if (local_1c[8] == 0) {
        local_420 = 1 << (*(byte *)((int)local_1c + 0xe) & 0x1f);
      }
      else {
        local_420 = local_1c[8];
      }
    }
    else {
      local_420 = 0;
    }
    for (local_18 = 0; (int)local_18 < (int)local_420; local_18 = local_18 + 1) {
      local_41c[local_18 * 4] = *(undefined1 *)(local_8 + 2 + local_18 * 4);
      local_41c[local_18 * 4 + 1] = *(undefined1 *)(local_8 + 1 + local_18 * 4);
      local_41c[local_18 * 4 + 2] = *(undefined1 *)(local_8 + local_18 * 4);
      local_41c[local_18 * 4 + 3] = 0;
    }
  }
  (**(code **)(*param_1 + 0x14))(param_1,4,local_41c,&local_14,0);
  return local_14;
}

