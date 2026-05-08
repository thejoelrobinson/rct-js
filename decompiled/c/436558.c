
void FUN_00436558(void)

{
  byte *pbVar1;
  int iVar2;
  undefined4 *puVar3;
  undefined4 *puVar4;
  
  DAT_00981ef4 = &DAT_006e3b90;
  puVar4 = &DAT_00971ef4;
  iVar2 = 0x4000;
  do {
    *puVar4 = DAT_00981ef4;
    puVar4 = puVar4 + 1;
    puVar3 = DAT_00981ef4;
    do {
      DAT_00981ef4 = puVar3 + 2;
      pbVar1 = (byte *)((int)puVar3 + 1);
      puVar3 = DAT_00981ef4;
    } while ((*pbVar1 & 0x80) == 0);
    iVar2 = iVar2 + -1;
  } while (iVar2 != 0);
  return;
}

