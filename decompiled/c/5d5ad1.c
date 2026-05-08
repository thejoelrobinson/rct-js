
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined8 FUN_005d5ad1(void)

{
  undefined2 uVar1;
  ushort uVar2;
  undefined4 in_EAX;
  int iVar3;
  ushort uVar4;
  short sVar5;
  ushort uVar6;
  byte bVar7;
  uint in_EDX;
  uint uVar8;
  undefined1 *puVar9;
  int unaff_ESI;
  undefined1 *puVar10;
  byte *pbVar11;
  bool bVar12;
  byte local_24;
  
  puVar10 = (undefined1 *)((in_EDX & 0xff) * 0x260);
  DAT_00656b34 = puVar10[0x887420];
  DAT_00656b35 = puVar10[0x887421];
  DAT_00656b3a = puVar10[0x887424];
  DAT_00656b3b = puVar10[0x887425] & 3;
  uVar8 = 0;
  do {
    *(undefined2 *)(&DAT_00656b3c + uVar8 * 2) =
         *(undefined2 *)(puVar10 + (int)(&DAT_00887426 + uVar8));
    uVar8 = uVar8 + 1;
  } while (uVar8 < 0xc);
  DAT_00656b54 = puVar10[0x88743e];
  DAT_00656b55 = puVar10[0x88743f];
  DAT_00656b56 = puVar10[0x887440];
  DAT_00656b57 = puVar10[0x887496];
  DAT_00656b58 = puVar10[0x887498];
  DAT_00656b59 = puVar10[0x887499];
  DAT_00656b5a = puVar10[0x88749e];
  DAT_00656b5b = puVar10[0x88749f];
  DAT_00656b5c = puVar10[0x8874a0];
  DAT_00656b5d = (undefined1)((uint)*(undefined4 *)(puVar10 + 0x8874a8) >> 0x10);
  DAT_00656b5e = (undefined1)((uint)*(undefined4 *)(puVar10 + 0x8874ac) >> 0x10);
  uVar8 = 0;
  iVar3 = 0;
  do {
    iVar3 = iVar3 + *(int *)(puVar10 + (int)(&DAT_008874b4 + uVar8 * 4));
    uVar8 = uVar8 + 1;
  } while (uVar8 < 4);
  DAT_00656b5f = (undefined2)((uint)iVar3 >> 0x10);
  DAT_00656b61 = (undefined1)(*(short *)(puVar10 + 0x8874cc) >> 5);
  DAT_00656b62 = (undefined1)(*(short *)(puVar10 + 0x8874ce) >> 5);
  DAT_00656b63 = (undefined1)(*(short *)(puVar10 + 0x8874d0) >> 5);
  DAT_00656b64 = puVar10[0x8874e4];
  DAT_00656b65 = puVar10[0x8874e5];
  DAT_00656b66 = puVar10[0x8874e7];
  DAT_00656b67 = (undefined1)(*(ushort *)(puVar10 + 0x887510) / 10);
  DAT_00656b68 = (undefined1)(*(ushort *)(puVar10 + 0x887512) / 10);
  DAT_00656b69 = (undefined1)(*(ushort *)(puVar10 + 0x887514) / 10);
  _DAT_00656b6a = *(undefined2 *)(puVar10 + 0x887552);
  DAT_00656b36 = 0;
  puVar9 = &DAT_00656b6c;
  do {
    *puVar9 = 0;
    puVar9 = puVar9 + 1;
  } while (puVar9 < &DAT_00658aae);
  if (DAT_00656b34 == '\x14') {
    local_24 = (byte)in_EDX;
    uVar6 = (ushort)local_24;
    uVar2 = 0;
    uVar4 = 0;
    do {
      do {
        puVar10 = (undefined1 *)
                  (&DAT_00971ef4)
                  [(ushort)((ushort)(uVar4 << 7 | uVar4 >> 9 | uVar2) >> 5 | (uVar4 >> 9) << 0xb)];
        do {
          uVar6 = CONCAT11(*puVar10,(char)uVar6) & 0x3cff;
          if (((char)(uVar6 >> 8) == '\b') && ((char)uVar6 == puVar10[7])) {
            puVar10 = &DAT_00656b6c;
            DAT_006522c9 = uVar2;
            DAT_006522cb = uVar4;
            goto LAB_005d5e6e;
          }
          pbVar11 = puVar10 + 1;
          puVar10 = puVar10 + 8;
        } while ((*pbVar11 & 0x80) == 0);
        uVar2 = uVar2 + 0x20;
      } while (uVar2 < 0x1000);
      uVar2 = 0;
      uVar4 = uVar4 + 0x20;
    } while (uVar4 < 0x1000);
  }
  else {
    FUN_005d3277();
    bVar12 = unaff_ESI != -1;
    if (unaff_ESI != -1) {
      FUN_005cfc50();
      if (!bVar12) {
        FUN_005cfc50();
      }
      bVar12 = false;
      FUN_005cfe66();
      if (!bVar12) {
        DAT_00656b6c = puVar10[4];
        if (DAT_00656b6c == '(') {
          DAT_00656b36 = DAT_00656b36 | 0x80;
        }
        if (DAT_00656b6c == ')') {
          DAT_00656b36 = DAT_00656b36 | 0x80;
        }
        if (DAT_00656b6c == '4') {
          DAT_00656b36 = DAT_00656b36 | 0x20000;
        }
        if (DAT_00656b6c == '5') {
          DAT_00656b36 = DAT_00656b36 | 0x20000;
        }
        if (DAT_00656b6c == '6') {
          DAT_00656b36 = DAT_00656b36 | 0x20000;
        }
        if (DAT_00656b6c == '7') {
          DAT_00656b36 = DAT_00656b36 | 0x20000;
        }
        if (DAT_00656b6c == '8') {
          DAT_00656b36 = DAT_00656b36 | 0x40000;
        }
        if (DAT_00656b6c == '9') {
          DAT_00656b36 = DAT_00656b36 | 0x40000;
        }
        if (DAT_00656b6c == ':') {
          DAT_00656b36 = DAT_00656b36 | 0x80000;
        }
        if (DAT_00656b6c == ';') {
          DAT_00656b36 = DAT_00656b36 | 0x80000;
        }
        if (DAT_00656b6c == '<') {
          DAT_00656b36 = DAT_00656b36 | 0x80000;
        }
        if (DAT_00656b6c == '=') {
          DAT_00656b36 = DAT_00656b36 | 0x80000;
        }
        if (DAT_00656b6c == 'u') {
          DAT_00656b36 = DAT_00656b36 | 0x8000000;
        }
        uVar2 = CONCAT11((byte)puVar10[5] >> 4,*puVar10) & 0xff80;
        DAT_00656b6d = (byte)uVar2 | (byte)(uVar2 >> 8);
        bVar12 = false;
        FUN_005cfac7();
        if (!bVar12) {
          FUN_005cfe66();
        }
        DAT_00656b6e = 0xff;
        return CONCAT44(in_EDX,in_EAX);
      }
    }
  }
  goto LAB_005d5ff4;
  while( true ) {
    uVar2 = 0;
    uVar4 = uVar4 + 0x20;
    if (0xfff < uVar4) break;
LAB_005d5e6e:
    do {
      puVar9 = (undefined1 *)
               (&DAT_00971ef4)
               [(ushort)((ushort)(uVar4 << 7 | uVar4 >> 9 | uVar2) >> 5 | (uVar4 >> 9) << 0xb)];
      do {
        uVar6 = CONCAT11(*puVar9,(char)uVar6) & 0x3cff;
        bVar7 = (byte)uVar6;
        if (((char)(uVar6 >> 8) == '\b') && (bVar7 == puVar9[7])) {
          uVar1 = *(undefined2 *)(puVar9 + 5);
          sVar5 = uVar4 - DAT_006522cb;
          *puVar10 = (char)((short)(uVar2 - DAT_006522c9) >> 5);
          puVar10[1] = (char)(sVar5 >> 5);
          *(undefined2 *)(puVar10 + 2) = uVar1;
          puVar10 = puVar10 + 4;
          if ((undefined1 *)0x658aa1 < puVar10) goto LAB_005d5ff4;
        }
        pbVar11 = puVar9 + 1;
        puVar9 = puVar9 + 8;
      } while ((*pbVar11 & 0x80) == 0);
      uVar2 = uVar2 + 0x20;
    } while (uVar2 < 0x1000);
  }
  uVar2 = (&DAT_00887462)[(uint)bVar7 * 0x130];
  if (uVar2 != 0xffff) {
    uVar4 = (uVar2 & 0xff) * 0x20;
    uVar6 = (uVar2 >> 8) * 0x20;
    for (pbVar11 = (byte *)(&DAT_00971ef4)
                           [(ushort)((ushort)((uVar2 >> 8) << 0xc | uVar4) >> 5 |
                                    (uVar6 >> 9) << 0xb)];
        (((*pbVar11 & 0x3c) != 0x10 || (pbVar11[4] != 0)) || (bVar7 != pbVar11[7]));
        pbVar11 = pbVar11 + 8) {
    }
    puVar10[2] = *pbVar11 & 3;
    puVar10[3] = 8;
    sVar5 = uVar6 - DAT_006522cb;
    *puVar10 = (char)((short)(uVar4 - DAT_006522c9) >> 5);
    puVar10[1] = (char)(sVar5 >> 5);
    uVar2 = (&DAT_0088746a)[(uint)bVar7 * 0x130];
    if (uVar2 != 0xffff) {
      uVar4 = (uVar2 & 0xff) * 0x20;
      uVar6 = (uVar2 >> 8) * 0x20;
      for (pbVar11 = (byte *)(&DAT_00971ef4)
                             [(ushort)((ushort)((uVar2 >> 8) << 0xc | uVar4) >> 5 |
                                      (uVar6 >> 9) << 0xb)];
          (((*pbVar11 & 0x3c) != 0x10 || (pbVar11[4] != 1)) || (bVar7 != pbVar11[7]));
          pbVar11 = pbVar11 + 8) {
      }
      puVar10[6] = *pbVar11 & 3;
      puVar10[7] = 0x80;
      sVar5 = uVar6 - DAT_006522cb;
      puVar10[4] = (char)((short)(uVar4 - DAT_006522c9) >> 5);
      puVar10[5] = (char)(sVar5 >> 5);
      *(undefined4 *)(puVar10 + 8) = 0;
      return CONCAT44(in_EDX,in_EAX);
    }
  }
LAB_005d5ff4:
  return CONCAT44(in_EDX,in_EAX);
}

