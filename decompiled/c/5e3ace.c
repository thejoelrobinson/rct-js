
void FUN_005e3ace(void)

{
  undefined *puVar1;
  undefined4 in_EAX;
  undefined4 in_ECX;
  undefined4 extraout_ECX;
  short sVar2;
  undefined4 unaff_EBX;
  undefined4 unaff_EBP;
  undefined *puVar3;
  undefined4 unaff_EDI;
  ulonglong uVar5;
  undefined *puVar4;
  
  puVar1 = DAT_009a1164;
LAB_005e3ad4:
  do {
    do {
      do {
        puVar4 = puVar1;
        puVar3 = puVar4 + -0x178;
        if (puVar3 < &DAT_009a013c) {
          return;
        }
        puVar1 = puVar3;
      } while (((short)in_EAX < *(short *)(puVar4 + -0x158)) ||
              ((short)(*(short *)(puVar4 + -0x158) + *(short *)(puVar4 + -0x154)) <= (short)in_EAX))
      ;
    } while (((short)unaff_EBX < *(short *)(puVar4 + -0x156)) ||
            (sVar2 = *(short *)(puVar4 + -0x156) + *(short *)(puVar4 + -0x152),
            uVar5 = (ulonglong)CONCAT24(sVar2,in_EAX), sVar2 <= (short)unaff_EBX));
    if ((*(ushort *)(puVar4 + -0x146) & 0x20) != 0) {
      uVar5 = FUN_005e3874(unaff_EDI);
      in_EAX = (undefined4)uVar5;
      in_ECX = extraout_ECX;
      if ((int)(uVar5 >> 0x20) == -1) goto LAB_005e3ad4;
    }
    in_EAX = (undefined4)uVar5;
    (**(code **)(puVar4 + -0x174))
              (unaff_EDI,puVar3,unaff_EBP,&stack0x00000000,unaff_EBX,(int)(uVar5 >> 0x20),in_ECX);
    puVar1 = DAT_009a1164;
    if (puVar3 != (undefined *)0x0) {
      return;
    }
  } while( true );
}

