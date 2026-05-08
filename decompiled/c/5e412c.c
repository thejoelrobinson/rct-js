
undefined8 FUN_005e412c(void)

{
  ushort *puVar1;
  undefined4 in_EAX;
  int iVar2;
  undefined2 extraout_CX;
  undefined2 extraout_DX;
  undefined4 in_EDX;
  int iVar3;
  int unaff_ESI;
  char *pcVar4;
  
  iVar2 = 0;
  iVar3 = 0;
  for (pcVar4 = *(char **)(unaff_ESI + 0x1c); *pcVar4 != '\x15'; pcVar4 = pcVar4 + 0x10) {
    if (*pcVar4 == '\x11') {
      *(undefined2 *)(iVar3 + 0x34 + unaff_ESI) = 0;
      (**(code **)(unaff_ESI + 4))(pcVar4,iVar3,iVar2);
      *(undefined2 *)(iVar3 + 0x36 + unaff_ESI) = 0;
      *(undefined2 *)(iVar3 + 0x38 + unaff_ESI) = extraout_CX;
      *(undefined2 *)(iVar3 + 0x3e + unaff_ESI) = 0;
      *(undefined2 *)(iVar3 + 0x40 + unaff_ESI) = extraout_DX;
      if ((*(uint *)(pcVar4 + 10) & 1) != 0) {
        puVar1 = (ushort *)(iVar3 + 0x34 + unaff_ESI);
        *puVar1 = *puVar1 | 1;
      }
      if ((*(uint *)(pcVar4 + 10) & 2) != 0) {
        puVar1 = (ushort *)(iVar3 + 0x34 + unaff_ESI);
        *puVar1 = *puVar1 | 0x10;
      }
      iVar2 = FUN_005e4198();
      iVar2 = iVar2 + 1;
      iVar3 = iVar3 + 0x12;
    }
  }
  return CONCAT44(in_EDX,in_EAX);
}

