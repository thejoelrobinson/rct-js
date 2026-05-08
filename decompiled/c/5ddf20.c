
void FUN_005ddf20(void)

{
  uint uVar1;
  
  DAT_006e1eaa = 0;
  DAT_006e1ec3 = 2;
  DAT_006e1ec4 = 0x18;
  DAT_006e1ec5 = 6;
  FUN_005dde9c();
  uVar1 = 0;
  do {
    (&DAT_006e1eab)[uVar1] = *(undefined2 *)(&PTR_DAT_006e2758)[uVar1];
    uVar1 = uVar1 + 1;
  } while (uVar1 < 0xc);
  return;
}

