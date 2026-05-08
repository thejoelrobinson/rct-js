
undefined4 FUN_004420e0(void)

{
  byte bVar1;
  undefined4 in_EAX;
  undefined4 extraout_ECX;
  int unaff_ESI;
  undefined8 uVar2;
  
  if (*(char *)(unaff_ESI + 0x2d) == '\x10') {
    uVar2 = FUN_005df40c();
    if ((ushort)uVar2 < 0x148) {
      if ((ushort)((ulonglong)uVar2 >> 0x10) < 0x3334) {
        FUN_00452fce((int)((ulonglong)uVar2 >> 0x20),extraout_ECX,1,(uint)uVar2 >> 0x10);
      }
      if (*(short *)(unaff_ESI + 0xe) != -0x8000) {
        FUN_0042dfd1();
      }
      *(ushort *)(unaff_ESI + 0xca) = *(ushort *)(unaff_ESI + 0xca) & 0xfffe;
      *(byte *)(unaff_ESI + 0x45) = *(byte *)(unaff_ESI + 0x45) | 8;
    }
  }
  if ((DAT_008d7eb6 == '\0') || ((*(ushort *)(unaff_ESI + 0xca) >> 4 & 1) == 0)) {
    if ((*(ushort *)(unaff_ESI + 0xca) >> 8 & 1) == 0) {
      if ((*(ushort *)(unaff_ESI + 0xca) >> 7 & 1) == 0) {
        if ((*(ushort *)(unaff_ESI + 0xca) >> 0xd & 1) == 0) {
          if ((*(ushort *)(unaff_ESI + 0xca) >> 6 & 1) == 0) {
            if ((*(ushort *)(unaff_ESI + 0xca) >> 5 & 1) == 0) {
              if ((*(ushort *)(unaff_ESI + 0xca) >> 9 & 1) == 0) {
                if (*(short *)(unaff_ESI + 0xca) < 0) {
                  bVar1 = 0x15;
                }
                else if ((*(ushort *)(unaff_ESI + 0xca) & 1) == 0) {
                  if (*(byte *)(unaff_ESI + 0x3c) < 0xab) {
                    if (*(byte *)(unaff_ESI + 0x3c) < 0x8d) {
                      if ((*(byte *)(unaff_ESI + 0x38) < 0x41) &&
                         (*(byte *)(unaff_ESI + 0x3a) < 0x80)) {
                        bVar1 = 0x17;
                      }
                      else if ((*(byte *)(unaff_ESI + 0x38) < 0x51) &&
                              (*(byte *)(unaff_ESI + 0x3a) < 0x80)) {
                        bVar1 = 0x16;
                      }
                      else if (*(byte *)(unaff_ESI + 0x40) < 0xdd) {
                        bVar1 = 0;
                      }
                      else {
                        bVar1 = 0x1a;
                      }
                    }
                    else {
                      bVar1 = 0x18;
                    }
                  }
                  else {
                    bVar1 = 0x19;
                  }
                }
                else {
                  bVar1 = 0x10;
                }
              }
              else {
                bVar1 = 0x11;
              }
            }
            else {
              bVar1 = 0xf;
            }
          }
          else {
            bVar1 = 0xe;
          }
        }
        else {
          bVar1 = 0x13;
        }
      }
      else {
        bVar1 = 0xd;
      }
    }
    else {
      bVar1 = 0xc;
    }
  }
  else {
    bVar1 = 0x12;
  }
  if (bVar1 != *(byte *)(unaff_ESI + 0x2d)) {
    *(byte *)(unaff_ESI + 0x2d) = bVar1;
    *(undefined1 *)(unaff_ESI + 0x70) = 0;
    *(undefined1 *)(unaff_ESI + 0xe0) = 0;
    if (*(byte *)(unaff_ESI + 0x71) < 0xfe) {
      *(undefined1 *)(unaff_ESI + 0x71) = 0xff;
    }
    *(ushort *)(unaff_ESI + 200) = *(ushort *)(unaff_ESI + 200) & 0xfffd;
    if (((&DAT_0062d564)[bVar1] & 1) != 0) {
      *(ushort *)(unaff_ESI + 200) = *(ushort *)(unaff_ESI + 200) | 2;
    }
    *(undefined1 *)(unaff_ESI + 0x6e) = 0xff;
    FUN_0043c60b();
    if (*(char *)(unaff_ESI + 0x2b) == '\b') {
      *(undefined1 *)(unaff_ESI + 0x71) = 0xfe;
      *(undefined1 *)(unaff_ESI + 0x6f) = 7;
      FUN_0043c65e();
    }
  }
  return in_EAX;
}

