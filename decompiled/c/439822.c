
void FUN_00439822(void)

{
  byte *pbVar1;
  char *pcVar2;
  byte bVar3;
  char cVar4;
  byte bVar5;
  uint uVar6;
  uint uVar7;
  int iVar8;
  int iVar9;
  int unaff_ESI;
  uint uVar10;
  
  if (*(char *)(unaff_ESI + 0x2e) != '\x01') {
    if ((*(char *)(unaff_ESI + 0xad) != -1) &&
       (*(short *)(unaff_ESI + 0xae) = *(short *)(unaff_ESI + 0xae) + 1,
       0x2cf < *(ushort *)(unaff_ESI + 0xae))) {
      *(undefined1 *)(unaff_ESI + 0xad) = 0xff;
    }
    uVar6 = 0;
    iVar8 = 0;
    uVar10 = 0xffffffff;
LAB_00439857:
    do {
      iVar9 = iVar8;
      uVar7 = uVar10;
      if (*(char *)(unaff_ESI + 0xb0 + uVar6 * 4) == -1) break;
      cVar4 = *(char *)(unaff_ESI + 0xb2 + uVar6 * 4);
      if (cVar4 == '\x01') {
        pcVar2 = (char *)(unaff_ESI + 0xb3 + uVar6 * 4);
        *pcVar2 = *pcVar2 + '\x01';
        iVar9 = iVar8 + 1;
        if (0xdb < *(byte *)(unaff_ESI + 0xb3 + uVar6 * 4)) {
          *(undefined1 *)(unaff_ESI + 0xb3 + uVar6 * 4) = 0;
          pcVar2 = (char *)(unaff_ESI + 0xb2 + uVar6 * 4);
          *pcVar2 = *pcVar2 + '\x01';
          iVar9 = iVar8;
        }
      }
      else {
        uVar7 = uVar6;
        if (cVar4 != '\0') {
          pcVar2 = (char *)(unaff_ESI + 0xb3 + uVar6 * 4);
          cVar4 = *pcVar2;
          *pcVar2 = *pcVar2 + '\x01';
          uVar7 = uVar10;
          if ((cVar4 == -1) &&
             (pcVar2 = (char *)(unaff_ESI + 0xb2 + uVar6 * 4), *pcVar2 = *pcVar2 + '\x01',
             0x1b < *(byte *)(unaff_ESI + 0xb2 + uVar6 * 4))) {
            *(byte *)(unaff_ESI + 0x45) = *(byte *)(unaff_ESI + 0x45) | 1;
            for (uVar7 = uVar6; uVar7 != 4; uVar7 = uVar7 + 1) {
              *(undefined4 *)(unaff_ESI + 0xb0 + uVar7 * 4) =
                   *(undefined4 *)(unaff_ESI + 0xb4 + uVar7 * 4);
            }
            *(undefined1 *)(unaff_ESI + 0xc0) = 0xff;
            goto LAB_00439857;
          }
        }
      }
      uVar6 = uVar6 + 1;
      iVar8 = iVar9;
      uVar10 = uVar7;
    } while (uVar6 < 5);
    if ((iVar9 == 0) && (uVar7 != 0xffffffff)) {
      *(undefined1 *)(unaff_ESI + 0xb2 + uVar7 * 4) = 1;
      *(byte *)(unaff_ESI + 0x45) = *(byte *)(unaff_ESI + 0x45) | 1;
    }
  }
  bVar5 = *(byte *)(unaff_ESI + 0x38);
  if ((*(ushort *)(unaff_ESI + 200) & 2) != 0) {
    bVar5 = bVar5 >> 1;
  }
  pbVar1 = (byte *)(unaff_ESI + 0x73);
  bVar3 = *pbVar1;
  *pbVar1 = *pbVar1 + bVar5;
  if (!CARRY1(bVar3,bVar5)) {
    return;
  }
                    /* WARNING: Could not recover jumptable at 0x0043990a. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  (*(code *)(&PTR_LAB_0062d4ac)[*(byte *)(unaff_ESI + 0x2b)])();
  return;
}

