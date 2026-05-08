
undefined8 FUN_005e6bcd(void)

{
  short *psVar1;
  short sVar2;
  short sVar3;
  short sVar4;
  short sVar5;
  undefined4 in_EAX;
  short extraout_CX;
  short extraout_CX_00;
  undefined4 in_EDX;
  ushort uVar6;
  undefined *unaff_ESI;
  undefined *puVar8;
  undefined *puVar9;
  undefined1 *puVar10;
  uint uVar7;
  
  sVar2 = *(short *)(unaff_ESI + 0x20);
  sVar3 = *(short *)(unaff_ESI + 0x22);
  sVar4 = *(short *)(unaff_ESI + 0x24);
  sVar5 = *(short *)(unaff_ESI + 0x26);
  puVar8 = &DAT_009a013c;
  while (puVar8 < DAT_009a1164) {
    puVar9 = puVar8;
    if ((((puVar8 != unaff_ESI) && ((*(ushort *)(puVar8 + 0x32) & 3) == 0)) &&
        (*(short *)(puVar8 + 0x20) < (short)(sVar4 + sVar2))) &&
       (((sVar2 < (short)(*(short *)(puVar8 + 0x20) + *(short *)(puVar8 + 0x24)) &&
         (*(short *)(puVar8 + 0x22) < (short)(sVar5 + sVar3))) &&
        ((uVar6 = *(short *)(puVar8 + 0x22) + *(short *)(puVar8 + 0x26), uVar7 = (uint)uVar6,
         sVar3 < (short)uVar6 &&
         (puVar10 = &stack0xffffffe0, FUN_005e43de(puVar8,unaff_ESI,uVar7,&stack0xffffffe0),
         (short)(extraout_CX + 0xd) < DAT_00971ed6)))))) {
      *(short *)(puVar8 + 0x20) =
           *(short *)(puVar8 + 0x20) + ((extraout_CX + 3) - *(short *)(puVar8 + 0x20));
      FUN_005e43de(puVar9,unaff_ESI,uVar7,puVar10);
      if (*(int *)(puVar8 + 8) != 0) {
        psVar1 = (short *)(*(int *)(puVar8 + 8) + 4);
        *psVar1 = *psVar1 + extraout_CX_00;
      }
    }
    puVar8 = puVar9 + 0x178;
  }
  return CONCAT44(in_EDX,in_EAX);
}

