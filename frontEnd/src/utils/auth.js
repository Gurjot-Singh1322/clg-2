// TEMPORARY AUTH SYSTEM (FORCE ADMIN LOGGED IN ALWAYS)

// Always return true so dashboard always loads
export function isAdminLoggedIn() {
  return true;
}

// Fake login function (always succeeds)
export function login(token) {
  console.log("Admin temporarily auto-logged in.");
  return true;
}

// Fake logout (does nothing for now)
export function logout() {
  console.log("Temporary logout");
}
