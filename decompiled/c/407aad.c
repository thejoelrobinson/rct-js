
void FUN_00407aad(void)

{
  undefined4 local_c;
  undefined4 local_8;
  
  local_c = DAT_005ec054;
  while (local_c != 0) {
    if (local_c == DAT_005ec058) {
      local_8 = 0;
    }
    else {
      local_8 = *(int *)(local_c + 0x10);
    }
    FUN_00407bfd(local_c);
    local_c = local_8;
  }
  return;
}

