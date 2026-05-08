
void FUN_00438aac(void)

{
  int iVar1;
  bool bVar2;
  
  DAT_005e9154 = 1;
  if (DAT_00628cb9 == -2) {
    FUN_009b30bc();
    FUN_009bb766();
    if (DAT_00628cba == '\x01') {
      FUN_00407a41(&DAT_00628cbc);
      DAT_00628cba = '\0';
    }
    DAT_00628cb9 = DAT_00628cb9 + '\x01';
    DAT_00628cb4 = 0;
  }
  else {
                    /* WARNING (jumptable): Sanity check requires truncation of jumptable */
                    /* WARNING: Could not find normalized switch variable to match jumptable */
    switch(DAT_00628cb9) {
    case '\0':
      break;
    case '\x01':
      FUN_009b30bc();
      FUN_009bb766();
      DAT_00628cb4 = 0xfffffdbc;
      DAT_00628cba = '\0';
      if (((DAT_006323f4 != -1) && (iVar1 = FUN_004077b3(0,&DAT_00628cbc,0,1), iVar1 != 0)) &&
         (iVar1 = FUN_00407c42(&DAT_00628cbc,1,0,0,0), iVar1 != 0)) {
        DAT_00628cba = '\x01';
      }
      DAT_00628cb9 = DAT_00628cb9 + '\x01';
      break;
    case '\x02':
      DAT_00628cb4 = DAT_00628cb4 + 5;
      FUN_009b30bc();
      FUN_009b438b();
      FUN_009b438b();
      FUN_009b438b();
      FUN_009b438b();
      FUN_009b438b();
      if (0x1df < (int)DAT_00628cb4) {
        FUN_009b30bc();
        FUN_009bb766();
        DAT_00628cb4 = 0xffffff8c;
        DAT_00628cb9 = DAT_00628cb9 + '\x01';
      }
      break;
    case '\x03':
      DAT_00628cb4 = DAT_00628cb4 + 5;
      FUN_009b30bc();
      FUN_009b438b();
      FUN_009b438b();
      FUN_009b438b();
      if (0x1df < (int)DAT_00628cb4) {
        FUN_009b30bc();
        FUN_009bb766();
        DAT_00628cb4 = 0xffffff8c;
        DAT_00628cb9 = DAT_00628cb9 + '\x01';
      }
      break;
    case '\x04':
      DAT_00628cb4 = DAT_00628cb4 + 5;
      FUN_009b30bc();
      FUN_009b438b();
      FUN_009b438b();
      if (DAT_00628cb4 == 0x103) {
        if (DAT_00628cba == '\x01') {
          FUN_00407a41(&DAT_00628cbc);
          DAT_00628cba = '\0';
        }
        if (((DAT_006323f4 != -1) && (iVar1 = FUN_004077b3(1,&DAT_00628cbc,1,1), iVar1 != 0)) &&
           (iVar1 = FUN_00407c42(&DAT_00628cbc,1,0xfffffce0,0,15000), iVar1 != 0)) {
          DAT_00628cba = '\x01';
        }
      }
      if (0x2a7 < (int)DAT_00628cb4) {
        FUN_009b30bc();
        FUN_009b438b();
        FUN_009b438b();
        FUN_009b438b();
        FUN_009b438b();
        FUN_009b438b();
        FUN_009b438b();
        FUN_009bb766();
        if (DAT_00628cba == '\x01') {
          FUN_00407a41(&DAT_00628cbc);
          DAT_00628cba = '\0';
        }
        if (((DAT_006323f4 != -1) && (iVar1 = FUN_004077b3(10,&DAT_00628cbc,0,1), iVar1 != 0)) &&
           (iVar1 = FUN_00407c42(&DAT_00628cbc,0,0,0,0), iVar1 != 0)) {
          DAT_00628cba = '\x01';
        }
        DAT_00628cb9 = DAT_00628cb9 + '\x01';
        DAT_00628cb4 = 0;
      }
      break;
    case '\x05':
      DAT_00628cb4 = DAT_00628cb4 + 0x400;
      if (DAT_00628cb4 < 0xff01) {
        FUN_009bb766();
      }
      else {
        FUN_009bb766();
        DAT_00628cb9 = DAT_00628cb9 + '\x01';
        DAT_00628cb4 = 0;
      }
      break;
    case '\x06':
      DAT_00628cb4 = DAT_00628cb4 + 1;
      if (0x4f < DAT_00628cb4) {
        DAT_00628cb9 = DAT_00628cb9 + '\x01';
        DAT_00628cb4 = 0xff00;
      }
      break;
    case '\a':
      bVar2 = DAT_00628cb4 < 0x400;
      DAT_00628cb4 = DAT_00628cb4 - 0x400;
      if (bVar2) {
        FUN_009bb766();
        DAT_00628cb9 = -2;
      }
      else {
        FUN_009bb766();
      }
      break;
    default:
      DAT_00628cb9 = '\0';
      FUN_009bb717();
      DAT_005e9154 = 0;
      FUN_005e6028();
    }
  }
  FUN_004270f2();
  return;
}

