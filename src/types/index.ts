/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TErrorSources } from "./error.type";

export type { ISendOtp, IVerifyOtp, ILogin } from "./auth.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface IErrorResponse {
  success: boolean;
  message: string;
  errorSources: TErrorSources[];
  err: any;
  stack: any;
}
