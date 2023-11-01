/*
  判断数据是否为空
  data    all    需要判断的数据
*/
const isEmpty = (data: any) => {
  if (data === null || data === undefined || data === "") {
    return true;
  }
  return false;
};

export { isEmpty };
