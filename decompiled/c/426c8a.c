
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00426c8a(void)

{
  undefined1 uVar1;
  ushort uVar2;
  short sVar3;
  ushort uVar4;
  ushort extraout_var;
  ushort extraout_var_00;
  char cVar5;
  byte bVar6;
  uint uVar7;
  int unaff_ESI;
  
  if ((DAT_0088741c & 0x1ff) == 0) {
    DAT_0087cc88 = FUN_00428ec0();
    DAT_0087d514 = FUN_004292b0();
    DAT_0087d724 = FUN_0042934f();
    FUN_005e5301();
    DAT_0087d0c4 = FUN_00426b73();
    _DAT_005f54ec = _DAT_005f54ec | 0x10;
    FUN_005e5301();
  }
  uVar2 = FUN_005df40c();
  if (uVar2 < DAT_0087d0c4) {
    FUN_005df40c();
    sVar3 = DAT_0087c3ca;
    bVar6 = DAT_0087c3cf;
    if ((DAT_0087c3d0 != -1) && ((extraout_var & 8) != 0)) {
      sVar3 = DAT_0087c3d0;
      bVar6 = DAT_0087c3d5;
    }
    if (sVar3 != -1) {
      FUN_004410df();
      if (unaff_ESI != 0) {
        *(byte *)(unaff_ESI + 0x1e) = (bVar6 ^ 2) << 3;
        *(ushort *)(unaff_ESI + 0x32) = (*(ushort *)(unaff_ESI + 0xe) & 0xffe0) + 0x10;
        *(ushort *)(unaff_ESI + 0x34) = (*(ushort *)(unaff_ESI + 0x10) & 0xffe0) + 0x10;
        *(undefined1 *)(unaff_ESI + 0x36) = 5;
        *(undefined1 *)(unaff_ESI + 0x76) = 0;
        *(byte *)(unaff_ESI + 0x78) = bVar6 ^ 2;
        *(undefined1 *)(unaff_ESI + 0x37) = 0;
        *(undefined1 *)(unaff_ESI + 0x2b) = 0xd;
      }
    }
  }
  uVar7 = 0;
  do {
    if ((&DAT_0087d0da)[uVar7] != '\0') {
      uVar4 = FUN_005df40c();
      uVar2 = (&DAT_00630874)[uVar7];
      cVar5 = (char)uVar7;
      if ((cVar5 == '\0') && (DAT_0087c3c0 < 4)) {
        uVar2 = uVar2 >> 3;
      }
      if ((cVar5 == '\x02') && (DAT_0087c3c0 < 6)) {
        uVar2 = uVar2 >> 3;
      }
      if ((cVar5 == '\x01') &&
         ((ushort)(&DAT_00887508)[(uint)(byte)(&DAT_0087d0ee)[uVar7] * 0x130] < 3)) {
        uVar2 = uVar2 >> 3;
      }
      if (uVar4 < uVar2) {
        FUN_005df40c();
        bVar6 = DAT_0087c3cf;
        sVar3 = DAT_0087c3ca;
        if ((DAT_0087c3d0 != -1) && ((extraout_var_00 & 8) != 0)) {
          bVar6 = DAT_0087c3d5;
          sVar3 = DAT_0087c3d0;
        }
        if (sVar3 != -1) {
          FUN_004410df();
          if (unaff_ESI != 0) {
            *(byte *)(unaff_ESI + 0x1e) = (bVar6 ^ 2) << 3;
            *(ushort *)(unaff_ESI + 0x32) = (*(ushort *)(unaff_ESI + 0xe) & 0xffe0) + 0x10;
            *(ushort *)(unaff_ESI + 0x34) = (*(ushort *)(unaff_ESI + 0x10) & 0xffe0) + 0x10;
            *(undefined1 *)(unaff_ESI + 0x36) = 5;
            *(undefined1 *)(unaff_ESI + 0x76) = 0;
            *(byte *)(unaff_ESI + 0x78) = bVar6 ^ 2;
            *(undefined1 *)(unaff_ESI + 0x37) = 0;
            *(undefined1 *)(unaff_ESI + 0x2b) = 0xd;
            switch(uVar7) {
            default:
              *(ushort *)(unaff_ESI + 0xca) = *(ushort *)(unaff_ESI + 0xca) | 0x4000;
              *(undefined1 *)(unaff_ESI + 0xf0) = 0;
              break;
            case 1:
              *(ushort *)(unaff_ESI + 0xca) = *(ushort *)(unaff_ESI + 0xca) | 0x4000;
              *(undefined1 *)(unaff_ESI + 0xf0) = 1;
              uVar1 = (&DAT_0087d0ee)[uVar7];
              *(undefined1 *)(unaff_ESI + 0xf1) = uVar1;
              *(undefined1 *)(unaff_ESI + 0xc5) = uVar1;
              *(undefined1 *)(unaff_ESI + 0xc6) = 0xf0;
              break;
            case 2:
              *(ushort *)(unaff_ESI + 0xca) = *(ushort *)(unaff_ESI + 0xca) | 0x4000;
              *(undefined1 *)(unaff_ESI + 0xf0) = 2;
              break;
            case 3:
              *(ushort *)(unaff_ESI + 0xca) = *(ushort *)(unaff_ESI + 0xca) | 0x4000;
              *(undefined1 *)(unaff_ESI + 0xf0) = 3;
              *(undefined1 *)(unaff_ESI + 0xf1) = (&DAT_0087d0ee)[uVar7];
              break;
            case 4:
              break;
            case 5:
              *(undefined1 *)(unaff_ESI + 0xc5) = (&DAT_0087d0ee)[uVar7];
              *(undefined1 *)(unaff_ESI + 0xc6) = 0xf0;
            }
          }
        }
      }
    }
    uVar7 = uVar7 + 1;
  } while (uVar7 < 6);
  return;
}

