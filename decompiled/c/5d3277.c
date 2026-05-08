
void FUN_005d3277(void)

{
  byte *pbVar1;
  bool bVar2;
  uint in_EDX;
  uint uVar3;
  ushort uVar4;
  ushort uVar5;
  undefined1 *puVar6;
  undefined1 *puVar7;
  
  puVar6 = (undefined1 *)0xffffffff;
  uVar4 = 0;
  uVar3 = in_EDX & 0x7fffffff;
  bVar2 = false;
  do {
    uVar5 = 0;
    do {
      puVar7 = (undefined1 *)
               (&DAT_00971ef4)
               [(ushort)((ushort)(uVar5 << 7 | uVar5 >> 9 | uVar4) >> 5 | (uVar5 >> 9) << 0xb)];
      do {
        uVar3 = CONCAT11(*puVar7,(char)uVar3) & 0xffff3cff;
        if (((char)(uVar3 >> 8) == '\b') && ((char)uVar3 == puVar7[7])) {
          if (puVar6 == (undefined1 *)0xffffffff) {
LAB_005d32fd:
            puVar6 = puVar7;
            if ((puVar7[4] != '\x02') && (puVar7[4] != '\x03')) {
              if (((&DAT_006559d8)[(uint)(byte)puVar7[4] * 0x10] & 0x10) != 0) {
                bVar2 = true;
              }
            }
          }
          else if (((!bVar2) && (puVar7[4] != '\x02')) && (puVar7[4] != '\x03')) {
            if (((&DAT_006559d8)[(uint)(byte)puVar7[4] * 0x10] & 0x10) != 0) goto LAB_005d32fd;
          }
        }
        pbVar1 = puVar7 + 1;
        puVar7 = puVar7 + 8;
      } while ((*pbVar1 & 0x80) == 0);
      uVar5 = uVar5 + 0x20;
    } while (uVar5 < 0x1000);
    uVar4 = uVar4 + 0x20;
    if (0xfff < uVar4) {
      return;
    }
  } while( true );
}

