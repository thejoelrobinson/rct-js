
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00557966(int param_1)

{
  undefined1 *puVar1;
  char in_AL;
  char in_CL;
  short in_DX;
  undefined1 *puVar2;
  int unaff_EDI;
  
  puVar1 = DAT_00991f80;
  DAT_0099a4ec = in_DX + 2;
  puVar2 = (undefined1 *)0xffffffff;
  if (((&DAT_00887422)[(uint)*(byte *)(param_1 + 7) * 0x130] & 1) != 0) {
    puVar2 = (undefined1 *)
             (int)(short)*(ushort *)(&DAT_0088747e + (uint)*(byte *)(param_1 + 7) * 0x260);
    if (puVar2 != (undefined1 *)0xffffffff) {
      puVar2 = &DAT_00743b94 +
               (uint)*(ushort *)(&DAT_0088747e + (uint)*(byte *)(param_1 + 7) * 0x260) * 0x100;
      DAT_00991f78._0_1_ = 2;
      DAT_00991f80 = puVar2;
    }
  }
  _DAT_00651c50 = unaff_EDI + -0x5fff7062;
  if (puVar2 != (undefined1 *)0xffffffff) {
    if ((byte)puVar2[0xb5] < 0x40) {
      _DAT_00651c50 = _DAT_00651c50 + (uint)(byte)puVar2[0x1f] * 4;
    }
    else {
      _DAT_00651c50 = _DAT_00651c50 + (uint)((byte)puVar2[0xb5] >> 6) * 4;
    }
  }
  DAT_0099a4e8 = (short)in_AL;
  DAT_0099a4ea = (short)in_CL;
                    /* WARNING: Could not recover jumptable at 0x00557a2f. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  DAT_00651c54 = unaff_EDI;
  (*(code *)(&PTR_LAB_00557a38)[unaff_EDI])(puVar1);
  return;
}

