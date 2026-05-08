
undefined4 * FUN_00413830(int param_1,int param_2)

{
  int iVar1;
  uint uVar2;
  undefined4 *puVar3;
  uint dwBytes;
  undefined4 *puVar4;
  
  dwBytes = param_2 * param_1;
  if (dwBytes < 0xffffffe1) {
    if (dwBytes == 0) {
      dwBytes = 0x10;
    }
    else {
      dwBytes = dwBytes + 0xf & 0xfffffff0;
    }
  }
  do {
    puVar3 = (undefined4 *)0x0;
    if (dwBytes < 0xffffffe1) {
      if (DAT_005ee524 < dwBytes) {
LAB_00413890:
        if (puVar3 != (undefined4 *)0x0) {
          return puVar3;
        }
      }
      else {
        puVar3 = (undefined4 *)FUN_00415770(dwBytes >> 4);
        if (puVar3 != (undefined4 *)0x0) {
          puVar4 = puVar3;
          for (uVar2 = dwBytes >> 2; uVar2 != 0; uVar2 = uVar2 - 1) {
            *puVar4 = 0;
            puVar4 = puVar4 + 1;
          }
          for (uVar2 = dwBytes & 3; uVar2 != 0; uVar2 = uVar2 - 1) {
            *(undefined1 *)puVar4 = 0;
            puVar4 = (undefined4 *)((int)puVar4 + 1);
          }
          goto LAB_00413890;
        }
      }
      puVar3 = HeapAlloc(DAT_005f3e44,8,dwBytes);
    }
    if ((puVar3 != (undefined4 *)0x0) || (DAT_005f0244 == 0)) {
      return puVar3;
    }
    iVar1 = FUN_004153f0(dwBytes);
    if (iVar1 == 0) {
      return (undefined4 *)0x0;
    }
  } while( true );
}

