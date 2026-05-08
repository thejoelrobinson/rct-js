
void FUN_004219b5(void)

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
  int iVar11;
  byte *pbVar12;
  uint uVar13;
  char cVar2;
  char cVar4;
  undefined2 uVar9;
  
  uVar10 = DAT_00991f74 + *(short *)(&DAT_005f4686 + DAT_00991f88 * 4);
  uVar9 = (undefined2)((uint)in_EDX >> 0x10);
  if (((ushort)(DAT_00991f70 + *(short *)(&DAT_005f4684 + DAT_00991f88 * 4)) < 0x1000) &&
     (uVar10 < 0x1000)) {
    uVar10 = uVar10 * 0x80 | uVar10 >> 9 |
             DAT_00991f70 + *(short *)(&DAT_005f4684 + DAT_00991f88 * 4);
    pbVar12 = (byte *)(&DAT_00971ef4)[(ushort)(uVar10 >> 5 | uVar10 << 0xb)];
    bVar1 = *pbVar12;
    while ((bVar1 & 0x3c) != 0) {
      pbVar12 = pbVar12 + 8;
      bVar1 = *pbVar12;
    }
    uVar13 = CONCAT22(uVar9,CONCAT11(pbVar12[5],(char)in_EDX)) & 0xffff1fff;
    if ((char)uVar13 == (char)(uVar13 >> 8)) {
      return;
    }
    uVar10 = (pbVar12[4] & 0xf) << (in_CL & 0x1f);
    uVar7 = CONCAT22((short)(uVar13 >> 0x10),CONCAT11(pbVar12[2] >> 2,(char)uVar13));
    uVar13 = pbVar12[4] & 0x10 | (ushort)(uVar10 >> 4 | uVar10) & 0xf;
  }
  else {
    uVar13 = 0;
    uVar7 = CONCAT22(uVar9,CONCAT11(1,(char)in_EDX));
  }
  cVar2 = (char)uVar7;
  bVar1 = cVar2 + (&DAT_005f46c4)[unaff_EBX];
  bVar5 = cVar2 + (&DAT_005f46e4)[unaff_EBX];
  cVar4 = (char)((uint)uVar7 >> 8);
  bVar3 = cVar4 + (&DAT_005f46a4)[uVar13];
  bVar6 = cVar4 + (&DAT_005f4704)[uVar13];
  if ((bVar3 < bVar1) || (bVar6 < bVar5)) {
    iVar11 = DAT_005f4774;
    if ((DAT_00991f8c & 1) != 0) {
      iVar11 = DAT_005f4770;
    }
    DAT_005f4724 = iVar11 + 5;
    uVar9 = (undefined2)((uint)uVar7 >> 0x10);
    iVar8 = CONCAT22(uVar9,CONCAT11(bVar6,cVar2));
    iVar11 = iVar8;
    if (bVar6 != bVar3) {
      if (bVar3 <= bVar6) {
        iVar8 = CONCAT22(uVar9,CONCAT11(bVar3,cVar2));
      }
      bVar3 = (byte)((uint)iVar8 >> 8);
      iVar11 = iVar8;
      if ((bVar3 != bVar1) && (bVar3 != bVar5)) {
        (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])();
        iVar8 = CONCAT22((short)((uint)iVar8 >> 0x10),CONCAT11(bVar3 + 1,(char)iVar8));
        iVar11 = iVar8;
      }
    }
    while ((bVar3 = (byte)((uint)iVar8 >> 8), bVar3 < bVar1 && (bVar3 < bVar5))) {
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])();
      iVar8 = (uint)(byte)(bVar3 + 1) << 8;
    }
    if ((bVar3 < bVar1) || (bVar3 < bVar5)) {
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])(iVar11,unaff_EBX);
    }
  }
  return;
}

