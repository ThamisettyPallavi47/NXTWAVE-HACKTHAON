// Simple client-side auth utility (demo purposes)
// Stores user object in localStorage: {role: 'admin'|'user', email}
export function login(user) {
  localStorage.setItem('user', JSON.stringify(user));
}
export function logout() {
  localStorage.removeItem('user');
}
export function getUser() {
  const s = localStorage.getItem('user');
  return s ? JSON.parse(s) : null;
}
export function isAdmin() {
  const u = getUser();
  return u && u.role === 'admin';
}
export function isAuthenticated() {
  return getUser() !== null;
}