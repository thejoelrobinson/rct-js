
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00444a79(void)

{
  undefined1 *puVar1;
  ushort uVar2;
  int iVar3;
  uint uVar4;
  undefined1 *puVar5;
  undefined4 *puVar6;
  undefined1 *puVar7;
  
  _DAT_008ad1c0 = 0;
  puVar6 = (undefined4 *)&DAT_00743b94;
  for (iVar3 = 320000; iVar3 != 0; iVar3 = iVar3 + -1) {
    *puVar6 = 0;
    puVar6 = puVar6 + 1;
  }
  uVar4 = 0;
  do {
    *(undefined2 *)((int)&DAT_0087c394 + uVar4) = 0xffff;
    *(undefined2 *)((int)&DAT_0087c3a0 + uVar4) = 0;
    uVar4 = uVar4 + 2;
  } while (uVar4 < 0xc);
  uVar2 = 0;
  puVar1 = &DAT_00743b94;
  puVar7 = (undefined1 *)0xffffffff;
  do {
    puVar5 = puVar1;
    *puVar5 = 0xff;
    *(ushort *)(puVar5 + 10) = uVar2;
    *(undefined2 *)(puVar5 + 4) = 0xffff;
    puVar5[8] = 0;
    if (puVar7 == (undefined1 *)0xffffffff) {
      *(undefined2 *)(puVar5 + 6) = 0xffff;
      DAT_0087c394 = uVar2;
    }
    else {
      *(undefined2 *)(puVar5 + 6) = *(undefined2 *)(puVar7 + 10);
      *(ushort *)(puVar7 + 4) = uVar2;
    }
    uVar2 = uVar2 + 1;
    puVar1 = puVar5 + 0x100;
    puVar7 = puVar5;
  } while (uVar2 < 5000);
  DAT_0087c3a0 = 5000;
  FUN_00444b4a();
  return;
}

