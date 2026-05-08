
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00433f8b(void)

{
  ushort uVar1;
  char cVar2;
  int unaff_EBP;
  
  if (DAT_0099c164 != '\0') {
    cVar2 = (char)*(undefined2 *)(unaff_EBP + 0x24);
    if (cVar2 == '\x01') {
      uVar1 = _DAT_0062891c & 1;
    }
    else if (cVar2 == '\x02') {
      uVar1 = _DAT_0062891c & 2;
    }
    else if (cVar2 == '\x03') {
      uVar1 = _DAT_0062891c & 4;
    }
    else if (cVar2 == '\x04') {
      uVar1 = _DAT_0062891c & 8;
    }
    else if (cVar2 == '\x05') {
      uVar1 = _DAT_0062891c & 0x10;
    }
    else if (cVar2 == '\x06') {
      uVar1 = _DAT_0062891c & 0x20;
    }
    else if (cVar2 == '\a') {
      uVar1 = _DAT_0062891c & 0x40;
    }
    else if (cVar2 == '\b') {
      uVar1 = _DAT_0062891c & 0x80;
    }
    else if (cVar2 == '\t') {
      uVar1 = _DAT_0062891c & 0x100;
    }
    else {
      if (cVar2 != '\n') {
        return;
      }
      uVar1 = _DAT_0062891c & 0x200;
    }
    if (uVar1 == 0) {
      _DAT_00628914 = *(undefined4 *)(unaff_EBP + 0x28);
      DAT_00628918 = *(undefined4 *)(unaff_EBP + 0x2c);
      _DAT_00628910 = *(undefined2 *)(unaff_EBP + 0x24);
    }
  }
  return;
}

