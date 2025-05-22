const ROUTES = {
  dashboard: "/",
  login: "/login",
  users: "/users",
  newUser: "/user/new",
  user: (id: string) => `/user/${id}`,
  customers: "/customers",
  newCustomer: "/customer/new",
  customer: (id: string) => `/customer/${id}`,
  editCustomer: (id: string) => `/customer/${id}/edit`,
  settings: "/settings",
};

export default ROUTES;
