
void FUN_00420f4c(void)

{
  byte bVar1;
  byte bVar3;
  byte in_CL;
  byte bVar5;
  byte bVar6;
  undefined1 in_DL;
  undefined2 uVar7;
  uint uVar8;
  int unaff_EBX;
  ushort uVar9;
  byte *pbVar10;
  uint uVar11;
  char cVar2;
  char cVar4;
  
  uVar9 = DAT_00991f74 + *(short *)(&DAT_005f4696 + DAT_00991f88 * 4);
  if (((ushort)(DAT_00991f70 + *(short *)(&DAT_005f4694 + DAT_00991f88 * 4)) < 0x1000) &&
     (uVar9 < 0x1000)) {
    uVar9 = uVar9 * 0x80 | uVar9 >> 9 | DAT_00991f70 + *(short *)(&DAT_005f4694 + DAT_00991f88 * 4);
    pbVar10 = (byte *)(&DAT_00971ef4)[(ushort)(uVar9 >> 5 | uVar9 << 0xb)];
    bVar1 = *pbVar10;
    while ((bVar1 & 0x3c) != 0) {
      pbVar10 = pbVar10 + 8;
      bVar1 = *pbVar10;
    }
    uVar9 = (pbVar10[4] & 0xf) << (in_CL & 0x1f);
    uVar7 = CONCAT11(pbVar10[2] >> 2,in_DL);
    uVar11 = pbVar10[4] & 0x10 | (ushort)(uVar9 >> 4 | uVar9) & 0xf;
  }
  else {
    uVar11 = 0;
    uVar7 = CONCAT11(1,in_DL);
  }
  cVar2 = (char)uVar7;
  bVar1 = cVar2 + (&DAT_005f46c4)[unaff_EBX];
  bVar5 = cVar2 + (&DAT_005f46a4)[unaff_EBX];
  cVar4 = (char)((ushort)uVar7 >> 8);
  bVar3 = cVar4 + (&DAT_005f46e4)[uVar11];
  bVar6 = cVar4 + (&DAT_005f4704)[uVar11];
  if ((bVar3 < bVar1) || (bVar6 < bVar5)) {
    if ((DAT_00991f8c & 1) == 0) {
      FUN_00433b76(uVar7);
      return;
    }
    DAT_005f4724 = DAT_005f4770;
    uVar8 = (uint)CONCAT11(bVar6,cVar2);
    uVar11 = uVar8;
    if (bVar6 != bVar3) {
      if (bVar3 <= bVar6) {
        uVar8 = (uint)CONCAT11(bVar3,cVar2);
      }
      bVar3 = (byte)(uVar8 >> 8);
      uVar11 = uVar8;
      if ((bVar3 != bVar1) && (bVar3 != bVar5)) {
        (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])();
        uVar8 = (uint)CONCAT11(bVar3 + 1,(char)uVar8);
        uVar11 = uVar8;
      }
    }
    while ((bVar3 = (byte)(uVar8 >> 8), bVar3 < bVar1 && (bVar3 < bVar5))) {
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])();
      uVar8 = (uint)(byte)(bVar3 + 1) << 8;
    }
    if ((bVar3 < bVar1) || (bVar3 < bVar5)) {
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])(uVar11,unaff_EBX);
    }
  }
  return;
}

