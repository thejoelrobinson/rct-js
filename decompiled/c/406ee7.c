
void FUN_00406ee7(void)

{
  if (DAT_005ebf04 != 0) {
    (**(code **)(*DAT_005ebefc + 0x20))(DAT_005ebefc);
    DAT_005ebf04 = 0;
  }
  if (DAT_005ebefc != (int *)0x0) {
    (**(code **)(*DAT_005ebefc + 8))(DAT_005ebefc);
    DAT_005ebefc = (int *)0x0;
  }
  if (DAT_005ebf08 != 0) {
    (**(code **)(*DAT_005ebf00 + 0x20))(DAT_005ebf00);
    DAT_005ebf08 = 0;
  }
  if (DAT_005ebf00 != (int *)0x0) {
    (**(code **)(*DAT_005ebf00 + 8))(DAT_005ebf00);
    DAT_005ebf00 = (int *)0x0;
  }
  if (DAT_005ebef8 != (int *)0x0) {
    (**(code **)(*DAT_005ebef8 + 8))(DAT_005ebef8);
    DAT_005ebef8 = (int *)0x0;
  }
  return;
}

