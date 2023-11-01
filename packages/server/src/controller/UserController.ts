import UserService from "../service/UserService";

class UserController {
  private service: UserService = new UserService();
  login = async (ctx: any, res: any) => {
    const content = await this.service.login(ctx);
    res.send(content);
  };
}

export default new UserController();
