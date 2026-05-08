
void FUN_009bb374(void)

{
  short in_AX;
  int iVar1;
  short in_CX;
  ushort uVar2;
  uint uVar3;
  short in_DX;
  short sVar4;
  short unaff_BX;
  int iVar5;
  ushort uVar6;
  short unaff_SI;
  undefined1 *puVar7;
  undefined1 *puVar8;
  undefined2 *puVar9;
  undefined4 *puVar10;
  undefined4 *puVar11;
  short unaff_DI;
  undefined1 *puVar12;
  undefined1 *puVar13;
  undefined2 *puVar14;
  undefined4 *puVar15;
  undefined4 *puVar16;
  
  if (unaff_SI < 0) {
LAB_009bb42e:
    FUN_009bb355();
    uVar6 = DAT_0099fb84 + DAT_0099fb88;
    iVar1 = (int)in_AX + (int)unaff_BX * (uint)uVar6;
    iVar5 = iVar1 - (int)unaff_SI * (uint)uVar6;
    sVar4 = in_DX + unaff_SI;
    if (unaff_DI < 0) {
      iVar5 = iVar5 - unaff_DI;
    }
    else {
      iVar1 = iVar1 + unaff_DI;
      unaff_DI = -unaff_DI;
    }
    uVar2 = in_CX + unaff_DI;
    puVar15 = (undefined4 *)(iVar1 + DAT_0099fb7c);
    puVar10 = (undefined4 *)(iVar5 + DAT_0099fb7c);
    do {
      puVar11 = puVar10;
      puVar16 = puVar15;
      if ((uVar2 & 1) != 0) {
        puVar16 = (undefined4 *)((int)puVar15 + 1);
        puVar11 = (undefined4 *)((int)puVar10 + 1);
        *(undefined1 *)puVar15 = *(undefined1 *)puVar10;
      }
      uVar3 = (uint)(uVar2 >> 2);
      if ((uVar2 >> 1 & 1) != 0) {
        *(undefined2 *)puVar16 = *(undefined2 *)puVar11;
        puVar11 = (undefined4 *)((int)puVar11 + 2);
        puVar16 = (undefined4 *)((int)puVar16 + 2);
      }
      for (; uVar3 != 0; uVar3 = uVar3 - 1) {
        *puVar16 = *puVar11;
        puVar11 = puVar11 + 1;
        puVar16 = puVar16 + 1;
      }
      puVar15 = (undefined4 *)((int)puVar16 + (int)(short)(uVar6 - uVar2));
      puVar10 = (undefined4 *)((int)puVar11 + (int)(short)(uVar6 - uVar2));
      sVar4 = sVar4 + -1;
    } while (sVar4 != 0);
    return;
  }
  if (unaff_SI == 0) {
    if (unaff_DI < 0) goto LAB_009bb42e;
    if (unaff_DI == 0) {
      return;
    }
  }
  FUN_009bb355();
  uVar6 = DAT_0099fb84 + DAT_0099fb88;
  iVar1 = (int)(short)(in_AX + in_CX + -1) + (int)(short)(unaff_BX + in_DX + -1) * (uint)uVar6;
  iVar5 = iVar1 - (int)unaff_SI * (uint)uVar6;
  sVar4 = in_DX - unaff_SI;
  if (unaff_DI < 0) {
    iVar1 = iVar1 + unaff_DI;
  }
  else {
    iVar5 = iVar5 - unaff_DI;
    unaff_DI = -unaff_DI;
  }
  uVar2 = in_CX + unaff_DI;
  puVar12 = (undefined1 *)(iVar1 + DAT_0099fb7c);
  puVar7 = (undefined1 *)(iVar5 + DAT_0099fb7c);
  do {
    puVar8 = puVar7;
    puVar13 = puVar12;
    if ((uVar2 & 1) != 0) {
      puVar13 = puVar12 + -1;
      puVar8 = puVar7 + -1;
      *puVar12 = *puVar7;
    }
    uVar3 = (uint)(uVar2 >> 2);
    puVar9 = (undefined2 *)(puVar8 + -1);
    puVar14 = (undefined2 *)(puVar13 + -1);
    if ((uVar2 >> 1 & 1) != 0) {
      puVar14 = (undefined2 *)(puVar13 + -3);
      puVar9 = (undefined2 *)(puVar8 + -3);
      *(undefined2 *)(puVar13 + -1) = *(undefined2 *)(puVar8 + -1);
    }
    puVar10 = (undefined4 *)(puVar9 + -1);
    puVar15 = (undefined4 *)(puVar14 + -1);
    for (; uVar3 != 0; uVar3 = uVar3 - 1) {
      *puVar15 = *puVar10;
      puVar10 = puVar10 + -1;
      puVar15 = puVar15 + -1;
    }
    puVar12 = (undefined1 *)((int)puVar15 + (3 - (short)(uVar6 - uVar2)));
    puVar7 = (undefined1 *)((int)puVar10 + (3 - (short)(uVar6 - uVar2)));
    sVar4 = sVar4 + -1;
  } while (sVar4 != 0);
  return;
}

