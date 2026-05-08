
void FUN_005e0e07(void)

{
  uint unaff_EBP;
  uint uVar1;
  ushort unaff_SI;
  undefined2 uVar2;
  
  if ((unaff_EBP & 0x80) == 0) {
    uVar2 = *(undefined2 *)((int)&DAT_0099ac8b + unaff_EBP * 8 + 3);
    if ((unaff_SI & 8) == 0) {
      if ((unaff_SI & 0x20) == 0) {
        FUN_009b30f1(uVar2);
        FUN_009b30f1();
        FUN_009b30f1();
        FUN_009b30f1();
        if ((unaff_SI & 0x10) == 0) {
          FUN_009b30f1(uVar2);
        }
      }
      else {
        FUN_009b30f1(uVar2);
        FUN_009b30f1();
        FUN_009b30f1();
        FUN_009b30f1();
        if ((unaff_SI & 0x10) == 0) {
          FUN_009b30f1(uVar2);
        }
      }
    }
    else {
      FUN_009b30f1(uVar2);
    }
    return;
  }
  uVar1 = (byte)(&DAT_009a147c)[unaff_EBP] | 0x2000000;
  if ((unaff_SI & 8) == 0) {
    if ((unaff_SI & 0x20) == 0) {
      FUN_009b30f1(uVar1);
      FUN_009b30f1();
      FUN_009b30f1();
      FUN_009b30f1();
      if ((unaff_SI & 0x10) == 0) {
        FUN_009b30f1(uVar1);
      }
    }
    else {
      FUN_009b30f1(uVar1);
      FUN_009b30f1();
      FUN_009b30f1();
      FUN_009b30f1();
      if ((unaff_SI & 0x10) == 0) {
        FUN_009b30f1(uVar1);
      }
    }
  }
  else {
    FUN_009b30f1(uVar1);
  }
  return;
}

