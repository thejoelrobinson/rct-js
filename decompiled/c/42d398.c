
void FUN_0042d398(void)

{
  uint in_ECX;
  char unaff_BL;
  int unaff_ESI;
  undefined1 uVar1;
  bool bVar2;
  
  if (unaff_BL == '\x01') {
    FUN_0044a4e8();
    return;
  }
  if (unaff_BL == '\x02') {
    FUN_00440072();
    return;
  }
  if (unaff_BL == '\x03') {
    FUN_00455bce();
    return;
  }
  if (unaff_BL == '\x04') {
    FUN_00443e98();
    (**(code **)(unaff_ESI + 4))();
    return;
  }
  if (unaff_BL == '\x06') {
    if (0x2ffff < in_ECX) {
      FUN_0044eff2();
      FUN_0044f03b(in_ECX);
      return;
    }
    if (in_ECX < 0x20000) {
      if (in_ECX < 0x10000) {
        bVar2 = true;
        FUN_005e5fcb();
        if (bVar2) {
          uVar1 = 0;
          bVar2 = true;
          FUN_005e3b2b();
          if (!bVar2) {
            FUN_005e43de();
            FUN_005e680e();
            if (!(bool)uVar1) {
              DAT_00991f30 = DAT_00991f30 | 0x40;
              FUN_005de5a7();
            }
          }
        }
        FUN_005de5ff(in_ECX);
        return;
      }
      FUN_0044eff2();
      FUN_0044f03b(in_ECX);
      return;
    }
    FUN_0044eff2();
    FUN_0044f03b(in_ECX);
    return;
  }
  if (unaff_BL == '\a') {
    FUN_004406bd();
    return;
  }
  if (unaff_BL != '\b') {
    return;
  }
  FUN_00427410();
  return;
}

