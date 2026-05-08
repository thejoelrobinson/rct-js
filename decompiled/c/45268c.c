
void FUN_0045268c(void)

{
  undefined1 uVar1;
  undefined4 *puVar2;
  uint uVar3;
  int iVar4;
  int *piVar5;
  
  uVar3 = 0;
  piVar5 = DAT_005ebf10;
  if (DAT_005f8d48 != '\0') {
    do {
      if ((((*piVar5 == DAT_005f8d49) && (piVar5[1] == DAT_005f8d4d)) && (piVar5[2] == DAT_005f8d51)
          ) && (piVar5[3] == DAT_005f8d55)) break;
      uVar3 = uVar3 + 1;
      piVar5 = piVar5 + 0x84;
    } while (uVar3 < DAT_005ebf0c);
  }
  FUN_00452739();
  uVar3 = 0;
  do {
    puVar2 = (undefined4 *)(&PTR_PTR_006323b8)[uVar3];
    uVar1 = *(undefined1 *)(puVar2 + 2);
    FUN_0042f239();
    iVar4 = FUN_004083b5(uVar1);
    if (iVar4 != -1) {
      FUN_00408276(iVar4,&DAT_00632602,4,iVar4);
      FUN_00408387(iVar4);
      if (DAT_00632602 == 0x78787878) {
        *puVar2 = 0;
      }
    }
    uVar3 = uVar3 + 1;
  } while (uVar3 < 0xf);
  return;
}

