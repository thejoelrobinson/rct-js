
undefined8 FUN_005d3457(void)

{
  byte bVar1;
  undefined1 *puVar2;
  uint uVar3;
  uint uVar4;
  uint in_ECX;
  uint extraout_ECX;
  uint extraout_ECX_00;
  undefined4 in_EDX;
  undefined1 *unaff_ESI;
  undefined1 in_CF;
  bool bVar5;
  undefined1 in_ZF;
  undefined1 *puStack_18;
  undefined4 uStack_4;
  
  uStack_4 = in_EDX;
  uVar3 = FUN_005e3b2b();
  puStack_18 = (undefined1 *)&uStack_4;
  if (((!(bool)in_ZF) && (in_CF = 0, DAT_00652288 != '\0')) &&
     (in_CF = DAT_00652289 < (byte)unaff_ESI[7], DAT_00652289 == unaff_ESI[7])) {
    FUN_005d21fa();
  }
  while( true ) {
    puStack_18 = unaff_ESI;
    uVar4 = FUN_005cfc50();
    puVar2 = puStack_18;
    if ((bool)in_CF) break;
    in_CF = (undefined1 *)0xfffffff3 < &puStack_18;
    uVar3 = uVar4;
    in_ECX = extraout_ECX;
  }
  if (((&DAT_006559d8)[(uint)(byte)puStack_18[4] * 0x10] & 0x10) != 0) {
    bVar1 = puStack_18[7];
    bVar5 = ((ushort)in_ECX >> 4 & 1) != 0;
    *(ushort *)(&DAT_0088750a + (uint)bVar1 * 0x260) =
         CONCAT11((char)((ushort)in_ECX >> 5),(char)((ushort)uVar3 >> 5));
    (&DAT_0088750e)[(uint)bVar1 * 0x260] = puStack_18[2];
    while( true ) {
      puStack_18 = puVar2;
      uVar4 = FUN_005cfac7();
      if (bVar5) break;
      bVar5 = (undefined1 *)0xfffffff3 < &puStack_18;
      uVar3 = uVar4;
      in_ECX = extraout_ECX_00;
    }
    if (((&DAT_006559d8)[(uint)(byte)puStack_18[4] * 0x10] & 0x10) != 0) {
      bVar1 = puStack_18[7];
      *(ushort *)(&DAT_0088750c + (uint)bVar1 * 0x260) =
           CONCAT11((char)(in_ECX >> 5),(char)(uVar3 >> 5));
      (&DAT_0088750f)[(uint)bVar1 * 0x260] = puStack_18[2];
      return CONCAT44(uStack_4,uVar3);
    }
  }
  return CONCAT44(uStack_4,uVar3);
}

