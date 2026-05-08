
void FUN_0040bc20(void)

{
  int iVar1;
  int in_stack_00000018;
  uint local_40;
  void *local_3c;
  size_t local_38;
  uint local_34;
  uint local_30;
  void *local_2c;
  uint local_28;
  undefined4 local_24;
  byte local_20 [4];
  int local_1c;
  undefined1 local_18 [4];
  uint local_14;
  size_t local_10;
  void *local_c;
  int local_8;
  
  local_8 = 0;
  (**(code **)(**(int **)(&DAT_005f04ec + in_stack_00000018 * 0x16c) + 0x24))
            (*(undefined4 *)(&DAT_005f04ec + in_stack_00000018 * 0x16c),local_20);
  if ((local_20[0] & 2) != 0) {
    local_1c = (**(code **)(**(int **)(&DAT_005f04ec + in_stack_00000018 * 0x16c) + 0x50))
                         (*(undefined4 *)(&DAT_005f04ec + in_stack_00000018 * 0x16c));
    if (local_1c < 0) {
      return;
    }
    *(undefined4 *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c) = 0;
    local_8 = 1;
  }
  (**(code **)(**(int **)(&DAT_005f04ec + in_stack_00000018 * 0x16c) + 0x10))
            (*(undefined4 *)(&DAT_005f04ec + in_stack_00000018 * 0x16c),&local_34,local_18);
  if ((*(uint *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c) != local_34) || (local_8 != 0)) {
    if ((*(int *)(&DAT_005f0508 + in_stack_00000018 * 0x16c) == 0) ||
       (*(int *)(&DAT_005f04fc + in_stack_00000018 * 0x16c) != 0)) {
      if (local_34 < *(uint *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c)) {
        local_30 = (*(int *)(&DAT_005f04f0 + in_stack_00000018 * 0x16c) + local_34) -
                   *(int *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c);
      }
      else {
        local_30 = local_34 - *(int *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c);
      }
      if (local_8 == 0) {
        local_28 = local_30;
      }
      else {
        local_28 = (uint)(*(int *)(&DAT_005f04f0 + in_stack_00000018 * 0x16c) * 2) / 6;
      }
      *(uint *)(&DAT_005f04f8 + in_stack_00000018 * 0x16c) =
           *(int *)(&DAT_005f04f8 + in_stack_00000018 * 0x16c) + local_30;
      if ((*(int *)(&DAT_005f0508 + in_stack_00000018 * 0x16c) == 0) ||
         (*(int *)(&DAT_005f04fc + in_stack_00000018 * 0x16c) == 0)) {
        iVar1 = (**(code **)(**(int **)(&DAT_005f04ec + in_stack_00000018 * 0x16c) + 0x2c))
                          (*(undefined4 *)(&DAT_005f04ec + in_stack_00000018 * 0x16c),
                           *(undefined4 *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c),local_28,
                           &local_3c,&local_10,&local_2c,&local_38,0);
        if (iVar1 == 0) {
          if ((local_10 == 0) || (*(int *)(&DAT_005f0500 + in_stack_00000018 * 0x16c) != 0)) {
            if ((local_10 != 0) && (*(int *)(&DAT_005f0500 + in_stack_00000018 * 0x16c) != 0)) {
              _memset(local_3c,-(uint)(*(short *)(*(int *)(&DAT_005f04bc + in_stack_00000018 * 0x16c
                                                          ) + 0xe) == 8) & 0x80,local_10);
            }
          }
          else {
            local_24 = FUN_004122a3(*(undefined4 *)(&DAT_005f04c0 + in_stack_00000018 * 0x16c),
                                    local_10,local_3c,in_stack_00000018 * 0x16c + 0x5f04c4,&local_14
                                   );
            if (local_14 < local_10) {
              if (*(int *)(&DAT_005f0504 + in_stack_00000018 * 0x16c) == 0) {
                if (*(short *)(*(int *)(&DAT_005f04bc + in_stack_00000018 * 0x16c) + 0xe) == 8) {
                  _memset((void *)(local_14 + (int)local_3c),0x80,local_10 - local_14);
                }
                else if (*(short *)(*(int *)(&DAT_005f04bc + in_stack_00000018 * 0x16c) + 0xe) ==
                         0x10) {
                  _memset((void *)(local_14 + (int)local_3c),0,local_10 - local_14);
                }
                *(undefined4 *)(&DAT_005f0508 + in_stack_00000018 * 0x16c) = 1;
                if (*(uint *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c) < local_34) {
                  *(uint *)(&DAT_005f04fc + in_stack_00000018 * 0x16c) =
                       (*(int *)(&DAT_005f04f0 + in_stack_00000018 * 0x16c) +
                       *(int *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c)) - local_34;
                }
                else {
                  *(uint *)(&DAT_005f04fc + in_stack_00000018 * 0x16c) =
                       *(int *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c) - local_34;
                }
              }
              else {
                local_c = local_3c;
                local_40 = local_10;
                do {
                  local_c = (void *)((int)local_c + local_14);
                  local_40 = local_40 - local_14;
                  FUN_0040c93f(in_stack_00000018);
                  local_24 = FUN_004122a3(*(undefined4 *)(&DAT_005f04c0 + in_stack_00000018 * 0x16c)
                                          ,local_40,local_c,in_stack_00000018 * 0x16c + 0x5f04c4,
                                          &local_14);
                } while (local_14 < local_40);
              }
            }
          }
          if ((local_38 == 0) || (*(int *)(&DAT_005f0500 + in_stack_00000018 * 0x16c) != 0)) {
            if ((local_2c != (void *)0x0) &&
               ((local_38 != 0 && (*(int *)(&DAT_005f0500 + in_stack_00000018 * 0x16c) != 0)))) {
              _memset(local_2c,-(uint)(*(short *)(*(int *)(&DAT_005f04bc + in_stack_00000018 * 0x16c
                                                          ) + 0xe) == 8) & 0x80,local_38);
            }
          }
          else {
            local_24 = FUN_004122a3(*(undefined4 *)(&DAT_005f04c0 + in_stack_00000018 * 0x16c),
                                    local_38,local_2c,in_stack_00000018 * 0x16c + 0x5f04c4,&local_14
                                   );
            if (local_14 < local_38) {
              if (*(int *)(&DAT_005f0504 + in_stack_00000018 * 0x16c) == 0) {
                if (*(short *)(*(int *)(&DAT_005f04bc + in_stack_00000018 * 0x16c) + 0xe) == 8) {
                  _memset((void *)(local_14 + (int)local_2c),0x80,local_38 - local_14);
                }
                else if (*(short *)(*(int *)(&DAT_005f04bc + in_stack_00000018 * 0x16c) + 0xe) ==
                         0x10) {
                  _memset((void *)(local_14 + (int)local_2c),0,local_38 - local_14);
                }
                *(undefined4 *)(&DAT_005f0508 + in_stack_00000018 * 0x16c) = 1;
                if (*(uint *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c) < local_34) {
                  *(uint *)(&DAT_005f04fc + in_stack_00000018 * 0x16c) =
                       (*(int *)(&DAT_005f04f0 + in_stack_00000018 * 0x16c) +
                       *(int *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c)) - local_34;
                }
                else {
                  *(uint *)(&DAT_005f04fc + in_stack_00000018 * 0x16c) =
                       *(int *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c) - local_34;
                }
              }
              else {
                local_c = local_2c;
                local_40 = local_38;
                do {
                  local_c = (void *)((int)local_c + local_14);
                  local_40 = local_40 - local_14;
                  FUN_0040c93f(in_stack_00000018);
                  local_24 = FUN_004122a3(*(undefined4 *)(&DAT_005f04c0 + in_stack_00000018 * 0x16c)
                                          ,local_40,local_c,in_stack_00000018 * 0x16c + 0x5f04c4,
                                          &local_14);
                } while (local_14 < local_40);
              }
            }
          }
          (**(code **)(**(int **)(&DAT_005f04ec + in_stack_00000018 * 0x16c) + 0x4c))
                    (*(undefined4 *)(&DAT_005f04ec + in_stack_00000018 * 0x16c),local_3c,local_10,
                     local_2c,local_38);
          *(uint *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c) =
               *(int *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c) + local_28;
          if (*(uint *)(&DAT_005f04f0 + in_stack_00000018 * 0x16c) <=
              *(uint *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c)) {
            *(int *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c) =
                 *(int *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c) -
                 *(int *)(&DAT_005f04f0 + in_stack_00000018 * 0x16c);
          }
          if (local_8 != 0) {
            (**(code **)(**(int **)(&DAT_005f04ec + in_stack_00000018 * 0x16c) + 0x30))
                      (*(undefined4 *)(&DAT_005f04ec + in_stack_00000018 * 0x16c),0,0,1);
          }
        }
        else {
          OutputDebugStringA(s_TimeFunc___could_not_lock_Direct_005ec024);
        }
      }
      else {
        if (*(uint *)(&DAT_005f04fc + in_stack_00000018 * 0x16c) < local_30) {
          *(undefined4 *)(&DAT_005f04fc + in_stack_00000018 * 0x16c) = 0;
        }
        else {
          *(uint *)(&DAT_005f04fc + in_stack_00000018 * 0x16c) =
               *(int *)(&DAT_005f04fc + in_stack_00000018 * 0x16c) - local_30;
        }
        iVar1 = (**(code **)(**(int **)(&DAT_005f04ec + in_stack_00000018 * 0x16c) + 0x2c))
                          (*(undefined4 *)(&DAT_005f04ec + in_stack_00000018 * 0x16c),
                           *(undefined4 *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c),local_28,
                           &local_3c,&local_10,&local_2c,&local_38,0);
        if (iVar1 == 0) {
          _memset(local_3c,-(uint)(*(short *)(*(int *)(&DAT_005f04bc + in_stack_00000018 * 0x16c) +
                                             0xe) == 8) & 0x80,local_10);
          if ((local_2c != (void *)0x0) && (local_38 != 0)) {
            _memset(local_2c,-(uint)(*(short *)(*(int *)(&DAT_005f04bc + in_stack_00000018 * 0x16c)
                                               + 0xe) == 8) & 0x80,local_38);
          }
          (**(code **)(**(int **)(&DAT_005f04ec + in_stack_00000018 * 0x16c) + 0x4c))
                    (*(undefined4 *)(&DAT_005f04ec + in_stack_00000018 * 0x16c),local_3c,local_10,
                     local_2c,local_38);
          *(uint *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c) =
               *(int *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c) + local_28;
          if (*(uint *)(&DAT_005f04f0 + in_stack_00000018 * 0x16c) <=
              *(uint *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c)) {
            *(int *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c) =
                 *(int *)(&DAT_005f04f4 + in_stack_00000018 * 0x16c) -
                 *(int *)(&DAT_005f04f0 + in_stack_00000018 * 0x16c);
          }
        }
        else {
          OutputDebugStringA(s_TimeFunc___could_not_lock_Direct_005ebff8);
        }
      }
    }
    else if ((*(int *)(&DAT_005f0500 + in_stack_00000018 * 0x16c) == 0) &&
            (*(undefined4 *)(&DAT_005f0500 + in_stack_00000018 * 0x16c) = 1,
            *(int *)(&DAT_005f03a4 + in_stack_00000018 * 0x16c) == 0)) {
      *(undefined4 *)(&DAT_005f03a0 + in_stack_00000018 * 0x16c) = 0;
      if (*(int *)(&DAT_005ebfe8 + in_stack_00000018 * 4) != 0) {
        (**(code **)(**(int **)(&DAT_005ebfe8 + in_stack_00000018 * 4) + 0x48))
                  (*(undefined4 *)(&DAT_005ebfe8 + in_stack_00000018 * 4));
        (**(code **)(**(int **)(&DAT_005ebfe8 + in_stack_00000018 * 4) + 8))
                  (*(undefined4 *)(&DAT_005ebfe8 + in_stack_00000018 * 4));
        *(undefined4 *)(&DAT_005ebfe8 + in_stack_00000018 * 4) = 0;
      }
      if (*(int *)(&DAT_005f04c0 + in_stack_00000018 * 0x16c) != 0) {
        FUN_004123ff(&DAT_005f04c0 + in_stack_00000018 * 0x16c,
                     &DAT_005f04bc + in_stack_00000018 * 0x16c);
      }
    }
  }
  return;
}

