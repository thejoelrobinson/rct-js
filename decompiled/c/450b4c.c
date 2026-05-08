
void FUN_00450b4c(void)

{
  byte bVar1;
  short sVar2;
  byte bVar3;
  short extraout_DX;
  short sVar4;
  ushort uVar5;
  int iVar6;
  int iVar7;
  uint uVar8;
  int iVar9;
  uint uVar10;
  int iVar11;
  
  bVar3 = 0;
  do {
    uVar10 = (uint)bVar3;
    iVar11 = uVar10 * 0x4b0c;
    bVar1 = (&DAT_008ae9c4)[iVar11];
    if ((bVar1 != 0xff) &&
       (iVar7 = (uint)bVar1 * 0x260, ((&DAT_00887422)[(uint)bVar1 * 0x130] & 1) != 0)) {
      if (((&DAT_008ae9c5)[iVar11] & 1) == 0) {
        for (iVar6 = 0; (byte)iVar6 < (byte)(&DAT_00887498)[iVar7]; iVar6 = iVar6 + 1) {
          if ((*(ushort *)(&DAT_0088747e + iVar6 * 2 + iVar7) != 0xffff) &&
             (iVar9 = (uint)*(ushort *)(&DAT_0088747e + iVar6 * 2 + iVar7) * 0x100,
             (&DAT_00743be4)[iVar9] == '\x03')) {
            (&DAT_008ae9ce)[iVar11] = (byte)iVar6;
            (&DAT_008ae9cf)[iVar11] = (&DAT_00743bdf)[iVar9];
            (&DAT_008ae9c5)[iVar11] = (&DAT_008ae9c5)[iVar11] | 1;
            (&DAT_008ae9c5)[iVar11] = (&DAT_008ae9c5)[iVar11] & 0xfd;
            goto LAB_00450bd4;
          }
        }
      }
      else {
LAB_00450bd4:
        uVar5 = *(ushort *)(&DAT_0088747e + (uint)(byte)(&DAT_008ae9ce)[iVar11] * 2 + iVar7);
        if (uVar5 != 0xffff) {
          iVar6 = (uint)uVar5 * 0x100;
          uVar8 = (uint)(ushort)(&DAT_008ae9cc)[uVar10 * 0x2586];
          if (((&DAT_008ae9c5)[iVar11] & 2) != 0) {
            if ((&DAT_00743be4)[iVar6] != '\x03') goto LAB_00450d74;
            (&DAT_008ae9c5)[iVar11] = (&DAT_008ae9c5)[iVar11] & 0xfd;
            if ((&DAT_00743bdf)[iVar6] == (&DAT_008ae9cf)[iVar11]) {
              (&DAT_008ae9cc)[uVar10 * 0x2586] = 0;
              uVar8 = 0;
            }
          }
          if ((&DAT_00743be4)[iVar6] == '\x06') {
            (&DAT_008ae9c5)[iVar11] = (&DAT_008ae9c5)[iVar11] | 2;
          }
          else {
            if (uVar8 < 0x12c0) {
              if (((&DAT_008ae9c5)[iVar11] & 4) != 0) {
                sVar2 = FUN_005d9220(uVar8,iVar7);
                sVar2 = sVar2 >> 3;
                sVar4 = extraout_DX >> 3;
                if (sVar2 < -0x7e) {
                  sVar2 = -0x7f;
                }
                if (0x7e < sVar2) {
                  sVar2 = 0x7f;
                }
                if (sVar4 < -0x7e) {
                  sVar4 = -0x7f;
                }
                if (0x7e < sVar4) {
                  sVar4 = 0x7f;
                }
                if ((DAT_006e3b84 & 1) == 0) {
                  (&DAT_008ae9d0)[iVar11 + uVar8] = (char)sVar2;
                  (&DAT_008afc90)[iVar11 + uVar8] = (char)sVar4;
                }
                else {
                  (&DAT_008ae9d0)[iVar11 + uVar8] =
                       (char)((short)(sVar2 + (char)(&DAT_008ae9d0)[iVar11 + uVar8]) >> 1);
                  (&DAT_008afc90)[iVar11 + uVar8] =
                       (char)((short)(sVar4 + (char)(&DAT_008afc90)[iVar11 + uVar8]) >> 1);
                }
              }
              iVar7 = *(int *)(&DAT_00743bbc + iVar6) * 5 >> 0x10;
              if (iVar7 < 0) {
                iVar7 = -iVar7;
              }
              uVar5 = (short)(&DAT_00743ba6)[(uint)uVar5 * 0x80] >> 2;
              if (0xfe < uVar5) {
                uVar5 = 0xff;
              }
              if ((DAT_006e3b84 & 1) == 0) {
                (&DAT_008b0f50)[iVar11 + uVar8] = (char)iVar7;
                (&DAT_008b2210)[iVar11 + uVar8] = (char)uVar5;
              }
              else {
                (&DAT_008b0f50)[iVar11 + uVar8] =
                     (char)((ushort)((short)iVar7 + (ushort)(byte)(&DAT_008b0f50)[iVar11 + uVar8])
                           >> 1);
                (&DAT_008b2210)[iVar11 + uVar8] =
                     (char)((ushort)(uVar5 + (byte)(&DAT_008b2210)[iVar11 + uVar8]) >> 1);
              }
              if (((DAT_006e3b84 & 1) != 0) &&
                 (uVar5 = (short)uVar8 + 1, (ushort)(&DAT_008ae9ca)[uVar10 * 0x2586] < uVar5)) {
                (&DAT_008ae9ca)[uVar10 * 0x2586] = uVar5;
              }
            }
            if ((DAT_006e3b84 & 1) != 0) {
              (&DAT_008ae9cc)[uVar10 * 0x2586] = (&DAT_008ae9cc)[uVar10 * 0x2586] + 1;
            }
          }
        }
      }
    }
LAB_00450d74:
    bVar3 = bVar3 + 1;
    if (7 < bVar3) {
      return;
    }
  } while( true );
}

