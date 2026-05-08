
uint FUN_005e1fdd(void)

{
  short sVar1;
  uint *puVar2;
  uint uVar3;
  
  if ((DAT_00991f30 >> 5 & 1) == 0) {
    if (DAT_0099c16b == '\x01') {
      puVar2 = (uint *)FUN_00403bd8();
      if (puVar2 == (uint *)0x0) {
        uVar3 = FUN_0042d60a();
        puVar2 = (uint *)(uVar3 & 0xffff);
      }
      else {
        FUN_0042d56c();
      }
    }
    else {
      puVar2 = (uint *)FUN_00403bd8();
    }
    if (DAT_0099c16b == '\x02') {
      FUN_0042d637();
    }
    if (puVar2 == (uint *)0x0) {
      uVar3 = DAT_0099fdf4;
      if (DAT_0099fdf4 == 0x80000000) {
        return 0;
      }
    }
    else if (DAT_0099c16b == '\x01') {
      FUN_0042d60a();
      uVar3 = FUN_0042d60a();
      FUN_0042d60a();
      uVar3 = uVar3 & 0xffff;
    }
    else {
      uVar3 = *puVar2;
      if (DAT_0099c16b == '\x02') {
        FUN_0042d637();
        uVar3 = FUN_0042d637();
        FUN_0042d637();
      }
    }
    if ((int)uVar3 < 0) {
      uVar3 = 0;
    }
    if (DAT_00971ed6 <= (ushort)uVar3) {
      uVar3 = (uint)(ushort)(DAT_00971ed6 - 1);
    }
    return uVar3;
  }
  if (DAT_0099c16b == '\x01') {
    sVar1 = FUN_0042d60a();
    if (sVar1 == 0) goto LAB_005e21c0;
  }
  else {
    if (DAT_0099c16b == '\x02') {
      FUN_0042d637();
    }
    if (DAT_005ebee4 == 0) goto LAB_005e21c0;
  }
  if (DAT_0099c16b == '\x01') {
    uVar3 = FUN_0042d60a();
    if ((uVar3 & 0x80) == 0) {
LAB_005e21c0:
      FUN_00403b39();
      DAT_00991f30 = DAT_00991f30 & 0xffffffdf;
      if (DAT_0099c16b != '\x01') {
        uVar3 = DAT_005f128c;
        if (DAT_0099c16b == '\x02') {
          uVar3 = FUN_0042d637();
          FUN_0042d637();
        }
        DAT_0099fdf4 = 0x80000000;
        return uVar3;
      }
      sVar1 = FUN_0042d60a();
      FUN_0042d60a();
      DAT_0099fdf4 = 0x80000000;
      return (int)sVar1;
    }
  }
  else {
    if (DAT_0099c16b == '\x02') {
      FUN_0042d637();
    }
    if ((DAT_005f1288 & 0x80) == 0) goto LAB_005e21c0;
  }
  if (DAT_0099c16b != '\x01') {
    uVar3 = DAT_005f128c;
    if (DAT_0099c16b == '\x02') {
      uVar3 = FUN_0042d637();
      FUN_0042d637();
    }
    DAT_005f128c = 0;
    DAT_005f1280 = 0;
    return uVar3;
  }
  sVar1 = FUN_0042d60a();
  FUN_0042d60a();
  DAT_005f128c = 0;
  DAT_005f1280 = 0;
  return (int)sVar1;
}

