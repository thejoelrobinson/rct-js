
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_00413c90(char *param_1,char *param_2)

{
  char cVar1;
  code *pcVar2;
  DWORD DVar3;
  uint uVar4;
  int iVar5;
  uint uVar6;
  char *pcVar7;
  char *pcVar8;
  CHAR *pCVar9;
  char *pcVar10;
  char *pcVar11;
  char acStackY_356 [14];
  undefined4 uStackY_348;
  undefined *puStackY_344;
  char *pcStackY_340;
  CHAR local_324 [260];
  char local_220 [540];
  
  if ((DAT_005efeb4 == 1) || ((DAT_005efeb4 == 0 && (DAT_005ec264 == 1)))) {
    if ((_DAT_005ee7ac & 0x10c) == 0) {
      pcStackY_340 = &DAT_005ee7a0;
      puStackY_344 = (undefined *)0x414199;
      FUN_00417280();
    }
    pcStackY_340 = s_Assertion_failed___s__file__s__l_005ec2a0;
    puStackY_344 = &DAT_005ee7a0;
    uStackY_348 = 0x4141b7;
    FUN_00417240();
    FUN_004170f0();
  }
  else {
    builtin_strncpy(local_220,"Assertion failed!",0x12);
    uVar4 = 0xffffffff;
    pcVar7 = PTR_DAT_005ec2d0;
    do {
      pcVar8 = pcVar7;
      if (uVar4 == 0) break;
      uVar4 = uVar4 - 1;
      pcVar8 = pcVar7 + 1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar8;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar7 = local_220;
    do {
      pcVar11 = pcVar7;
      if (iVar5 == 0) break;
      iVar5 = iVar5 + -1;
      pcVar11 = pcVar7 + 1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar11;
    } while (cVar1 != '\0');
    pcVar7 = pcVar8 + -uVar4;
    pcVar8 = pcVar11 + -1;
    for (uVar6 = uVar4 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      *(undefined4 *)pcVar8 = *(undefined4 *)pcVar7;
      pcVar7 = pcVar7 + 4;
      pcVar8 = pcVar8 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      *pcVar8 = *pcVar7;
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar7 = "Program: ";
    do {
      pcVar8 = pcVar7;
      if (uVar4 == 0) break;
      uVar4 = uVar4 - 1;
      pcVar8 = pcVar7 + 1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar8;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar7 = local_220;
    do {
      pcVar11 = pcVar7;
      if (iVar5 == 0) break;
      iVar5 = iVar5 + -1;
      pcVar11 = pcVar7 + 1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar11;
    } while (cVar1 != '\0');
    pcVar7 = pcVar8 + -uVar4;
    pcVar8 = pcVar11 + -1;
    for (uVar6 = uVar4 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      *(undefined4 *)pcVar8 = *(undefined4 *)pcVar7;
      pcVar7 = pcVar7 + 4;
      pcVar8 = pcVar8 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      *pcVar8 = *pcVar7;
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    pcStackY_340 = (char *)0x413d6a;
    DVar3 = GetModuleFileNameA((HMODULE)0x0,local_324,0x104);
    if (DVar3 == 0) {
      pcVar7 = "<program name unknown>";
      pCVar9 = local_324;
      for (iVar5 = 5; iVar5 != 0; iVar5 = iVar5 + -1) {
        *(undefined4 *)pCVar9 = *(undefined4 *)pcVar7;
        pcVar7 = pcVar7 + 4;
        pCVar9 = pCVar9 + 4;
      }
      *(undefined2 *)pCVar9 = *(undefined2 *)pcVar7;
      pCVar9[2] = pcVar7[2];
    }
    uVar4 = 0xffffffff;
    pcVar7 = local_324;
    pcVar8 = local_324;
    do {
      if (uVar4 == 0) break;
      uVar4 = uVar4 - 1;
      cVar1 = *pcVar8;
      pcVar8 = pcVar8 + 1;
    } while (cVar1 != '\0');
    if (0x3c < ~uVar4 + 10) {
      uVar4 = 0xffffffff;
      pcVar7 = local_324;
      do {
        if (uVar4 == 0) break;
        uVar4 = uVar4 - 1;
        cVar1 = *pcVar7;
        pcVar7 = pcVar7 + 1;
      } while (cVar1 != '\0');
      pcVar7 = acStackY_356 + ~uVar4;
      pcStackY_340 = (char *)0x413dca;
      _strncpy(pcVar7,PTR_DAT_005ec2c8,3);
    }
    uVar4 = 0xffffffff;
    do {
      pcVar8 = pcVar7;
      if (uVar4 == 0) break;
      uVar4 = uVar4 - 1;
      pcVar8 = pcVar7 + 1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar8;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar7 = local_220;
    do {
      pcVar11 = pcVar7;
      if (iVar5 == 0) break;
      iVar5 = iVar5 + -1;
      pcVar11 = pcVar7 + 1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar11;
    } while (cVar1 != '\0');
    pcVar7 = pcVar8 + -uVar4;
    pcVar8 = pcVar11 + -1;
    for (uVar6 = uVar4 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      *(undefined4 *)pcVar8 = *(undefined4 *)pcVar7;
      pcVar7 = pcVar7 + 4;
      pcVar8 = pcVar8 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      *pcVar8 = *pcVar7;
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar7 = PTR_DAT_005ec2cc;
    do {
      pcVar8 = pcVar7;
      if (uVar4 == 0) break;
      uVar4 = uVar4 - 1;
      pcVar8 = pcVar7 + 1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar8;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar7 = local_220;
    do {
      pcVar11 = pcVar7;
      if (iVar5 == 0) break;
      iVar5 = iVar5 + -1;
      pcVar11 = pcVar7 + 1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar11;
    } while (cVar1 != '\0');
    pcVar7 = pcVar8 + -uVar4;
    pcVar8 = pcVar11 + -1;
    for (uVar6 = uVar4 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      *(undefined4 *)pcVar8 = *(undefined4 *)pcVar7;
      pcVar7 = pcVar7 + 4;
      pcVar8 = pcVar8 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      *pcVar8 = *pcVar7;
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar7 = "File: ";
    do {
      pcVar8 = pcVar7;
      if (uVar4 == 0) break;
      uVar4 = uVar4 - 1;
      pcVar8 = pcVar7 + 1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar8;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar7 = local_220;
    do {
      pcVar11 = pcVar7;
      if (iVar5 == 0) break;
      iVar5 = iVar5 + -1;
      pcVar11 = pcVar7 + 1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar11;
    } while (cVar1 != '\0');
    pcVar7 = pcVar8 + -uVar4;
    pcVar8 = pcVar11 + -1;
    for (uVar6 = uVar4 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      *(undefined4 *)pcVar8 = *(undefined4 *)pcVar7;
      pcVar7 = pcVar7 + 4;
      pcVar8 = pcVar8 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      *pcVar8 = *pcVar7;
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar7 = param_2;
    do {
      if (uVar4 == 0) break;
      uVar4 = uVar4 - 1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar7 + 1;
    } while (cVar1 != '\0');
    if (~uVar4 + 7 < 0x3d) {
      uVar4 = 0xffffffff;
      do {
        pcVar7 = param_2;
        if (uVar4 == 0) break;
        uVar4 = uVar4 - 1;
        pcVar7 = param_2 + 1;
        cVar1 = *param_2;
        param_2 = pcVar7;
      } while (cVar1 != '\0');
      uVar4 = ~uVar4;
      iVar5 = -1;
      pcVar8 = local_220;
      do {
        pcVar11 = pcVar8;
        if (iVar5 == 0) break;
        iVar5 = iVar5 + -1;
        pcVar11 = pcVar8 + 1;
        cVar1 = *pcVar8;
        pcVar8 = pcVar11;
      } while (cVar1 != '\0');
      pcVar7 = pcVar7 + -uVar4;
      pcVar8 = pcVar11 + -1;
      for (uVar6 = uVar4 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
        *(undefined4 *)pcVar8 = *(undefined4 *)pcVar7;
        pcVar7 = pcVar7 + 4;
        pcVar8 = pcVar8 + 4;
      }
    }
    else {
      pcStackY_340 = (char *)0x413e7a;
      _strncat(local_220,param_2,0x31);
      uVar4 = 0xffffffff;
      pcVar7 = PTR_DAT_005ec2c8;
      do {
        pcVar8 = pcVar7;
        if (uVar4 == 0) break;
        uVar4 = uVar4 - 1;
        pcVar8 = pcVar7 + 1;
        cVar1 = *pcVar7;
        pcVar7 = pcVar8;
      } while (cVar1 != '\0');
      uVar4 = ~uVar4;
      iVar5 = -1;
      pcVar7 = local_220;
      do {
        pcVar11 = pcVar7;
        if (iVar5 == 0) break;
        iVar5 = iVar5 + -1;
        pcVar11 = pcVar7 + 1;
        cVar1 = *pcVar7;
        pcVar7 = pcVar11;
      } while (cVar1 != '\0');
      pcVar7 = pcVar8 + -uVar4;
      pcVar8 = pcVar11 + -1;
      for (uVar6 = uVar4 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
        *(undefined4 *)pcVar8 = *(undefined4 *)pcVar7;
        pcVar7 = pcVar7 + 4;
        pcVar8 = pcVar8 + 4;
      }
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      *pcVar8 = *pcVar7;
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar7 = PTR_DAT_005ec2cc;
    do {
      pcVar8 = pcVar7;
      if (uVar4 == 0) break;
      uVar4 = uVar4 - 1;
      pcVar8 = pcVar7 + 1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar8;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar7 = local_220;
    do {
      pcVar11 = pcVar7;
      if (iVar5 == 0) break;
      iVar5 = iVar5 + -1;
      pcVar11 = pcVar7 + 1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar11;
    } while (cVar1 != '\0');
    pcVar7 = pcVar8 + -uVar4;
    pcVar8 = pcVar11 + -1;
    for (uVar6 = uVar4 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      *(undefined4 *)pcVar8 = *(undefined4 *)pcVar7;
      pcVar7 = pcVar7 + 4;
      pcVar8 = pcVar8 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      *pcVar8 = *pcVar7;
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar7 = "Line: ";
    do {
      pcVar8 = pcVar7;
      if (uVar4 == 0) break;
      uVar4 = uVar4 - 1;
      pcVar8 = pcVar7 + 1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar8;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar7 = local_220;
    do {
      pcVar11 = pcVar7;
      if (iVar5 == 0) break;
      iVar5 = iVar5 + -1;
      pcVar11 = pcVar7 + 1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar11;
    } while (cVar1 != '\0');
    pcVar7 = pcVar8 + -uVar4;
    pcVar8 = pcVar11 + -1;
    for (uVar6 = uVar4 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      *(undefined4 *)pcVar8 = *(undefined4 *)pcVar7;
      pcVar7 = pcVar7 + 4;
      pcVar8 = pcVar8 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      *pcVar8 = *pcVar7;
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    iVar5 = -1;
    pcVar7 = local_220;
    do {
      if (iVar5 == 0) break;
      iVar5 = iVar5 + -1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar7 + 1;
    } while (cVar1 != '\0');
    pcStackY_340 = (char *)0x413f58;
    FUN_00417680();
    pcVar7 = PTR_DAT_005ec2d0;
    uVar4 = 0xffffffff;
    pcVar8 = PTR_DAT_005ec2d0;
    do {
      pcVar11 = pcVar8;
      if (uVar4 == 0) break;
      uVar4 = uVar4 - 1;
      pcVar11 = pcVar8 + 1;
      cVar1 = *pcVar8;
      pcVar8 = pcVar11;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar8 = local_220;
    do {
      pcVar10 = pcVar8;
      if (iVar5 == 0) break;
      iVar5 = iVar5 + -1;
      pcVar10 = pcVar8 + 1;
      cVar1 = *pcVar8;
      pcVar8 = pcVar10;
    } while (cVar1 != '\0');
    pcVar8 = pcVar11 + -uVar4;
    pcVar11 = pcVar10 + -1;
    for (uVar6 = uVar4 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      *(undefined4 *)pcVar11 = *(undefined4 *)pcVar8;
      pcVar8 = pcVar8 + 4;
      pcVar11 = pcVar11 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      *pcVar11 = *pcVar8;
      pcVar8 = pcVar8 + 1;
      pcVar11 = pcVar11 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar8 = "Expression: ";
    do {
      pcVar11 = pcVar8;
      if (uVar4 == 0) break;
      uVar4 = uVar4 - 1;
      pcVar11 = pcVar8 + 1;
      cVar1 = *pcVar8;
      pcVar8 = pcVar11;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar8 = local_220;
    do {
      pcVar10 = pcVar8;
      if (iVar5 == 0) break;
      iVar5 = iVar5 + -1;
      pcVar10 = pcVar8 + 1;
      cVar1 = *pcVar8;
      pcVar8 = pcVar10;
    } while (cVar1 != '\0');
    pcVar8 = pcVar11 + -uVar4;
    pcVar11 = pcVar10 + -1;
    for (uVar6 = uVar4 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      *(undefined4 *)pcVar11 = *(undefined4 *)pcVar8;
      pcVar8 = pcVar8 + 4;
      pcVar11 = pcVar11 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      *pcVar11 = *pcVar8;
      pcVar8 = pcVar8 + 1;
      pcVar11 = pcVar11 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar8 = param_1;
    do {
      if (uVar4 == 0) break;
      uVar4 = uVar4 - 1;
      cVar1 = *pcVar8;
      pcVar8 = pcVar8 + 1;
    } while (cVar1 != '\0');
    uVar6 = 0xffffffff;
    pcVar8 = local_220;
    do {
      if (uVar6 == 0) break;
      uVar6 = uVar6 - 1;
      cVar1 = *pcVar8;
      pcVar8 = pcVar8 + 1;
    } while (cVar1 != '\0');
    if (~uVar4 + ~uVar6 + 0xae < 0x21d) {
      uVar4 = 0xffffffff;
      do {
        pcVar8 = param_1;
        if (uVar4 == 0) break;
        uVar4 = uVar4 - 1;
        pcVar8 = param_1 + 1;
        cVar1 = *param_1;
        param_1 = pcVar8;
      } while (cVar1 != '\0');
      uVar4 = ~uVar4;
      iVar5 = -1;
      pcVar11 = local_220;
      do {
        pcVar10 = pcVar11;
        if (iVar5 == 0) break;
        iVar5 = iVar5 + -1;
        pcVar10 = pcVar11 + 1;
        cVar1 = *pcVar11;
        pcVar11 = pcVar10;
      } while (cVar1 != '\0');
      pcVar8 = pcVar8 + -uVar4;
      pcVar11 = pcVar10 + -1;
      for (uVar6 = uVar4 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
        *(undefined4 *)pcVar11 = *(undefined4 *)pcVar8;
        pcVar8 = pcVar8 + 4;
        pcVar11 = pcVar11 + 4;
      }
      for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
        *pcVar11 = *pcVar8;
        pcVar8 = pcVar8 + 1;
        pcVar11 = pcVar11 + 1;
      }
    }
    else {
      uVar4 = 0xffffffff;
      pcVar7 = local_220;
      do {
        if (uVar4 == 0) break;
        uVar4 = uVar4 - 1;
        cVar1 = *pcVar7;
        pcVar7 = pcVar7 + 1;
      } while (cVar1 != '\0');
      pcStackY_340 = (char *)0x41400c;
      _strncat(local_220,param_1,0x169 - (~uVar4 - 1));
      uVar4 = 0xffffffff;
      pcVar7 = PTR_DAT_005ec2c8;
      do {
        pcVar8 = pcVar7;
        if (uVar4 == 0) break;
        uVar4 = uVar4 - 1;
        pcVar8 = pcVar7 + 1;
        cVar1 = *pcVar7;
        pcVar7 = pcVar8;
      } while (cVar1 != '\0');
      uVar4 = ~uVar4;
      iVar5 = -1;
      pcVar7 = local_220;
      do {
        pcVar11 = pcVar7;
        if (iVar5 == 0) break;
        iVar5 = iVar5 + -1;
        pcVar11 = pcVar7 + 1;
        cVar1 = *pcVar7;
        pcVar7 = pcVar11;
      } while (cVar1 != '\0');
      pcVar8 = pcVar8 + -uVar4;
      pcVar11 = pcVar11 + -1;
      for (uVar6 = uVar4 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
        *(undefined4 *)pcVar11 = *(undefined4 *)pcVar8;
        pcVar8 = pcVar8 + 4;
        pcVar11 = pcVar11 + 4;
      }
      for (uVar4 = uVar4 & 3; pcVar7 = PTR_DAT_005ec2d0, uVar4 != 0; uVar4 = uVar4 - 1) {
        *pcVar11 = *pcVar8;
        pcVar8 = pcVar8 + 1;
        pcVar11 = pcVar11 + 1;
      }
    }
    uVar4 = 0xffffffff;
    pcVar8 = pcVar7;
    do {
      pcVar11 = pcVar8;
      if (uVar4 == 0) break;
      uVar4 = uVar4 - 1;
      pcVar11 = pcVar8 + 1;
      cVar1 = *pcVar8;
      pcVar8 = pcVar11;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar8 = local_220;
    do {
      pcVar10 = pcVar8;
      if (iVar5 == 0) break;
      iVar5 = iVar5 + -1;
      pcVar10 = pcVar8 + 1;
      cVar1 = *pcVar8;
      pcVar8 = pcVar10;
    } while (cVar1 != '\0');
    pcVar8 = pcVar11 + -uVar4;
    pcVar11 = pcVar10 + -1;
    for (uVar6 = uVar4 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      *(undefined4 *)pcVar11 = *(undefined4 *)pcVar8;
      pcVar8 = pcVar8 + 4;
      pcVar11 = pcVar11 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      *pcVar11 = *pcVar8;
      pcVar8 = pcVar8 + 1;
      pcVar11 = pcVar11 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar8 = 
    "For information on how your program can cause an assertion\nfailure, see the Visual C++ documentation on asserts"
    ;
    do {
      pcVar11 = pcVar8;
      if (uVar4 == 0) break;
      uVar4 = uVar4 - 1;
      pcVar11 = pcVar8 + 1;
      cVar1 = *pcVar8;
      pcVar8 = pcVar11;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar8 = local_220;
    do {
      pcVar10 = pcVar8;
      if (iVar5 == 0) break;
      iVar5 = iVar5 + -1;
      pcVar10 = pcVar8 + 1;
      cVar1 = *pcVar8;
      pcVar8 = pcVar10;
    } while (cVar1 != '\0');
    pcVar8 = pcVar11 + -uVar4;
    pcVar11 = pcVar10 + -1;
    for (uVar6 = uVar4 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      *(undefined4 *)pcVar11 = *(undefined4 *)pcVar8;
      pcVar8 = pcVar8 + 4;
      pcVar11 = pcVar11 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      *pcVar11 = *pcVar8;
      pcVar8 = pcVar8 + 1;
      pcVar11 = pcVar11 + 1;
    }
    uVar4 = 0xffffffff;
    do {
      pcVar8 = pcVar7;
      if (uVar4 == 0) break;
      uVar4 = uVar4 - 1;
      pcVar8 = pcVar7 + 1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar8;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar7 = local_220;
    do {
      pcVar11 = pcVar7;
      if (iVar5 == 0) break;
      iVar5 = iVar5 + -1;
      pcVar11 = pcVar7 + 1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar11;
    } while (cVar1 != '\0');
    pcVar7 = pcVar8 + -uVar4;
    pcVar8 = pcVar11 + -1;
    for (uVar6 = uVar4 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      *(undefined4 *)pcVar8 = *(undefined4 *)pcVar7;
      pcVar7 = pcVar7 + 4;
      pcVar8 = pcVar8 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      *pcVar8 = *pcVar7;
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar7 = "(Press Retry to debug the application - JIT must be enabled)";
    do {
      pcVar8 = pcVar7;
      if (uVar4 == 0) break;
      uVar4 = uVar4 - 1;
      pcVar8 = pcVar7 + 1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar8;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar7 = local_220;
    do {
      pcVar11 = pcVar7;
      if (iVar5 == 0) break;
      iVar5 = iVar5 + -1;
      pcVar11 = pcVar7 + 1;
      cVar1 = *pcVar7;
      pcVar7 = pcVar11;
    } while (cVar1 != '\0');
    pcVar7 = pcVar8 + -uVar4;
    pcVar8 = pcVar11 + -1;
    for (uVar6 = uVar4 >> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      *(undefined4 *)pcVar8 = *(undefined4 *)pcVar7;
      pcVar7 = pcVar7 + 4;
      pcVar8 = pcVar8 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      *pcVar8 = *pcVar7;
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    pcStackY_340 = (char *)0x414147;
    iVar5 = FUN_004175f0();
    if (iVar5 == 3) {
      FUN_00417420();
                    /* WARNING: Subroutine does not return */
      __exit(3);
    }
    if (iVar5 == 4) {
      pcVar2 = (code *)swi(3);
      (*pcVar2)();
      return;
    }
    if (iVar5 == 5) {
      return;
    }
  }
                    /* WARNING: Subroutine does not return */
  _abort();
}

