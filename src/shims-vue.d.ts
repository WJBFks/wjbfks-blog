/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "vue3-cropper";
declare module "@/scripts/cropperUtils";
// https://github.com/IronPans/img-compressor
declare module "img-compressor";
