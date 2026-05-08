
void FUN_004063fb(int param_1)

{
  if (((DAT_005ebe44 != 0) && (DAT_005ebe48 != 0)) && (param_1 == DAT_005f12b0)) {
    (*DAT_005ebe7c)(param_1,DAT_005ebe48);
    DAT_005ebe48 = 0;
    DAT_005f12b0 = 0;
    DAT_005ebe44 = 0;
    GdiFlush();
  }
  return;
}

