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
