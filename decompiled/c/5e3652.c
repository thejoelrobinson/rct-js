
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_005e3652(void)

{
  short sVar1;
  ushort extraout_CX;
  int in_EDX;
  int iVar2;
  undefined4 *unaff_ESI;
  char *pcVar3;
  int unaff_EDI;
  char *pcVar4;
  
  if (((unaff_ESI != (undefined4 *)0x0) && (in_EDX != -1)) &&
     ((*(code *)*unaff_ESI)(), *(short *)(unaff_EDI + 0xe) != -1)) {
    DAT_00991f49 = *(undefined1 *)(unaff_ESI + 0x5d);
    DAT_00991f4a = *(undefined2 *)(unaff_ESI + 0xc);
    DAT_00991f4c = (undefined2)in_EDX;
    sVar1 = (*(code *)unaff_ESI[1])(unaff_EDI,in_EDX,DAT_00991f4a);
    if (sVar1 != -1) {
      FUN_00458bcf(unaff_ESI,unaff_EDI,in_EDX);
      DAT_00971e84 = 0xe0;
      FUN_00458a7c();
      iVar2 = CONCAT22(0xe,extraout_CX + 4);
      if (200 < (ushort)(extraout_CX + 4)) {
        iVar2 = (uint)(byte)((char)(extraout_CX / 0xab) + 1) * 0xa0000 + 0x400c8;
      }
      pcVar4 = &DAT_0099a887;
      while (pcVar3 = pcVar4 + 1, *pcVar3 != '\0') {
        pcVar4 = pcVar3;
        if (*pcVar3 == '\x05') {
          iVar2 = CONCAT22((short)((uint)(iVar2 + 0xa0000) >> 0x10),
                           (ushort)((short)(iVar2 + 0xa0000) + 0x32U) >> 1);
        }
      }
      _DAT_009a15ac = (undefined2)iVar2;
      _DAT_009a15b0 = (undefined2)((uint)iVar2 >> 0x10);
      FUN_005e3f31();
      *(undefined **)(pcVar4 + 0x1d) = &DAT_009a15a8;
      *(undefined2 *)(pcVar4 + 0x15b) = *(undefined2 *)(unaff_EDI + 0xe);
      *(undefined4 *)(pcVar4 + 0x15d) = DAT_00971e86;
      *(undefined4 *)(pcVar4 + 0x161) = DAT_00971e8a;
      DAT_00991f54 = 0;
    }
  }
  return;
}

