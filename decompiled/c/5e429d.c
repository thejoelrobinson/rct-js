
void FUN_005e429d(void)

{
  short sVar1;
  int in_EAX;
  byte in_CL;
  uint in_EDX;
  short sVar2;
  int unaff_EBX;
  int unaff_ESI;
  int *piVar3;
  
  piVar3 = (int *)&DAT_009a1168;
  do {
    if ((short)*piVar3 == 0) {
      piVar3[1] = in_EAX;
      *piVar3 = unaff_EBX;
      if ((in_EDX >> 0x1e & 1) == 0) {
        in_CL = 0;
      }
      piVar3[3] = unaff_EBX << (in_CL & 0x1f);
      *(byte *)(piVar3 + 4) = in_CL;
      *(short *)((int)piVar3 + 0x12) = 0;
      if (DAT_005f8d5c == '\x01') {
        *(ushort *)((int)piVar3 + 0x12) = *(ushort *)((int)piVar3 + 0x12) | 0x100;
      }
      *(int **)(unaff_ESI + 8) = piVar3;
      if ((in_EDX & 0x80000000) == 0) {
        sVar2 = (short)((in_EDX & 0xbfffffff) >> 0x10);
        *(undefined2 *)(unaff_ESI + 0x16e) = 0xffff;
      }
      else {
        *(short *)(unaff_ESI + 0x16e) = (short)(in_EDX & 0xbfffffff);
        sVar2 = (&DAT_00743ba4)[(in_EDX & 0xffff) * 0x80];
      }
      sVar1 = FUN_005e4355();
      *(short *)(unaff_ESI + 0x170) = sVar1;
      *(short *)(unaff_ESI + 0x172) = sVar2;
      *(short *)(piVar3 + 2) = sVar1;
      *(short *)((int)piVar3 + 10) = sVar2;
      FUN_005e6a83();
      return;
    }
    piVar3 = piVar3 + 5;
  } while (piVar3 < &DAT_009a121c);
  FUN_005df431();
  return;
}

