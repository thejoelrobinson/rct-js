
void FUN_0040ea49(int param_1)

{
  int *local_c;
  int *local_8;
  
  local_c = (int *)0x0;
  for (local_8 = DAT_005ec074; (local_8 != (int *)0x0 && (*local_8 != param_1));
      local_8 = (int *)local_8[1]) {
    local_c = local_8;
  }
  if (local_8 != (int *)0x0) {
    if (local_c == (int *)0x0) {
      DAT_005ec074 = (int *)local_8[1];
    }
    else {
      local_c[1] = local_8[1];
    }
    FUN_0040eadf(param_1);
    FUN_00413470(local_8);
  }
  return;
}

