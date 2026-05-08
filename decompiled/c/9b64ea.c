
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_009b64ea(void)

{
  byte bVar1;
  int iVar2;
  byte bVar3;
  undefined4 in_EAX;
  ushort uVar4;
  ushort uVar5;
  short sVar6;
  undefined2 uVar9;
  uint uVar7;
  int iVar8;
  int in_EDX;
  uint unaff_EBX;
  uint uVar10;
  int unaff_EBP;
  byte *unaff_ESI;
  byte *pbVar11;
  byte *unaff_EDI;
  byte *pbVar12;
  
  iVar2 = DAT_009a200c;
  bVar3 = (byte)((uint)in_EAX >> 8);
  sVar6 = (short)in_EDX;
  if ((unaff_EBX & 0x20000000) == 0) {
    if ((unaff_EBX & 0x40000000) == 0) {
      if ((_DAT_009a201c & 1) == 0) {
        return;
      }
      bVar3 = bVar3 >> 1;
      if (bVar3 != 0) {
        uVar4 = DAT_009a2028 + sVar6;
        uVar5 = DAT_009a2028 & 1;
        if (DAT_009a2028 >> 1 != 0) {
          uVar10 = (uint)(DAT_009a2028 >> 1);
          uVar7 = uVar10;
LAB_009b661e:
          do {
            if (*unaff_ESI != 0) {
              *unaff_EDI = *unaff_ESI;
            }
            sVar6 = (short)uVar7;
            pbVar11 = unaff_ESI + 2;
            pbVar12 = unaff_EDI + 1;
            if (sVar6 != 1) {
              bVar1 = unaff_ESI[2];
              if (bVar1 != 0) {
                unaff_EDI[1] = bVar1;
              }
              pbVar11 = unaff_ESI + 4;
              pbVar12 = unaff_EDI + 2;
              if (sVar6 != 2) {
                bVar1 = unaff_ESI[4];
                if (bVar1 != 0) {
                  unaff_EDI[2] = bVar1;
                }
                pbVar11 = unaff_ESI + 6;
                pbVar12 = unaff_EDI + 3;
                if (sVar6 != 3) {
                  bVar1 = unaff_ESI[6];
                  unaff_ESI = unaff_ESI + 8;
                  if (bVar1 != 0) {
                    unaff_EDI[3] = bVar1;
                  }
                  unaff_EDI = unaff_EDI + 4;
                  uVar7 = (uint)(ushort)(sVar6 - 4U);
                  pbVar11 = unaff_ESI;
                  pbVar12 = unaff_EDI;
                  if ((ushort)(sVar6 - 4U) != 0) goto LAB_009b661e;
                }
              }
            }
            unaff_ESI = pbVar11 + in_EDX + (uint)uVar4 + (uint)uVar5;
            unaff_EDI = pbVar12 + (unaff_EBP - uVar10);
            bVar3 = bVar3 - 1;
            uVar7 = uVar10;
          } while (bVar3 != 0);
        }
      }
    }
    else if (((_DAT_009a201c & 1) != 0) && (bVar3 >> 1 != 0)) {
      uVar4 = DAT_009a2028 + sVar6;
      uVar5 = DAT_009a2028 & 1;
      if (DAT_009a2028 >> 1 != 0) {
        _DAT_009a2028 = CONCAT22(DAT_009a2028_2,DAT_009a2028 >> 1);
        iVar8 = (uint)(ushort)((bVar3 >> 1) - 1) << 0x10;
        do {
          iVar8 = CONCAT22((short)((uint)iVar8 >> 0x10),DAT_009a2028);
          do {
            if (*unaff_ESI != 0) {
              *unaff_EDI = *(byte *)((uint)*unaff_EDI + iVar2);
            }
            pbVar12 = unaff_EDI + 1;
            sVar6 = (short)iVar8;
            uVar9 = (undefined2)((uint)iVar8 >> 0x10);
            iVar8 = CONCAT22(uVar9,sVar6 + -1);
            pbVar11 = unaff_ESI + 2;
            if ((short)(sVar6 + -1) == 0) break;
            if (unaff_ESI[2] != 0) {
              *pbVar12 = *(byte *)((uint)*pbVar12 + iVar2);
            }
            pbVar12 = unaff_EDI + 2;
            iVar8 = CONCAT22(uVar9,sVar6 + -2);
            pbVar11 = unaff_ESI + 4;
            if ((short)(sVar6 + -2) == 0) break;
            pbVar11 = unaff_ESI + 6;
            if (unaff_ESI[4] != 0) {
              *pbVar12 = *(byte *)((uint)*pbVar12 + iVar2);
            }
            pbVar12 = unaff_EDI + 3;
            iVar8 = CONCAT22(uVar9,sVar6 + -3);
            if ((short)(sVar6 + -3) == 0) break;
            unaff_ESI = unaff_ESI + 8;
            if (*pbVar11 != 0) {
              *pbVar12 = *(byte *)((uint)*pbVar12 + iVar2);
            }
            unaff_EDI = unaff_EDI + 4;
            iVar8 = CONCAT22(uVar9,sVar6 + -4);
            pbVar11 = unaff_ESI;
            pbVar12 = unaff_EDI;
          } while ((short)(sVar6 + -4) != 0);
          unaff_ESI = pbVar11 + in_EDX + (uint)uVar4 + (uint)uVar5;
          unaff_EDI = pbVar12 + (unaff_EBP - _DAT_009a2028);
          iVar8 = iVar8 + -0x10000;
          if (iVar8 < 0) {
            return;
          }
        } while( true );
      }
    }
  }
  else {
    if ((_DAT_009a201c & 1) == 0) {
      return;
    }
    if (bVar3 >> 1 != 0) {
      uVar4 = DAT_009a2028 + sVar6;
      uVar5 = DAT_009a2028 & 1;
      if (DAT_009a2028 >> 1 != 0) {
        _DAT_009a2028 = CONCAT22(DAT_009a2028_2,DAT_009a2028 >> 1);
        iVar8 = (uint)(ushort)((bVar3 >> 1) - 1) << 0x10;
        do {
          iVar8 = CONCAT22((short)((uint)iVar8 >> 0x10),DAT_009a2028);
          do {
            if (*(byte *)((uint)*unaff_ESI + iVar2) != 0) {
              *unaff_EDI = *(byte *)((uint)*unaff_ESI + iVar2);
            }
            sVar6 = (short)iVar8;
            uVar9 = (undefined2)((uint)iVar8 >> 0x10);
            iVar8 = CONCAT22(uVar9,sVar6 + -1);
            pbVar11 = unaff_ESI + 2;
            pbVar12 = unaff_EDI + 1;
            if ((short)(sVar6 + -1) == 0) break;
            bVar3 = *(byte *)((uint)unaff_ESI[2] + iVar2);
            if (bVar3 != 0) {
              unaff_EDI[1] = bVar3;
            }
            iVar8 = CONCAT22(uVar9,sVar6 + -2);
            pbVar11 = unaff_ESI + 4;
            pbVar12 = unaff_EDI + 2;
            if ((short)(sVar6 + -2) == 0) break;
            pbVar11 = unaff_ESI + 6;
            bVar3 = *(byte *)((uint)unaff_ESI[4] + iVar2);
            if (bVar3 != 0) {
              unaff_EDI[2] = bVar3;
            }
            iVar8 = CONCAT22(uVar9,sVar6 + -3);
            pbVar12 = unaff_EDI + 3;
            if ((short)(sVar6 + -3) == 0) break;
            unaff_ESI = unaff_ESI + 8;
            bVar3 = *(byte *)((uint)*pbVar11 + iVar2);
            if (bVar3 != 0) {
              unaff_EDI[3] = bVar3;
            }
            unaff_EDI = unaff_EDI + 4;
            iVar8 = CONCAT22(uVar9,sVar6 + -4);
            pbVar11 = unaff_ESI;
            pbVar12 = unaff_EDI;
          } while ((short)(sVar6 + -4) != 0);
          unaff_ESI = pbVar11 + in_EDX + (uint)uVar4 + (uint)uVar5;
          unaff_EDI = pbVar12 + (unaff_EBP - _DAT_009a2028);
          iVar8 = iVar8 + -0x10000;
          if (iVar8 < 0) {
            return;
          }
        } while( true );
      }
    }
  }
  return;
}

