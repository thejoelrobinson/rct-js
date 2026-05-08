
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00441dc1(void)

{
  byte bVar1;
  ushort uVar2;
  undefined4 uVar3;
  undefined4 uVar4;
  uint uVar5;
  char cVar6;
  undefined4 uVar7;
  undefined4 uVar8;
  uint uVar9;
  ushort uVar10;
  ushort uVar11;
  int iVar12;
  undefined1 *puVar13;
  int iVar14;
  uint uVar15;
  
  uVar9 = (uint)DAT_0062d2ff;
  if ((uVar9 != DAT_0062d2f6) ||
     ((DAT_00629408 == 0 && ((DAT_006e3b84 & 0xffffff00) != DAT_00629404)))) {
    DAT_00629408 = 0x140;
    DAT_0062940a = 0;
    DAT_00629404 = DAT_006e3b84 & 0xffffff00;
    DAT_0062d2f6 = uVar9;
    for (uVar10 = DAT_0087c398; uVar11 = DAT_0087c398, uVar10 != 0xffff;
        uVar10 = (&DAT_00743b98)[(uint)uVar10 * 0x80]) {
      iVar12 = (uint)uVar10 * 0x100;
      if (((&DAT_00743bc2)[iVar12] == '\0') && ((&DAT_00743bbe)[iVar12] == '\0')) {
        *(ushort *)(&DAT_00743ba0 + iVar12) = *(ushort *)(&DAT_00743ba0 + iVar12) | 0x100;
      }
    }
    for (; uVar5 = DAT_0062940a, uVar11 != 0xffff; uVar11 = (&DAT_00743b98)[(uint)uVar11 * 0x80]) {
      iVar12 = (uint)uVar11 * 0x100;
      puVar13 = &DAT_00743b94 + iVar12;
      if ((((&DAT_00743bc2)[iVar12] == '\0') && ((&DAT_00743bbe)[iVar12] == '\0')) &&
         ((*(ushort *)(&DAT_00743ba0 + iVar12) & 0x100) != 0)) {
        if (0xef < DAT_0062940a) {
          return;
        }
        DAT_0062940a = DAT_0062940a + 1;
        (&DAT_00629c7e)[uVar5] = 1;
        *(ushort *)(&DAT_00743ba0 + iVar12) = *(ushort *)(&DAT_00743ba0 + iVar12) & 0xfeff;
        FUN_00441ffd();
        DAT_0062d2de = CONCAT22((short)DAT_00971e86,(short)uVar9);
        *(undefined4 *)(&DAT_006294fe + uVar5 * 8) = DAT_0062d2de;
        DAT_0062d2e2 = ram0x00971e88;
        *(int *)(&DAT_00629502 + uVar5 * 8) = ram0x00971e88;
        cVar6 = (char)uVar5;
        (&DAT_0062940e)[uVar5] = cVar6;
        FUN_0043fdfb();
        (&DAT_00629e5e)[uVar5 * 0x38] = cVar6 + ']';
        iVar12 = uVar5 * 0x38 + 1;
        while (*(ushort *)(puVar13 + 4) != 0xffff) {
          iVar14 = (uint)*(ushort *)(puVar13 + 4) * 0x100;
          puVar13 = &DAT_00743b94 + iVar14;
          if ((((&DAT_00743bc2)[iVar14] == '\0') && ((&DAT_00743bbe)[iVar14] == '\0')) &&
             ((*(ushort *)(&DAT_00743ba0 + iVar14) & 0x100) != 0)) {
            FUN_00441ffd();
            if ((((short)uVar9 == (short)DAT_0062d2de) &&
                ((short)DAT_00971e86 == DAT_0062d2de._2_2_)) && (ram0x00971e88 == DAT_0062d2e2)) {
              (&DAT_00629c7e)[uVar5] = (&DAT_00629c7e)[uVar5] + 1;
              *(ushort *)(&DAT_00743ba0 + iVar14) = *(ushort *)(&DAT_00743ba0 + iVar14) & 0xfeff;
              if ((ushort)(&DAT_00629c7e)[uVar5] < 0x38) {
                FUN_0043fdfb();
                (&DAT_00629e5e)[iVar12] = cVar6 + ']';
                iVar12 = iVar12 + 1;
              }
            }
          }
        }
        if ((short)DAT_0062d2de != 0) {
          uVar15 = 0;
LAB_00441fad:
          if (uVar15 < uVar5) {
            if ((ushort)(&DAT_00629c7e)[uVar5] <= (ushort)(&DAT_00629c7e)[uVar15])
            goto code_r0x00441fbb;
            uVar9 = (uint)(byte)(&DAT_0062940e)[uVar5];
            uVar7 = *(undefined4 *)(&DAT_006294fe + uVar5 * 8);
            uVar8 = *(undefined4 *)(&DAT_00629502 + uVar5 * 8);
            uVar10 = (&DAT_00629c7e)[uVar5];
            do {
              LOCK();
              uVar2 = (&DAT_00629c7e)[uVar15];
              (&DAT_00629c7e)[uVar15] = uVar10;
              UNLOCK();
              LOCK();
              uVar3 = *(undefined4 *)(&DAT_006294fe + uVar15 * 8);
              *(undefined4 *)(&DAT_006294fe + uVar15 * 8) = uVar7;
              UNLOCK();
              LOCK();
              uVar4 = *(undefined4 *)(&DAT_00629502 + uVar15 * 8);
              *(undefined4 *)(&DAT_00629502 + uVar15 * 8) = uVar8;
              UNLOCK();
              LOCK();
              bVar1 = (&DAT_0062940e)[uVar15];
              (&DAT_0062940e)[uVar15] = (byte)uVar9;
              uVar9 = (uint)bVar1;
              UNLOCK();
              uVar15 = uVar15 + 1;
              uVar7 = uVar3;
              uVar8 = uVar4;
              uVar10 = uVar2;
            } while (uVar15 <= uVar5);
          }
          goto LAB_00441ff3;
        }
        DAT_0062940a = DAT_0062940a - 1;
      }
LAB_00441ff3:
    }
  }
  return;
code_r0x00441fbb:
  uVar15 = uVar15 + 1;
  goto LAB_00441fad;
}

