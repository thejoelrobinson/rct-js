
void FUN_00414f90(void)

{
  byte bVar1;
  undefined4 *puVar2;
  DWORD DVar3;
  HANDLE hFile;
  int iVar4;
  byte *pbVar5;
  int *piVar6;
  uint uVar7;
  UINT *pUVar8;
  UINT local_48;
  _STARTUPINFOA local_44;
  
  puVar2 = (undefined4 *)FUN_004133c0(0x100);
  if (puVar2 == (undefined4 *)0x0) {
    __amsg_exit(0x1b);
  }
  DAT_005f3f60 = 0x20;
  DAT_005f3e60 = puVar2;
  if (puVar2 < puVar2 + 0x40) {
    do {
      *(undefined1 *)(puVar2 + 1) = 0;
      *puVar2 = 0xffffffff;
      *(undefined1 *)((int)puVar2 + 5) = 10;
      puVar2 = puVar2 + 2;
    } while (puVar2 < DAT_005f3e60 + 0x40);
  }
  GetStartupInfoA(&local_44);
  if ((local_44.cbReserved2 != 0) && ((UINT *)local_44.lpReserved2 != (UINT *)0x0)) {
    local_48 = *(UINT *)local_44.lpReserved2;
    pUVar8 = (UINT *)((int)local_44.lpReserved2 + 4);
    pbVar5 = (byte *)((int)pUVar8 + local_48);
    if (0x7ff < (int)local_48) {
      local_48 = 0x800;
    }
    if ((int)DAT_005f3f60 < (int)local_48) {
      piVar6 = &DAT_005f3e64;
      do {
        puVar2 = (undefined4 *)FUN_004133c0(0x100);
        if (puVar2 == (undefined4 *)0x0) {
          local_48 = DAT_005f3f60;
          break;
        }
        *piVar6 = (int)puVar2;
        DAT_005f3f60 = DAT_005f3f60 + 0x20;
        if (puVar2 < puVar2 + 0x40) {
          do {
            *(undefined1 *)(puVar2 + 1) = 0;
            *puVar2 = 0xffffffff;
            *(undefined1 *)((int)puVar2 + 5) = 10;
            puVar2 = puVar2 + 2;
          } while (puVar2 < (undefined4 *)(*piVar6 + 0x100));
        }
        piVar6 = piVar6 + 1;
      } while ((int)DAT_005f3f60 < (int)local_48);
    }
    uVar7 = 0;
    if (0 < (int)local_48) {
      do {
        if (((*(HANDLE *)pbVar5 != (HANDLE)0xffffffff) && ((*pUVar8 & 1) != 0)) &&
           (((*pUVar8 & 8) != 0 || (DVar3 = GetFileType(*(HANDLE *)pbVar5), DVar3 != 0)))) {
          iVar4 = (int)(&DAT_005f3e60)[(int)uVar7 >> 5];
          *(undefined4 *)(iVar4 + (uVar7 & 0x1f) * 8) = *(undefined4 *)pbVar5;
          *(byte *)(iVar4 + (uVar7 & 0x1f) * 8 + 4) = (byte)*pUVar8;
        }
        uVar7 = uVar7 + 1;
        pUVar8 = (UINT *)((int)pUVar8 + 1);
        pbVar5 = pbVar5 + 4;
      } while ((int)uVar7 < (int)local_48);
    }
  }
  iVar4 = 0;
  do {
    puVar2 = DAT_005f3e60 + iVar4 * 2;
    if (DAT_005f3e60[iVar4 * 2] == -1) {
      *(undefined1 *)(puVar2 + 1) = 0x81;
      if (iVar4 == 0) {
        DVar3 = 0xfffffff6;
      }
      else {
        DVar3 = 0xfffffff5 - (iVar4 != 1);
      }
      hFile = GetStdHandle(DVar3);
      if ((hFile == (HANDLE)0xffffffff) || (DVar3 = GetFileType(hFile), DVar3 == 0)) {
        bVar1 = *(byte *)(puVar2 + 1) | 0x40;
        goto LAB_0041516b;
      }
      *puVar2 = hFile;
      if ((DVar3 & 0xff) == 2) {
        bVar1 = *(byte *)(puVar2 + 1) | 0x40;
        goto LAB_0041516b;
      }
      if ((DVar3 & 0xff) == 3) {
        bVar1 = *(byte *)(puVar2 + 1) | 8;
        goto LAB_0041516b;
      }
    }
    else {
      bVar1 = *(byte *)(puVar2 + 1) | 0x80;
LAB_0041516b:
      *(byte *)(puVar2 + 1) = bVar1;
    }
    iVar4 = iVar4 + 1;
    if (2 < iVar4) {
      SetHandleCount(DAT_005f3f60);
      return;
    }
  } while( true );
}

