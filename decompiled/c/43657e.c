
undefined4 FUN_0043657e(void)

{
  undefined4 in_EAX;
  int extraout_ECX;
  
  if (&DAT_00743b10 < DAT_00981ef4) {
    do {
      in_EAX = FUN_004365c3();
    } while (extraout_ECX != 1);
    if ((&DAT_00743b10 < DAT_00981ef4) && (in_EAX = FUN_00436634(), &DAT_00743b10 < DAT_00981ef4)) {
      DAT_00991efc = 0x393;
      return in_EAX;
    }
  }
  return in_EAX;
}

