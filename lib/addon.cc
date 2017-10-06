#include <node_api.h>
#include <assert.h>
#include <stdio.h>

napi_value convertImage(napi_env env, napi_callback_info info) {
  napi_status status;

  size_t argc = 1;
  napi_value args[1];
  status = napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
  assert(status == napi_ok);

  if (argc < 1) {
    napi_throw_type_error(env, nullptr, "Wrong number of arguments");
    return nullptr;
  }

  bool isbuffer;
  status = napi_is_buffer(env, args[0], &isbuffer);
  assert(status == napi_ok);

  if (!isbuffer) {
    napi_throw_type_error(env, nullptr, "Wrong arguments");
    return nullptr;
  }

  void * buffer;
  size_t bufferlength;
  status = napi_get_buffer_info(env, args[0], &buffer, &bufferlength);
  assert(status == napi_ok);

  double value1;
  status = napi_get_value_double(env, args[1], &value1);
  assert(status == napi_ok);

  napi_value sum;
  status = napi_create_double(env, 8, &sum);
  assert(status == napi_ok);

  
  FILE *ptr_myfile;

  ptr_myfile=fopen("output","wb");
  if (!ptr_myfile)
  {
      napi_throw_type_error(env, nullptr, "Could not open file");
      return nullptr;
  }
  
  fwrite(buffer, 1, bufferlength, ptr_myfile);
  
  fclose(ptr_myfile);
  
  return sum;
}

#define DECLARE_NAPI_METHOD(name, func)                          \
  { name, 0, func, 0, 0, 0, napi_default, 0 }

napi_value Init(napi_env env, napi_value exports) {
  napi_status status;
  napi_property_descriptor addDescriptor = DECLARE_NAPI_METHOD("convertImage", convertImage);
  status = napi_define_properties(env, exports, 1, &addDescriptor);
  assert(status == napi_ok);
  return exports;
}

NAPI_MODULE(addon, Init)