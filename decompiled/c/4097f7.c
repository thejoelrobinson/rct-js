
void * FUN_004097f7(short param_1,short param_2)

{
  undefined4 *puVar1;
  undefined4 *puVar2;
  int iVar3;
  undefined4 *local_14;
  void *local_8;
  
  puVar2 = (undefined4 *)FUN_00413830(1,0xc);
  local_8 = (void *)FUN_00413830(1,0xa8);
  if ((local_8 == (void *)0x0) || (puVar2 == (undefined4 *)0x0)) {
    if (local_8 != (void *)0x0) {
      FUN_00413470(local_8);
      local_8 = (void *)0x0;
    }
    if (puVar2 != (undefined4 *)0x0) {
      FUN_00413470(puVar2);
    }
  }
  else {
    _memset(local_8,0,0xa8);
    *(undefined4 *)((int)local_8 + 0x14) = 0x6c;
    *(undefined4 *)((int)local_8 + 0x18) = 0x1007;
    *(undefined4 *)((int)local_8 + 0x7c) = 0x840;
    *(int *)((int)local_8 + 0x20) = (int)param_1;
    *(int *)((int)local_8 + 0x1c) = (int)param_2;
    *(undefined4 *)((int)local_8 + 0x5c) = 0x20;
    *(undefined4 *)((int)local_8 + 0x60) = 0x60;
    *(undefined4 *)((int)local_8 + 0x68) = 8;
    *(undefined4 *)((int)local_8 + 0x6c) = 0;
    *(undefined4 *)((int)local_8 + 0x70) = 0;
    *(undefined4 *)((int)local_8 + 0x74) = 0;
    *(undefined4 *)((int)local_8 + 0x78) = 0;
    iVar3 = (**(code **)(*DAT_005ebf30 + 0x18))
                      (DAT_005ebf30,(int)local_8 + 0x14,(int)local_8 + 0x80,0);
    puVar1 = DAT_005ebf48;
    if (iVar3 == 0) {
      local_14 = DAT_005ebf48;
      *puVar2 = local_8;
      puVar2[1] = *(undefined4 *)((int)local_8 + 0x80);
      puVar2[2] = 0;
      if (puVar1 != (undefined4 *)0x0) {
        for (; local_14[2] != 0; local_14 = (undefined4 *)local_14[2]) {
        }
        local_14[2] = puVar2;
        puVar2 = DAT_005ebf48;
      }
      DAT_005ebf48 = puVar2;
      FUN_00409785(local_8);
      iVar3 = (**(code **)(**(int **)((int)local_8 + 0x80) + 0x7c))
                        (*(undefined4 *)((int)local_8 + 0x80),DAT_005ebf3c);
      if ((iVar3 == -0x7789fe3e) && (iVar3 = FUN_00408d5d(), iVar3 != 0)) {
        (**(code **)(**(int **)((int)local_8 + 0x80) + 0x7c))
                  (*(undefined4 *)((int)local_8 + 0x80),DAT_005ebf3c);
      }
    }
    else {
      FUN_00413470(puVar2);
      FUN_00413470(local_8);
      local_8 = (void *)0x0;
    }
  }
  return local_8;
}

