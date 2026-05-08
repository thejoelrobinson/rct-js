
void FUN_00421b78(void)

{
  byte bVar1;
  byte bVar3;
  byte in_CL;
  byte bVar5;
  byte bVar6;
  undefined4 uVar7;
  undefined4 in_EDX;
  int iVar8;
  int unaff_EBX;
  ushort uVar10;
  byte *pbVar11;
  uint uVar12;
  int iVar13;
  char cVar2;
  char cVar4;
  undefined2 uVar9;
  
  uVar10 = DAT_00991f74 + *(short *)(&DAT_005f4696 + DAT_00991f88 * 4);
  uVar9 = (undefined2)((uint)in_EDX >> 0x10);
  if (((ushort)(DAT_00991f70 + *(short *)(&DAT_005f4694 + DAT_00991f88 * 4)) < 0x1000) &&
     (uVar10 < 0x1000)) {
    uVar10 = uVar10 * 0x80 | uVar10 >> 9 |
             DAT_00991f70 + *(short *)(&DAT_005f4694 + DAT_00991f88 * 4);
    pbVar11 = (byte *)(&DAT_00971ef4)[(ushort)(uVar10 >> 5 | uVar10 << 0xb)];
    bVar1 = *pbVar11;
    while ((bVar1 & 0x3c) != 0) {
      pbVar11 = pbVar11 + 8;
      bVar1 = *pbVar11;
    }
    uVar12 = CONCAT22(uVar9,CONCAT11(pbVar11[5],(char)in_EDX)) & 0xffff1fff;
    if ((char)uVar12 == (char)(uVar12 >> 8)) {
      return;
    }
    uVar10 = (pbVar11[4] & 0xf) << (in_CL & 0x1f);
    uVar7 = CONCAT22((short)(uVar12 >> 0x10),CONCAT11(pbVar11[2] >> 2,(char)uVar12));
    uVar12 = pbVar11[4] & 0x10 | (ushort)(uVar10 >> 4 | uVar10) & 0xf;
  }
  else {
    uVar12 = 0;
    uVar7 = CONCAT22(uVar9,CONCAT11(1,(char)in_EDX));
  }
  cVar2 = (char)uVar7;
  bVar1 = cVar2 + (&DAT_005f46c4)[unaff_EBX];
  bVar5 = cVar2 + (&DAT_005f46a4)[unaff_EBX];
  cVar4 = (char)((uint)uVar7 >> 8);
  bVar3 = cVar4 + (&DAT_005f46e4)[uVar12];
  bVar6 = cVar4 + (&DAT_005f4704)[uVar12];
  if ((bVar3 < bVar1) || (bVar6 < bVar5)) {
    DAT_005f4724 = DAT_005f4774;
    if ((DAT_00991f8c & 1) != 0) {
      DAT_005f4724 = DAT_005f4770;
    }
    uVar9 = (undefined2)((uint)uVar7 >> 0x10);
    iVar8 = CONCAT22(uVar9,CONCAT11(bVar6,cVar2));
    iVar13 = iVar8;
    if (bVar6 != bVar3) {
      if (bVar3 <= bVar6) {
        iVar8 = CONCAT22(uVar9,CONCAT11(bVar3,cVar2));
      }
      bVar3 = (byte)((uint)iVar8 >> 8);
      iVar13 = iVar8;
      if ((bVar3 != bVar1) && (bVar3 != bVar5)) {
        (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])();
        iVar8 = CONCAT22((short)((uint)iVar8 >> 0x10),CONCAT11(bVar3 + 1,(char)iVar8));
        iVar13 = iVar8;
      }
    }
    while ((bVar3 = (byte)((uint)iVar8 >> 8), bVar3 < bVar1 && (bVar3 < bVar5))) {
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])();
      iVar8 = (uint)(byte)(bVar3 + 1) << 8;
    }
    if ((bVar3 < bVar1) || (bVar3 < bVar5)) {
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])(iVar13,unaff_EBX);
    }
  }
  return;
}

