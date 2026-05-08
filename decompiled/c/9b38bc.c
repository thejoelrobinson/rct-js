
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_009b38bc(void)

{
  ushort uVar1;
  undefined4 in_EAX;
  ushort uVar2;
  short sVar3;
  int iVar4;
  ushort *puVar5;
  int unaff_ESI;
  
  if ((DAT_009a2000 & 0x20000000) != 0) {
    puVar5 = (ushort *)((uint)*(ushort *)(unaff_ESI + (uint)DAT_009a2020 * 2) + unaff_ESI);
    do {
      uVar1 = *puVar5;
      DAT_009aa032 = (byte)uVar1;
      uVar2 = (ushort)((byte)uVar1 & 0x7f);
      puVar5 = (ushort *)((int)puVar5 + uVar2 + 2);
      iVar4 = (uint)(uVar1 >> 8) - _DAT_009a2024;
      if (iVar4 == 0 || (int)(uint)(uVar1 >> 8) < _DAT_009a2024) {
        uVar2 = uVar2 + (short)iVar4;
        if ((-1 < (short)uVar2) && (uVar2 != 0)) {
          iVar4 = 0;
          goto LAB_009b396a;
        }
      }
      else {
LAB_009b396a:
        sVar3 = (short)iVar4 + uVar2;
        if ((sVar3 < 2) || ((short)(sVar3 + -1) < (short)uVar2)) {
          DAT_0099c164 = 1;
          return 0;
        }
      }
      if ((uVar1 & 0x80) != 0) {
        return 0;
      }
    } while( true );
  }
  if ((DAT_009a2000 & 0x40000000) != 0) {
    puVar5 = (ushort *)((uint)*(ushort *)(unaff_ESI + (uint)DAT_009a2020 * 2) + unaff_ESI);
    do {
      uVar1 = *puVar5;
      DAT_009aa032 = (byte)uVar1;
      uVar2 = (ushort)((byte)uVar1 & 0x7f);
      puVar5 = (ushort *)((int)puVar5 + uVar2 + 2);
      iVar4 = (uint)(uVar1 >> 8) - _DAT_009a2024;
      if (iVar4 == 0 || (int)(uint)(uVar1 >> 8) < _DAT_009a2024) {
        uVar2 = uVar2 + (short)iVar4;
        if ((-1 < (short)uVar2) && (uVar2 != 0)) {
          iVar4 = 0;
          goto LAB_009b39c4;
        }
      }
      else {
LAB_009b39c4:
        sVar3 = (short)iVar4 + uVar2;
        if ((sVar3 < 2) || ((short)(sVar3 + -1) < (short)uVar2)) {
          DAT_0099c164 = 1;
          return 0;
        }
      }
      if ((uVar1 & 0x80) != 0) {
        return 0;
      }
    } while( true );
  }
  puVar5 = (ushort *)((uint)*(ushort *)(unaff_ESI + (uint)DAT_009a2020 * 2) + unaff_ESI);
  do {
    uVar1 = *puVar5;
    DAT_009aa032 = (byte)uVar1;
    uVar2 = (ushort)((byte)uVar1 & 0x7f);
    puVar5 = (ushort *)((int)puVar5 + uVar2 + 2);
    iVar4 = (uint)(uVar1 >> 8) - _DAT_009a2024;
    if (iVar4 == 0 || (int)(uint)(uVar1 >> 8) < _DAT_009a2024) {
      uVar2 = uVar2 + (short)iVar4;
      if ((-1 < (short)uVar2) && (uVar2 != 0)) {
        iVar4 = 0;
        goto LAB_009b3910;
      }
    }
    else {
LAB_009b3910:
      sVar3 = (short)iVar4 + uVar2;
      if ((sVar3 < 2) || ((short)(sVar3 + -1) < (short)uVar2)) {
        DAT_0099c164 = 1;
        return in_EAX;
      }
    }
    if ((uVar1 & 0x80) != 0) {
      return in_EAX;
    }
  } while( true );
}

