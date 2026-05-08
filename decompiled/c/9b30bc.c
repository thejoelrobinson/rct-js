
void FUN_009b30bc(void)

{
  ushort uVar1;
  ushort uVar2;
  byte bVar3;
  uint uVar4;
  uint uVar5;
  undefined4 unaff_EBP;
  undefined4 *unaff_EDI;
  undefined4 *puVar6;
  
  bVar3 = (byte)*(undefined2 *)((int)unaff_EDI + 0xe);
  uVar2 = *(ushort *)(unaff_EDI + 2) >> (bVar3 & 0x1f);
  uVar5 = (uint)(*(ushort *)((int)unaff_EDI + 10) >> (bVar3 & 0x1f));
  uVar1 = *(ushort *)(unaff_EDI + 3);
  puVar6 = (undefined4 *)*unaff_EDI;
  do {
    if ((uVar2 & 1) != 0) {
      *(char *)puVar6 = (char)unaff_EBP;
      puVar6 = (undefined4 *)((int)puVar6 + 1);
    }
    uVar4 = (uint)(uVar2 >> 2);
    if ((uVar2 >> 1 & 1) != 0) {
      *(short *)puVar6 = (short)unaff_EBP;
      puVar6 = (undefined4 *)((int)puVar6 + 2);
    }
    for (; uVar4 != 0; uVar4 = uVar4 - 1) {
      *puVar6 = unaff_EBP;
      puVar6 = puVar6 + 1;
    }
    puVar6 = (undefined4 *)((int)puVar6 + (uint)uVar1);
    uVar5 = uVar5 - 1;
  } while (uVar5 != 0);
  return;
}

