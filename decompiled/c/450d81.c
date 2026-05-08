
undefined8 FUN_00450d81(void)

{
  undefined4 uVar1;
  ushort uVar2;
  uint uVar3;
  byte in_CL;
  undefined1 uVar4;
  byte bVar6;
  byte bVar7;
  ushort uVar5;
  uint in_EDX;
  int iVar8;
  int iVar9;
  
  iVar8 = (in_EDX & 0xff) * 0x260;
  if ((*(uint *)(&DAT_005f5b78 + (uint)(byte)(&DAT_00887420)[iVar8] * 8) & 0x200) == 0) {
    return CONCAT44(in_EDX,0x5a5);
  }
  uVar3 = in_EDX & 0xff;
  do {
    iVar9 = (uVar3 >> 8) * 0x4b0c;
    bVar7 = (byte)uVar3;
    if (bVar7 == (&DAT_008ae9c4)[iVar9]) goto LAB_00450e67;
    bVar6 = (char)(uVar3 >> 8) + 1;
    uVar3 = (uint)CONCAT11(bVar6,bVar7);
  } while (bVar6 < 8);
  uVar2 = (ushort)bVar7;
  do {
    uVar5 = uVar2;
    iVar9 = (uint)(uVar5 >> 8) * 0x4b0c;
    if ((&DAT_008ae9c4)[iVar9] == -1) goto LAB_00450e27;
    bVar7 = (char)(uVar5 >> 8) + 1;
    uVar2 = CONCAT11(bVar7,(char)uVar5);
  } while (bVar7 < 8);
  uVar5 = uVar5 & 0xff;
  uVar3 = 0xffffffff;
  do {
    bVar7 = (byte)(uVar5 >> 8);
    if ((uint)(&DAT_008ae9c6)[(uint)(uVar5 >> 8) * 0x12c3] <= uVar3) {
      uVar3 = (&DAT_008ae9c6)[(uint)(uVar5 >> 8) * 0x12c3];
      in_CL = bVar7;
    }
    uVar4 = (undefined1)uVar5;
    bVar7 = bVar7 + 1;
    uVar5 = CONCAT11(bVar7,uVar4);
  } while (bVar7 < 8);
  uVar5 = CONCAT11(in_CL,uVar4);
  iVar9 = (uint)in_CL * 0x4b0c;
  (&DAT_008874a4)[(uint)(byte)(&DAT_008ae9c4)[iVar9] * 0x260] = 0xff;
LAB_00450e27:
  uVar3 = (uint)uVar5;
  (&DAT_008ae9c4)[iVar9] = (char)uVar5;
  (&DAT_008874a4)[iVar8] = (char)(uVar5 >> 8);
  (&DAT_008ae9c5)[iVar9] = 0;
  if ((*(uint *)(&DAT_005f5b78 + (uint)(byte)(&DAT_00887420)[iVar8] * 8) & 0x80) != 0) {
    (&DAT_008ae9c5)[iVar9] = (&DAT_008ae9c5)[iVar9] | 4;
  }
  *(undefined2 *)((int)&DAT_008ae9ca + iVar9) = 0;
  *(undefined2 *)((int)&DAT_008ae9cc + iVar9) = 0;
LAB_00450e67:
  uVar1 = DAT_006e3b84;
  *(undefined4 *)((int)&DAT_008ae9c6 + iVar9) = DAT_006e3b84;
  if (((&DAT_008ae9c5)[iVar9] & 1) != 0) {
    return CONCAT44(in_EDX,CONCAT31((int3)((uint)uVar1 >> 8),(char)(uVar3 >> 8)));
  }
  DAT_00971e86._0_2_ = *(undefined2 *)(&DAT_005f5802 + (uint)(byte)(&DAT_00887420)[iVar8] * 8);
  DAT_00971e86._2_2_ = *(undefined2 *)(&DAT_005f5806 + (uint)(byte)(&DAT_00887420)[iVar8] * 8);
  return CONCAT44(in_EDX,CONCAT22((short)((uint)uVar1 >> 0x10),0x5a6));
}

