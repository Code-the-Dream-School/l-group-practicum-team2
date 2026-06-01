const PRIVATE_PATHNAMES = [
  "/favorites", 
  "/profile", 
  "/profile/inquiries"
];

export const isPrivateRoute = (pathname) => {
  return PRIVATE_PATHNAMES.includes(pathname);
};