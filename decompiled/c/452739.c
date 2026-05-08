
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

int FUN_00452739(void)

{
  int in_EAX;
  int iVar1;
  undefined4 *puVar2;
  short sVar3;
  undefined2 *puVar4;
  int *piVar5;
  undefined1 *puVar6;
  uint uVar7;
  int *piVar8;
  
  FUN_00452835();
  puVar4 = &DAT_00632448;
  sVar3 = 6;
  do {
    *puVar4 = 0xffff;
    puVar4 = puVar4 + 0x1e;
    sVar3 = sVar3 + -1;
  } while (sVar3 != 0);
  puVar4 = &DAT_00632608;
  sVar3 = 6;
  do {
    *puVar4 = 0xffff;
    puVar4 = puVar4 + 0xb;
    sVar3 = sVar3 + -1;
  } while (sVar3 != 0);
  iVar1 = FUN_004072f0(0,in_EAX,2,0x5622,0x10);
  if (iVar1 != 0) {
    FUN_0042f239();
    iVar1 = FUN_0040771b(2);
    if (iVar1 != 0) {
      piVar5 = &DAT_006326c8;
      while (*piVar5 != -1) {
        piVar8 = piVar5 + 1;
        FUN_004077b3(*piVar5,piVar8,1,1);
        piVar5 = piVar8 + 5;
      }
      puVar2 = (undefined4 *)(in_EAX * 0x210 + DAT_005ebf10);
      DAT_005f8d49 = *puVar2;
      DAT_005f8d4d = puVar2[1];
      DAT_005f8d51 = puVar2[2];
      DAT_005f8d55 = puVar2[3];
      DAT_005f8d48 = 1;
      DAT_006323f4 = in_EAX;
      FUN_0042f3a2();
      iVar1 = FUN_0040d301();
      if (iVar1 != 0) {
        _DAT_006323f8 = _DAT_006323f8 | 1;
        puVar6 = &DAT_006325f0;
        uVar7 = 0;
        do {
          *puVar6 = 0xff;
          puVar6 = puVar6 + 8;
          uVar7 = uVar7 + 1;
        } while (uVar7 < 2);
      }
      return iVar1;
    }
    FUN_00407696();
  }
  return in_EAX;
}

