import { InjectionToken } from "@angular/core";
export interface Toaster {
  success(msg: string, title?: string): void;
  info(msg: string, title?: string): void;
  warning(msg: string, title?: string): void;
  error(msg: string, title?: string): void;
  options?: any,
  clear?: any;
}

export const TOASTER_TOKEN = new InjectionToken<Toaster>('Toaster');

declare const toastr: Toaster;
if (typeof toastr !== 'undefined') {
  toastr.options.preventDuplicates = true;
  toastr.options.closeButton = true;
  toastr.options.timeOut = 70000;
  toastr.options.extendedTimeOut = 0;
  toastr.options.progressBar = true;
  toastr.options.tapToDismiss = false;
  toastr.options.newestOnTop = false;
}
