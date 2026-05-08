
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_004440ac(void)

{
  ushort *puVar1;
  char *pcVar2;
  ushort uVar3;
  byte bVar4;
  uint uVar5;
  
  uVar5 = 0;
  do {
    if ((&DAT_0087d0da)[uVar5] != '\0') {
      FUN_005e5301();
      puVar1 = (ushort *)(&DAT_0087d0da + uVar5);
      uVar3 = *puVar1;
      *puVar1 = *puVar1 & 0xff7f;
      if ((uVar3 >> 7 & 1) == 0) {
        pcVar2 = &DAT_0087d0da + uVar5;
        *pcVar2 = *pcVar2 + -1;
        if (*pcVar2 == '\0') {
          bVar4 = (&DAT_0087d0ee)[uVar5];
          switch(uVar5) {
          default:
            break;
          case 1:
          case 5:
            DAT_00971e86._0_2_ = (&DAT_00887442)[(uint)bVar4 * 0x130];
            unique0x00017200 = (&DAT_00887444)[(uint)bVar4 * 0x98];
            break;
          case 3:
            DAT_00971e86._0_2_ = bVar4 + 0x709;
          }
          FUN_0042c711();
        }
      }
    }
    uVar5 = uVar5 + 1;
  } while (uVar5 < 6);
  return;
}

