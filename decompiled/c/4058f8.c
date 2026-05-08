
BOOL FUN_004058f8(LONG *param_1,LONG *param_2)

{
  BOOL BVar1;
  tagPOINT local_10;
  
  BVar1 = GetCursorPos(&local_10);
  *param_1 = local_10.x;
  *param_2 = local_10.y;
  return BVar1;
}

