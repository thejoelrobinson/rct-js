
void FUN_00443f36(void)

{
  undefined4 uVar1;
  int iVar2;
  int iVar3;
  
  iVar3 = 0x348;
  do {
    iVar2 = iVar3 + -4;
    LOCK();
    uVar1 = *(undefined4 *)((int)&DAT_0087c81c + iVar3);
    *(undefined4 *)((int)&DAT_0087c81c + iVar3) = 0;
    UNLOCK();
    *(undefined4 *)(iVar3 + 0x87c854) = uVar1;
    iVar3 = iVar2;
  } while (iVar2 != 0);
  FUN_005e5301();
  return;
}

