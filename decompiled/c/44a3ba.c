
void FUN_0044a3ba(void)

{
  undefined1 *puVar1;
  undefined4 uVar2;
  byte bVar3;
  uint uVar4;
  undefined1 *in_EDX;
  undefined1 *puVar5;
  uint extraout_EDX;
  short *psVar6;
  uint uVar7;
  short sVar8;
  uint uVar9;
  undefined4 *unaff_ESI;
  bool bVar10;
  undefined1 uVar11;
  
  puVar1 = in_EDX;
  do {
    puVar5 = puVar1;
    puVar1 = &DAT_00743b94 + (uint)*(ushort *)(puVar5 + 0x40) * 0x100;
  } while (*(short *)(&DAT_00743bd2 + (uint)*(ushort *)(puVar5 + 0x40) * 0x100) != -1);
  psVar6 = (short *)(&DAT_0088747e + (uint)(byte)puVar5[0x30] * 0x260);
  uVar9 = 1;
  while( true ) {
    bVar10 = *(short *)(puVar5 + 10) == *psVar6;
    sVar8 = (short)uVar9;
    if (bVar10) break;
    psVar6 = psVar6 + 1;
    uVar9 = (uint)(ushort)(sVar8 + 1);
  }
  DAT_00631ca0 = in_EDX;
  uVar2 = FUN_005e3b2b();
  puVar1 = DAT_00631ca0;
  if (!bVar10) {
    uVar11 = false;
    if (sVar8 == *(short *)((int)unaff_ESI + 0x15a)) {
      uVar7 = 0;
      uVar4 = (uint)(byte)DAT_00631ca0[0xb3];
      do {
        sVar8 = (short)uVar9;
        uVar11 = true;
        if ((char)uVar4 == '\0') break;
        if (*(short *)(puVar1 + uVar7 * 2 + 0x52) != -1) {
          bVar3 = (char)uVar4 - 1;
          uVar4 = (uint)bVar3;
          bVar10 = bVar3 == 0;
          FUN_005e3b2b(uVar4,uVar9,uVar2);
          sVar8 = (short)uVar9;
          if (bVar10) {
            uVar11 = (extraout_EDX & 0xffff) * 0x100 == -0x743b94;
            FUN_00440072();
            FUN_005e3b2b();
            goto joined_r0x0044a466;
          }
        }
        sVar8 = (short)uVar9;
        uVar7 = uVar7 + 1;
        uVar11 = uVar7 == 0x20;
      } while (uVar7 < 0x20);
    }
    FUN_005e5fcb();
joined_r0x0044a466:
    if (!(bool)uVar11) goto LAB_0044a489;
  }
  FUN_0044b9db();
  unaff_ESI[0x57] = 0xffffffff;
LAB_0044a489:
  *(undefined2 *)(unaff_ESI + 0x59) = 0;
  *(undefined2 *)(unaff_ESI + 9) = 0x100;
  *(undefined2 *)((int)unaff_ESI + 0x26) = 0xc6;
  FUN_005e43de();
  unaff_ESI[7] = PTR_DAT_00631bcc;
  unaff_ESI[3] = PTR_DAT_00631c2c;
  unaff_ESI[6] = DAT_00631c4c;
  *unaff_ESI = PTR_DAT_00631bec;
  unaff_ESI[1] = PTR_LAB_00631c0c;
  unaff_ESI[5] = 0;
  FUN_0044ba3c();
  FUN_005e412c();
  *(short *)((int)unaff_ESI + 0x15a) = sVar8;
  FUN_0044c464();
  return;
}

