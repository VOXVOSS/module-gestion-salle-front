import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Clone the request to include withCredentials
  const modifiedReq = req.clone({
    withCredentials: true,
  });
  // Forward the modified request
  return next(modifiedReq);
};
