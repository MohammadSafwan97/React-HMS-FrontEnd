export const getDefaultRoute = (user) => {

  if (!user) return "/login";

  switch (user.role) {

    case "transfer":
      return "/transfer-cases";

    case "employee":
      return "/employees";

    case "director":
      return "/project-director";

    default:
      return "/dashboard";
  }

};