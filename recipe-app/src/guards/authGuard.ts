import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

// Simulera en autentiseringstjänst
const isAuthenticated = () => {
  return localStorage.getItem('user') !== null;
};

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' });
  } else {
    next();
  }
}; 