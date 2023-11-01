//使用express构建web服务器
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

//引入路由模块
const app: any = express();
const router: any = express.Router();
import AppRoutes from "./routes";
//统一伪装跨域，之后不用再res.writeHead
app.use(cors());
//使用body-parser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
AppRoutes.forEach((route) => router[route.method](route.path, route.action));

app.use(router);
// 3. 开启服务器并监听端口
app.listen(8000, () => {
  console.log("http://127.0.0.1:8000");
});
