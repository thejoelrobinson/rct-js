
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00404e34(void)

{
  undefined4 local_18;
  
  FUN_004049f2(&local_18);
  if ((int)(local_18 & 0xffff) < DAT_005f1cac + DAT_005f15c4) {
    _DAT_005f18e0 = (local_18 & 0xffff) - DAT_005f1cac;
  }
  else {
    _DAT_005f18e0 = DAT_005f15c4;
  }
  if (DAT_005f1cac < 0) {
    _DAT_005f13a4 = 0;
    _DAT_005f1fc4 = -DAT_005f1cac;
    _DAT_005f18e0 = _DAT_005f18e0 + DAT_005f1cac;
  }
  else {
    _DAT_005f13a4 = DAT_005f1cac;
    _DAT_005f1fc4 = 0;
  }
  if ((int)(uint)local_18._2_2_ < DAT_005f1cb0 + DAT_005f1b34) {
    _DAT_005f1b24 = (uint)local_18._2_2_ - DAT_005f1cb0;
  }
  else {
    _DAT_005f1b24 = DAT_005f1b34;
  }
  if (DAT_005f1cb0 < 0) {
    _DAT_005f13ac = 0;
    _DAT_005f1a08 = -DAT_005f1cb0;
    _DAT_005f1b24 = _DAT_005f1b24 + DAT_005f1cb0;
  }
  else {
    _DAT_005f13ac = DAT_005f1cb0;
    _DAT_005f1a08 = 0;
  }
  return;
}

