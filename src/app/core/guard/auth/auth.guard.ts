import {inject} from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';

export const AuthGuard: CanActivateFn = (): boolean => {
  const _router: Router = inject(Router)

  const validSession = localStorage.getItem('Token');

  if (!validSession) {
    _router.navigateByUrl('');
    return false;
  }

  return true;
}
