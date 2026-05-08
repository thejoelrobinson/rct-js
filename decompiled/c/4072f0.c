
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_004072f0(int param_1,uint param_2,int param_3,int param_4,int param_5)

{
  uint uVar1;
  int iVar2;
  undefined1 local_44 [20];
  undefined1 local_30 [20];
  undefined4 local_1c;
  undefined4 local_18;
  undefined4 local_14;
  undefined4 local_c;
  int local_8;
  
  if (param_2 == 0) {
    local_8 = 0;
  }
  else {
    if (DAT_005ebf0c <= param_2) {
      return 0;
    }
    local_8 = param_2 * 0x210 + DAT_005ebf10;
  }
  _memset(&DAT_005f0380,0,0x12);
  _DAT_005f0380 = 1;
  _DAT_005f0382 = (undefined2)param_3;
  DAT_005f0384 = param_4;
  uVar1 = (int)(param_3 * param_5 + (param_3 * param_5 >> 0x1f & 7U)) >> 3;
  DAT_005f038c = (undefined2)uVar1;
  _DAT_005f0388 = (uVar1 & 0xffff) * param_4;
  _DAT_005f038e = (undefined2)param_5;
  _DAT_005f0390 = 0;
  _memset(&local_1c,0,0x14);
  local_1c = 0x14;
  local_14 = 0;
  local_c = 0;
  if (param_1 == 0) {
    local_18 = 1;
    if (DAT_005ebf14 != 0) {
      local_18 = 0x4001;
    }
    iVar2 = DirectSoundCreate(local_8,&DAT_005ec05c,0);
    if (iVar2 == 0) {
      iVar2 = (**(code **)(*DAT_005ec05c + 0x18))(DAT_005ec05c,DAT_005e916c,2);
      if (iVar2 == 0) {
        iVar2 = (**(code **)(*DAT_005ec05c + 0xc))(DAT_005ec05c,&local_1c,&DAT_005ec064,0);
        if (iVar2 == 0) {
          (**(code **)(*DAT_005ec064 + 0x14))(DAT_005ec064,local_44,0x12,0);
          (**(code **)(*DAT_005ec064 + 0x38))(DAT_005ec064,&DAT_005f0380);
          (**(code **)(*DAT_005ec064 + 0x14))(DAT_005ec064,local_30,0x12,0);
          return 1;
        }
        (**(code **)(*DAT_005ec064 + 8))(DAT_005ec064);
        DAT_005ec064 = (int *)0x0;
      }
      (**(code **)(*DAT_005ec05c + 8))(DAT_005ec05c);
      DAT_005ec05c = (int *)0x0;
    }
  }
  else if (param_1 == 1) {
    local_18 = 0x11;
    if (DAT_005ebf14 != 0) {
      local_18 = 0x4011;
    }
    iVar2 = DirectSoundCreate(local_8,&DAT_005ec05c,0);
    if (iVar2 == 0) {
      iVar2 = (**(code **)(*DAT_005ec05c + 0x18))(DAT_005ec05c,DAT_005e916c,1);
      if ((iVar2 == 0) &&
         (iVar2 = (**(code **)(*DAT_005ec05c + 0xc))(DAT_005ec05c,&local_1c,&DAT_005ec064,0),
         iVar2 == 0)) {
        iVar2 = (**(code **)*DAT_005ec064)(DAT_005ec064,&DAT_005e7cd0,&DAT_005ec060);
        if (iVar2 == 0) {
          _memset(PTR_DAT_005ec068,0,0x40);
          *(undefined4 *)PTR_DAT_005ec068 = 0x40;
          iVar2 = FUN_00407f70();
          if (iVar2 != 0) {
            *(undefined4 *)(PTR_DAT_005ec068 + 4) = 0;
          }
          *(undefined4 *)(PTR_DAT_005ec068 + 8) = 0;
          *(undefined4 *)(PTR_DAT_005ec068 + 4) = 0xbf800000;
          *(undefined4 *)(PTR_DAT_005ec068 + 0x3c) = 0x411e6666;
          *(undefined4 *)(PTR_DAT_005ec068 + 0x38) = 0x3e800000;
          iVar2 = FUN_00407faf();
          if (((iVar2 != 0) &&
              (iVar2 = (**(code **)(*DAT_005ec060 + 0x44))(DAT_005ec060), iVar2 == 0)) &&
             (iVar2 = FUN_00407f70(), iVar2 != 0)) {
            return 1;
          }
          (**(code **)(*DAT_005ec060 + 8))(DAT_005ec060);
          DAT_005ec060 = (int *)0x0;
        }
        (**(code **)(*DAT_005ec064 + 8))(DAT_005ec064);
        DAT_005ec064 = (int *)0x0;
      }
      (**(code **)(*DAT_005ec05c + 8))(DAT_005ec05c);
      DAT_005ec05c = (int *)0x0;
    }
  }
  return 0;
}

