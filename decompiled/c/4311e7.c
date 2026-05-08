
void FUN_004311e7(void)

{
  int iVar1;
  int iVar2;
  int *piVar3;
  int *unaff_EBP;
  int *piVar4;
  int *piVar5;
  uint uVar6;
  bool bVar7;
  ulonglong uVar8;
  
  for (piVar4 = &DAT_0087ccd0; *piVar4 != -2; piVar4 = (int *)((int)piVar4 + 5)) {
  }
  uVar8 = FUN_005df40c();
  for (piVar4 = (int *)((int)piVar4 + 5); piVar3 = (int *)(uVar8 >> 0x20), *piVar4 != -3;
      piVar4 = (int *)((int)piVar4 + 10)) {
    bVar7 = (uVar8 & 1) != 0;
    if (!bVar7) {
      iVar1 = *piVar4;
      piVar5 = &DAT_0087ccd0;
      do {
        if (iVar1 == *piVar5) {
          piVar3 = piVar5;
        }
        if (*(int *)((int)piVar4 + 5) == *piVar5) {
          unaff_EBP = piVar5;
        }
        iVar2 = *piVar5;
        piVar5 = (int *)((int)piVar5 + 5);
      } while (iVar2 != -2);
      *piVar3 = *(int *)((int)piVar4 + 5);
      *unaff_EBP = iVar1;
      LOCK();
      iVar1 = unaff_EBP[1];
      *(char *)(unaff_EBP + 1) = (char)piVar3[1];
      UNLOCK();
      *(char *)(piVar3 + 1) = (char)iVar1;
    }
    uVar8 = CONCAT44(piVar3,(uint)uVar8 >> 1 | (uint)bVar7 << 0x1f);
  }
  uVar6 = 0;
  do {
    (&DAT_0087c3dc)[uVar6] = 0;
    *(undefined4 *)(&DAT_0087c3fc + uVar6 * 4) = 0;
    uVar6 = uVar6 + 1;
  } while (uVar6 < 8);
  DAT_0087d7a2 = 0;
  uVar6 = 0;
  do {
    (&DAT_0087c41c)[uVar6] = (&DAT_005f5594)[uVar6];
    uVar6 = uVar6 + 1;
  } while (uVar6 < 0x100);
  uVar6 = 0;
  do {
    *(undefined4 *)((int)&DAT_0087cba5 + uVar6 * 4 + 3) = 0;
    uVar6 = uVar6 + 1;
  } while (uVar6 < 0x38);
  for (piVar4 = &DAT_0087ccd0; *piVar4 != -1; piVar4 = (int *)((int)piVar4 + 5)) {
    func_0x00430934();
  }
  DAT_0087cccc = 0xffffffff;
  DAT_0087cccb = 0;
  DAT_0087d0bc = 0;
  return;
}

