
void FUN_00402ce0(void)

{
  if (DAT_005e9198 != 0) {
    switch(DAT_005f1b5c) {
    case 1:
      wsprintfA(&DAT_005f1a20,s__s_Error_Location__Windows_Sound_005ebad4,&DAT_005f1a20);
    case 2:
      wsprintfA(&DAT_005f1a20,s__s_Error_Location__Windows_Displ_005ebafc,&DAT_005f1a20);
    case 3:
      wsprintfA(&DAT_005f1a20,s__s_Error_Location__Windows_I_O_D_005ebb28,&DAT_005f1a20);
    case 4:
      wsprintfA(&DAT_005f1a20,s__s_Error_Location__Windows_Unkno_005ebb50,&DAT_005f1a20);
    default:
      wsprintfA(&DAT_005f1a20,s__s_Error_Location__Unknown_005ebb7c,&DAT_005f1a20);
    }
  }
  if (DAT_005f1b40 != 0) {
    wsprintfA(&DAT_005f1a20,s__s__08X___08X___08X___08X__08X____005ebb98,&DAT_005f1a20,DAT_005f1b40,
              DAT_005f1b44,DAT_005f1b48,DAT_005f1b4c,DAT_005f1b50,DAT_005f1b54,DAT_005f1b58,
              DAT_005f1b5c);
  }
  MessageBoxA(DAT_005e916c,&DAT_005f1a20,&DAT_005f17e0,0x10);
  return;
}

