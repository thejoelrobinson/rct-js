
undefined8 FUN_0042e94d(void)

{
  short sVar1;
  undefined4 in_EAX;
  uint uVar2;
  short extraout_CX;
  undefined4 in_EDX;
  ushort uVar3;
  undefined1 *unaff_ESI;
  undefined1 in_ZF;
  
  sVar1 = FUN_00444bd4();
  if (!(bool)in_ZF) {
    *unaff_ESI = 2;
    unaff_ESI[1] = 8;
    unaff_ESI[0x14] = 9;
    unaff_ESI[9] = 0xc;
    unaff_ESI[0x15] = 9;
    uVar2 = FUN_005df40c();
    uVar3 = (ushort)(uVar2 >> 8) & 0x1e;
    *(ushort *)(unaff_ESI + 0x30) = sVar1 + uVar3;
    *(ushort *)(unaff_ESI + 0x32) = extraout_CX + uVar3;
    switch(uVar2 & 3) {
    case 0:
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
    }
    unaff_ESI[0x1e] = (char)(uVar2 & 3) << 3;
    FUN_00444927();
    unaff_ESI[0x48] = 0;
    *(undefined2 *)(unaff_ESI + 0x26) = 0;
  }
  return CONCAT44(in_EDX,in_EAX);
}

