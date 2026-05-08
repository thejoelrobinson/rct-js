
void FUN_00410eee(int param_1)

{
  int *local_c;
  int *local_8;
  
  local_8 = (int *)0x0;
  for (local_c = DAT_005ec14c; (local_c != (int *)0x0 && (*local_c != param_1));
      local_c = (int *)local_c[0x13]) {
    local_8 = local_c;
  }
  if (local_c != (int *)0x0) {
    if (local_8 == (int *)0x0) {
      DAT_005ec14c = (int *)local_c[0x13];
    }
    else {
      local_8[0x13] = local_c[0x13];
    }
    FUN_00413470(local_c);
    DAT_005ec148 = DAT_005ec148 + -1;
  }
  return;
}

