
void FUN_005db339(void)

{
  short sVar1;
  ushort uVar2;
  ushort uVar3;
  int iVar4;
  int iVar5;
  int iVar6;
  undefined1 *unaff_ESI;
  undefined1 *puVar7;
  undefined8 uVar8;
  
  unaff_ESI[0x50] = 8;
  FUN_005db5d7();
  iVar6 = *(int *)(unaff_ESI + 0x28) >> 10;
  puVar7 = unaff_ESI;
  while( true ) {
    puVar7[0x51] = 0;
    sVar1 = *(short *)(&DAT_0065eada + (uint)((byte)puVar7[0x1e] >> 1) * 4);
    iVar4 = *(int *)(&DAT_0065e7dc + (uint)(byte)puVar7[0x1f] * 4);
    iVar5 = *(int *)(&DAT_0065e8bc + (uint)(byte)puVar7[0x1f] * 4);
    *(short *)(puVar7 + 0xb6) =
         (short)((uint)(((int)*(short *)(&DAT_0065ead8 + (uint)((byte)puVar7[0x1e] >> 1) * 4) *
                         (iVar4 >> 0xf) >> 0x10) * iVar6) >> 8);
    *(short *)(puVar7 + 0xc0) = (short)((uint)(((int)sVar1 * (iVar4 >> 0xf) >> 0x10) * iVar6) >> 8);
    *(short *)(puVar7 + 0x4e) = (short)((uint)((iVar5 >> 0x17) * iVar6) >> 8);
    uVar8 = FUN_005df40c();
    iVar6 = (int)((ulonglong)uVar8 >> 0x20);
    *(ushort *)(puVar7 + 0xb6) = *(short *)(puVar7 + 0xb6) + (((ushort)uVar8 & 0xf) - 8);
    *(ushort *)(puVar7 + 0xc0) =
         *(short *)(puVar7 + 0xc0) + (((ushort)((uint)uVar8 >> 4) & 0xf) - 8);
    *(ushort *)(puVar7 + 0x4e) =
         *(short *)(puVar7 + 0x4e) + (((ushort)((ulonglong)uVar8 >> 8) & 0xf) - 8);
    *(undefined2 *)(puVar7 + 0x38) = 0;
    *(undefined2 *)(puVar7 + 0x3a) = 0;
    *(undefined2 *)(puVar7 + 0x3c) = 0;
    if (*(ushort *)(puVar7 + 0x3e) == 0xffff) break;
    puVar7 = &DAT_00743b94 + (uint)*(ushort *)(puVar7 + 0x3e) * 0x100;
  }
  uVar2 = *(ushort *)(unaff_ESI + 0x40);
  uVar3 = *(ushort *)(puVar7 + 0x42);
  *(ushort *)(&DAT_00743bd6 + (uint)uVar2 * 0x100) = uVar3;
  *(ushort *)(&DAT_00743bd4 + (uint)uVar3 * 0x100) = uVar2;
  *(undefined4 *)(unaff_ESI + 0x28) = 0;
  return;
}

