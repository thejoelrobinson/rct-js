
undefined6 FUN_004490cb(void)

{
  undefined4 in_EAX;
  char cVar1;
  undefined2 uVar2;
  
  cVar1 = (char)(DAT_00630b16 >> 2);
  uVar2 = CONCAT11(DAT_00630b28,cVar1);
  if ((DAT_00630b19 != '\0') && (DAT_00630b19 != '\x02')) {
    uVar2 = CONCAT11(DAT_00630b28,cVar1 + -4);
  }
  return CONCAT24(uVar2,CONCAT22((short)((uint)in_EAX >> 0x10),
                                 DAT_00630b12 + (&DAT_00652478)[(uint)DAT_00630b18 * 2]));
}

