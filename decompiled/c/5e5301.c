
uint FUN_005e5301(void)

{
  uint in_EAX;
  uint uVar1;
  undefined4 in_ECX;
  undefined4 in_EDX;
  undefined4 unaff_EBX;
  undefined4 unaff_EBP;
  undefined4 unaff_ESI;
  undefined *puVar2;
  undefined4 unaff_EDI;
  undefined2 uStack_6;
  undefined2 uStack_4;
  undefined2 uStack_2;
  
  uStack_4 = (undefined2)unaff_ESI;
  uStack_2 = (undefined2)((uint)unaff_ESI >> 0x10);
  if ((char)in_EAX < '\0') {
    uVar1 = in_EAX & 0xffffff7f;
    uStack_6 = uStack_4;
    uStack_4 = uStack_2;
    uStack_2 = (short)in_EAX;
    for (puVar2 = &DAT_009a013c; puVar2 < DAT_009a1164; puVar2 = puVar2 + 0x178) {
      if ((((char)uVar1 == puVar2[0x174]) && ((short)unaff_EBX == *(short *)(puVar2 + 0x30))) &&
         (*(short *)(*(int *)(puVar2 + 0x1c) + (uint)(ushort)((ushort)(byte)(uVar1 >> 8) * 0x10) + 2
                    ) != -2)) {
        FUN_005e117d(unaff_EDI,puVar2,unaff_EBP,&uStack_6,unaff_EBX,in_EDX,in_ECX);
      }
    }
    return CONCAT22((short)(uVar1 >> 0x10),uStack_2);
  }
  if ((in_EAX & 0x40) != 0) {
    uVar1 = in_EAX & 0xffffffbf;
    for (puVar2 = &DAT_009a013c; puVar2 < DAT_009a1164; puVar2 = puVar2 + 0x178) {
      if ((char)uVar1 == puVar2[0x174]) {
        uStack_6 = 0x5e;
        uVar1 = FUN_005e43de();
      }
    }
    return uVar1;
  }
  for (puVar2 = &DAT_009a013c; puVar2 < DAT_009a1164; puVar2 = puVar2 + 0x178) {
    if (((char)in_EAX == puVar2[0x174]) && ((short)unaff_EBX == *(short *)(puVar2 + 0x30))) {
      uStack_6 = 0x5e;
      in_EAX = FUN_005e43de();
    }
  }
  return in_EAX;
}

