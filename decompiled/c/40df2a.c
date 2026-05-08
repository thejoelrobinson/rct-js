
int FUN_0040df2a(void)

{
  int iVar1;
  tagMIDIOUTCAPSA local_44;
  UINT_PTR local_10;
  UINT local_c;
  int local_8;
  
  local_c = midiOutGetNumDevs();
  local_8 = 0;
  for (local_10 = 0xffffffff; local_10 != local_c; local_10 = local_10 + 1) {
    midiOutGetDevCapsA(local_10,&local_44,0x34);
    if ((local_44._40_4_ & 0xffff) == 2) {
      iVar1 = FUN_00413c10(local_44.szPname,&PTR_LAB_005ec070);
      if (iVar1 == 0) {
        if (local_8 == 0) {
          local_8 = 1;
        }
      }
      else {
        local_8 = 3;
      }
    }
    else if (((local_44._40_4_ & 0xffff) == 4) && (local_8 != 3)) {
      local_8 = 2;
    }
  }
  return local_8;
}

