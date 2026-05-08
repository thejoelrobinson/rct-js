
void FUN_009bb9f5(void)

{
  ushort uVar1;
  int iVar2;
  ushort uVar3;
  undefined1 *puVar4;
  
  if ((DAT_005e9178 == 0) && ((DAT_005e9174 != 0 || (DAT_005f8d5b == '\0')))) {
    if (DAT_005e9184 != 0) {
      FUN_005e698a();
      FUN_00452835();
      FUN_009bb4b4();
      FUN_009bb717();
      FUN_0045268c();
      FUN_005e6028();
      DAT_005e9184 = 0;
      DAT_009b227c = 0;
    }
    DAT_0099fb7c = DAT_005f1fec;
    DAT_0099fb84 = DAT_005f2400;
    DAT_0099fb88 = (short)DAT_005f1ff4 - DAT_005f2400;
    DAT_0099fb86 = DAT_005f1ff0;
    if (DAT_005f15c4 != 0) {
      uVar1 = (ushort)DAT_005f15c4;
      uVar3 = (ushort)DAT_005f1b34;
      if ((((DAT_005f1ff0 == DAT_00971ee0) && (DAT_005f2400 == DAT_00971ede)) &&
          (uVar1 == DAT_00971eda)) && ((uVar3 == DAT_00971edc && (DAT_00971ef0 == '\x01')))) {
        return;
      }
      DAT_00971ef0 = 1;
      DAT_00971ee0 = DAT_005f1ff0;
      DAT_00971ede = DAT_005f2400;
      DAT_00971ed6 = DAT_005f2400;
      if (uVar1 < DAT_005f2400) {
        DAT_00971ed6 = uVar1;
      }
      DAT_00971ed8 = DAT_005f1ff0;
      if (uVar3 < DAT_005f1ff0) {
        DAT_00971ed8 = uVar3;
      }
      DAT_00971ee2 = 0x40;
      DAT_00971eee = 6;
      if ((DAT_005f2400 & 0x3f) != 0) {
        DAT_00971ee2 = 0x20;
        DAT_00971eee = 5;
      }
      DAT_00971eef = 3;
      DAT_00971ee4 = 8;
      DAT_00971eea = DAT_005f1ff0 / 8;
      DAT_00971ee6 = (uint)DAT_005f2400 / (uint)DAT_00971ee2;
      puVar4 = &DAT_0099ad63;
      DAT_00971eda = uVar1;
      DAT_00971edc = uVar3;
      for (iVar2 = 0x1400; iVar2 != 0; iVar2 = iVar2 + -1) {
        *puVar4 = 0xff;
        puVar4 = puVar4 + 1;
      }
      FUN_00429aff();
      FUN_005e5f51();
      return;
    }
  }
  DAT_00971ef0 = 0;
  return;
}

