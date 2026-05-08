
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00442516(void)

{
  byte bVar1;
  uint in_EAX;
  uint uVar2;
  uint in_EDX;
  uint uVar3;
  byte bVar4;
  uint unaff_EBX;
  uint uVar5;
  uint unaff_EBP;
  char *pcVar6;
  uint uVar7;
  int iVar8;
  undefined4 unaff_EDI;
  
  pcVar6 = &DAT_00887420;
  uVar3 = in_EDX & 0xffff0000;
  do {
    if (*pcVar6 != -1) {
      uVar3 = CONCAT22((short)(uVar3 >> 0x10),(short)uVar3 + 1);
    }
    pcVar6 = pcVar6 + 0x260;
  } while (pcVar6 < &DAT_008ad1c0);
  DAT_0087d7a0 = (undefined2)uVar3;
  uVar5 = unaff_EBX & 0xffff0000;
  uVar2 = 0;
  uVar3 = uVar3 & 0xffff0000;
  _DAT_006293cd = 0;
  for (uVar7 = CONCAT22((short)((uint)pcVar6 >> 0x10),DAT_0087c398); bVar4 = (byte)uVar5,
      (short)uVar7 != -1;
      uVar7 = CONCAT22((short)((uint)(&DAT_00743b94 + iVar8) >> 0x10),
                       (&DAT_00743b98)[(uVar7 & 0xffff) * 0x80])) {
    iVar8 = (uVar7 & 0xffff) * 0x100;
    if ((((&DAT_00743bc2)[iVar8] == '\0') && ((&DAT_00743bbe)[iVar8] == '\0')) &&
       ((byte)(&DAT_00743c46)[iVar8] < 6)) {
      bVar1 = (&DAT_00743c44)[iVar8];
      in_EAX = (uint)bVar1;
      if (bVar1 == 0x14) {
        if (((&DAT_00743c59)[iVar8] == -1) ||
           (unaff_EBP = (uint)(byte)(&DAT_00887420)[(uint)(byte)(&DAT_00743c59)[iVar8] * 0x260],
           (*(uint *)(&DAT_005f5b78 + unaff_EBP * 8) & 0x800000) == 0)) {
          uVar5 = CONCAT31((int3)(uVar5 >> 8),bVar4 + 1);
        }
      }
      else if (bVar1 == 0x15) {
        if (((&DAT_00743c59)[iVar8] == -1) ||
           (unaff_EBP = (uint)(byte)(&DAT_00887420)[(uint)(byte)(&DAT_00743c59)[iVar8] * 0x260],
           (*(uint *)(&DAT_005f5b78 + unaff_EBP * 8) & 0x1000000) == 0)) {
          uVar5 = CONCAT22((short)(uVar5 >> 0x10),CONCAT11((char)(uVar5 >> 8) + '\x01',bVar4));
        }
      }
      else if (bVar1 == 0x16) {
        if (((&DAT_00743c59)[iVar8] == -1) ||
           (unaff_EBP = (uint)(byte)(&DAT_00887420)[(uint)(byte)(&DAT_00743c59)[iVar8] * 0x260],
           (*(uint *)(&DAT_005f5b78 + unaff_EBP * 8) & 0x2000000) == 0)) {
          uVar2 = CONCAT31((int3)(uVar2 >> 8),(char)uVar2 + '\x01');
        }
      }
      else if (bVar1 == 0x1a) {
        uVar2 = (uint)CONCAT11((char)(uVar2 >> 8) + '\x01',(char)uVar2);
      }
      else if (bVar1 == 0x1f) {
        uVar3 = CONCAT31((int3)(uVar3 >> 8),(char)uVar3 + '\x01');
      }
      else if (bVar1 == 0x21) {
        uVar3 = CONCAT22((short)(uVar3 >> 0x10),CONCAT11((char)(uVar3 >> 8) + '\x01',(char)uVar3));
      }
      else if (bVar1 == 0x10) {
        DAT_006293cd = DAT_006293cd + '\x01';
      }
      else if (bVar1 == 0x1b) {
        DAT_006293ce = DAT_006293ce + '\x01';
      }
    }
  }
  if (DAT_0087d728 == '\0') {
    if ((0x18 < bVar4) && (in_EAX = (uint)(DAT_0087c81c >> 5), (byte)(DAT_0087c81c >> 5) <= bVar4))
    {
      DAT_0087d728 = '\x04';
      FUN_0042c711();
    }
  }
  else {
    DAT_0087d728 = DAT_0087d728 + -1;
  }
  if (DAT_0087d729 == '\0') {
    if ((0x18 < (byte)(uVar5 >> 8)) &&
       (in_EAX = (uint)(DAT_0087c81c >> 5), (byte)(DAT_0087c81c >> 5) <= (byte)uVar5)) {
      DAT_0087d729 = '\x04';
      FUN_0042c711(unaff_EDI,uVar7,unaff_EBP,&stack0x00000000);
    }
  }
  else {
    DAT_0087d729 = DAT_0087d729 + -1;
  }
  if (DAT_0087d72a == '\0') {
    if ((0x1b < (byte)uVar2) &&
       (in_EAX = (uint)(DAT_0087c81c >> 5), (byte)(DAT_0087c81c >> 5) <= (byte)uVar5)) {
      DAT_0087d72a = '\x04';
      FUN_0042c711(unaff_EDI,uVar7,unaff_EBP,&stack0x00000000,uVar5,uVar3,uVar2,in_EAX);
    }
  }
  else {
    DAT_0087d72a = DAT_0087d72a + -1;
  }
  if (DAT_0087d72b == '\0') {
    if (0x13 < (byte)(uVar2 >> 8)) {
      DAT_0087d72b = '\x04';
      FUN_0042c711(unaff_EDI,uVar7,unaff_EBP,&stack0x00000000,uVar5,uVar3,uVar2,in_EAX);
    }
  }
  else {
    DAT_0087d72b = DAT_0087d72b + -1;
  }
  if (DAT_0087d72c == '\0') {
    if (0x13 < (byte)uVar3) {
      DAT_0087d72c = '\x04';
      FUN_0042c711(unaff_EDI,uVar7,unaff_EBP,&stack0x00000000,uVar5,uVar3,uVar2,in_EAX);
    }
  }
  else {
    DAT_0087d72c = DAT_0087d72c + -1;
  }
  if (DAT_0087d72d == '\0') {
    if (0xe < (byte)(uVar3 >> 8)) {
      DAT_0087d72d = '\x04';
      FUN_0042c711(unaff_EDI,uVar7,unaff_EBP,&stack0x00000000,uVar5,uVar3,uVar2,in_EAX);
    }
  }
  else {
    DAT_0087d72d = DAT_0087d72d + -1;
  }
  if (DAT_0087d72e == '\0') {
    if (DAT_006293ce < 8) {
      if (7 < DAT_006293cd) {
        DAT_0087d72e = '\x04';
        FUN_0042c711(unaff_EDI,uVar7,unaff_EBP,&stack0x00000000,uVar5,uVar3,uVar2,in_EAX);
      }
    }
    else {
      DAT_0087d72e = '\x04';
      FUN_0042c711(unaff_EDI,uVar7,unaff_EBP,&stack0x00000000,uVar5,uVar3,uVar2,in_EAX);
    }
  }
  else {
    DAT_0087d72e = DAT_0087d72e + -1;
  }
  return;
}

