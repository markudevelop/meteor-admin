export const hasAccess = (userId, role = 'admin') => {
  if (Roles.userIsInRole(userId, role)) {
    return true;
  } else {
    return false;
  }
};
