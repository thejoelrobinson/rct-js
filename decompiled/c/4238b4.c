
ulonglong FUN_004238b4(void)

{
  int iVar1;
  uint in_EAX;
  ushort uVar2;
  short extraout_DX;
  undefined4 in_EDX;
  uint unaff_EBP;
  ushort uVar4;
  short sVar5;
  ushort uVar6;
  undefined4 unaff_ESI;
  uint uVar7;
  undefined2 uVar8;
  int unaff_EDI;
  bool bVar9;
  uint uVar3;
  
  DAT_005f4949 = 0;
  if (((DAT_00991f8c & 8) != 0) || ((DAT_00991f2b & 1) == 0)) {
    return CONCAT44(in_EDX,in_EAX) & 0xffffffffffffff00;
  }
  uVar4 = DAT_00991f28 + 0xf;
  uVar7 = CONCAT22((short)((uint)unaff_ESI >> 0x10),uVar4) & 0xfffffff0;
  uVar6 = (ushort)uVar7;
  if ((ushort)in_EDX < uVar6) {
LAB_00423c4a:
    return CONCAT44(in_EDX,in_EAX) & 0xffffffffffffff00;
  }
  uVar2 = (ushort)((ushort)in_EDX - uVar6) >> 4;
  uVar3 = (uint)uVar2;
  if ((DAT_00991f2a & 0x20) == 0) {
    uVar8 = (undefined2)(uVar7 >> 0x10);
    if ((DAT_00991f2a & 0x10) == 0) {
      if ((DAT_00991f2a & 0xf) == 0) goto LAB_00423a9a;
      uVar3 = (uint)(ushort)(uVar2 - 1);
      if (uVar2 == 0) goto LAB_00423c4a;
      if (*(short *)(&DAT_005f43d2 + unaff_EDI * 8) != 0) {
        DAT_0099a4e8 = 0;
        DAT_0099a4ea = 0;
        DAT_0099a4ec = (uVar4 & 0xfff0) + 2;
        (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])();
        uVar7 = (uint)(ushort)((short)uVar7 + 0x10);
        DAT_005f4949 = 1;
        goto LAB_00423a9a;
      }
      uVar7 = CONCAT22(uVar8,uVar6 + 0x10);
    }
    else {
      uVar3 = (uint)(ushort)(uVar2 - 2);
      if (uVar2 < 2) goto LAB_00423c4a;
      if (*(short *)(&DAT_005f43d2 + unaff_EDI * 8) != 0) {
        DAT_0099a4e8 = 0;
        DAT_0099a4ea = 0;
        DAT_0099a4ec = (uVar4 & 0xfff0) + 2;
        (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])
                  ((ushort)(*(short *)(&DAT_005f43d2 + unaff_EDI * 8) +
                           *(short *)(&DAT_005f45c4 + (DAT_00991f2a & 0x1f) * 2)) | unaff_EBP);
        sVar5 = (short)uVar7;
        DAT_0099a4e8 = 0;
        DAT_0099a4ea = 0;
        DAT_0099a4ec = extraout_DX + 0x12;
        (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])();
        DAT_005f4949 = 1;
        uVar7 = (uint)(ushort)(sVar5 + 0x20);
        goto LAB_00423a9a;
      }
      uVar7 = CONCAT22(uVar8,uVar6 + 0x20);
    }
  }
  (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])(uVar7,unaff_EBP);
  DAT_005f4949 = 1;
LAB_00423a9a:
  uVar4 = (ushort)uVar3;
  do {
    uVar6 = (ushort)uVar7;
    if (uVar4 == 0) {
LAB_00423b53:
      iVar1 = DAT_00991f88;
      if ((((short)in_EAX != 0) &&
          (in_EAX = (uint)(ushort)((short)in_EAX - 1),
          *(short *)(&DAT_005f442c + unaff_EDI * 2) != 0)) && ((&DAT_005f444b)[in_EAX * 8] != '\0'))
      {
        DAT_0099a4e8 = (ushort)(byte)(&DAT_005f4444)[in_EAX * 8];
        DAT_0099a4ea = (ushort)(byte)(&DAT_005f4445)[in_EAX * 8];
        DAT_0099a4ec = (short)(char)(&DAT_005f4446)[in_EAX * 8] + uVar6;
        if (((&DAT_005f444a)[in_EAX * 8] == '\0') || (DAT_0099a4f0 == 0)) {
          in_EAX = (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])(unaff_EBP,unaff_EDI,uVar3);
          DAT_005f4949 = 1;
        }
        else {
          DAT_005f4949 = 1;
          bVar9 = false;
          in_EAX = (*(code *)(&PTR_LAB_004328e0)[DAT_00991f88])();
          if (!bVar9) {
            *(int *)(DAT_0099a4f0 + 0x1c) = iVar1;
          }
        }
      }
      return CONCAT44(in_EDX,CONCAT31((int3)(in_EAX >> 8),DAT_005f4949));
    }
    while( true ) {
      sVar5 = (short)uVar7;
      uVar4 = (ushort)uVar3;
      if ((((uVar7 & 0x10) != 0) || (uVar4 < 2)) || ((short)(sVar5 + 0x10) == DAT_00991f2c)) break;
      (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])();
      uVar6 = sVar5 + 0x20;
      uVar7 = (uint)uVar6;
      DAT_005f4949 = 1;
      uVar3 = (uint)(ushort)(uVar4 - 2);
      if ((ushort)(uVar4 - 2) == 0) {
        uVar3 = 0;
        goto LAB_00423b53;
      }
    }
    (*(code *)(&PTR_LAB_00431bb8)[DAT_00991f88])(uVar7,unaff_EBP);
    uVar7 = (uint)(ushort)(sVar5 + 0x10);
    DAT_005f4949 = 1;
    uVar4 = uVar4 - 1;
    uVar3 = (uint)uVar4;
  } while( true );
}

