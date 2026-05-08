
void FUN_0040eadf(int param_1)

{
  if (*(int *)(param_1 + 0x90) == 0) {
    if (*(int *)(param_1 + 0x88) != 0) {
      FUN_00413470(*(undefined4 *)(param_1 + 0x88));
    }
    if (*(int *)(param_1 + 0x8c) != 0) {
      DeleteObject(*(HGDIOBJ *)(param_1 + 0x8c));
    }
    FUN_00413470(param_1);
  }
  return;
}

