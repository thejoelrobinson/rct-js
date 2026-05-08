
/* Library Function - Single Match
    __amsg_exit
   
   Library: Visual Studio 1998 Release */

void __cdecl __amsg_exit(int param_1)

{
  if (DAT_005efeb4 == 1) {
    FUN_004151d0();
  }
  FUN_00415210(param_1);
  (*(code *)PTR___exit_005ec260)(0xff);
  return;
}

