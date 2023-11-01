import UserController from "./controller/UserController";

export default [
  // user
  {
    path: "/user/login",
    method: "post",
    action: UserController.login,
  },
];
