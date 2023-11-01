import { Result } from "../utils";
import axios from "axios";
import * as crypto from "crypto";
// geetest 公钥
// geetest public key
const CAPTCHA_ID = "647f5ed2ed8acb4be36784e01556bb71";

// geetest 密钥
// geetest secret key
const CAPTCHA_KEY = "b09a7aafbfd83f73b35a9b530d0337bf";

// geetest 服务地址
// geetest server url
const API_SERVER = "http://gcaptcha4.geetest.com";

// geetest 验证接口
// geetest server interface
const API_URL = API_SERVER + "/validate" + "?captcha_id=" + CAPTCHA_ID;

// 生成签名
// Generate signature
const hmac_sha256_encode = (value: any, key: string) => {
  const hash = crypto
    .createHmac("sha256", key)
    .update(value, "utf8")
    .digest("hex");
  return hash;
};
// 发送post请求, 响应json数据如：{"result": "success", "reason": "", "captcha_args": {}}
// Send a post request and respond to JSON data, such as: {result ":" success "," reason ":" "," captcha_args ": {}}
async function post_form(data: any, url: string) {
  const options = {
    url: url,
    method: "POST",
    params: data,
    timeout: 5000,
  };
  const result = await axios(options);
  if (result.status != 200) {
    // geetest服务响应异常
    // geetest service response exception
    console.log("Geetest Response Error, StatusCode:" + result.status);
    throw new Error("Geetest Response Error");
  }
  return result.data;
}
export default class UserService {
  async login(req: any) {
    const { lot_number, captcha_output, pass_token, gen_time } = req.body;
    const sign_token = hmac_sha256_encode(lot_number, CAPTCHA_KEY);
    // 向极验转发前端数据 + “sign_token” 签名
    // send web parameter and “sign_token” to geetest server
    const data = {
      lot_number: lot_number,
      captcha_output: captcha_output,
      pass_token: pass_token,
      gen_time: gen_time,
      sign_token: sign_token,
    };
    // post request
    // 根据极验返回的用户验证状态, 网站主进行自己的业务逻辑
    // According to the user authentication status returned by the geetest, the website owner carries out his own business logic
    return new Promise((resolve, reject) => {
      post_form(data, API_URL)
        .then((result) => {
          if (result["result"] == "success") {
            console.log("validate success");
            resolve(Result.success("success"));
          } else {
            console.log("validate fail:" + result["reason"]);
            resolve(Result.error("error"));
          }
        })
        .catch((err) => {
          // 当请求Geetest服务接口出现异常，应放行通过，以免阻塞正常业务。
          // When the request geetest service interface is abnormal, it shall be released to avoid blocking normal business.
          console.log("Geetest server error:" + err);
          reject(Result.success("success"));
        });
    });
  }
}
