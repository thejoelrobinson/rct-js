
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_009b4660(void)

{
  ushort uVar1;
  byte bVar3;
  int in_EAX;
  int iVar2;
  ushort uVar4;
  short sVar5;
  uint uVar6;
  undefined2 uVar8;
  int iVar7;
  int in_EDX;
  uint unaff_EBX;
  int unaff_EBP;
  byte *unaff_ESI;
  byte *pbVar9;
  byte *unaff_EDI;
  byte *pbVar10;
  
  uVar1 = DAT_009a2028;
  iVar2 = DAT_009a200c;
  bVar3 = (byte)((uint)in_EAX >> 8);
  if ((unaff_EBX & 0x20000000) != 0) {
    if ((_DAT_009a201c & 1) == 0) {
      return;
    }
    iVar7 = (uint)(ushort)(bVar3 - 1) << 0x10;
    if (DAT_009a2028 == 4) {
      do {
        if (*(byte *)((uint)*unaff_ESI + iVar2) != 0) {
          *unaff_EDI = *(byte *)((uint)*unaff_ESI + iVar2);
        }
        if (*(byte *)((uint)unaff_ESI[1] + iVar2) != 0) {
          unaff_EDI[1] = *(byte *)((uint)unaff_ESI[1] + iVar2);
        }
        if (*(byte *)((uint)unaff_ESI[2] + iVar2) != 0) {
          unaff_EDI[2] = *(byte *)((uint)unaff_ESI[2] + iVar2);
        }
        if (*(byte *)((uint)unaff_ESI[3] + iVar2) != 0) {
          unaff_EDI[3] = *(byte *)((uint)unaff_ESI[3] + iVar2);
        }
        unaff_EDI = unaff_EDI + unaff_EBP + 4;
        unaff_ESI = unaff_ESI + in_EDX + 4;
        iVar7 = iVar7 + -0x10000;
      } while (-1 < iVar7);
      return;
    }
    do {
      iVar7 = CONCAT22((short)((uint)iVar7 >> 0x10),DAT_009a2028);
      do {
        if (*(byte *)((uint)*unaff_ESI + iVar2) != 0) {
          *unaff_EDI = *(byte *)((uint)*unaff_ESI + iVar2);
        }
        sVar5 = (short)iVar7;
        uVar8 = (undefined2)((uint)iVar7 >> 0x10);
        iVar7 = CONCAT22(uVar8,sVar5 + -1);
        pbVar9 = unaff_ESI + 1;
        pbVar10 = unaff_EDI + 1;
        if ((short)(sVar5 + -1) == 0) break;
        bVar3 = *(byte *)((uint)unaff_ESI[1] + iVar2);
        if (bVar3 != 0) {
          unaff_EDI[1] = bVar3;
        }
        iVar7 = CONCAT22(uVar8,sVar5 + -2);
        pbVar9 = unaff_ESI + 2;
        pbVar10 = unaff_EDI + 2;
        if ((short)(sVar5 + -2) == 0) break;
        pbVar9 = unaff_ESI + 3;
        bVar3 = *(byte *)((uint)unaff_ESI[2] + iVar2);
        if (bVar3 != 0) {
          unaff_EDI[2] = bVar3;
        }
        iVar7 = CONCAT22(uVar8,sVar5 + -3);
        pbVar10 = unaff_EDI + 3;
        if ((short)(sVar5 + -3) == 0) break;
        unaff_ESI = unaff_ESI + 4;
        bVar3 = *(byte *)((uint)*pbVar9 + iVar2);
        if (bVar3 != 0) {
          unaff_EDI[3] = bVar3;
        }
        unaff_EDI = unaff_EDI + 4;
        iVar7 = CONCAT22(uVar8,sVar5 + -4);
        pbVar9 = unaff_ESI;
        pbVar10 = unaff_EDI;
      } while ((short)(sVar5 + -4) != 0);
      unaff_ESI = pbVar9 + in_EDX;
      unaff_EDI = pbVar10 + unaff_EBP;
      iVar7 = iVar7 + -0x10000;
      if (iVar7 < 0) {
        return;
      }
    } while( true );
  }
  if ((unaff_EBX & 0x40000000) == 0) {
    uVar4 = uVar1;
    if ((_DAT_009a201c & 1) == 0) {
      do {
        for (uVar6 = (uint)uVar1; uVar6 != 0; uVar6 = uVar6 - 1) {
          *unaff_EDI = *unaff_ESI;
          unaff_ESI = unaff_ESI + 1;
          unaff_EDI = unaff_EDI + 1;
        }
        unaff_EDI = unaff_EDI + unaff_EBP;
        unaff_ESI = unaff_ESI + in_EDX;
        bVar3 = (char)((uint)in_EAX >> 8) - 1;
        in_EAX = (uint)bVar3 << 8;
      } while (bVar3 != 0);
      return;
    }
LAB_009b4732:
    do {
      iVar2 = in_EAX;
      if (*unaff_ESI != 0) {
        *unaff_EDI = *unaff_ESI;
      }
      pbVar9 = unaff_ESI + 1;
      pbVar10 = unaff_EDI + 1;
      if (uVar4 != 1) {
        bVar3 = unaff_ESI[1];
        if (bVar3 != 0) {
          unaff_EDI[1] = bVar3;
        }
        pbVar9 = unaff_ESI + 2;
        pbVar10 = unaff_EDI + 2;
        if (uVar4 != 2) {
          bVar3 = unaff_ESI[2];
          if (bVar3 != 0) {
            unaff_EDI[2] = bVar3;
          }
          pbVar9 = unaff_ESI + 3;
          pbVar10 = unaff_EDI + 3;
          if (uVar4 != 3) {
            bVar3 = unaff_ESI[3];
            unaff_ESI = unaff_ESI + 4;
            if (bVar3 != 0) {
              unaff_EDI[3] = bVar3;
            }
            unaff_EDI = unaff_EDI + 4;
            uVar4 = uVar4 - 4;
            in_EAX = CONCAT31((int3)((uint)iVar2 >> 8),bVar3);
            pbVar9 = unaff_ESI;
            pbVar10 = unaff_EDI;
            if (uVar4 != 0) goto LAB_009b4732;
          }
        }
      }
      unaff_ESI = pbVar9 + in_EDX;
      unaff_EDI = pbVar10 + unaff_EBP;
      bVar3 = (char)((uint)iVar2 >> 8) - 1;
      in_EAX = (uint)bVar3 << 8;
      uVar4 = uVar1;
    } while (bVar3 != 0);
  }
  else if ((_DAT_009a201c & 1) != 0) {
    iVar7 = (uint)(ushort)(bVar3 - 1) << 0x10;
    do {
      iVar7 = CONCAT22((short)((uint)iVar7 >> 0x10),DAT_009a2028);
      do {
        if (*unaff_ESI != 0) {
          *unaff_EDI = *(byte *)((uint)*unaff_EDI + iVar2);
        }
        pbVar10 = unaff_EDI + 1;
        sVar5 = (short)iVar7;
        uVar8 = (undefined2)((uint)iVar7 >> 0x10);
        iVar7 = CONCAT22(uVar8,sVar5 + -1);
        pbVar9 = unaff_ESI + 1;
        if ((short)(sVar5 + -1) == 0) break;
        if (unaff_ESI[1] != 0) {
          *pbVar10 = *(byte *)((uint)*pbVar10 + iVar2);
        }
        pbVar10 = unaff_EDI + 2;
        iVar7 = CONCAT22(uVar8,sVar5 + -2);
        pbVar9 = unaff_ESI + 2;
        if ((short)(sVar5 + -2) == 0) break;
        pbVar9 = unaff_ESI + 3;
        if (unaff_ESI[2] != 0) {
          *pbVar10 = *(byte *)((uint)*pbVar10 + iVar2);
        }
        pbVar10 = unaff_EDI + 3;
        iVar7 = CONCAT22(uVar8,sVar5 + -3);
        if ((short)(sVar5 + -3) == 0) break;
        unaff_ESI = unaff_ESI + 4;
        if (*pbVar9 != 0) {
          *pbVar10 = *(byte *)((uint)*pbVar10 + iVar2);
        }
        unaff_EDI = unaff_EDI + 4;
        iVar7 = CONCAT22(uVar8,sVar5 + -4);
        pbVar9 = unaff_ESI;
        pbVar10 = unaff_EDI;
      } while ((short)(sVar5 + -4) != 0);
      unaff_ESI = pbVar9 + in_EDX;
      unaff_EDI = pbVar10 + unaff_EBP;
      iVar7 = iVar7 + -0x10000;
      if (iVar7 < 0) {
        return;
      }
    } while( true );
  }
  return;
}

