
void FUN_005e3f31(void)

{
  undefined4 *puVar1;
  undefined4 in_EAX;
  uint in_ECX;
  uint extraout_ECX;
  undefined4 in_EDX;
  undefined4 uVar2;
  undefined4 unaff_EBX;
  undefined4 unaff_EBP;
  undefined4 *puVar3;
  undefined *puVar4;
  undefined4 unaff_EDI;
  undefined8 uVar5;
  
  uVar5 = CONCAT44(in_EDX,in_EAX);
  while ((undefined4 *)0x9a1163 < DAT_009a1164) {
    for (puVar4 = &DAT_009a013c; (*(ushort *)(puVar4 + 0x32) & 0x103) != 0; puVar4 = puVar4 + 0x178)
    {
    }
    uVar5 = FUN_005e5bd8();
    in_ECX = extraout_ECX;
  }
  puVar3 = DAT_009a1164;
  puVar1 = DAT_009a1164;
  if ((in_ECX & 0x100) == 0) {
    if ((in_ECX & 0x200) == 0) {
      while ((puVar3 != (undefined4 *)&DAT_009a013c &&
             ((*(ushort *)((int)puVar3 + -0x146) >> 1 & 1) != 0))) {
        puVar3 = puVar3 + -0x5e;
      }
    }
  }
  else {
    for (; (puVar3 != (undefined4 *)&DAT_009a013c &&
           (((*(ushort *)((int)puVar3 + -0x146) >> 1 & 1) != 0 ||
            ((*(ushort *)((int)puVar3 + -0x146) & 1) == 0)))); puVar3 = puVar3 + -0x5e) {
    }
  }
  while (puVar3 != puVar1) {
    *(undefined1 *)((int)puVar1 + 0x177) = *(undefined1 *)((int)puVar1 + -1);
    puVar1 = (undefined4 *)((int)puVar1 + -1);
  }
  *(char *)(puVar3 + 0x5d) = (char)in_ECX;
  *(undefined1 *)((int)puVar3 + 0x175) = 0xff;
  *(undefined2 *)((int)puVar3 + 0x32) = 0;
  *(ushort *)((int)puVar3 + 0x32) = *(ushort *)((int)puVar3 + 0x32) | (ushort)(in_ECX >> 8);
  if ((in_ECX & 0x300) == 0) {
    *(ushort *)((int)puVar3 + 0x32) = *(ushort *)((int)puVar3 + 0x32) | 0x600;
    FUN_00452fce();
  }
  uVar2 = (undefined4)((ulonglong)uVar5 >> 0x20);
  *(undefined2 *)(puVar3 + 0xc) = 0;
  puVar3[8] = (int)uVar5;
  puVar3[9] = unaff_EBX;
  puVar3[2] = 0;
  puVar3[1] = uVar2;
  *puVar3 = unaff_EBP;
  puVar3[3] = 0;
  puVar3[4] = 0;
  puVar3[5] = 0;
  puVar3[6] = 0;
  *(undefined2 *)((int)puVar3 + 0x15a) = 0;
  *(undefined2 *)(puVar3 + 0x57) = 0;
  *(undefined2 *)((int)puVar3 + 0x15e) = 0;
  *(undefined2 *)(puVar3 + 0x58) = 0;
  *(undefined2 *)((int)puVar3 + 0x162) = 0;
  *(undefined2 *)(puVar3 + 0x59) = 0;
  *(undefined2 *)((int)puVar3 + 0x166) = 0;
  *(undefined2 *)(puVar3 + 0x5a) = 0;
  *(undefined2 *)((int)puVar3 + 0x16a) = 0;
  *(undefined2 *)(puVar3 + 0x5b) = 0;
  (*(code *)*puVar3)(unaff_EDI,puVar3,unaff_EBP,&stack0x00000000,unaff_EBX,uVar2,in_ECX,(int)uVar5);
  DAT_009a1164 = DAT_009a1164 + 0x5e;
  FUN_005e43de();
  return;
}

