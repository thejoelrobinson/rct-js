
void FUN_00407b0c(void)

{
  int iVar1;
  undefined4 *local_10;
  byte local_c [4];
  undefined4 *local_8;
  
  local_10 = DAT_005ec054;
  while (local_10 != (undefined4 *)0x0) {
    if (local_10 == DAT_005ec058) {
      local_8 = (undefined4 *)0x0;
    }
    else {
      local_8 = (undefined4 *)local_10[4];
    }
    iVar1 = (**(code **)(*(int *)*local_10 + 0x24))(*local_10,local_c);
    if ((iVar1 == 0) && ((local_c[0] & 2) != 0)) {
      FUN_0040ddca(local_10);
    }
    local_10 = local_8;
  }
  return;
}

