//创建mysql连接池
import mysql from "mysql";
const pool = mysql.createPool({
  host: "10.142.3.82",
  user: "tmp_biz_user",
  password: "bIz_zJNd_2020",
  database: "lfcp_zjnydb_web_ypro",
  connectionLimit: 10,
});
//把创建好的连接池导出
export default pool;
