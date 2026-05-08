
undefined2 FUN_00433b76(void)

{
  uint uVar1;
  undefined4 *puVar2;
  undefined2 in_AX;
  undefined2 in_CX;
  undefined4 unaff_EBX;
  
  puVar2 = DAT_005f96e8;
  if (DAT_005f96e8 < DAT_005f96e0) {
    *DAT_005f96e8 = unaff_EBX;
    *(undefined2 *)(puVar2 + 1) = in_AX;
    *(undefined2 *)((int)puVar2 + 6) = in_CX;
    if (DAT_00628928 != 0) {
      DAT_005f96e8 = DAT_005f96e8 + 3;
      LOCK();
      uVar1 = *(uint *)(DAT_00628928 + 0x18);
      *(uint *)(DAT_00628928 + 0x18) = (uint)puVar2;
      UNLOCK();
      puVar2[2] = uVar1;
      return in_AX;
    }
  }
  return in_AX;
}

