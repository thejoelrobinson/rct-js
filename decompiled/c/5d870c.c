
void FUN_005d870c(void)

{
  int unaff_ESI;
  
  *(short *)(unaff_ESI + 0x4e) = *(short *)(unaff_ESI + 0x4e) + (-*(short *)(unaff_ESI + 0x4c) >> 6)
  ;
                    /* WARNING: Could not recover jumptable at 0x005d8724. Too many branches */
                    /* WARNING: Treating indirect jump as call */
  (**(code **)((int)&PTR_LAB_0065de64 + (*(ushort *)(unaff_ESI + 0x36) & 0xfffc)))();
  return;
}

