
undefined8 FUN_00448c64(void)

{
  undefined4 in_EAX;
  undefined4 uVar1;
  undefined4 extraout_ECX;
  undefined4 uVar2;
  undefined4 in_EDX;
  byte *unaff_ESI;
  
  if ((*unaff_ESI & 0x3c) == 0x10) {
    if (unaff_ESI[4] == 0) {
      FUN_00448d15();
      FUN_00448a45();
    }
  }
  else if (((*unaff_ESI & 0x3c) == 4) && (unaff_ESI[4] >> 4 == 0)) {
    uVar1 = FUN_00448d15();
    uVar2 = extraout_ECX;
    if ((unaff_ESI[6] & 1) != 0) {
      FUN_00448a45();
    }
    if ((unaff_ESI[6] & 2) != 0) {
      FUN_00448a45(unaff_ESI,uVar2,uVar1);
    }
    if ((unaff_ESI[6] & 4) != 0) {
      FUN_00448a45(unaff_ESI,uVar2,uVar1);
    }
    if ((unaff_ESI[6] & 8) != 0) {
      FUN_00448a45(unaff_ESI,uVar2,uVar1);
    }
    unaff_ESI[7] = 0xff;
  }
  return CONCAT44(in_EDX,in_EAX);
}

