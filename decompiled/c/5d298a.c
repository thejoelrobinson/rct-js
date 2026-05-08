
/* WARNING: Type propagation algorithm not settling */

ushort FUN_005d298a(void)

{
  uint3 uVar1;
  ushort uVar2;
  char cVar3;
  char cVar5;
  short sVar4;
  byte bVar7;
  uint uVar6;
  char cVar8;
  short sVar9;
  char cVar10;
  int iVar11;
  
  sVar9 = CONCAT11(DAT_00652295,DAT_0065229a);
  sVar4 = CONCAT11(DAT_00652296,DAT_00652299);
  if (DAT_00652288 == '\x02') {
    sVar9 = CONCAT11(DAT_0065229a,DAT_00652295);
    sVar4 = CONCAT11(DAT_00652299,DAT_00652296);
  }
  uVar2 = (ushort)DAT_00652294;
  if (DAT_00652294 == 0xff) {
    return 0xff;
  }
  cVar8 = (char)sVar9;
  cVar10 = (char)((ushort)sVar9 >> 8);
  cVar5 = (char)((ushort)sVar4 >> 8);
  if (DAT_00652294 == 0) {
    cVar3 = (char)sVar4;
    if (DAT_00652290 < 4) {
      if (cVar8 == cVar10) {
        if (cVar8 == '\0') {
          if (cVar3 == cVar5) {
            uVar1 = 0;
            if ((cVar3 != '\0') && (uVar1 = 0x20, cVar3 != '\x02')) {
              uVar1 = 0x21;
            }
          }
          else if (cVar3 == '\0') {
            uVar1 = 0x12;
            if (cVar5 != '\x02') {
              uVar1 = 0x13;
            }
          }
          else {
            if (cVar5 != '\0') {
              return 0;
            }
            uVar1 = 0x14;
            if (cVar3 != '\x02') {
              uVar1 = 0x15;
            }
          }
          goto LAB_005d30ff;
        }
        uVar1 = 4;
        if ((((cVar8 == '\x02') || (uVar1 = 5, cVar8 == '\x04')) || (uVar1 = 10, cVar8 == '\x06'))
           || ((uVar1 = 0xb, cVar8 == '\b' || (uVar1 = 0x7e, cVar8 == '\n')))) goto LAB_005d30ff;
        uVar1 = 0x7f;
        cVar10 = cVar8;
      }
      else {
        if (((cVar8 == '\x12') && (uVar1 = 0x81, cVar10 == '\b')) ||
           ((cVar8 == '\n' && (uVar1 = 0x82, cVar10 == '\x04')))) goto LAB_005d30ff;
        uVar1 = 0xe;
        if (cVar8 != '\b') {
          if (cVar8 == '\x06') {
            uVar1 = 0xd;
            if (cVar10 != '\b') {
              if (cVar10 != '\0') {
                return 0;
              }
              uVar1 = 0xf;
              if ((cVar5 != '\0') && (uVar1 = 0x1e, cVar5 != '\x02')) {
                uVar1 = 0x1f;
              }
            }
            goto LAB_005d30ff;
          }
          if (cVar8 == '\0') {
            if (cVar10 == '\x06') {
              uVar1 = 0xc;
              if ((cVar3 != '\0') && (uVar1 = 0x1c, cVar3 != '\x02')) {
                uVar1 = 0x1d;
              }
            }
            else {
              uVar1 = 0x3e;
              if ((cVar10 != '\x04') && (uVar1 = 0x40, cVar10 != '\b')) {
                if (cVar10 != '\x02') {
                  return 0;
                }
                uVar1 = 6;
                if ((cVar3 != '\0') && (uVar1 = 0x18, cVar3 != '\x02')) {
                  uVar1 = 0x19;
                }
              }
            }
            goto LAB_005d30ff;
          }
          uVar1 = 8;
          if (cVar8 == '\x04') {
            if (((cVar10 != '\x02') && (uVar1 = 0x3f, cVar10 != '\0')) &&
               (uVar1 = 0x80, cVar10 != '\n')) {
              return 0;
            }
            goto LAB_005d30ff;
          }
          uVar1 = 7;
          if (cVar10 != '\x04') {
            uVar1 = 9;
            if (cVar10 != '\0') {
              return 0;
            }
            if ((cVar5 != '\0') && (uVar1 = 0x1a, cVar5 != '\x02')) {
              uVar1 = 0x1b;
            }
            goto LAB_005d30ff;
          }
joined_r0x005d2d01:
          if (cVar8 != '\x02') {
            return uVar2;
          }
          goto LAB_005d30ff;
        }
        if ((cVar10 == '\x06') || (uVar1 = 0x41, cVar10 == '\0')) goto LAB_005d30ff;
        uVar1 = 0x83;
      }
      if (cVar10 != '\x12') {
        return 0;
      }
      goto LAB_005d30ff;
    }
    if (cVar8 == cVar10) {
      if (cVar8 == '\0') {
        if (cVar3 == cVar5) {
          uVar1 = 0x8d;
          if ((cVar3 != '\0') && (uVar1 = 0xaa, cVar3 != '\x02')) {
            uVar1 = 0xab;
          }
        }
        else if (cVar3 == '\0') {
          uVar1 = 0x9e;
          if (cVar5 != '\x02') {
            uVar1 = 0x9f;
          }
        }
        else {
          if (cVar5 != '\0') {
            return 0;
          }
          uVar1 = 0xa0;
          if (cVar3 != '\x02') {
            uVar1 = 0xa1;
          }
        }
      }
      else {
        uVar1 = 0x8e;
        if ((((cVar8 != '\x02') && (uVar1 = 0x8f, cVar8 != '\x04')) &&
            (uVar1 = 0x94, cVar8 != '\x06')) && (uVar1 = 0x95, cVar8 != '\b')) {
          return 0;
        }
      }
      goto LAB_005d30ff;
    }
    if ((cVar8 == '\x12') && (cVar10 == '\b')) {
      return 0;
    }
    if ((cVar8 == '\n') && (cVar10 == '\x04')) {
      return 0;
    }
    uVar1 = 0x98;
    if (cVar8 == '\b') {
      if (cVar10 == '\x06') goto LAB_005d30ff;
      uVar1 = 0x9d;
      cVar5 = cVar10;
    }
    else {
      if (cVar8 == '\x06') {
        uVar1 = 0x97;
        if (cVar10 != '\b') {
          if (cVar10 != '\0') {
            return 0;
          }
          uVar1 = 0x99;
          if ((cVar5 != '\0') && (uVar1 = 0xa8, cVar5 != '\x02')) {
            uVar1 = 0xa9;
          }
        }
        goto LAB_005d30ff;
      }
      if (cVar8 == '\0') {
        if (cVar10 == '\x06') {
          uVar1 = 0x96;
          if ((cVar3 != '\0') && (uVar1 = 0xa6, cVar3 != '\x02')) {
            uVar1 = 0xa7;
          }
        }
        else {
          uVar1 = 0x9a;
          if ((cVar10 != '\x04') && (uVar1 = 0x9c, cVar10 != '\b')) {
            if (cVar10 != '\x02') {
              return 0;
            }
            uVar1 = 0x90;
            if ((cVar3 != '\0') && (uVar1 = 0xa2, cVar3 != '\x02')) {
              uVar1 = 0xa3;
            }
          }
        }
        goto LAB_005d30ff;
      }
      uVar1 = 0x92;
      if (cVar8 != '\x04') {
        uVar1 = 0x91;
        if (cVar10 != '\x04') {
          uVar1 = 0x93;
          if (cVar10 != '\0') {
            return 0;
          }
          if ((cVar5 != '\0') && (uVar1 = 0xa4, cVar5 != '\x02')) {
            uVar1 = 0xa5;
          }
          goto LAB_005d30ff;
        }
        goto joined_r0x005d2d01;
      }
      if (cVar10 == '\x02') goto LAB_005d30ff;
      uVar1 = 0x9b;
      cVar5 = cVar10;
    }
  }
  else {
    if (DAT_00652294 == 1) {
      if (cVar8 != cVar10) {
        return 1;
      }
      if (cVar8 == '\x04') {
        return 1;
      }
      if (cVar8 == '\b') {
        return 1;
      }
      uVar1 = 0x24;
      if (((cVar10 != '\x06') && (uVar1 = 0x22, cVar10 != '\x02')) && (uVar1 = 0x10, cVar5 != '\0'))
      {
        uVar1 = 0x16;
      }
      goto LAB_005d30ff;
    }
    if (DAT_00652294 < 3) {
      if (cVar8 != cVar10) {
        return uVar2;
      }
      if (cVar8 == '\x04') {
        return uVar2;
      }
      if (cVar8 == '\b') {
        return uVar2;
      }
      uVar1 = 0x25;
      if (((cVar10 != '\x06') && (uVar1 = 0x23, cVar10 != '\x02')) && (uVar1 = 0x11, cVar5 != '\0'))
      {
        uVar1 = 0x17;
      }
      goto LAB_005d30ff;
    }
    if (DAT_00652294 == 3) {
      if (cVar8 != cVar10) {
        return 3;
      }
      uVar1 = 0x61;
      if (((cVar10 != '\b') && (uVar1 = 0x5f, cVar10 != '\x04')) &&
         ((uVar1 = 0x30, cVar10 != '\x06' &&
          ((uVar1 = 0x2e, cVar10 != '\x02' && (uVar1 = 0x2a, cVar5 != '\0')))))) {
        uVar1 = 0x2c;
      }
      goto LAB_005d30ff;
    }
    if (DAT_00652294 < 5) {
      if (cVar8 != cVar10) {
        return uVar2;
      }
      uVar1 = 0x62;
      if ((((cVar10 != '\b') && (uVar1 = 0x60, cVar10 != '\x04')) &&
          (uVar1 = 0x31, cVar10 != '\x06')) &&
         ((uVar1 = 0x2f, cVar10 != '\x02' && (uVar1 = 0x2b, cVar5 != '\0')))) {
        uVar1 = 0x2d;
      }
      goto LAB_005d30ff;
    }
    if (DAT_00652294 == 5) {
      if (cVar8 != cVar10) {
        return 5;
      }
      if (cVar8 == '\x02') {
        return 5;
      }
      if (cVar8 == '\x06') {
        return 5;
      }
      uVar1 = 0x61;
      if ((cVar10 == '\b') || (uVar1 = 0x5f, cVar10 == '\x04')) goto LAB_005d30ff;
      uVar1 = 0x32;
    }
    else {
      if (DAT_00652294 != 6) {
        if (DAT_00652294 < 8) {
          bVar7 = DAT_00652290;
          if (DAT_00652288 == '\x02') {
            bVar7 = DAT_00652290 ^ 4;
          }
          if ((bVar7 & 4) == 0) {
            if (cVar8 != cVar10) {
              return uVar2;
            }
            if (cVar8 == '\x04') {
              return uVar2;
            }
            if (cVar8 == '\b') {
              return uVar2;
            }
            if (cVar10 == '\x06') {
              return uVar2;
            }
            if (cVar10 == '\x02') {
              return uVar2;
            }
            uVar1 = 0x85;
            if (cVar5 != '\0') {
              uVar1 = 0x89;
            }
          }
          else {
            if (cVar8 != cVar10) {
              return uVar2;
            }
            if (cVar8 == '\x04') {
              return uVar2;
            }
            if (cVar8 == '\b') {
              return uVar2;
            }
            if (cVar10 == '\x06') {
              return uVar2;
            }
            if (cVar10 == '\x02') {
              return uVar2;
            }
            uVar1 = 0x87;
            if (cVar5 != '\0') {
              uVar1 = 0x8b;
            }
          }
          goto LAB_005d30ff;
        }
        if (DAT_00652294 == 8) {
          bVar7 = DAT_00652290;
          if (DAT_00652288 == '\x02') {
            bVar7 = DAT_00652290 ^ 4;
          }
          if ((bVar7 & 4) == 0) {
            if (cVar8 != cVar10) {
              return 8;
            }
            if (cVar8 == '\x04') {
              return 8;
            }
            if (cVar8 == '\b') {
              return 8;
            }
            if (cVar10 == '\x06') {
              return 8;
            }
            if (cVar10 == '\x02') {
              return 8;
            }
            uVar1 = 0x86;
            if (cVar5 != '\0') {
              uVar1 = 0x8a;
            }
          }
          else {
            if (cVar8 != cVar10) {
              return 8;
            }
            if (cVar8 == '\x04') {
              return 8;
            }
            if (cVar8 == '\b') {
              return 8;
            }
            if (cVar10 == '\x06') {
              return 8;
            }
            if (cVar10 == '\x02') {
              return 8;
            }
            uVar1 = 0x88;
            if (cVar5 != '\0') {
              uVar1 = 0x8c;
            }
          }
          goto LAB_005d30ff;
        }
        bVar7 = DAT_00652294 - 0x10;
        uVar1 = (uint3)bVar7;
        if (((bVar7 == 1) || (bVar7 == 0x26)) || (bVar7 == 0x27)) {
          if (sVar9 != 0) {
            return uVar2;
          }
          if (sVar4 != 0) {
            return uVar2;
          }
          goto LAB_005d30ff;
        }
        if ((bVar7 != 0x28) && (bVar7 != 0x29)) goto LAB_005d30ff;
        if (sVar4 != 0) {
          return uVar2;
        }
        if (DAT_00652288 == '\x02') {
          if (cVar10 != '\x06') {
            return uVar2;
          }
          goto LAB_005d30ff;
        }
        goto joined_r0x005d2d01;
      }
      if (cVar8 != cVar10) {
        return 6;
      }
      if (cVar8 == '\x02') {
        return 6;
      }
      if (cVar8 == '\x06') {
        return 6;
      }
      uVar1 = 0x62;
      if ((cVar10 == '\b') || (uVar1 = 0x60, cVar10 == '\x04')) goto LAB_005d30ff;
      uVar1 = 0x33;
    }
  }
  if (cVar5 != '\0') {
    return uVar2;
  }
LAB_005d30ff:
  uVar6 = CONCAT31(uVar1,DAT_00652289);
  if (((*(uint *)(&DAT_005f5b78 + (uint)(byte)(&DAT_00887420)[(uint)DAT_00652289 * 0x260] * 8) &
       0x1000) != 0) && (DAT_00652298 != '\0')) {
    uVar6 = (uint)(byte)(&DAT_00656498)[uVar1] << 8;
  }
  iVar11 = (uVar6 >> 8) * 10;
  uVar2 = DAT_0065228a;
  if (DAT_00652288 == '\x02') {
    sVar4 = *(short *)(&DAT_00653efd + iVar11);
    switch(((DAT_00652290 ^ 2) - (&DAT_00653ef8)[iVar11]) + (&DAT_00653ef7)[iVar11] & 3) {
    case 0:
      sVar4 = -*(short *)(&DAT_00653efd + iVar11);
      break;
    case 1:
      sVar4 = -*(short *)(&DAT_00653eff + iVar11);
      break;
    case 3:
      sVar4 = *(short *)(&DAT_00653eff + iVar11);
    }
    uVar2 = sVar4 + DAT_0065228a;
  }
  if (((((uint)(&DAT_0087c41c)[(byte)(&DAT_00887420)[(uint)DAT_00652289 * 0x260]] >> 5 & 1) == 0) &&
      ((*(ushort *)(&DAT_00652309 + (uVar6 >> 8) * 2) & 0x2000) != 0)) ||
     ((*(ushort *)(&DAT_00652309 + (uVar6 >> 8) * 2) & 0x1000) == 0)) {
    DAT_00652297 = DAT_00652297 & 0xfe;
  }
  return uVar2;
}

