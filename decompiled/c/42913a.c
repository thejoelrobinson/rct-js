
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0042913a(void)

{
  byte bVar1;
  int iVar2;
  undefined4 uVar3;
  short sVar4;
  ushort uVar5;
  int iVar6;
  undefined4 uVar7;
  uint uVar8;
  uint uVar9;
  
  sVar4 = DAT_0087cba0;
  DAT_0087cba0 = DAT_0087c81c;
  _DAT_005f54ec = _DAT_005f54ec | 4;
  DAT_0087c3d6 = 1;
  if ((-0x14 < (short)(DAT_0087c81c - sVar4)) &&
     (DAT_0087c3d6 = 2, (short)(DAT_0087c81c - sVar4) < 0x14)) {
    DAT_0087c3d6 = 0;
  }
  uVar5 = FUN_00428ec0();
  uVar5 = uVar5 >> 2;
  uVar8 = 0;
  do {
    LOCK();
    bVar1 = (&DAT_0087cc8a)[uVar8];
    (&DAT_0087cc8a)[uVar8] = (byte)uVar5;
    uVar5 = (ushort)bVar1;
    UNLOCK();
    uVar8 = uVar8 + 1;
  } while (uVar8 < 0x20);
  FUN_005e5301();
  uVar5 = DAT_0087c81c;
  if (0x9c4 < DAT_0087c81c) {
    uVar5 = 0x9c4;
  }
  uVar8 = uVar5 / 10;
  uVar9 = 0;
  do {
    LOCK();
    bVar1 = (&DAT_0087ccaa)[uVar9];
    (&DAT_0087ccaa)[uVar9] = (byte)uVar8;
    uVar8 = (uint)bVar1;
    UNLOCK();
    uVar9 = uVar9 + 1;
  } while (uVar9 < 0x20);
  FUN_005e5301();
  uVar8 = 0;
  iVar6 = DAT_0087c3b4 - DAT_0087c3b8;
  do {
    LOCK();
    iVar2 = (&DAT_0087d104)[uVar8];
    (&DAT_0087d104)[uVar8] = iVar6;
    UNLOCK();
    uVar8 = uVar8 + 1;
    iVar6 = iVar2;
  } while (uVar8 < 0x80);
  FUN_005e5301();
  if (1 < DAT_0087d310) {
    DAT_0087d30c = DAT_0087d30c / (int)(uint)DAT_0087d310;
  }
  uVar8 = 0;
  do {
    LOCK();
    iVar6 = (&DAT_0087d314)[uVar8];
    (&DAT_0087d314)[uVar8] = DAT_0087d30c;
    UNLOCK();
    uVar8 = uVar8 + 1;
    DAT_0087d30c = iVar6;
  } while (uVar8 < 0x80);
  DAT_0087d30c = 0;
  DAT_0087d310 = 0;
  FUN_005e5301();
  uVar8 = 0;
  uVar7 = DAT_0087d514;
  do {
    LOCK();
    uVar3 = (&DAT_0087d518)[uVar8];
    (&DAT_0087d518)[uVar8] = uVar7;
    UNLOCK();
    uVar8 = uVar8 + 1;
    uVar7 = uVar3;
  } while (uVar8 < 0x80);
  return;
}

