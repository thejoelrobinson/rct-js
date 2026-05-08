
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00453f76(void)

{
  ushort uVar1;
  undefined4 uVar2;
  uint uVar3;
  int iVar4;
  
  if (DAT_006323f4 == -1) {
    return;
  }
  if (DAT_006326bc != '\0') {
    return;
  }
  if ((DAT_006326bd & 1) == 0) {
    return;
  }
  if ((_DAT_0099a500 & 1) != 0) {
    return;
  }
  if ((DAT_008d7eb2 == '\x01') || (DAT_008d7eb2 == '\x02')) {
    if (DAT_00632924 == 1) {
      iVar4 = FUN_004077b3(0x1c,&DAT_00632928,1,1);
      if (iVar4 != 0) {
        FUN_00407c42(&DAT_00632928,1,0xfffff060,0,0);
        DAT_00632924 = -4000;
      }
      goto LAB_0045405e;
    }
    iVar4 = DAT_00632924 + 0x50;
    if (-0x578 < iVar4) {
      iVar4 = -0x578;
    }
  }
  else {
    if (DAT_00632924 == 1) goto LAB_0045405e;
    iVar4 = DAT_00632924 + -0x50;
    if (iVar4 < -3999) {
      FUN_00407a41(&DAT_00632928);
      DAT_00632924 = 1;
      goto LAB_0045405e;
    }
  }
  DAT_00632924 = iVar4;
  FUN_00407e33(&DAT_00632928,iVar4);
LAB_0045405e:
  if (DAT_0063293c == 1) {
    DAT_0063293c = 0;
    iVar4 = FUN_004077b3(DAT_0063296c,&DAT_00632958,1,1);
    if (iVar4 != 0) {
      FUN_00407c42(&DAT_00632958,0,DAT_00632970,10000,0);
      DAT_00632954 = 0;
    }
  }
  else if (DAT_00632974 == 0) {
    if ((DAT_008d7eb2 == '\x02') && (uVar2 = FUN_005df40c(), (ushort)uVar2 < 0x1b5)) {
      DAT_00632974 = ((ushort)((uint)uVar2 >> 0x10) & 0x3f) + 0x2b;
      DAT_00632976 = (byte)((uint)uVar2 >> 0x18) & 0x1f;
      DAT_009b2300 = '\x01';
    }
  }
  else {
    if (((DAT_00632976 != 0) && (DAT_00632976 = DAT_00632976 - 1, DAT_009b2300 == '\0')) &&
       (uVar1 = FUN_005df40c(), uVar1 < 0x2001)) {
      DAT_009b2300 = '\x01';
    }
    DAT_00632974 = DAT_00632974 + -1;
    if (DAT_00632974 == 0) {
      uVar3 = FUN_005df40c();
      if ((uVar3 & 0x10000) == 0) {
        if ((uVar3 & 0x20000) == 0) {
          if ((DAT_00632954 == 8) &&
             (iVar4 = FUN_004077b3(0x1e,&DAT_00632958,1,1,uVar3), iVar4 != 0)) {
            FUN_00407c42(&DAT_00632958,0,0,((uVar3 >> 0x12 & 0xff) - 0x80) * 0x10,0);
            DAT_00632954 = 0;
          }
        }
        else if ((DAT_0063293c == 8) &&
                (iVar4 = FUN_004077b3(0x1d,&DAT_00632940,1,1,uVar3), iVar4 != 0)) {
          FUN_00407c42(&DAT_00632940,0,0,((uVar3 >> 0x12 & 0xff) - 0x80) * 0x10,0);
          DAT_0063293c = 0;
        }
      }
      else if ((DAT_0063293c == 8) && (DAT_00632954 == 8)) {
        DAT_0063296c = 0x1d;
        if ((uVar3 & 0x20000) == 0) {
          DAT_0063296c = 0x1e;
        }
        DAT_00632970 = (uVar3 >> 0x12 & 0xff) * -8;
        iVar4 = FUN_004077b3(DAT_0063296c,&DAT_00632940,1,1);
        if (iVar4 != 0) {
          FUN_00407c42(&DAT_00632940,0,DAT_00632970,0xffffd8f0,0);
          DAT_0063293c = 1;
        }
      }
    }
  }
  if ((DAT_0063293c != 8) && (iVar4 = FUN_00407b91(&DAT_00632940), iVar4 == 0)) {
    FUN_00407a41(&DAT_00632940);
    DAT_0063293c = 8;
  }
  if ((DAT_00632954 != 8) && (iVar4 = FUN_00407b91(&DAT_00632958), iVar4 == 0)) {
    FUN_00407a41(&DAT_00632958);
    DAT_00632954 = 8;
  }
  return;
}

