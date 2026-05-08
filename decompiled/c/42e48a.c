
undefined4 FUN_0042e48a(void)

{
  undefined4 in_EAX;
  undefined4 uVar1;
  undefined4 uVar2;
  undefined4 in_ECX;
  undefined4 extraout_ECX;
  undefined4 extraout_ECX_00;
  undefined4 in_EDX;
  undefined4 uVar3;
  uint uVar4;
  uint uVar5;
  undefined4 uVar6;
  undefined8 uVar7;
  
  uVar5 = DAT_0088741c >> 0xb & 7;
  if (uVar5 == 0) {
    uVar5 = 0;
    uVar6 = 0;
    uVar1 = in_EAX;
    do {
      FUN_0042e276(uVar6,in_EDX,in_ECX,uVar5,uVar1);
      uVar5 = uVar5 + 1;
    } while (uVar5 < 4);
    return in_EAX;
  }
  if (uVar5 != 2) {
    if (uVar5 != 4) {
      FUN_005df40c();
      FUN_0042e276();
      return in_EAX;
    }
    uVar1 = in_EAX;
    uVar7 = FUN_005df40c();
    uVar2 = (undefined4)((ulonglong)uVar7 >> 0x20);
    uVar4 = (uint)uVar7 & 3;
    uVar6 = extraout_ECX_00;
    FUN_0042e276(4,uVar2,extraout_ECX_00,uVar4,uVar1);
    FUN_0042e276(uVar5,uVar2,uVar6,uVar4 + 4,uVar1);
    return in_EAX;
  }
  uVar2 = in_EAX;
  uVar7 = FUN_005df40c();
  uVar3 = (undefined4)((ulonglong)uVar7 >> 0x20);
  uVar5 = (uint)uVar7 & 1;
  uVar6 = 2;
  uVar1 = extraout_ECX;
  do {
    FUN_0042e276(uVar6,uVar3,uVar1,uVar5,uVar2);
    uVar5 = uVar5 + 2;
  } while (uVar5 < 4);
  return in_EAX;
}

