
void FUN_005d849e(void)

{
  ushort *puVar1;
  byte bVar2;
  byte bVar3;
  byte bVar4;
  char cVar6;
  ushort uVar5;
  int unaff_ESI;
  
  cVar6 = *(char *)(unaff_ESI + 0x31);
  if (cVar6 == '\x10') {
    *(int *)(unaff_ESI + 200) = *(int *)(unaff_ESI + 200) + DAT_0065dc30;
    bVar3 = (byte)(*(uint *)(unaff_ESI + 200) >> 0x14);
    bVar4 = bVar3 & 3;
    if (bVar4 != *(byte *)(unaff_ESI + 0xc5)) {
      LOCK();
      bVar2 = *(byte *)(unaff_ESI + 0xc5);
      *(byte *)(unaff_ESI + 0xc5) = bVar4;
      UNLOCK();
      uVar5 = CONCAT11(bVar3,bVar2) & 0x202;
      if ((char)uVar5 != (char)(uVar5 >> 8)) {
        FUN_0042ddb9();
      }
      FUN_005e53ca();
    }
  }
  else if (cVar6 == '\t') {
    *(int *)(unaff_ESI + 200) = *(int *)(unaff_ESI + 200) + DAT_0065dc30;
    bVar3 = (byte)(*(uint *)(unaff_ESI + 200) >> 0x13) & 1;
    if (bVar3 != *(byte *)(unaff_ESI + 0xc5)) {
      *(byte *)(unaff_ESI + 0xc5) = bVar3;
      FUN_005e53ca();
      return;
    }
  }
  else if (cVar6 == '\r') {
    *(int *)(unaff_ESI + 200) = *(int *)(unaff_ESI + 200) + DAT_0065dc30;
    cVar6 = (char)((*(uint *)(unaff_ESI + 200) >> 0xd & 0xff) * 6 >> 8);
    if (cVar6 != *(char *)(unaff_ESI + 0xc5)) {
      *(char *)(unaff_ESI + 0xc5) = cVar6;
      FUN_005e53ca();
      return;
    }
  }
  else if (cVar6 == '\x0e') {
    *(int *)(unaff_ESI + 200) = *(int *)(unaff_ESI + 200) + DAT_0065dc30;
    cVar6 = (char)((*(uint *)(unaff_ESI + 200) >> 0xd & 0xff) * 7 >> 8);
    if (cVar6 != *(char *)(unaff_ESI + 0xc5)) {
      *(char *)(unaff_ESI + 0xc5) = cVar6;
      FUN_005e53ca();
      return;
    }
  }
  else {
    if (cVar6 != '\x1e') {
      if (cVar6 != '\"') {
        return;
      }
      puVar1 = (ushort *)(unaff_ESI + 200);
      uVar5 = *puVar1;
      *puVar1 = *puVar1 + 0x3333;
      if (0xcccc < uVar5) {
        *(char *)(unaff_ESI + 0xc5) = *(char *)(unaff_ESI + 0xc5) + '\x01';
        *(byte *)(unaff_ESI + 0xc5) = *(byte *)(unaff_ESI + 0xc5) & 7;
        FUN_005e53ca();
      }
      return;
    }
    *(int *)(unaff_ESI + 200) = *(int *)(unaff_ESI + 200) + DAT_0065dc30;
    bVar3 = (byte)(*(uint *)(unaff_ESI + 200) >> 0x13) & 1;
    if (bVar3 != *(byte *)(unaff_ESI + 0xc5)) {
      *(byte *)(unaff_ESI + 0xc5) = bVar3;
      FUN_005e53ca();
      return;
    }
  }
  return;
}

