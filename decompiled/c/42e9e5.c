
short FUN_0042e9e5(void)

{
  short sVar1;
  undefined4 extraout_ECX;
  undefined4 extraout_ECX_00;
  short extraout_var;
  short extraout_var_00;
  char cVar2;
  char cVar3;
  ushort uVar4;
  short sVar5;
  bool bVar6;
  undefined4 uVar7;
  
  FUN_005df40c();
  bVar6 = false;
  sVar1 = FUN_00425432();
  if (!bVar6) {
    sVar1 = FUN_00423677();
    if (extraout_var != 0) {
      uVar4 = 0;
      cVar2 = '\a';
      uVar7 = extraout_ECX;
      do {
        cVar3 = '\a';
        do {
          FUN_00423677(uVar7);
          if (extraout_var_00 == extraout_var) {
            uVar4 = uVar4 + 1;
          }
          cVar3 = cVar3 + -1;
        } while (cVar3 != '\0');
        cVar2 = cVar2 + -1;
      } while (cVar2 != '\0');
      if (0x18 < uVar4) {
        uVar4 = FUN_005df40c();
        sVar5 = (uVar4 & 3) + 2;
        do {
          FUN_005df40c();
          FUN_0042e94d(extraout_ECX_00);
          sVar5 = sVar5 + -1;
        } while (sVar5 != 0);
        return sVar1 + 0x10;
      }
    }
  }
  return sVar1;
}

