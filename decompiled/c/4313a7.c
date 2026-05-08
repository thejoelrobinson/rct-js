
void FUN_004313a7(void)

{
  bool bVar1;
  
  if (((DAT_006e3b84 & 0x1f) == 0) &&
     (bVar1 = CARRY2(DAT_0087d0bc,*(ushort *)(&DAT_005f96b4 + (uint)DAT_0087c3d7 * 2)),
     DAT_0087d0bc = DAT_0087d0bc + *(ushort *)(&DAT_005f96b4 + (uint)DAT_0087c3d7 * 2), bVar1)) {
                    /* WARNING: Could not recover jumptable at 0x004313d6. Too many branches */
                    /* WARNING: Treating indirect jump as call */
    (**(code **)(&DAT_004313e0 + (uint)DAT_0087cccb * 4))();
    return;
  }
  return;
}

