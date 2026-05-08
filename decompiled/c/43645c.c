
void FUN_0043645c(void)

{
  int iVar1;
  undefined4 *puVar2;
  
  FUN_0045aaf8();
  DAT_008ae938 = 0;
  DAT_00743b90 = 0;
  puVar2 = &DAT_006e3b90;
  iVar1 = 0x4000;
  do {
    *(undefined1 *)puVar2 = 0;
    *(undefined1 *)((int)puVar2 + 1) = 0x80;
    *(undefined1 *)((int)puVar2 + 2) = 4;
    *(undefined1 *)((int)puVar2 + 3) = 0;
    *(undefined1 *)(puVar2 + 1) = 0;
    *(undefined1 *)((int)puVar2 + 5) = 0;
    *(undefined1 *)((int)puVar2 + 6) = 1;
    *(undefined1 *)((int)puVar2 + 7) = 0;
    puVar2 = puVar2 + 2;
    iVar1 = iVar1 + -1;
  } while (iVar1 != 0);
  DAT_008d4228 = 0;
  FUN_00436558();
  FUN_00436d2d();
  FUN_005e06cc();
  FUN_0045abea();
  return;
}

