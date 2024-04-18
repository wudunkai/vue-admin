export interface LoginBody {
  lot_number: string
  captcha_output: string
  pass_token: string
  gen_time: string
}
export interface UserPhoneCaptchaBody {
  type: string
}
