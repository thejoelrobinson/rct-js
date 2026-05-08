
void FUN_009bbff8(void)

{
  undefined4 in_EAX;
  uint uVar1;
  uint uVar2;
  uint uVar3;
  uint uVar4;
  undefined *puVar5;
  
  uVar1 = (uint)DAT_0099fb80;
  uVar3 = (uint)DAT_0099fb82;
  uVar2 = (uint)(ushort)(DAT_0099fb84 + DAT_0099fb80);
  uVar4 = (uint)(ushort)(DAT_0099fb86 + DAT_0099fb82);
  DAT_009b2280 = in_EAX;
  for (puVar5 = &DAT_009a013c; puVar5 < DAT_009a1164; puVar5 = puVar5 + 0x178) {
    FUN_009bc041(uVar4,uVar2,uVar3,uVar1);
  }
  return;
}

