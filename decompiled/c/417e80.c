
uint FUN_00417e80(uint param_1,uint param_2)

{
  uint uVar1;
  
  uVar1 = FUN_00417ee0();
  uVar1 = param_2 & param_1 | ~param_2 & uVar1;
  FUN_00417f80(uVar1);
  return uVar1;
}

