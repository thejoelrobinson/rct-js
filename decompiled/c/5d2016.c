
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_005d2016(void)

{
  undefined4 in_EAX;
  undefined4 uVar1;
  ushort extraout_CX;
  byte extraout_DH;
  byte bVar2;
  undefined4 unaff_EBX;
  uint uVar3;
  int iVar4;
  short unaff_DI;
  bool bVar6;
  undefined3 uVar5;
  
  if (DAT_00652288 == '\x03') {
    DAT_00652293 = DAT_00652293 + -1;
    if (DAT_00652293 < '\0') {
      DAT_00652293 = '\x05';
      DAT_00652292 = DAT_00652292 ^ 1;
      bVar6 = false;
      in_EAX = FUN_005cfe66();
      if (bVar6) {
        DAT_00652288 = '\0';
      }
    }
  }
  else {
    if ((DAT_00652288 != '\x01') && (DAT_00652288 != '\x02')) {
      return in_EAX;
    }
    DAT_00652293 = DAT_00652293 + -1;
    if (DAT_00652293 < '\0') {
      DAT_00652293 = 5;
      DAT_00652292 = DAT_00652292 ^ 1;
      uVar5 = (undefined3)((uint)unaff_EBX >> 8);
      DAT_0099a4de = DAT_0065228a;
      DAT_0099a4e0 = DAT_0065228c;
      DAT_0099a4e2 = DAT_0065228e;
      bVar2 = DAT_00652290;
      if (3 < DAT_00652290) {
        bVar2 = DAT_00652290 + 4;
      }
      uVar3 = CONCAT31(uVar5,bVar2);
      if (DAT_00652288 == '\x02') {
        uVar3 = CONCAT31(uVar5,bVar2) ^ 2;
      }
      DAT_0099a4e4 = (undefined1)uVar3;
      _DAT_0099a020 = _DAT_0099a020 & 0xfffb;
      if ((DAT_00652292 & 1) != 0) {
        _DAT_0099a020 = _DAT_0099a020 | 4;
      }
      uVar1 = FUN_005e5562();
      bVar6 = false;
      if ((DAT_00652292 & 1) == 0) {
        uVar1 = FUN_005d298a();
        if (!bVar6) {
          DAT_0065229c = (undefined2)uVar1;
          DAT_006522a0 = *(short *)(&DAT_00653ef9 + (uint)extraout_DH * 10) + unaff_DI;
          DAT_006522a2 = (byte)(uVar3 >> 8);
          iVar4 = CONCAT31((int3)(uVar3 >> 8),0x69);
          DAT_0065229e = extraout_CX;
          uVar1 = FUN_00426f56();
          DAT_00652260 = iVar4;
          FUN_005e5301();
          if (iVar4 != -0x80000000) {
            DAT_00652292 = DAT_00652292 | 2;
          }
        }
      }
      else if ((DAT_00652292 & 2) != 0) {
        DAT_00652292 = DAT_00652292 & 0xfd;
        DAT_00652470 = DAT_00652289;
        bVar6 = false;
        if ((DAT_006522a2 & 4) == 0) {
          bVar6 = DAT_0065229e < (ushort)(&DAT_0065247a)[(uint)DAT_006522a2 * 2];
        }
        uVar1 = FUN_005cfac0();
        if (!bVar6) {
          uVar1 = FUN_00426f56();
        }
      }
      return uVar1;
    }
  }
  return in_EAX;
}

