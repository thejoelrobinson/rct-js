
void FUN_005d369a(void)

{
  byte *pbVar1;
  uint uVar2;
  uint uVar3;
  uint uVar4;
  uint in_EDX;
  undefined4 uVar5;
  byte bVar6;
  undefined1 uVar7;
  uint unaff_EBX;
  uint uVar8;
  undefined2 uVar10;
  uint uVar9;
  ushort uVar11;
  undefined1 *puVar12;
  int iVar13;
  
  DAT_006522c1 = 0;
  uVar8 = unaff_EBX & 0xffff0000;
  do {
    uVar11 = 0;
LAB_005d36aa:
    do {
      puVar12 = (undefined1 *)
                (&DAT_00971ef4)
                [(ushort)((ushort)(uVar11 << 7 | uVar11 >> 9 | (ushort)uVar8) >> 5 |
                         (uVar11 >> 9) << 0xb)];
      do {
        in_EDX = CONCAT22((short)(in_EDX >> 0x10),CONCAT11(*puVar12,(char)in_EDX)) & 0xffff3cff;
        uVar10 = (undefined2)(uVar8 >> 0x10);
        if (((char)(in_EDX >> 8) == '\b') && ((char)in_EDX == puVar12[7])) {
          uVar3 = uVar8 & 0xffff;
          uVar4 = (uint)uVar11;
          iVar13 = (uint)(byte)puVar12[2] << 2;
          uVar9 = CONCAT31(CONCAT21(uVar10,*puVar12),1) & 0xffff03ff;
          if (puVar12[4] == 'e') {
            uVar5 = CONCAT22((short)(in_EDX >> 0x10),CONCAT11(2,puVar12[7]));
            uVar2 = uVar9 >> 0x10;
            bVar6 = (byte)uVar9;
            FUN_00426f56(iVar13,uVar5,uVar4,uVar9,uVar3);
            DAT_006522c1 = DAT_006522c1 + CONCAT22((short)uVar2,(ushort)bVar6);
            uVar2 = uVar9 >> 0x10;
            uVar7 = (undefined1)uVar9;
            FUN_00426f56(iVar13,uVar5,uVar4,uVar9,uVar3);
            DAT_006522c1 = DAT_006522c1 + CONCAT22((short)uVar2,CONCAT11(1,uVar7));
            uVar2 = uVar9 >> 0x10;
            uVar7 = (undefined1)uVar9;
            FUN_00426f56(iVar13,uVar5,uVar4,uVar9,uVar3);
            DAT_006522c1 = DAT_006522c1 + CONCAT22((short)uVar2,CONCAT11(2,uVar7));
            FUN_00426f56(iVar13,uVar5,uVar4,uVar9,uVar3);
            DAT_006522c1 = DAT_006522c1 + CONCAT22((short)(uVar9 >> 0x10),CONCAT11(3,(char)uVar9));
          }
          else {
            FUN_00426f56();
            DAT_006522c1 = DAT_006522c1 + uVar9;
          }
          goto LAB_005d36aa;
        }
        pbVar1 = puVar12 + 1;
        puVar12 = puVar12 + 8;
      } while ((*pbVar1 & 0x80) == 0);
      uVar11 = uVar11 + 0x20;
    } while (uVar11 < 0x1000);
    uVar11 = (ushort)uVar8 + 0x20;
    uVar8 = CONCAT22(uVar10,uVar11);
    if (0xfff < uVar11) {
      return;
    }
  } while( true );
}

