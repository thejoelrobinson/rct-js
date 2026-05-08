
void FUN_00409785(int param_1)

{
  int iVar1;
  int iVar2;
  undefined4 local_68 [20];
  undefined4 local_18;
  
  local_68[0] = 100;
  local_18 = 0;
  while ((iVar1 = (**(code **)(**(int **)(param_1 + 0x80) + 0x14))
                            (*(undefined4 *)(param_1 + 0x80),0,0,0,0x1000400,local_68),
         iVar1 != -0x7789fe3e || (iVar2 = FUN_00408d5d(), iVar2 != 0))) {
    if (iVar1 != -0x7789fe3e) {
      return;
    }
  }
  return;
}

