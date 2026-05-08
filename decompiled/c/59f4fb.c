
undefined8 FUN_0059f4fb(int param_1)

{
  undefined1 *puVar1;
  undefined4 in_EAX;
  undefined4 uVar2;
  undefined4 in_EDX;
  int unaff_EBX;
  int iVar3;
  int unaff_EDI;
  
  puVar1 = DAT_00991f80;
  DAT_00651d54 = 0;
  DAT_0099a4ec = (short)in_EDX + 3;
  if ((((&DAT_00887422)[(uint)*(byte *)(param_1 + 7) * 0x130] & 1) != 0) &&
     (*(ushort *)(&DAT_0088747e + (uint)*(byte *)(param_1 + 7) * 0x260) != 0xffff)) {
    iVar3 = (uint)*(ushort *)(&DAT_0088747e + (uint)*(byte *)(param_1 + 7) * 0x260) * 0x100;
    DAT_00991f80 = &DAT_00743b94 + iVar3;
    DAT_00991f78._0_1_ = 2;
    DAT_00651d54 = (uint)(byte)(&DAT_00743bb3)[iVar3];
  }
  DAT_0099a4e8 = *(undefined2 *)(&DAT_00651d5c + unaff_EBX * 8);
  DAT_0099a4ea = *(undefined2 *)(&DAT_00651d5e + unaff_EBX * 8);
  uVar2 = CONCAT22((short)((uint)in_EAX >> 0x10),CONCAT11(0x7f,(char)in_EAX));
  DAT_00651d50 = unaff_EBX;
  DAT_00651d58 = unaff_EDI;
  (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])
            (*(undefined2 *)(&DAT_00651d62 + unaff_EBX * 8),
             *(undefined2 *)(&DAT_00651d60 + unaff_EBX * 8),DAT_0099a4ec);
  if ((DAT_00651d58 == 0) && (-1 < (int)(DAT_00651d54 - 1))) {
    uVar2 = (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])();
  }
  if ((DAT_00651d58 == 1) && (-1 < (int)(DAT_00651d54 - 1))) {
    uVar2 = (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])();
  }
  if ((DAT_00651d58 == 2) && (-1 < (int)(DAT_00651d54 - 1))) {
    uVar2 = (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])();
  }
  if ((DAT_00651d58 == 3) && (-1 < (int)(DAT_00651d54 - 1))) {
    uVar2 = (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])();
  }
  DAT_00991f80 = puVar1;
  DAT_00991f78._0_1_ = 3;
  return CONCAT44(in_EDX,uVar2);
}

