export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  errors: [];
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: string[];
}

export function successResponse<T>(data: T, message = 'OK'): ApiSuccessResponse<T> {
  return { success: true, message, errors: [], data };
}

export function errorResponse(message: string, errors: string[] = []): ApiErrorResponse {
  return { success: false, message, errors };
}
