
char * FUN_00413c10(char *param_1,char *param_2)

{
  char *pcVar1;
  char *pcVar2;
  char cVar3;
  char *pcVar4;
  char *pcVar5;
  
  if (*param_2 == '\0') {
    return param_1;
  }
  if (param_2[1] == '\0') {
    pcVar4 = (char *)FUN_00417016();
    return pcVar4;
  }
  do {
    cVar3 = *param_1;
    do {
      while (param_1 = param_1 + 1, cVar3 != *param_2) {
        if (cVar3 == '\0') {
          return (char *)0x0;
        }
        cVar3 = *param_1;
      }
      cVar3 = *param_1;
      pcVar5 = param_1 + 1;
      pcVar4 = param_2;
    } while (cVar3 != param_2[1]);
    do {
      if (pcVar4[2] == '\0') {
LAB_00413c83:
        return param_1 + -1;
      }
      if (*pcVar5 != pcVar4[2]) break;
      pcVar1 = pcVar4 + 3;
      if (*pcVar1 == '\0') goto LAB_00413c83;
      pcVar2 = pcVar5 + 1;
      pcVar4 = pcVar4 + 2;
      pcVar5 = pcVar5 + 2;
    } while (*pcVar1 == *pcVar2);
  } while( true );
}

