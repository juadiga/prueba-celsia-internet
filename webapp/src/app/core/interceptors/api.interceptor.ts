import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiErrorResponse } from '../models/api-response.model';

const MENSAJE_ERROR_GENERICO = 'Ocurrió un error inesperado. Intente nuevamente.';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.url.startsWith('http') ? req : req.clone({ url: `${environment.apiUrl}${req.url}` });

  return next(apiReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const body = error.error as ApiErrorResponse | null;
      const mensaje = body?.message ?? MENSAJE_ERROR_GENERICO;
      return throwError(() => new Error(mensaje));
    }),
  );
};
