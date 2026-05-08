
undefined4 FUN_004054e3(undefined4 param_1,LPCSTR param_2,undefined4 param_3)

{
  undefined4 uVar1;
  WCHAR local_218 [260];
  int *local_10;
  HRESULT local_c;
  int *local_8;
  
  CoInitialize((LPVOID)0x0);
  local_c = CoCreateInstance((IID *)&DAT_005e78b0,(LPUNKNOWN)0x0,1,(IID *)&DAT_005e7c70,&local_8);
  if (local_c < 0) {
    uVar1 = 0;
  }
  else {
    local_c = (**(code **)*local_8)(local_8,&DAT_005e7ca0,&local_10);
    if (local_c < 0) {
      (**(code **)(*local_8 + 8))(local_8);
      uVar1 = 0;
    }
    else {
      local_c = (**(code **)(*local_8 + 0x50))(local_8,param_1);
      if (local_c < 0) {
        (**(code **)(*local_10 + 8))(local_10);
        (**(code **)(*local_8 + 8))(local_8);
        uVar1 = 0;
      }
      else {
        local_c = (**(code **)(*local_8 + 0x1c))(local_8,param_3);
        if (local_c < 0) {
          (**(code **)(*local_10 + 8))(local_10);
          (**(code **)(*local_8 + 8))(local_8);
          uVar1 = 0;
        }
        else {
          MultiByteToWideChar(0,0,param_2,-1,local_218,0x104);
          local_c = (**(code **)(*local_10 + 0x18))(local_10,local_218,1);
          if (local_c < 0) {
            (**(code **)(*local_10 + 8))(local_10);
            (**(code **)(*local_8 + 8))(local_8);
            uVar1 = 0;
          }
          else {
            (**(code **)(*local_8 + 8))(local_8);
            (**(code **)(*local_10 + 8))(local_10);
            uVar1 = 1;
          }
        }
      }
    }
  }
  return uVar1;
}

